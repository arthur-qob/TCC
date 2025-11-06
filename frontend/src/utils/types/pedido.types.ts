// Pedido types
export const TipoCarga = {
	CONTAINER: 'CONTAINER',
	CARGA_SOLTA: 'CARGA_SOLTA',
	GRANEL: 'GRANEL',
	FRIGORIFICA: 'FRIGORIFICA'
} as const

export type TipoCarga = (typeof TipoCarga)[keyof typeof TipoCarga]

export const TipoOperacao = {
	IMPORTACAO: 'IMPORTACAO',
	EXPORTACAO: 'EXPORTACAO',
	CABOTAGEM: 'CABOTAGEM',
	TRANSBORDO: 'TRANSBORDO'
} as const

export type TipoOperacao = (typeof TipoOperacao)[keyof typeof TipoOperacao]

export const StatusPedido = {
	PENDENTE: 'PENDENTE',
	APROVADO: 'APROVADO',
	EM_ANDAMENTO: 'EM_ANDAMENTO',
	CONCLUIDO: 'CONCLUIDO',
	CANCELADO: 'CANCELADO'
} as const

export type StatusPedido = (typeof StatusPedido)[keyof typeof StatusPedido]
export interface Pedido {
	id: number
	dataExecucao: string // ISO date string
	tipoCarga: TipoCarga
	numContainer?: string
	qtdCarretas: number
	tipoOperacao: TipoOperacao
	statusPedido: StatusPedido
	focalId: number
	programadorId: number
	gerenteFrotaId: number
	gerenteRiscoId: number
	motoristaId: number
	clienteId: number
}

export interface CriarPedido {
	dataExecucao: string
	tipoCarga: TipoCarga
	numContainer?: string
	qtdCarretas: number
	tipoOperacao: TipoOperacao
	statusPedido: StatusPedido
	focalId: number
	programadorId: number
	gerenteFrotaId: number
	gerenteRiscoId: number
	motoristaId: number
	clienteId: number
}
