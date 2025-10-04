import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar'
import ScrollToTop from './components/ScrollToTop'
import AppRoutes from './routes'
import AOS from 'aos'
import 'aos/dist/aos.css'

const App = () => {
	const location = useLocation()
	const noSidebarRoutes = ['/', '/login']

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		})
	}, [])

	useEffect(() => {
		AOS.refresh()
	}, [location.pathname])

	return (
		<div className='font-poppins'>
			{!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
			<AppRoutes />
			<ScrollToTop />
		</div>
	)
}

export default App
