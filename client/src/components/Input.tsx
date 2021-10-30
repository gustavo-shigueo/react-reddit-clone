import { ChangeEventHandler } from 'react'

type InputType =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week'

interface InputProps {
	label: string
	type: InputType
	name: string
	value?: any
	checked?: boolean
	onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	[key: string]: any
}

const Input = ({
	label,
	type,
	name,
	value,
	checked,
	onChange,
	...props
}: InputProps) => {
	return (
		<div className="input-group">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				{...props}
			/>
		</div>
	)
}

export default Input
