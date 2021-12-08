import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../utils/UserContext'

const Logout = () => {
	const { logout } = useAuth()
	const [isLoggedIn, setIsLoggedIn] = useState(true)

	useEffect(() => {
		;(async () => await logout())()
		setIsLoggedIn(false)
	}, [logout])

	return isLoggedIn ? <div /> : <Redirect to="/" />
}

export default Logout
