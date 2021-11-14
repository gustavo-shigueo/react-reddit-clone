import { FormEvent, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Button } from '../'
import { useForm } from '../../hooks/useForm'
import { sendRequest } from '../../utils/sendRequest'
import { UserContext } from '../../utils/UserContext'

interface FormData {
	email: string
	username: string
	password: string
}

const Signup = () => {
	const { user }: any = useContext(UserContext)

	const [values, handleChange] = useForm<FormData>({
		email: '',
		username: '',
		password: '',
	})

	if (user) {
		return <Redirect to="/"></Redirect>
	}

	const signupSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

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
