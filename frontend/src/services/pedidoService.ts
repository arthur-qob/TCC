import api from './api'
import type { PedidoDTO, PedidoCreateDTO } from '../types/index'

export const orderService = {
	getAll: async (): Promise<PedidoDTO[]> => {
		const response = await api.get<PedidoDTO[]>('/pedidos')
		return response.data
	},

	getById: async (id: number): Promise<PedidoDTO> => {
		const response = await api.get<PedidoDTO>(`/pedidos/${id}`)
		return response.data
	},

	create: async (data: PedidoCreateDTO): Promise<PedidoDTO> => {
		const response = await api.post<PedidoDTO>('/pedidos', data)
		return response.data
	},

	update: async (id: number, data: PedidoCreateDTO): Promise<PedidoDTO> => {
		const response = await api.put<PedidoDTO>(`/pedidos/${id}`, data)
		return response.data
	},

	delete: async (id: number): Promise<void> => {
		await api.delete(`/pedidos/${id}`)
	}
}
