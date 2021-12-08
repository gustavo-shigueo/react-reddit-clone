import { useAuth } from '../../utils/UserContext'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import Navbar from './Navbar'
import classes from '../../css/Header.module.css'
import DropDown from './DropDown'
import { refreshRequest } from '../../utils/refreshRequest'
import { useEffect } from 'react'

const refreshResponse = refreshRequest()
const Header = () => {
	const { currentUser } = useAuth()
	const location = useLocation()
	const isLarge = useMediaQuery('(min-width: 800px)')
	const { setCurrentUser } = useAuth()

	useEffect(() => {
		console.log('effect')
		refreshResponse.then(u => setCurrentUser(u as any))
	}, [setCurrentUser])

	return (
		<header className={classes.header}>
			<div>
				<Link to="/">
					<h1>RedditClone</h1>
				</Link>
			</div>
			{isLarge ? (
				<Navbar user={currentUser} location={location} />
			) : (
				<DropDown user={currentUser} location={location} />
			)}
		</header>
	)
}

export default Header
