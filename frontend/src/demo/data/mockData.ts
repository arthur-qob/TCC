import type { Cliente } from '@/utils/types/cliente.types'
import type { Pedido } from '@/utils/types/pedido.types'
import type { Usuario } from '@/utils/types/user.types'
import {
	StatusPedido,
	TipoCarga,
	TipoOperacao
} from '@/utils/types/pedido.types'
import { UserRoles } from '@/utils/types/user.types'

// Mock Clientes Data
export const mockClientes: Cliente[] = [
	{
		id: 1,
		nome: 'João Silva',
		cpfCnpj: '123.456.789-00',
		email: 'joao.silva@exemplo.com',
		telefone: '(11) 98765-4321',
		observacoes: 'Cliente preferencial'
	},
	{
		id: 2,
		nome: 'Maria Santos',
		cpfCnpj: '987.654.321-00',
		email: 'maria.santos@exemplo.com',
		telefone: '(21) 91234-5678',
		observacoes: ''
	},
	{
		id: 3,
		nome: 'Empresa XYZ Ltda',
		cpfCnpj: '12.345.678/0001-90',
		email: 'contato@empresaxyz.com',
		telefone: '(11) 3456-7890',
		observacoes: 'Cliente corporativo'
	},
	{
		id: 4,
		nome: 'Pedro Oliveira',
		cpfCnpj: '456.789.123-00',
		email: 'pedro.oliveira@exemplo.com',
		telefone: '(31) 99876-5432'
	},
	{
		id: 5,
		nome: 'Tech Solutions SA',
		cpfCnpj: '98.765.432/0001-10',
		email: 'vendas@techsolutions.com',
		telefone: '(41) 3333-4444',
		observacoes: 'Parceiro estratégico'
	}
]

// Mock Usuários Data
export const mockUsuarios: Usuario[] = [
	{
		idUser: 1,
		name: 'Admin Sistema',
		email: 'admin@sistema.com',
		tipo: UserRoles.ADMIN
	},
	{
		idUser: 2,
		name: 'Carlos Programador',
		email: 'carlos.prog@sistema.com',
		tipo: UserRoles.PROGRAMADOR
	},
	{
		idUser: 3,
		name: 'Ana Gerente Frota',
		email: 'ana.frota@sistema.com',
		tipo: UserRoles.GERENTE_FROTA
	},
	{
		idUser: 4,
		name: 'Roberto Gerente Risco',
		email: 'roberto.risco@sistema.com',
		tipo: UserRoles.GERENTE_RISCO
	},
	{
		idUser: 5,
		name: 'José Motorista',
		email: 'jose.motorista@sistema.com',
		tipo: UserRoles.MOTORISTA
	},
	{
		idUser: 6,
		name: 'Focal Principal',
		email: 'focal@sistema.com',
		tipo: UserRoles.FOCAL
	}
]

// Mock Pedidos Data
export const mockPedidos: Pedido[] = [
	{
		id: 1,
		dataCriacao: '2024-01-15',
		dataExecucao: '2024-01-20',
		tipoCarga: TipoCarga.CONTAINER,
		numContainer: 'CONT123456',
		qtdCarretas: 2,
		tipoOperacao: TipoOperacao.REDEX,
		statusPedido: StatusPedido.APROVADO,
		focalId: 6,
		programadorId: 2,
		gerenteFrotaId: 3,
		gerenteRiscoId: 4,
		motoristaId: 5,
		clienteId: 1
	},
	{
		id: 2,
		dataCriacao: '2024-01-16',
		dataExecucao: '2024-01-22',
		tipoCarga: TipoCarga.CARGA_SOLTA,
		qtdCarretas: 1,
		tipoOperacao: TipoOperacao.RODOV,
		statusPedido: StatusPedido.PENDENTE,
		focalId: 6,
		programadorId: 2,
		gerenteFrotaId: 3,
		gerenteRiscoId: 4,
		clienteId: 2
	},
	{
		id: 3,
		dataCriacao: '2024-01-17',
		dataExecucao: '2024-01-25',
		tipoCarga: TipoCarga.FRIGORIFICA,
		numContainer: 'REFR789012',
		qtdCarretas: 3,
		tipoOperacao: TipoOperacao['TERC. REDEX'],
		statusPedido: StatusPedido.EM_ANDAMENTO,
		focalId: 6,
		programadorId: 2,
		gerenteFrotaId: 3,
		gerenteRiscoId: 4,
		motoristaId: 5,
		clienteId: 3
	},
	{
		id: 4,
		dataCriacao: '2024-01-18',
		dataExecucao: '2024-01-24',
		tipoCarga: TipoCarga.GRANEL,
		qtdCarretas: 2,
		tipoOperacao: TipoOperacao.VAZIO,
		statusPedido: StatusPedido.CONCLUIDO,
		focalId: 6,
		programadorId: 2,
		gerenteFrotaId: 3,
		gerenteRiscoId: 4,
		motoristaId: 5,
		clienteId: 4
	},
	{
		id: 5,
		dataCriacao: '2024-01-19',
		dataExecucao: '2024-01-28',
		tipoCarga: TipoCarga.CONTAINER,
		numContainer: 'CONT456789',
		qtdCarretas: 1,
		tipoOperacao: TipoOperacao['TERC. DEPOT'],
		statusPedido: StatusPedido.CANCELADO,
		focalId: 6,
		programadorId: 2,
		gerenteFrotaId: 3,
		gerenteRiscoId: 4,
		clienteId: 5
	}
]

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
