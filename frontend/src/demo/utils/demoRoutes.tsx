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
import EditFrotaPage from '../pages/admin/editFrota'
import SignInPageDemo from '../pages/signin'
import EditPedidoPage from '../pages/editPedido'
import RelatoriosPage from '../pages/relatorios'

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
				path='/demo/admin/cadastrar-usuario'
				element={<CreateUsuarioPage />}
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
				path='/demo/pedidos/novo'
				element={<CreatePedidoPage />}
			/>
			<Route
				path='/demo/pedidos/editar/:id'
				element={<EditPedidoPage />}
			/>
			<Route
				path='/demo/admin/frotas'
				element={<FrotasPage />}
			/>
			<Route
				path='/demo/admin/frotas/novo'
				element={<CreateFrotaPage />}
			/>
			<Route
				path='/demo/admin/frotas/editar/:id'
				element={<EditFrotaPage />}
			/>
			<Route
				path='/demo/admin/usuarios'
				element={<UsersPage />}
			/>
			<Route
				path='/demo/relatorios'
				element={<RelatoriosPage />}
			/>
		</Routes>
	)
}

const sidebarRoutesPerRole = {
	FOCAL: {
		Dashboard: '/demo/dashboard',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas',
		Relatórios: '/demo/relatorios'
	},
	PROGRAMADOR: {
		Dashboard: '/demo/dashboard',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas',
		Relatórios: '/demo/relatorios'
	},
	GERENTE_FROTA: {
		Dashboard: '/demo/dashboard',
		Usuários: '/demo/admin/usuarios',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas',
		Relatórios: '/demo/relatorios'
	},
	ADMIN: {
		Dashboard: '/demo/dashboard',
		Usuários: '/demo/admin/usuarios',
		Clientes: '/demo/clientes',
		Frotas: '/demo/admin/frotas',
		Relatórios: '/demo/relatorios'
	}
}

export { sidebarRoutesPerRole }
export default DemoRoutes
