export const RoutesPerRole = {
	FOCAL: {
		Dashboard: '/dashboard',
		'Criar pedido': '/cadastrar-pedido',
		'Cadastrar cliente': '/clientes/novo',
		Clientes: '/clientes',
		Frota: '/admin/frotas'
	},
	PROGRAMADOR: {
		'Editar pedido': '/pedidos/editar/:id',
		Dashboard: '/dashboard',
		Clientes: '/clientes',
		Frota: '/admin/frotas'
	},
	GERENTE_FROTA: {
		Dashboard: '/dashboard',
		Usuários: '/admin/usuarios',
		Clientes: '/clientes',
		Frota: '/admin/frotas',
		'Criar pedido': '/cadastrar-pedido',
		'Cadastrar usuário': '/admin/cadastrar-usuario',
		'Cadastrar cliente': '/clientes/cadastrar-cliente',
		'Cadastrar frota': '/admin/cadastrar-frota'
	},
	ADMIN: {
		Dashboard: '/dashboard',
		Usuários: '/admin/usuarios',
		Clientes: '/clientes',
		Frota: '/admin/frotas',
		'Criar pedido': '/cadastrar-pedido',
		'Cadastrar usuário': '/admin/cadastrar-usuario',
		'Cadastrar cliente': '/clientes/cadastrar-cliente',
		'Cadastrar frota': '/admin/cadastrar-frota'
	}
}
