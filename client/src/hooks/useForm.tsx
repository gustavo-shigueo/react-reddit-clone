import { ChangeEventHandler, useState } from 'react'

type TextFields = HTMLInputElement | HTMLTextAreaElement
type ChangeHandler = ChangeEventHandler<TextFields>

export const useForm = <T,>(initialValues: T): [T, ChangeHandler] => {
	const [values, setValues] = useState(initialValues)

	const handler: ChangeHandler = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	return [values, handler]
}
