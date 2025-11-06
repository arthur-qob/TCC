// Carga types
export const TipoCargaEnum = {
	PERECIVEL: 'PERECIVEL',
	NAO_PERECIVEL: 'NAO_PERECIVEL',
	PERIGOSA: 'PERIGOSA',
	FRAGIL: 'FRAGIL'
} as const

export type TipoCargaEnum = (typeof TipoCargaEnum)[keyof typeof TipoCargaEnum]
export interface Carga {
	id: number
	descricao: string
	peso: number
	tipo: TipoCargaEnum
}

export interface CriarCarga {
	descricao: string
	peso: number
	tipo: TipoCargaEnum
}

// CargaSolta
export interface CargaSolta extends Carga {
	numNotaFiscal: number
	valorMercadoria: number
}

export interface CriarCargaSolta extends CriarCarga {
	numNotaFiscal: number
	valorMercadoria: number
}

// Container
export const TipoContainer = {
	DRY_20: 'DRY_20',
	DRY_40: 'DRY_40',
	REEFER_20: 'REEFER_20',
	REEFER_40: 'REEFER_40',
	OPEN_TOP: 'OPEN_TOP',
	FLAT_RACK: 'FLAT_RACK'
} as const

export type TipoContainer = (typeof TipoContainer)[keyof typeof TipoContainer]
export interface Container extends Carga {
	numeroContainer: string
	tipoContainer: TipoContainer
	lacre: string
}

export interface CriarContainer extends CriarCarga {
	numeroContainer: string
	tipoContainer: TipoContainer
	lacre: string
}
