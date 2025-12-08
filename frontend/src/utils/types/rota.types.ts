// Rota types
export interface Rota {
	id: number
	origem: string
	destino: string
	valor: number
}

export interface CriarRotaDTO {
	origem: string
	destino: string
	valor: number
}
