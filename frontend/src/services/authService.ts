import api from './api'
import type { LoginDTO, LoginResponseDTO, UsuarioDTO } from '../types/index'

export const authService = {
	// Login
	login: async (credentials: LoginDTO): Promise<LoginResponseDTO> => {
		const response = await api.post<LoginResponseDTO>(
			'/auth/login',
			credentials
		)
		return response.data
	},

	// Obter dados do usuário atual
	getCurrentUser: async (): Promise<UsuarioDTO> => {
		const response = await api.get<UsuarioDTO>('/auth/me')
		return response.data
	},

	// Logout (se houver endpoint no backend)
	logout: async (): Promise<void> => {
		try {
			await api.post('/auth/logout')
		} catch (error) {
			console.error('Erro ao fazer logout no backend:', error)
		}
	},

	// Verificar se o token ainda é válido
	validateToken: async (): Promise<boolean> => {
		try {
			await api.get('/auth/validate')
			return true
		} catch (error) {
			return false
		}
	}
}
