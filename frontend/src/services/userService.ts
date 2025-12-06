import type { CriarClienteBaseDTO, CriarPedidoDTO } from '@/utils/types'
import { api } from '../utils/api'

interface CreateUserBaseDTO {
	email: string
	name: string
	password: string
	dataInicio?: string
	dataFim?: string
}

interface CreateMotoristaDTO extends CreateUserBaseDTO {
	categoria: string
	status: string
	frotaId?: number
}

export const userService = {
	// List all users
	getAllUsers: async () => {
		const response = await api.get('/users')
		return response.data
	},

	// Delete user
	deleteUser: async (userId: number) => {
		const response = await api.delete(`/users/${userId}`)
		return response.data
	},

	// Admin
	createAdmin: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/admins', data)
		return response.data
	},

	// Programador
	createProgramador: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/programadores', data)
		return response.data
	},

	// Motorista
	createMotorista: async (data: CreateMotoristaDTO) => {
		const response = await api.post('/motoristas', data)
		return response.data
	},

	// Gerente de Frota
	createGerenteFrota: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/gerentes-frota', data)
		return response.data
	},

	// Gerente de Risco
	createGerenteRisco: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/gerentes-risco', data)
		return response.data
	},

	// Focal
	createFocal: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/focais', data)
		return response.data
	},

	// Clientes
	getAllClients: async () => {
		const response = await api.get('/clientes')
		return response.data
	},

	createCliente: async (data: CriarClienteBaseDTO) => {
		const response = await api.post('/clientes', data)

		return response
	},

	deleteCliente: async (clienteId: number) => {
		const response = await api.delete(`/clientes/${clienteId}`)
		return response.data
	},

	// Pedidos
	getAllPedidos: async () => {
		const response = await api.get('/pedidos')
		return response
	},

	getPedidoById: async (pedidoId: number) => {
		const response = await api.get(`/pedidos/${pedidoId}`)
		return response
	},

	createPedido: async (data: CriarPedidoDTO) => {
		const response = await api.post('/pedidos', data)
		return response
	},

	updatePedidoById: async (pedidoId: number, data: CriarPedidoDTO) => {
		const response = await api.put(`/pedidos/${pedidoId}`, data)
		return response
	},

	deletePedidoById: async (pedidoId: number) => {
		const response = await api.delete(`/pedidos/${pedidoId}`)
		return response
	}
}
