import { ChangeEventHandler, useState } from 'react'

export const useForm = <T,>(
	initialValues: T
): [T, ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>] => {
	const [values, setValues] = useState(initialValues)
	const handler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
		e => setValues({ ...values, [e.target.name]: e.target.value })

	return [values, handler]
}
