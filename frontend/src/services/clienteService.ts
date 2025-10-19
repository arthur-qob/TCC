import api from './api'
import type { ClienteDTO, ClienteCreateDTO } from '../types/index'

export const clientService = {
	getAll: async (): Promise<ClienteDTO[]> => {
		const response = await api.get<ClienteDTO[]>('/clientes')
		return response.data
	},

	getById: async (id: number): Promise<ClienteDTO> => {
		const response = await api.get<ClienteDTO>(`/clientes/${id}`)
		return response.data
	},

	create: async (data: ClienteCreateDTO): Promise<ClienteDTO> => {
		const response = await api.post<ClienteDTO>('/clientes', data)
		return response.data
	},

	update: async (id: number, data: ClienteCreateDTO): Promise<ClienteDTO> => {
		const response = await api.put<ClienteDTO>(`/clientes/${id}`, data)
		return response.data
	},

	delete: async (id: number): Promise<void> => {
		await api.delete(`/clientes/${id}`)
	}
}
