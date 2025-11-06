// Motorista types
import type { Papel } from './user.types'

export const CategoriasMotorista = {
	A: 'A',
	B: 'B',
	C: 'C',
	D: 'D',
	E: 'E',
	AB: 'AB',
	AC: 'AC',
	AD: 'AD',
	AE: 'AE'
} as const

export type CategoriasMotorista =
	(typeof CategoriasMotorista)[keyof typeof CategoriasMotorista]

export const StatusMotorista = {
	ATIVO: 'ATIVO',
	INATIVO: 'INATIVO',
	FERIAS: 'FERIAS',
	AFASTADO: 'AFASTADO'
} as const

export type StatusMotorista =
	(typeof StatusMotorista)[keyof typeof StatusMotorista]

export interface Motorista extends Papel {
	categoria: CategoriasMotorista
	status: StatusMotorista
	frotaId?: number
}

export interface CriarMotorista {
	name: string
	email: string
	password: string
	dataInicio?: string
	dataFim?: string
	categoria: CategoriasMotorista
	status: StatusMotorista
	frotaId?: number
}
