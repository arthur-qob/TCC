// Re-export all types from individual modules
export * from './auth.types'
export * from './user.types'
export * from './cliente.types'
export * from './motorista.types'
export * from './frota.types'
export * from './rota.types'
export * from './pedido.types'
export * from './carga.types'
export * from './papeis.types'

export interface ApiError {
	message: string
	status?: number
	errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
	content: T[]
	page: number
	size: number
	totalElements: number
	totalPages: number
}

export type ID = number | string

export interface SelectOption {
	value: string | number
	label: string
}
