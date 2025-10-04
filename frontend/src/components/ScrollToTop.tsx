import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { useTheme } from '../context/theme'

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)
	const { actualTheme } = useTheme()
	const isDark = actualTheme === 'dark'

	useEffect(() => {
		const toggleVisibility = () => {
			// Check if page height exceeds window height and user has scrolled down
			const hasScroll =
				document.documentElement.scrollHeight > window.innerHeight
			const isScrolled = window.scrollY > 300

			setIsVisible(hasScroll && isScrolled)
		}

		// Check on mount
		toggleVisibility()

		// Add scroll listener
		window.addEventListener('scroll', toggleVisibility)
		window.addEventListener('resize', toggleVisibility)

		return () => {
			window.removeEventListener('scroll', toggleVisibility)
			window.removeEventListener('resize', toggleVisibility)
		}
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		<button
			onClick={scrollToTop}
			className='fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110'
			style={{
				backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
				border: `2px solid ${isDark ? '#444' : '#e5e5e5'}`,
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
				pointerEvents: isVisible ? 'auto' : 'none'
			}}
			aria-label='Scroll to top'>
			<ChevronUp
				size={24}
				style={{
					color: isDark ? '#ffffff' : '#000000'
				}}
			/>
		</button>
	)
}

export default ScrollToTop
