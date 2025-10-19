import api from './api'
import type { FrotaDTO, FrotaCreateDTO } from '../types/index'

export const fleetService = {
	getAll: async (): Promise<FrotaDTO[]> => {
		const response = await api.get<FrotaDTO[]>('/frotas')
		return response.data
	},

	getById: async (id: number): Promise<FrotaDTO> => {
		const response = await api.get<FrotaDTO>(`/frotas/${id}`)
		return response.data
	},

	create: async (data: FrotaCreateDTO): Promise<FrotaDTO> => {
		const response = await api.post<FrotaDTO>('/frotas', data)
		return response.data
	},

	update: async (id: number, data: FrotaCreateDTO): Promise<FrotaDTO> => {
		const response = await api.put<FrotaDTO>(`/frotas/${id}`, data)
		return response.data
	},

	delete: async (id: number): Promise<void> => {
		await api.delete(`/frotas/${id}`)
	}
}
