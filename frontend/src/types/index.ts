// Enums convertidos para const objects com as const
export const StatusFrota = {
	DISPONIVEL: 'DISPONIVEL',
	INDISPONIVEL: 'INDISPONIVEL',
	EM_MANUTENCAO: 'EM_MANUTENCAO'
} as const

export type StatusFrota = (typeof StatusFrota)[keyof typeof StatusFrota]

export const StatusMotorista = {
	ATIVO: 'ATIVO',
	INATIVO: 'INATIVO',
	FERIAS: 'FERIAS',
	AFASTADO: 'AFASTADO'
} as const

export type StatusMotorista =
	(typeof StatusMotorista)[keyof typeof StatusMotorista]

export const CategoriasMotorista = {
	A: 'A',
	B: 'B',
	C: 'C',
	D: 'D',
	E: 'E'
} as const

export type CategoriasMotorista =
	(typeof CategoriasMotorista)[keyof typeof CategoriasMotorista]

export const StatusPedido = {
	ABERTO: 'ABERTO',
	EM_ANDAMENTO: 'EM_ANDAMENTO',
	CONCLUIDO: 'CONCLUIDO',
	CANCELADO: 'CANCELADO'
} as const

export type StatusPedido = (typeof StatusPedido)[keyof typeof StatusPedido]

export const TiposCarga = {
	CONTAINER: 'CONTAINER',
	SOLTA: 'SOLTA'
} as const

export type TiposCarga = (typeof TiposCarga)[keyof typeof TiposCarga]

export const TiposOperacao = {
	REDEX: 'REDEX',
	RODOV: 'RODOVIÁRIO',
	VAZIO: 'VAZIO',
	'TERC. REDEX': 'TERC. REDEX',
	'TERC. VAZIO': 'TERC. VAZIO',
	'TERC. DEPOT': 'TERC. DEPOT',
	'TERC. RODOV': 'TERC. RODOVIÁRIO'
} as const

export type TiposOperacao = (typeof TiposOperacao)[keyof typeof TiposOperacao]

// DTOs
export interface ClienteDTO {
	id: number
	nome: string
	email: string
	cpf?: string | null
	cnpj?: string | null
}

export interface ClienteCreateDTO {
	nome: string
	email: string
	cpf?: string | null
	cnpj?: string | null
}

export interface FrotaDTO {
	id: number
	placa: string
	status: StatusFrota
	motoristaId?: number | null
}

export interface FrotaCreateDTO {
	placa: string
	status: StatusFrota
}

export interface MotoristaDTO {
	id: number
	nome: string
	email: string
	dataInicio?: string | null
	dataFim?: string | null
	categoria: CategoriasMotorista
	status: StatusMotorista
	frotaId?: number | null
}

export interface MotoristaCreateDTO {
	nome: string
	email: string
	senha: string
	dataInicio?: string | null
	dataFim?: string | null
	categoria: CategoriasMotorista
	status: StatusMotorista
	frotaId?: number | null
}

export interface PedidoDTO {
	id: number
	dataExecucao?: string | null
	tipoCarga: TiposCarga
	numContainer?: string | null
	qtdCarretas: number
	tipoOperacao: TiposOperacao
	statusPedido: StatusPedido
	focalId?: number | null
	programadorId?: number | null
	gerenteInicializadorId?: number | null
	gerenteRevisorId?: number | null
	gerenteRiscoId?: number | null
	motoristaId?: number | null
	clienteId: number
}

export interface PedidoCreateDTO {
	dataExecucao?: string | null
	tipoCarga: TiposCarga
	numContainer?: string | null
	qtdCarretas: number
	tipoOperacao: TiposOperacao
	statusPedido: StatusPedido
	focalId?: number | null
	programadorId?: number | null
	gerenteInicializadorId?: number | null
	gerenteRevisorId?: number | null
	gerenteRiscoId?: number | null
	motoristaId?: number | null
	clienteId: number
}

// User types
export const UserRole = {
	CLIENTE: 'CLIENTE',
	MOTORISTA: 'MOTORISTA',
	FOCAL: 'FOCAL',
	PROGRAMADOR: 'PROGRAMADOR',
	GERENTE_FROTA: 'GERENTE_FROTA',
	GERENTE_RISCO: 'GERENTE_RISCO',
	ADMIN: 'ADMIN'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export interface BaseUserDTO {
	id: number
	nome: string
	email: string
	role: UserRole
}

export interface PapelUserDTO extends BaseUserDTO {
	dataInicio?: string | null
	dataFim?: string | null
}

export interface UsuarioDTO extends BaseUserDTO {
	// Additional fields specific to certain roles can be added here
}

export interface LoginDTO {
	email: string
	senha: string
}

export interface LoginResponseDTO {
	token?: string
	user: UsuarioDTO
}
