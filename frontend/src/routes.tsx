import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import HomePage from './pages'

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<HomePage />}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
		</Routes>
	)
}

export default AppRoutes
