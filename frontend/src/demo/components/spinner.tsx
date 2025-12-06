import { useTheme } from '@/context/theme'

type SpinnerProps = {
	size?: number
	color?: string | null
	useContrast?: boolean
}

const Spinner = ({ size = 24, color, useContrast = false }: SpinnerProps) => {
	const { actualTheme } = useTheme()

	const defatulColor = !useContrast
		? actualTheme === 'dark'
			? 'rgb(255,255,255)'
			: 'rgb(0,0,0)'
		: actualTheme === 'dark'
		? 'rgb(0,0,0)'
		: 'rgb(255,255,255)'
	if (color === '') color = null

	return (
		<div
			className='rounded-[50%] border-[2px] border-t-black box-border animate-spin'
			style={{
				width: `${size}px`,
				height: `${size}px`,
				borderColor: !color ? defatulColor : color,
				borderTopColor: 'transparent'
			}}></div>
	)
}

export default Spinner
