import type { LoginRequest, SignupRequest } from '../utils/types/auth.types'
import type { Usuario } from '../utils/types/user.types'
import { api } from '../utils/api'

export const authService = {
	async signin(credentials: LoginRequest): Promise<Usuario> {
		const response = await api.post<Usuario>('/auth/signin', credentials)
		return response.data
	},

	async signup(data: SignupRequest): Promise<Usuario> {
		const response = await api.post<Usuario>('/auth/signup', data)
		return response.data
	},

	async logout(): Promise<void> {
		await api.post('/auth/logout')
	},

	async getCurrentUser(): Promise<Usuario> {
		const response = await api.get<Usuario>('/auth/me')
		return response.data
	}
}
