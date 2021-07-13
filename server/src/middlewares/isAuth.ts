import { Request, Response, NextFunction } from 'express'
import { validateAccessToken } from '../utils/tokenUtils'
import { User } from '../models'

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) throw new Error('Not authenticated')

		const payload = validateAccessToken(req.headers.authorization)

		if (!payload) throw new Error('Not authenticated')

		const user = await User.findByPk(payload.id)
		if (!user) throw new Error('Not authenticated')

		req.body.user = user
		return next()
	} catch (error) {
		return res.json({ user: null })
	}
}

export { isAuth }
