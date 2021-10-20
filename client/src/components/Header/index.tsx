import { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import Navbar from './Navbar'
import classes from '../../css/Header.module.css'
import DropDown from './DropDown'

const Header = () => {
	const { user }: any = useContext(UserContext)
	const location = useLocation()
	const isLarge = useMediaQuery('(min-width: 800px)')

	return (
		<header className={classes.header}>
			<div>
				<Link to="/">
					<h1>RedditClone</h1>
				</Link>
			</div>
			{isLarge ? (
				<Navbar user={user} location={location} />
			) : (
				<DropDown user={user} location={location} />
			)}
		</header>
	)
}

export default Header
