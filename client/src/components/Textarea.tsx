import { ChangeEventHandler } from 'react'

interface TextareaProps {
	label: string
	name: string
	value?: any
	checked?: boolean
	onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	[key: string]: any
}

const Textarea = ({
	label,
	type,
	name,
	value,
	checked,
	onChange,
	...props
}: TextareaProps) => {
	return (
		<div className="input-group input-textarea">
			<textarea
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				{...props}
			/>
			<label htmlFor={name}>{label}</label>
		</div>
	)
}

export default Textarea
