import { FormEvent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Button } from '../'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../utils/UserContext'

interface FormData {
	emailOrUsername: string
	password: string
}

const Login = () => {
	const { login, currentUser } = useAuth()

	const [values, handleChange] = useForm<FormData>({
		emailOrUsername: '',
		password: '',
	})

	if (currentUser) {
		return <Redirect to="/"></Redirect>
	}

	const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!values.emailOrUsername || !values.password) return

		await login(values)
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
			<Button type="button" variant="secondary" className="mr-1">
				<Link to="/signup">Signup</Link>
			</Button>
			<Button text="Login" type="submit" />
		</Form>
	)
}

export default Login
