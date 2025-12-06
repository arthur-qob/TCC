import { useTheme } from '@/context/theme'

interface TopBarProps {
	children?: React.ReactNode
}

const TopBar = ({ children }: TopBarProps) => {
	const { actualTheme } = useTheme()

	return (
		<section
			className={`fixed p-2 w-full border-b flex flex-row justify-end items-center gap-2 sm:gap-3 md:gap-5 shadow-xl z-30 ${
				actualTheme === 'dark'
					? 'bg-[rgb(42,42,42)] border-b-[rgb(42,42,42)] text-white'
					: 'bg-white border-b-gray-300'
			}`}>
			{children}
		</section>
	)
}

export default TopBar
