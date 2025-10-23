import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import HomePage from './pages'
import CreatePedidoPage from './pages/createPedido'
import CreateUsuarioPage from './pages/admin/createUsuario'
import UsersPage from './pages/admin/users'
import CreateClientePage from './pages/createCliente'
import CreateFrotaPage from './pages/admin/createFrota'

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
				path='/usuarios'
				element={<UsersPage />}
			/>
			<Route
				path='/cadastrar-pedido'
				element={<CreatePedidoPage />}
			/>
			<Route
				path='/admin/cadastrar-usuario'
				element={<CreateUsuarioPage />}
			/>
			<Route
				path='/cadastrar-cliente'
				element={<CreateClientePage />}
			/>
			<Route
				path='/admin/cadastrar-frota'
				element={<CreateFrotaPage />}
			/>
		</Routes>
	)
}

const sidebarRoutesPerRole = {
	FOCAL: {
		Dashboard: '/dashboard',
		'Cadastrar cliente': '/cadastrar-cliente'
	},
	PROGRAMADOR: {
		Dashboard: '/dashboard'
	},
	GERENTE_FROTA: {
		Dashboard: '/dashboard',
		Usuários: '/usuarios',
		'Cadastrar frota': '/admin/cadastrar-frota',
		'Cadastrar cliente': '/cadastrar-cliente'
	},
	ADMIN: {
		Dashboard: '/dashboard',
		Usuários: '/usuarios',
		'Cadastrar Usuário': '/admin/cadastrar-usuario',
		'Cadastrar cliente': '/cadastrar-cliente',
		'Cadastrar frota': '/admin/cadastrar-frota'
	}
}

export { sidebarRoutesPerRole }
export default AppRoutes
