// Cliente types
export interface Cliente {
	id: number
	nome: string
	cpfCnpj: string
	email: string
	telefone?: string
	observacoes?: string
}

export interface CriarClienteBaseDTO {
	nome: string
	email: string
	cpf?: string
	cnpj?: string
	telefone?: string
	observacoes?: string
}
