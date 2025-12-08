// User types

// User role types
export const UserRoles = {
	MOTORISTA: 'MOTORISTA',
	GERENTE_FROTA: 'GERENTE_FROTA',
	GERENTE_RISCO: 'GERENTE_RISCO',
	PROGRAMADOR: 'PROGRAMADOR',
	FOCAL: 'FOCAL',
	ADMIN: 'ADMIN'
} as const

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface Usuario {
	id: number
	nome: string
	email: string
	tipo?: UserRole // Role type, undefined for basic users
}

export interface CriarUsuario {
	nome: string
	email: string
	senha: string
}

// Papel base type (for inheritance)
export interface Papel extends Usuario {
	dataInicio?: string // ISO date string
	dataFim?: string // ISO date string
}
