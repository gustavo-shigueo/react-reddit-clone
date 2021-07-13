import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { getAccessToken, setAccessToken } from '../utils/acessToken'
import { UserContext } from '../utils/UserContext'

const Logout = () => {
	const { setUser }: any = useContext(UserContext)
	const [isLoggedIn, setIsLoggedIn] = useState(true)

	useEffect(() => {
		const logoutRequest = async () => {
			await fetch('http://localhost:3001/logout', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getAccessToken(),
				},
			})
			setUser(null)
			setAccessToken('')
			setIsLoggedIn(false)
			return
		}
		logoutRequest()
	}, [setUser])

	return isLoggedIn ? <div /> : <Redirect to="/" />
}

export default Logout
