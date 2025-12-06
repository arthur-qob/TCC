import { type InputHTMLAttributes, type CSSProperties, useState } from 'react'
import { zincColors, appleBlue } from '@/constants/colors'
import { EyeOff, Eye } from 'lucide-react'
import { useTheme } from '@/context/theme'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean
	label?: React.ReactNode | string
}

const Input = ({
	error = false,
	className = '',
	label,
	type,
	...props
}: InputProps) => {
	const { actualTheme } = useTheme()
	const isDark = actualTheme === 'dark'

	const [isFocused, setIsFocused] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const isPasswordField = type === 'password'
	const hasReactNodeLabel = typeof label !== 'string' && label !== undefined
	const hasStringLabel = typeof label === 'string'

	const baseStyles: CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		width: '100%',
		padding: '0.625rem 1rem',
		borderRadius: '0.5rem',
		border: `1px solid ${
			error
				? 'rgb(220, 38, 38)'
				: isDark
				? `rgb(${zincColors[700]})`
				: `rgb(${zincColors[300]})`
		}`,
		backgroundColor: isDark
			? `rgb(${zincColors[900]})`
			: 'rgb(255, 255, 255)',
		color: isDark ? `rgb(${zincColors[50]})` : `rgb(${zincColors[900]})`,
		fontSize: '1rem',
		outline: 'none',
		transition: 'all 0.2s ease'
	}

	const inputStyles: CSSProperties = {
		flex: 1,
		background: 'transparent',
		border: 'none',
		outline: 'none',
		color: 'inherit',
		fontSize: 'inherit',
		padding: 0
	}

	const focusRingStyles = error
		? 'ring-2 ring-red-500'
		: `ring-2 ring-[rgb(${appleBlue})]`

	const placeholderClass = isDark
		? 'placeholder:text-zinc-600'
		: 'placeholder:text-zinc-400'

	// Focus ring placement logic:
	// - ReactNode label: ring on wrapper div
	// - String label or no label: ring on input element
	const wrapperClasses =
		hasReactNodeLabel && isFocused
			? `${focusRingStyles} ${className}`
			: className

	const inputClasses =
		(hasStringLabel || !label) && isFocused
			? `${focusRingStyles} ${placeholderClass} ${className}`
			: `${placeholderClass} ${className}`

	const finalInputStyle = hasStringLabel || !label ? baseStyles : inputStyles

	const handleTogglePassword = (e: React.MouseEvent) => {
		e.preventDefault()
		setShowPassword(!showPassword)
	}

	const inputType = isPasswordField && showPassword ? 'text' : type

	return (
		<div style={{ width: '100%' }}>
			{hasStringLabel && (
				<label
					style={{
						display: 'block',
						marginBottom: '0.5rem',
						color: error
							? 'rgb(220, 38, 38)'
							: isDark
							? `rgb(${zincColors[400]})`
							: `rgb(${zincColors[700]})`
					}}>
					{label}
				</label>
			)}

			{hasReactNodeLabel ? (
				<div
					className={wrapperClasses}
					style={baseStyles}>
					{label}
					<input
						type={inputType}
						className={placeholderClass}
						style={inputStyles}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						{...props}
					/>
					{isPasswordField && (
						<button
							type='button'
							onClick={handleTogglePassword}
							className='flex-shrink-0'
							style={{
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								padding: '0.25rem',
								color: isDark
									? `rgb(${zincColors[400]})`
									: `rgb(${zincColors[600]})`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							aria-label={
								showPassword ? 'Hide password' : 'Show password'
							}>
							{showPassword ? (
								<EyeOff size={20} />
							) : (
								<Eye size={20} />
							)}
						</button>
					)}
				</div>
			) : (
				<div
					className='relative'
					style={{ width: '100%' }}>
					<input
						type={inputType}
						className={inputClasses}
						style={finalInputStyle}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						{...props}
					/>
					{isPasswordField && (
						<button
							type='button'
							onClick={handleTogglePassword}
							className='absolute right-3 top-1/2 -translate-y-1/2 flex-shrink-0'
							style={{
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								padding: '0.25rem',
								color: isDark
									? `rgb(${zincColors[400]})`
									: `rgb(${zincColors[600]})`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							aria-label={
								showPassword ? 'Hide password' : 'Show password'
							}>
							{showPassword ? (
								<EyeOff size={20} />
							) : (
								<Eye size={20} />
							)}
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default Input
