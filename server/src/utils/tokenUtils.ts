import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserResponse } from '../interfaces/UserInterfaces'
import { User } from '../models'

interface Payload {
	id: string
	tokenVersion: number
}

// Create tokens

export const createAccessToken = (user: UserResponse) => {
	return jwt.sign({ id: user.id }, process.env.SECRET_ACCESS_TOKEN as string, {
		expiresIn: '5s',
	})
}

export const createRefreshToken = (user: UserResponse) => {
	return jwt.sign(
		{ id: user.id, tokenVersion: user.tokenVersion },
		process.env.SECRET_REFRESH_TOKEN as string,
		{ expiresIn: '7d' }
	)
}

// Set tokens

export const setRefreshToken = (token: string, res: Response) => {
	res.cookie('jid', token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
		sameSite: 'lax',
	})
}

export const setAccessToken = (token: string, res: Response) => {
	res.setHeader('Authorization', `bearer ${token}`)
}

// Validate tokens

export const validateRefreshToken = async (token: string) => {
	const { id, tokenVersion } = jwt.verify(
		token,
		process.env.SECRET_REFRESH_TOKEN as string
	) as Payload

	const user = await User.findByPk(id)
	if (!user || user.tokenVersion !== tokenVersion) {
		throw new Error('Token is invalid or expired')
	}

	const refreshToken = createRefreshToken(user)
	const accessToken = createAccessToken(user)
	return {
		accessToken,
		refreshToken,
		user: { id: user.id, username: user.username, email: user.email },
	}
}

export const validateAccessToken = (token: string) => {
	return jwt.verify(
		token.split(' ')[1],
		process.env.SECRET_ACCESS_TOKEN as string
	) as { id: string }
}
