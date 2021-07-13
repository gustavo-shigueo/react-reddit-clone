import { useState, useEffect } from 'react'
import { Post } from '../../interfaces/postInterface'
import { postsRequest } from '../../utils/getPosts'
import PostItem from './PostItem'

const PostList = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [hasMore, setHasMore] = useState(false)

	const getPosts = () => {
		postsRequest().then(({ posts, hasMore }) => {
			setPosts(posts)
			setHasMore(hasMore)
		})
	}

	useEffect(() => {
		getPosts()
	}, [])

	const loadMore = async () => {
		const [lastPost] = posts.slice(-1)
		const lastPostDate = lastPost.createdAt
		const { posts: p, hasMore: h } = await postsRequest(lastPostDate)
		setPosts(currentPosts => [...currentPosts, ...p])
		setHasMore(h)
	}

	const showPost = (post: Post) => <PostItem key={post.id} post={post} />

	return (
		<main className="post-list">
			{posts.length > 0 && posts.map(showPost)}
			{/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
			{hasMore && <button onClick={loadMore}>Load More</button>}
		</main>
	)
}

export default PostList
