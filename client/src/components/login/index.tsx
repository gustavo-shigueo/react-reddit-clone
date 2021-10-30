import { FormEvent, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from '../'
import { useForm } from '../../hooks/useForm'
import { User } from '../../interfaces/userInterfaces'
import { setAccessToken } from '../../utils/acessToken'
import { getResponseHeaders } from '../../utils/getResponseHeaders'
import { sendRequest } from '../../utils/sendRequest'
import { UserContext } from '../../utils/UserContext'

interface FormData {
	emailOrUsername: string
	password: string
}

const Login = () => {
	const { user, setUser }: any = useContext(UserContext)

	const [values, handleChange] = useForm<FormData>({
		emailOrUsername: '',
		password: '',
	})

	if (user) {
		return <Redirect to="/"></Redirect>
	}

	const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const response = await sendRequest({
			method: 'POST',
			path: '/login',
			body: values,
		})

		const data: User = await response.json()
		if (data?.id) {
			const { authorization: token } = getResponseHeaders(response)
			setUser(data)
			setAccessToken(token)
		}
	}

	return (
		<Form onSubmit={loginSubmit} method="POST">
			<Input
				type="text"
				name="emailOrUsername"
				value={values.emailOrUsername}
				onChange={handleChange}
				label="E-mail or Username"
			/>
			<Input
				type="password"
				name="password"
				value={values.password}
				onChange={handleChange}
				label="Password"
			/>
			<Button text="Login" type="submit"></Button>
		</Form>
	)
}

export default Login
