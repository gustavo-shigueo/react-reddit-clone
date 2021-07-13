export interface Post {
	id: string
	title: string
	text: string
	points: number
	ownerId: string
	createdAt: Date
	updatedAt: Date
	owner: {
		id: string
		username: string
	}
}

export interface PostResponse {
	posts: Post[]
	hasMore: boolean
}
