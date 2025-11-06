// Frota types
export const StatusFrota = {
	DISPONIVEL: 'DISPONIVEL',
	EM_USO: 'EM_USO',
	MANUTENCAO: 'MANUTENCAO',
	INATIVA: 'INATIVA'
} as const

export const TipoFrota = {
	BITREM: 'BITREM'
} as const

export type StatusFrota = (typeof StatusFrota)[keyof typeof StatusFrota]
export type TipoFrota = (typeof TipoFrota)[keyof typeof TipoFrota]
export interface Frota {
	id: number
	placa: string
	modelo: string
	status: StatusFrota
	motoristaId?: number
}

export interface CriarFrota {
	placa: string
	modelo: string
	status: StatusFrota
	motoristaId?: number
}
