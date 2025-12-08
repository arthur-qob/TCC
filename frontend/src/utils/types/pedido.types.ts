// Pedido types
export const TipoCarga = {
	CONTAINER: 'CONTAINER',
	CARGA_SOLTA: 'CARGA_SOLTA',
	GRANEL: 'GRANEL',
	FRIGORIFICA: 'FRIGORIFICA'
} as const

export type TipoCarga = (typeof TipoCarga)[keyof typeof TipoCarga]

export const TipoOperacao = {
	REDEX: 'REDEX',
	RODOV: 'RODOV',
	VAZIO: 'VAZIO',
	'TERC. REDEX': 'TERC. REDEX',
	'TERC. VAZIO': 'TERC. VAZIO',
	'TERC. DEPOT': 'TERC. DEPOT',
	'TERC. RODOV': 'TERC. RODOV'
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
	dataCriacao: string
	clienteId: number
	dataExecucao: string | null
	tipoOperacao: TipoOperacao
	tipoCarga: TipoCarga
	numContainerNotaFiscal: string | null
	qtdContaineres: number | null
	qtdCarretas: number | null
	statusPedido: StatusPedido
	observacoes?: string
	focalId: number
	gerenteRiscoId: number | null
	imo: string | null
	programadorId: number | null
	motoristaId: number | null
	rotaId: number | null
	gerenteFrotaId: number | null
}

export interface CriarPedidoDTO {
	dataExecucao: string
	tipoCarga: TipoCarga
	numContainerNotaFiscal?: string
	qtdCarretas: number
	tipoOperacao: TipoOperacao
	statusPedido: StatusPedido
	focalId: number
	programadorId: number
	gerenteFrotaId: number
	gerenteRiscoId: number
	motoristaId: number
	clienteId: number
	rotaId?: number
	observacoes?: string
}
