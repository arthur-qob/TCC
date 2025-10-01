import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import HomePage from './pages'

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Navigate to='/login' replace />}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
			<Route
				path='/dashboard'
				element={<HomePage />}
			/>
		</Routes>
	)
}

export default AppRoutes
