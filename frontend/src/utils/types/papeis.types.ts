// Roles types (Gerentes, Programador, Focal)
import type { Papel } from './user.types'

// GerenteFrota
export interface GerenteFrota extends Papel {}

export interface CriarGerenteFrota {
	name: string
	email: string
	password: string
	dataInicio?: string
	dataFim?: string
}

// GerenteRisco
export interface GerenteRisco extends Papel {}

export interface CriarGerenteRisco {
	name: string
	email: string
	password: string
	dataInicio?: string
	dataFim?: string
}

// Programador
export interface Programador extends Papel {}

export interface CriarProgramador {
	name: string
	email: string
	password: string
	dataInicio?: string
	dataFim?: string
}

// Focal
export interface Focal extends Papel {}

export interface CriarFocal {
	name: string
	email: string
	password: string
	dataInicio?: string
	dataFim?: string
}
