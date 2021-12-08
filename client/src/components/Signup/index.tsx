import { FormEvent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Button } from '../'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../utils/UserContext'

interface FormData {
	email: string
	username: string
	password: string
}

const Signup = () => {
	const { currentUser, signup } = useAuth()

	const [values, handleChange] = useForm<FormData>({
		email: '',
		username: '',
		password: '',
	})

	if (currentUser) {
		return <Redirect to="/"></Redirect>
	}

	const signupSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!values.email || !values.username || !values.password) return

		return await signup(values)
	}

	return (
		<Form onSubmit={signupSubmit} method="POST">
			<Input
				type="email"
				name="email"
				value={values.email}
				onChange={handleChange}
				label="E-mail"
			/>
			<Input
				type="text"
				name="username"
				value={values.username}
				onChange={handleChange}
				label="Username"
			/>
			<Input
				type="password"
				name="password"
				value={values.password}
				onChange={handleChange}
				label="Password"
			/>
			<Button type="button" variant="secondary" className="mr-1">
				<Link to="/login">Back to login</Link>
			</Button>
			<Button text="Signup" type="submit" />
		</Form>
	)
}

export default Signup
