import api from './api'
import type { MotoristaDTO, MotoristaCreateDTO } from '../types/index'

export const driverService = {
	getAll: async (): Promise<MotoristaDTO[]> => {
		const response = await api.get<MotoristaDTO[]>('/motoristas')
		return response.data
	},

	getById: async (id: number): Promise<MotoristaDTO> => {
		const response = await api.get<MotoristaDTO>(`/motoristas/${id}`)
		return response.data
	},

	create: async (data: MotoristaCreateDTO): Promise<MotoristaDTO> => {
		const response = await api.post<MotoristaDTO>('/motoristas', data)
		return response.data
	},

	update: async (id: number, data: MotoristaCreateDTO): Promise<MotoristaDTO> => {
		const response = await api.put<MotoristaDTO>(`/motoristas/${id}`, data)
		return response.data
	},

	delete: async (id: number): Promise<void> => {
		await api.delete(`/motoristas/${id}`)
	}
}
