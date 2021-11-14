import { CSSProperties, ReactNode } from 'react'

interface ButtonProps {
	action?: Function
	text?: string
	variant?: 'primary' | 'secondary' | 'danger' | 'success'
	type?: 'button' | 'submit' | 'reset'
	className?: string
	children?: ReactNode
}

const buttonStyle: CSSProperties = {
	padding: '.35em .75em',
	borderRadius: '99px',
	color: 'white',
	border: 'none',
	cursor: 'pointer',
	fontWeight: 'bold',
}

const Button = ({
	action,
	text,
	variant,
	type,
	className,
	children,
}: ButtonProps) => {
	let backgroundColor
	let color = 'white'
	let border = '4px solid transparent'

	switch (variant) {
		case 'secondary':
			backgroundColor = 'var(--color-neutral-100)'
			color = 'var(--color-accent-700)'
			border = '4px solid var(--color-accent-700)'
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
			className={className ?? ''}
			onClick={() => action?.()}
			style={{ ...buttonStyle, backgroundColor, color, border }}
			type={type ?? 'button'}
		>
			{text ?? children ?? ''}
		</button>
	)
}

export default Button
