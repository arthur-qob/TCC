import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import HomePage from './pages'
import CreatePedidoPage from './pages/createPedido'
import CreateUsuarioPage from './pages/admin/createUsuario'

// Fazer função que verifica o papel (role) do usuário
// Fazer função que verifica se o usuário está logado

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Navigate
						to='/login'
						replace
					/>
				}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
			<Route
				path='/dashboard'
				element={<HomePage />}
			/>
			<Route
				path='/cadastrar-pedido'
				element={<CreatePedidoPage />}
			/>
			<Route
				path='/admin/cadastrar-usuario'
				element={<CreateUsuarioPage />}
			/>
		</Routes>
	)
}

export default AppRoutes
