import { CSSProperties } from 'react'

interface ButtonProps {
	action?: Function
	text: string
	variant?: 'primary' | 'secondary' | 'danger' | 'success'
	type?: 'button' | 'submit' | 'reset'
}

const buttonStyle: CSSProperties = {
	padding: '.5rem 1rem',
	borderRadius: '5px',
	color: 'white',
	border: 'none',
	cursor: 'pointer',
}

const Button = ({ action, text, variant, type }: ButtonProps) => {
	let backgroundColor

	switch (variant) {
		case 'secondary':
			backgroundColor = 'var(--color-neutral-550)'
			break
		case 'danger':
		case 'success':
			backgroundColor = `var(--color-${variant})`
			break
		default:
			backgroundColor = `var(--color-accent-700)`
			break
	}

	return (
		<button
			onClick={() => action?.()}
			style={{ ...buttonStyle, backgroundColor }}
			type={type ?? 'button'}
		>
			{text}
		</button>
	)
}

export default Button
