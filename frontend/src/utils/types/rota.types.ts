// Rota types
export interface Rota {
	id: number
	origem: string
	destino: string
	distanciaKm: number
	valor: number
	clienteId: number
}

export interface CriarRota {
	origem: string
	destino: string
	distanciaKm: number
	valor: number
	clienteId: number
}
