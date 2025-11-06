// Cliente types
export interface Cliente {
	id: number
	name: string
	cpfCnpj: string
	email: string
	telefone: string
}

export interface CriarCliente {
	name: string
	cpfCnpj: string
	email: string
	telefone: string
}
