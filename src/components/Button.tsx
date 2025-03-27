import React from 'react'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import Spinner from 'react-bootstrap/Spinner'

type ButtonVariants =
	| 'filled'
	| 'danger'
	| 'outlined'
	| 'danger-outlined'
	| 'text'
	| 'danger-text'
	| 'icon-button'
	| 'icon-button-outlined'

type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
	title?: string
	variant?: ButtonVariants
	size?: ButtonSize
	width?: number | string
	style?: React.CSSProperties
	disabled?: boolean
	loading?: boolean
	onPress?: () => void
	children?: React.ReactNode
	textStyle?: React.CSSProperties
	useContrastColors?: boolean
}

const Button: React.FC<ButtonProps> = ({
	title = '',
	variant = 'filled',
	size = 'md',
	width = '100%',
	style,
	disabled = false,
	loading = false,
	onPress,
	children,
	textStyle,
	useContrastColors = false
}) => {
	const { currentTheme } = useTheme()
	const contrastTheme = currentTheme === 'light' ? 'dark' : 'light'

	const sizeStyles: Record<
		ButtonSize,
		{ height: number; fontSize: number; padding: number }
	> = {
		sm: { height: 36, fontSize: 14, padding: 12 },
		md: { height: 44, fontSize: 16, padding: 16 },
		lg: { height: 55, fontSize: 18, padding: 20 }
	}

	const getVariantStyle = () => {
		const baseStyle: React.CSSProperties = {
			width: width as string,
			borderWidth: 1,
			borderRadius: 10,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			transition: 'opacity 0.3s'
		}

		switch (variant) {
			case 'filled':
				return {
					...baseStyle,
					backgroundColor: Colors[currentTheme].button,
					borderColor: Colors[currentTheme].button
				}
			case 'outlined':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor: Colors[currentTheme].button
				}
			case 'text':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderColor: 'transparent'
				}
		}
	}

	const getTextColor = () => {
		if (disabled) return 'gray'

		switch (variant) {
			case 'filled':
				return Colors[contrastTheme].text
			case 'danger':
				return Colors[contrastTheme].text
			case 'outlined':
				return Colors[useContrastColors ? contrastTheme : currentTheme]
					.text
			case 'text':
				return Colors[useContrastColors ? contrastTheme : currentTheme]
					.text
		}
	}

	return (
		<button
			onClick={onPress}
			disabled={disabled || loading}
			style={{
				...getVariantStyle(),
				height: sizeStyles[size].height,
				padding: sizeStyles[size].padding,
				opacity: disabled ? 0.5 : 1,
				...style
			}}>
			{loading ? (
				<Spinner
					animation='border'
					variant={
						variant === 'filled' ? currentTheme : contrastTheme
					}
					size='sm'
					as='span'
				/>
			) : (
				<>
					<span
						style={{
							flex: 1,
							fontSize: sizeStyles[size].fontSize,
							color: getTextColor(),
							textAlign: 'center',
							margin: 0,
							fontWeight: 700,
							...textStyle
						}}>
						{title}
					</span>
					{children}
				</>
			)}
		</button>
	)
}

export default Button
