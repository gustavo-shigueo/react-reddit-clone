import { useContext } from 'react'
import { Post } from '../../interfaces/postInterface'
import { UserContext } from '../../utils/UserContext'

interface PostItemProps {
	post: Post
}

const PostItem = ({
	post: { createdAt, title, text, points, owner },
}: PostItemProps) => {
	const { user }: any = useContext(UserContext)

	const time = new Date(createdAt).toLocaleString('pt-BR', {
		dateStyle: 'short',
		timeStyle: 'short',
	})

	return (
		<section className="post-card">
			<div className="post-header">
				<small>
					{owner.username} - {time}
				</small>
			</div>

			<div className="post-body">
				<h4>{title}</h4>
				<p>{text.length > 100 ? `${text.substr(0, 100)}...` : text}</p>
			</div>

			<div className="post-footer">
				<button disabled={!user}>upvote</button>
				{points}
				<button disabled={!user}>downvote</button>
			</div>
		</section>
	)
}

export default PostItem
