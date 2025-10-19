import { type ReactNode } from 'react'
import { useTheme } from '../../context/theme'

interface TextProps {
	children: ReactNode
	className?: string
	variant?: 'primary' | 'secondary' | 'muted'
	as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Text = ({
	children,
	className = '',
	variant = 'primary',
	as: Component = 'p'
}: TextProps) => {
	const { actualTheme } = useTheme()

	const baseStyles = 'transition-colors duration-200'

	const getVariantStyles = () => {
		if (actualTheme === 'dark') {
			switch (variant) {
				case 'primary':
					return 'text-white'
				case 'secondary':
					return 'text-gray-300'
				case 'muted':
					return 'text-gray-500'
			}
		} else {
			switch (variant) {
				case 'primary':
					return 'text-gray-900'
				case 'secondary':
					return 'text-gray-700'
				case 'muted':
					return 'text-gray-500'
			}
		}
	}

	const getElementStyles = () => {
		switch (Component) {
			case 'h1':
				return 'text-4xl font-bold'
			case 'h2':
				return 'text-3xl font-bold'
			case 'h3':
				return 'text-2xl font-semibold'
			case 'h4':
				return 'text-xl font-semibold'
			case 'h5':
				return 'text-lg font-medium'
			case 'h6':
				return 'text-base font-medium'
			case 'p':
			case 'span':
			default:
				return ''
		}
	}

	return (
		<Component
			className={`${baseStyles} ${getVariantStyles()} ${getElementStyles()} ${className}`}>
			{children}
		</Component>
	)
}

export default Text
