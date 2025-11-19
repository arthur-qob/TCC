import {
	Route,
	Routes,
	Navigate,
	useNavigate,
	useLocation
} from 'react-router-dom'
import SignIn from '../pages/signin'
import HomePage from '../pages/index'
import CreatePedidoPage from '../pages/createPedido'
import CreateUsuarioPage from '../pages/admin/createUsuario'
import UsersPage from '../pages/admin/viewUsuarios'
import CreateClientePage from '../pages/createCliente'
import CreateFrotaPage from '../pages/admin/createFrota'

import { useUser } from '../context/user'
import { UserRoles, type UserRole, type Usuario } from '../utils/types'

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

import { RoutesPerRole } from '@/utils/rolesRoutes'
import toast from '@/components/toast'
import ClientesPage from '@/pages/viewClientes'
import FrotasPage from '@/pages/viewFrotas'
import RotasPage from '@/pages/viewRotas'

const checkRoutePermissions = (userType: UserRole, route: string) => {
	const allowedRoutes = Object.values(
		RoutesPerRole[userType as keyof typeof RoutesPerRole] || {}
	)

	if (route === '/signin') {
		return true
	} else {
		return allowedRoutes.includes(route)
	}
}

const usePermissionNavigate = () => {
	const nav = useNavigate()
	const location = useLocation()
	const currentPath = location.pathname
	const { user } = useUser()

	const navigate = (route: string, user2?: Usuario) => {
		const userTipo = user ? user.tipo : user2?.tipo

		if (userTipo) {
			checkRoutePermissions(userTipo, route)
				? nav(route)
				: toast.emitToast({
						type: 'error',
						message:
							'Você não tem permissão para acessar esta rota.'
				  })
		} else {
			console.log(
				'User type undefined, navigating to current path:',
				currentPath
			)
			nav(currentPath)
		}
	}

	return navigate
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
				path='/clientes'
				element={
					<ProtectedRoute>
						<ClientesPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/clientes/cadastrar-cliente'
				element={
					<AdminOnly>
						<CreateClientePage />
					</AdminOnly>
				}
			/>
			<Route
				path='/frotas'
				element={
					<ProtectedRoute>
						<FrotasPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/Rotas'
				element={
					<ProtectedRoute>
						<RotasPage />
					</ProtectedRoute>
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
				path='/pedidos/novo'
				element={<CreateClientePage />}
			/>
			<Route
				path='/pedidos/editar/:id'
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
			<Route
				path='/admin/usuarios'
				element={
					<AdminOnly>
						<UsersPage />
					</AdminOnly>
				}
			/>
		</Routes>
	)
}

const sidebarRoutesPerRole = {
	FOCAL: {
		Dashboard: '/dashboard',
		Clientes: '/clientes',
		Frotas: '/admin/frotas'
	},
	PROGRAMADOR: {
		Dashboard: '/dashboard',
		Clientes: '/clientes',
		Frotas: '/admin/frotas'
	},
	GERENTE_FROTA: {
		Dashboard: '/dashboard',
		Usuários: '/admin/usuarios',
		Clientes: '/clientes',
		Frotas: '/admin/frotas'
	},
	ADMIN: {
		Dashboard: '/dashboard',
		Usuários: '/admin/usuarios',
		Clientes: '/clientes',
		Frotas: '/admin/frotas'
	}
}

export { sidebarRoutesPerRole, usePermissionNavigate }
export default AppRoutes
