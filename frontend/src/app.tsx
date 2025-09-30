import { useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar'
import AppRoutes from './routes'

const App = () => {
	const location = useLocation()
	const noSidebarRoutes = ['/', '/login']

	return (
		<div className='font-poppins'>
			{!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
			<AppRoutes />
		</div>
	)
}

export default App
