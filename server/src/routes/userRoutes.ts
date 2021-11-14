import { NextFunction, Request, Response, Router } from 'express'
import { UserController } from '../controllers/UserController'
import {
	createAccessToken,
	createRefreshToken,
	setAccessToken,
	setRefreshToken,
	validateRefreshToken,
} from '../utils/tokenUtils'
import { isAuth } from '../middlewares/isAuth'
import TokenError from '../Errors/TokenError'
import InvalidCredentialsError from '../Errors/InvalidCredentialsError'

const router = Router()

router.post('/me', isAuth, async (req: Request, res: Response) => {
	try {
		const { userId } = req.body
		const user = await UserController.findById(userId)
		const { id, username, email } = user
		return res.json({ user: { id, username, email } })
	} catch (error) {
		return res.json({ user: null })
	}
})

router.post(
	'/register',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, username, password } = req.body
			const user = await UserController.addUser({ username, email, password })
			return res.status(201).json(user)
		} catch (error) {
			return next(error)
		}
	}
)

router.post(
	'/login',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { emailOrUsername, password } = req.body

			const user = await UserController.login({ emailOrUsername, password })
			if (!user) throw new InvalidCredentialsError()

			setAccessToken(createAccessToken(user), res)
			setRefreshToken(createRefreshToken(user), res)

			return res.json(user)
		} catch (error) {
			return next(error)
		}
	}
)

router.patch(
	'/edit-profile',
	isAuth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { user, username, email, password } = req.body
			const newUser = await UserController.updateUser(user, {
				username,
				email,
				password,
			})
			return res.json(newUser)
		} catch (error) {
			return next(error)
		}
	}
)

router.post(
	'/refresh',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const refreshToken = req.headers.cookie?.substr(4)
			if (!refreshToken) throw new TokenError()
			const {
				user,
				accessToken,
				refreshToken: rt, // Renamed to avoid name colision
			} = await validateRefreshToken(refreshToken)

			setAccessToken(accessToken, res)
			setRefreshToken(rt, res)

			return res.status(200).json(user)
		} catch (error) {
			return next(error)
		}
	}
)

router.post(
	'/logout',
	isAuth,
	(req: Request, res: Response, next: NextFunction) => {
		try {
			req.body.userId = undefined
			setRefreshToken('', res)
			return res.status(204).end()
		} catch (error) {
			return next(error)
		}
	}
)

router.delete(
	'/delete-profile',
	isAuth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await UserController.deleteUser(req.body.userId)
			req.body.userId = undefined
			setRefreshToken('', res)
			return res.status(204).end()
		} catch (error) {
			return next(error)
		}
	}
)

export { router }
