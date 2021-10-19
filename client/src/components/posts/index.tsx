import { useState, useEffect, useRef, useCallback } from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { Post } from '../../interfaces/postInterface'
import { postsRequest } from '../../utils/getPosts'
import PostItem from './PostItem'

const PostList = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [hasMore, setHasMore] = useState(false)
	const pageBottom = useRef<any>()
	const bottomVisible = useOnScreen(pageBottom, '-100px')

	const getPosts = () => {
		postsRequest().then(({ posts, hasMore }) => {
			setPosts(posts)
			setHasMore(hasMore)
		})
	}

	useEffect(() => {
		getPosts()
	}, [])

	const loadMore = useCallback(async () => {
		const [lastPost] = posts.slice(-1)
		const lastPostDate = lastPost.createdAt
		const { posts: newPosts, hasMore: newHasMore } = await postsRequest(
			lastPostDate
		)
		setPosts(currentPosts => [...currentPosts, ...newPosts])
		setHasMore(newHasMore)
	}, [posts])

	useEffect(() => {
		bottomVisible && loadMore()
	}, [bottomVisible, loadMore])

	const showPost = (post: Post) => <PostItem key={post.id} post={post} />

	return (
		<main className="post-list">
			{posts.length > 0 && posts.map(showPost)}
			{/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
			{
				hasMore && <div ref={pageBottom} />
				// <button onClick={loadMore}>Load More</button>
			}
		</main>
	)
}

export default PostList
