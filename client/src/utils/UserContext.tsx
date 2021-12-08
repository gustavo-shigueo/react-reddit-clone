import { createContext, FC, useCallback, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { User } from '../interfaces/userInterfaces'
import { setAccessToken, getAccessToken } from './acessToken'
import { getResponseHeaders } from './getResponseHeaders'
import { meRequest } from './meRequest'
import { refreshRequest } from './refreshRequest'
import { sendRequest } from './sendRequest'

interface LoginData {
	emailOrUsername: string
	password: string
}

interface SignupData {
	email: string
	username: string
	password: string
}

// type userContext = User | {} | null

// export const UserContext = createContext<userContext>({})

const AuthContext = createContext<any>(null)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider: FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>()
	const [fetchingUser, setFetchingUser] = useState(true)

	const login = async (values: LoginData) => {
		const response = await sendRequest({
			method: 'POST',
			path: '/login',
			body: values,
		})

		const data: User = await response.json()
		if (data?.id) {
			const { authorization: token } = getResponseHeaders(response)
			setCurrentUser(data)
			setAccessToken(token)
		}
	}

	const signup = async (values: SignupData) => {
		const response = await sendRequest({
			method: 'POST',
			path: '/register',
			body: values,
		})

		if (response.status === 201) {
			return <Redirect to="/login"></Redirect>
		}

		alert((await response.json()).message)
	}

	const logout = () => {
		const logoutRequest = async () => {
			await fetch('http://localhost:3001/logout', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getAccessToken(),
				},
			})
			setCurrentUser(null)
			setAccessToken('')
			return
		}
		logoutRequest()
	}

	const fetchUser = useCallback(async () => {
		setFetchingUser(true)
		if (!currentUser?.id) {
			try {
				setCurrentUser((await refreshRequest()) || null)
			} catch {
				setCurrentUser(null)
			} finally {
				setFetchingUser(false)
			}
		} else {
			try {
				const user = await meRequest()
				if (!user) {
					return setCurrentUser((await refreshRequest()) || null)
				}

				if (currentUser?.id !== user.id) return setCurrentUser(null)
				setCurrentUser(user)
			} finally {
				setFetchingUser(false)
			}
		}
	}, [currentUser?.id])

	const value = {
		currentUser,
		setCurrentUser,
		login,
		signup,
		logout,
		fetchUser,
		fetchingUser,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
