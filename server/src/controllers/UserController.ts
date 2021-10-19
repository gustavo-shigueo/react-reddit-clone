import bcrypt from 'bcrypt'
import { User } from '../models'
import { Op } from 'sequelize'
import {
	LoginInfo,
	UserInfo,
	UserResponse,
	UserUpdateInfo,
} from '../interfaces/UserInterfaces'

export class UserController {
	static async addUser({
		username,
		email,
		password,
	}: UserInfo): Promise<UserResponse> {
		try {
			if (username.includes('@')) {
				throw new Error('Username cannot contain an "@" symbol')
			}

			if (password.length < 8) {
				throw new Error('Password must contain at least 8 characters')
			}

			const hashedPassword = await this.hashPassword(password)
			const user = await User.create({
				username,
				email,
				password: hashedPassword,
				tokenVersion: 0,
			})

			await user.save()
			return {
				id: user.id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
			}
		} catch (error) {
			throw error
		}
	}

	static async login({
		emailOrUsername,
		password,
	}: LoginInfo): Promise<UserResponse> {
		try {
			if (!emailOrUsername) {
				throw new Error('Please enter an email or a username')
			}

			const user = await User.findOne({
				where: {
					[Op.or]: { email: emailOrUsername, username: emailOrUsername },
				},
			})
			if (!user) throw new Error('Invalid credentials')

			const validPassword = await bcrypt.compare(password, user.password)
			if (!validPassword) throw new Error('Invalid credentials')

			return {
				id: user.id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				tokenVersion: user.tokenVersion,
			}
		} catch (error) {
			throw error
		}
	}

	static async findById(id: string): Promise<UserResponse> {
		try {
			if (!id) throw new Error('Please provide an id')

			const user = await User.findByPk(id, {
				attributes: ['id', 'username', 'email', 'createdAt'],
			})

			if (!user) throw new Error('User not found')

			return user
		} catch (error) {
			throw error
		}
	}

	static async updateUser(
		user: User,
		{ username, email, password }: UserUpdateInfo
	): Promise<UserResponse> {
		try {
			if (!user) throw new Error('Not authorized')

			if (username) {
				if (username.includes('@')) {
					throw new Error('Username cannot contain an "@" symbol')
				}
				user.username = username
			}

			if (email) user.email = email

			if (password) {
				if (password.length < 8) {
					throw new Error('Password must contain at least 8 characters')
				}

				user.password = await this.hashPassword(password)
			}

			await user.save()

			return {
				id: user.id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}
		} catch (error) {
			throw error
		}
	}

	static async deleteUser(userId: string): Promise<void> {
		try {
			if (!userId) throw new Error('ID not provided')

			const deletedRows = await User.destroy({ where: { id: userId } })

			if (deletedRows === 0) throw new Error('User not found')
		} catch (error) {
			throw error
		}
	}

	private static async hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 12)
	}
}
