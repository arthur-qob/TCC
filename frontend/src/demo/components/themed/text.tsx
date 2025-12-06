import { type ReactNode } from 'react'
import { useTheme } from '@/context/theme'

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
					return 'text-zinc-300'
				case 'muted':
					return 'text-zinc-500'
			}
		} else {
			switch (variant) {
				case 'primary':
					return 'text-zinc-900'
				case 'secondary':
					return 'text-zinc-700'
				case 'muted':
					return 'text-zinc-500'
			}
		}
	}

	const getElementStyles = () => {
		switch (Component) {
			case 'h1':
				return 'text-2xl sm:text-3xl md:text-4xl font-bold'
			case 'h2':
				return 'text-xl sm:text-2xl md:text-3xl font-bold'
			case 'h3':
				return 'text-lg sm:text-xl md:text-2xl font-semibold'
			case 'h4':
				return 'text-base sm:text-lg md:text-xl font-semibold'
			case 'h5':
				return 'text-sm sm:text-base md:text-lg font-medium'
			case 'h6':
				return 'text-xs sm:text-sm md:text-base font-medium'
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
