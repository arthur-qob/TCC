// Authentication types
import type { Usuario, UserRole } from './user.types'

export interface LoginRequest {
	email: string
	password: string
}

export interface SignupRequest {
	name: string
	email: string
	password: string
}

export type AuthResponse = Usuario

export interface AuthContextType {
	user: Usuario | null
	signin: (credentials: LoginRequest) => Promise<Usuario>
	signup: (data: SignupRequest) => Promise<Usuario>
	logout: () => Promise<void>
	refreshUser: () => Promise<Usuario>
	getUserRole: () => UserRole | null
	hasRole: (role: UserRole) => boolean
	isAuthenticated: boolean
	isCheckingSession: boolean
}
