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
	// Admin
	createAdmin: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/api/admins', data)
		return response.data
	},

	// Programador
	createProgramador: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/api/programadores', data)
		return response.data
	},

	// Motorista
	createMotorista: async (data: CreateMotoristaDTO) => {
		const response = await api.post('/api/motoristas', data)
		return response.data
	},

	// Gerente de Frota
	createGerenteFrota: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/api/gerentes-frota', data)
		return response.data
	},

	// Gerente de Risco
	createGerenteRisco: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/api/gerentes-risco', data)
		return response.data
	},

	// Focal
	createFocal: async (data: CreateUserBaseDTO) => {
		const response = await api.post('/api/focais', data)
		return response.data
	}
}
