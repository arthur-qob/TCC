import { Route, Routes, Navigate } from 'react-router-dom'
import SignIn from '../pages/signin'
import HomePage from '../pages/index'
import CreatePedidoPage from '../pages/createPedido'
import CreateUsuarioPage from '../pages/admin/createUsuario'
import UsersPage from '../pages/admin/users'
import CreateClientePage from '../pages/createCliente'
import CreateFrotaPage from '../pages/admin/createFrota'

import { useUser } from '../context/user'
import { UserRoles } from '../utils/types'

interface ProtectedRouteProps {
	children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useUser()

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/signin'
				replace
			/>
		)
	}

	return <>{children}</>
}

interface AdminOnlyProps {
	children: React.ReactNode
}

const AdminOnly = ({ children }: AdminOnlyProps) => {
	const { user } = useUser()

	const hasAdminAccess =
		user?.tipo === UserRoles.GERENTE_FROTA || user?.tipo === UserRoles.ADMIN

	if (!hasAdminAccess) {
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		)
	}

	return (
		<>
			<ProtectedRoute>{children}</ProtectedRoute>
		</>
	)
}

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Navigate
						to='/signin'
						replace
					/>
				}
			/>
			<Route
				path='/signin'
				element={<SignIn />}
			/>
			<Route
				path='/dashboard'
				element={
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/usuarios'
				element={
					<AdminOnly>
						<UsersPage />
					</AdminOnly>
				}
			/>
			<Route
				path='/cadastrar-pedido'
				element={
					<ProtectedRoute>
						<CreatePedidoPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/admin/cadastrar-usuario'
				element={
					<AdminOnly>
						<CreateUsuarioPage />
					</AdminOnly>
				}
			/>
			<Route
				path='/cadastrar-cliente'
				element={<CreateClientePage />}
			/>
			<Route
				path='/admin/cadastrar-frota'
				element={
					<AdminOnly>
						<CreateFrotaPage />
					</AdminOnly>
				}
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
