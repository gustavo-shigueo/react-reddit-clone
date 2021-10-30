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
			<label htmlFor={name}>{label}</label>
			<textarea
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				style={{ resize: 'vertical', minHeight: '300px' }}
				{...props}
			/>
		</div>
	)
}

export default Textarea
