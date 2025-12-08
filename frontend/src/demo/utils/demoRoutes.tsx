import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../pages'
import UsersPage from '../pages/admin/viewUsuarios'
import ClientesPage from '../pages/viewClientes'
import CreateClientePage from '../pages/createCliente'
import FrotasPage from '../pages/viewFrotas'
import RotasPage from '../pages/viewRotas'
import CreatePedidoPage from '../pages/createPedido'
import CreateUsuarioPage from '../pages/admin/createUsuario'
import CreateFrotaPage from '../pages/admin/createFrota'
import SignInPageDemo from '../pages/signin'
import EditPedidoPage from '../pages/editPedido'

const DemoRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Navigate
						to='/demo/signin'
						replace
					/>
				}
			/>
			<Route
				path='/demo/signin'
				element={<SignInPageDemo />}
			/>
			<Route
				path='/demo/dashboard'
				element={<HomePage />}
			/>
			<Route
				path='/demo/admin/usuarios'
				element={<UsersPage />}
			/>
			<Route
				path='/demo/clientes'
				element={<ClientesPage />}
			/>
			<Route
				path='/demo/clientes/cadastrar-cliente'
				element={<CreateClientePage />}
			/>
			<Route
				path='/demo/frotas'
				element={<FrotasPage />}
			/>
			<Route
				path='/demo/rotas'
				element={<RotasPage />}
			/>
			<Route
				path='/demo/admin/cadastrar-usuario'
				element={<CreateUsuarioPage />}
			/>
			<Route
				path='/demo/pedidos/novo'
				element={<CreatePedidoPage />}
			/>
			<Route
				path='/demo/pedidos/editar/:id'
				element={<EditPedidoPage />}
			/>
			<Route
				path='/demo/admin/cadastrar-frota'
				element={<CreateFrotaPage />}
			/>
			<Route
				path='/demo/admin/usuarios'
				element={<UsersPage />}
			/>
		</Routes>
	)
}

const sidebarRoutesPerRole = {
	FOCAL: {
		Dashboard: '/demo/dashboard',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas'
	},
	PROGRAMADOR: {
		Dashboard: '/demo/dashboard',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas'
	},
	GERENTE_FROTA: {
		Dashboard: '/demo/dashboard',
		Usuários: '/demo/admin/usuarios',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas'
	},
	ADMIN: {
		Dashboard: '/demo/dashboard',
		Usuários: '/demo/admin/usuarios',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas'
	}
}

export { sidebarRoutesPerRole }
export default DemoRoutes
