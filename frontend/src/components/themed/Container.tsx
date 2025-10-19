import { type ReactNode } from 'react'
import { useTheme } from '../../context/theme'

interface ContainerProps {
	children: ReactNode
	classNameContainer?: string
	classNameInnerSection?: string
}

const Container = ({
	children,
	classNameContainer = '',
	classNameInnerSection = ''
}: ContainerProps) => {
	const { actualTheme } = useTheme()

	const baseStylesContainer = 'flex flex-col items-end min-h-screen gap-4'
	const baseStylesInnerSection =
		'w-[95%] px-5 py-8 flex flex-col gap-10 transition-colors duration-200'
	const themeStyles = actualTheme === 'dark' ? 'bg-black' : 'bg-gray-100'

	return (
		<div
			className={`${baseStylesContainer} ${themeStyles} ${classNameContainer}`}>
			<section
				className={`${baseStylesInnerSection} ${classNameInnerSection}`}
				data-aos='fade-up'>
				{children}
			</section>
		</div>
	)
}

export default Container
