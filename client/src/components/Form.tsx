import { ReactElement } from 'react'
import classes from '../css/Form.module.css'

interface FormProps {
	children: ReactElement<any, any>[]
	method?: 'POST' | 'GET'
	onSubmit: any
}

const Form = (
	{ children, method, onSubmit }: FormProps = {
		children: [],
		method: 'POST',
		onSubmit: () => null,
	}
) => {
	return (
		<div className={classes.formContainer}>
			<form className={classes.form} method={method} onSubmit={onSubmit}>
				{children}
			</form>
		</div>
	)
}

export default Form
