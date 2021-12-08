import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Post } from '../../interfaces/postInterface'
import { useAuth } from '../../utils/UserContext'
import classes from '../../css/PostList.module.css'

interface PostItemProps {
	post: Post
}

const PostItem = ({
	post: { createdAt, title, text, points, owner },
}: PostItemProps) => {
	const { currentUser } = useAuth()

	const time = new Date(createdAt).toLocaleString('pt-BR', {
		dateStyle: 'short',
		timeStyle: 'short',
	})

	return (
		<section className={classes.postCard}>
			<div className={classes.postHeader}>
				<small>
					{owner.username} - {time}
				</small>
			</div>

			<div className={classes.postBody}>
				<h4>{title}</h4>
				<p>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</p>
			</div>

			<div className={classes.postButtons}>
				<button disabled={!currentUser}>
					<FontAwesomeIcon
						icon={faThumbsUp}
						style={{ color: 'var(--color-neutral-500)' }}
					/>
				</button>
				{points}
				<button disabled={!currentUser}>
					<FontAwesomeIcon
						icon={faThumbsDown}
						style={{ color: 'var(--color-neutral-500)' }}
					/>
				</button>
			</div>
		</section>
	)
}

export default PostItem
