import { type ReactNode } from 'react'
import { useTheme } from '../../context/theme'

interface ContainerProps {
	children: ReactNode
	className?: string
}

const Container = ({ children, className = '' }: ContainerProps) => {
	const { actualTheme } = useTheme()

	const baseStyles = 'transition-colors duration-200'
	const themeStyles =
		actualTheme === 'dark'
			? 'bg-black text-white'
			: 'bg-gray-100 text-gray-900'

	return (
		<div className={`${baseStyles} ${themeStyles} ${className}`}>
			{children}
		</div>
	)
}

export default Container
