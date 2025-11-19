import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar'
import ScrollToTop from './components/scrollToTop'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TopBar from './components/topbar'
import { ToggleButton, useTheme } from './context/theme'
import { useUser } from './context/user'
import Spinner from './components/spinner'
import { Bell } from 'lucide-react'
import AppRoutes from './utils/routes'
import Toast from './components/toast'

const App = () => {
	const location = useLocation()
	const noSidebarRoutes = ['/', '/signin']
	const { isCheckingSession } = useUser()
	const { actualTheme } = useTheme()

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

	// Show loading spinner while checking session
	if (isCheckingSession) {
		return (
			<div className='flex items-center justify-center min-h-[100dvh]'>
				<Spinner />
			</div>
		)
	}

	return (
		<div className='font-poppins overflow-y-hidden'>
			<Toast.Toast />
			{!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
			{!noSidebarRoutes.includes(location.pathname) && (
				<TopBar>
					<button
						type='button'
						className={`relative flex justify-center items-center gap-3 px-4 py-3 rounded-lg transition-colors border
							focus:outline-none focus:ring-2 focus:ring-red-500 ${
								actualTheme === 'dark'
									? 'border-gray-600'
									: 'border-gray-300'
							}`}>
						<Bell size={25} />
						<div className='absolute top-2 right-3 flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-xs text-white font-medium'>
							+5
						</div>
					</button>
					<ToggleButton />
				</TopBar>
			)}
			<AppRoutes />
			<ScrollToTop />
		</div>
	)
}

export default App
