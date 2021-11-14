import { Op } from 'sequelize'
import { Post, User } from '../models'

export class PostController {
	static async getPosts(lastPostDate: any = new Date(), limit = 10) {
		try {
			const limitPlusOne = limit + 1

			const posts = await Post.findAll({
				order: [['createdAt', 'DESC']],
				include: [{ model: User, as: 'owner', attributes: ['id', 'username'] }],
				limit: limitPlusOne,
				where: {
					createdAt: { [Op.lt]: lastPostDate },
				} as any,
			})

			return {
				posts: posts.slice(0, limit).map(post => {
					const snippet = post.text.substring(0, 50).trim()
					const elipsis = post.text.trim().length > 50 ? '...' : ''
					post.text = `${snippet}${elipsis}`
					return post
				}),
				hasMore: posts.length === limitPlusOne,
			}
		} catch (error) {
			return []
		}
	}

	static async addPost({
		ownerId,
		title,
		text,
	}: {
		ownerId: string
		title: string
		text: string
	}) {
		try {
			const post = await Post.create({
				title,
				text,
				ownerId,
				points: 0,
			})

			await post.save()
			return post
		} catch (error) {
			throw error
		}
	}
}
