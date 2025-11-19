import { useEffect, useRef, type ReactNode } from 'react'

interface ContainerProps {
	children: ReactNode
	className?: string
	animate?: string
}

const Container = ({ children, className = '', animate }: ContainerProps) => {
	const hasAnimated = useRef(false)

	useEffect(() => {
		hasAnimated.current = true
	}, [])

	const baseStylesContainer =
		'flex flex-col items-end min-h-[75%] gap-4 z-25 scroll-smooth'
	const baseStylesInnerSection =
		'w-full sm:w-[98%] md:w-[96%] lg:w-[95%] px-3 sm:px-5 md:px-6 py-8 mt-[55px] flex flex-col gap-6 sm:gap-8 md:gap-10 transition-colors duration-200'

	return (
		<div
			className={`${baseStylesContainer}`}
			data-aos={animate}
			data-aos-once='true'>
			<section className={`${baseStylesInnerSection} ${className}`}>
				{children}
			</section>
		</div>
	)
}

export default Container
