import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { Link, useLocation } from 'react-router-dom'
import classes from '../css/Header.module.css'

const Header = () => {
	const { user }: any = useContext(UserContext)
	const location = useLocation()

	return (
		<header className={classes.header}>
			<div>
				<Link to="/">
					<h1>RedditClone</h1>
				</Link>
			</div>
			<nav className={classes.navbar}>
				<Link
					to="/"
					className={location.pathname === '/' ? classes.active : ''}
				>
					Home
				</Link>
				{user ? (
					<>
						<Link
							to="/create-post"
							className={
								location.pathname === '/create-post' ? classes.active : ''
							}
						>
							Create Post
						</Link>
						<Link to="/logout">Logout</Link>
						<span>{user.username}</span>
					</>
				) : (
					<Link
						to="/login"
						className={location.pathname === '/login' ? classes.active : ''}
					>
						Login
					</Link>
				)}
			</nav>
		</header>
	)
}

export default Header
