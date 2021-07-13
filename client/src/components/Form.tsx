import { ReactElement } from 'react'

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
		<div>
			<form method={method} onSubmit={onSubmit}>
				{children}
			</form>
		</div>
	)
}

export default Form
