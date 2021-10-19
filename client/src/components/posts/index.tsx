import { useState, useEffect, useRef, useCallback } from 'react'
import { useOnScreen } from '../../hooks/useOnScreen'
import { Post } from '../../interfaces/postInterface'
import { postsRequest } from '../../utils/getPosts'
import PostItem from './PostItem'
import classes from '../../css/PostList.module.css'

const PostList = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [hasMore, setHasMore] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const pageBottom = useRef<any>()
	const bottomVisible = useOnScreen(pageBottom)

	const getPosts = () => {
		setIsLoading(true)
		postsRequest().then(({ posts, hasMore }) => {
			setPosts(posts)
			setHasMore(hasMore)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getPosts()
	}, [])

	const loadMore = useCallback(async () => {
		setIsLoading(true)
		const [lastPost] = posts.slice(-1)
		const lastPostDate = lastPost.createdAt
		const { posts: newPosts, hasMore: newHasMore } = await postsRequest(
			lastPostDate
		)
		setPosts(currentPosts => [...currentPosts, ...newPosts])
		setHasMore(newHasMore)
		setIsLoading(false)
	}, [posts])

	useEffect(() => {
		if (isLoading || !hasMore) return
		bottomVisible && loadMore()
	}, [bottomVisible, hasMore, isLoading, loadMore])

	const showPost = (post: Post) => <PostItem key={post.id} post={post} />

	return (
		<main className={classes.postList} style={{ paddingBottom: '3rem' }}>
			{posts.length > 0 && posts.map(showPost)}
			<div ref={pageBottom} style={{ height: '1px' }} />
		</main>
	)
}

export default PostList
