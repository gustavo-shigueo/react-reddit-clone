import { NextFunction, Request, Response, Router } from 'express'
import { PostController } from '../controllers/PostController'
import { isAuth } from '../middlewares/isAuth'

const router = Router()

router.get(
	'/posts',
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { cursor } = req.query
			const posts = await PostController.getPosts(cursor)
			return res.json(posts)
		} catch (error) {
			return res.json([])
		}
	}
)

router.post(
	'/posts',
	isAuth,
	async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const { userId: ownerId, title, text } = req.body
			const post = await PostController.addPost({ ownerId, title, text })
			return res.json(post)
		} catch (error) {
			return res.json(error)
		}
	}
)

export { router }
