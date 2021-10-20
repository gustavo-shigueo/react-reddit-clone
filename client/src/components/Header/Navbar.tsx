import { useLocation, Link } from 'react-router-dom'
import classes from '../../css/Header.module.css'

interface NavbarProps {
	user: any
	location: ReturnType<typeof useLocation>
}

const Navbar = ({ user, location }: NavbarProps) => {
	return (
		<nav className={classes.navbar}>
			<Link to="/" className={location.pathname === '/' ? classes.active : ''}>
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
	)
}

export default Navbar
