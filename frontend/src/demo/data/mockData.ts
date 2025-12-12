import type { Cliente } from '@/utils/types/cliente.types'
import type { Pedido } from '@/utils/types/pedido.types'
import type { Usuario } from '@/utils/types/user.types'
import {
	StatusPedido,
	TipoCarga,
	TipoOperacao
} from '@/utils/types/pedido.types'
import { UserRoles } from '@/utils/types/user.types'
import type { Rota } from '@/utils/types'

// Mock Clientes Data
export const mockClientes: Cliente[] = [
	{
		id: 1,
		nome: 'Nestlé Brasil - Três Rios',
		cpfCnpj: '60.409.075/0001-52',
		email: 'operacoes@nestle.com.br',
		telefone: '(24) 2107-5000',
		observacoes: 'Indústria alimentícia - Fábrica de café'
	},
	{
		id: 2,
		nome: 'Nissan do Brasil - Resende',
		cpfCnpj: '59.427.164/0001-59',
		email: 'logistica@nissan.com.br',
		telefone: '(24) 3381-1000',
		observacoes: 'Montadora de veículos'
	},
	{
		id: 3,
		nome: '3 Corações - Jacarepaguá',
		cpfCnpj: '17.234.428/0001-34',
		email: 'suprimentos@3coracoes.com.br',
		telefone: '(21) 2441-5000',
		observacoes: 'Indústria de café e bebidas'
	},
	{
		id: 4,
		nome: 'Coca-Cola FEMSA - Duque de Caxias',
		cpfCnpj: '33.087.684/0001-40',
		email: 'transportes@cocacolafemsa.com.br',
		telefone: '(21) 2671-9000',
		observacoes: 'Engarrafadora de bebidas'
	},
	{
		id: 5,
		nome: 'Volkswagen - São José dos Pinhais',
		cpfCnpj: '59.104.422/0001-50',
		email: 'logistica@vw.com.br',
		telefone: '(41) 3016-5000',
		observacoes: 'Montadora de veículos'
	},
	{
		id: 6,
		nome: 'Ambev - Nova Iguaçu',
		cpfCnpj: '07.526.557/0001-00',
		email: 'distribuicao@ambev.com.br',
		telefone: '(21) 2765-8000',
		observacoes: 'Cervejaria e distribuidora de bebidas'
	},
	{
		id: 7,
		nome: 'Petrobras - REDUC Duque de Caxias',
		cpfCnpj: '33.000.167/0001-01',
		email: 'operacoes.reduc@petrobras.com.br',
		telefone: '(21) 3883-3000',
		observacoes: 'Refinaria de petróleo'
	},
	{
		id: 8,
		nome: 'Embraer - São José dos Campos',
		cpfCnpj: '07.689.002/0001-89',
		email: 'suprimentos@embraer.com.br',
		telefone: '(12) 3927-1000',
		observacoes: 'Indústria aeronáutica'
	},
	{
		id: 9,
		nome: 'Gerdau - Barra Mansa',
		cpfCnpj: '33.611.500/0001-19',
		email: 'comercial@gerdau.com.br',
		telefone: '(24) 3323-5000',
		observacoes: 'Siderúrgica'
	},
	{
		id: 10,
		nome: 'Braskem - Duque de Caxias',
		cpfCnpj: '42.150.391/0001-70',
		email: 'logistica@braskem.com.br',
		telefone: '(21) 2685-9000',
		observacoes: 'Indústria petroquímica'
	}
]

// Mock Usuários Data
export const mockUsuarios: Usuario[] = [
	{
		id: 1,
		nome: 'Admin Sistema',
		email: 'admin@ziranlog.com',
		tipo: UserRoles.ADMIN
	},
	{
		id: 2,
		nome: 'Carlos Eduardo',
		email: 'carlos.eduardo@ziranlog.com',
		tipo: UserRoles.PROGRAMADOR
	},
	{
		id: 3,
		nome: 'Fábio Ramos',
		email: 'fabio.ramos@ziranlog.com',
		tipo: UserRoles.GERENTE_FROTA
	},
	{
		id: 4,
		nome: 'Roberto Lima',
		email: 'roberto.lima@ziranlog.com',
		tipo: UserRoles.GERENTE_RISCO
	},
	{
		id: 5,
		nome: 'José Carlos',
		email: 'jose.carlos@ziranlog.com',
		tipo: UserRoles.MOTORISTA
	},
	{
		id: 6,
		nome: 'Guilherme Araújo',
		email: 'guilherme.araujo@ziranlog.com',
		tipo: UserRoles.FOCAL
	},
	{
		id: 7,
		nome: 'Marco Silva',
		email: 'marco.silva@ziranlog.com',
		tipo: UserRoles.MOTORISTA
	},
	{
		id: 8,
		nome: 'Alessandro Cerqueira',
		email: 'alessandro.cerqueira@ziranlog.com',
		tipo: UserRoles.MOTORISTA
	},
	{
		id: 9,
		nome: 'Paulo Santos',
		email: 'paulo.santos@ziranlog.com',
		tipo: UserRoles.MOTORISTA
	},
	{
		id: 10,
		nome: 'Ricardo Oliveira',
		email: 'ricardo.oliveira@ziranlog.com',
		tipo: UserRoles.MOTORISTA
	},
	{
		id: 11,
		nome: 'Fernando Pinheiro',
		email: 'fernando.pinheiro@ziranlog.com',
		tipo: UserRoles.MOTORISTA
	}
]

// Mock Pedidos Data
export const mockPedidos: Pedido[] = [
	{
		id: 1,
		dataCriacao: '2024-06-01',
		clienteId: 1,
		dataExecucao: '2024-06-02',
		tipoOperacao: TipoOperacao.REDEX,
		tipoCarga: TipoCarga.CONTAINER,
		numContainerNotaFiscal: 'CONT123456',
		qtdContaineres: 2,
		qtdCarretas: 1,
		statusPedido: StatusPedido.PENDENTE,
		focalId: 6,
		gerenteRiscoId: null,
		imo: null,
		programadorId: null,
		motoristaId: null,
		rotaId: null,
		gerenteFrotaId: null
	}
]

export const mockRotas: Rota[] = [
	// Portos e Aeroportos para Clientes
	{
		id: 1,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Nestlé Brasil - Três Rios',
		valor: 450.0
	},
	{
		id: 2,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Nissan do Brasil - Resende',
		valor: 520.0
	},
	{
		id: 3,
		origem: 'Porto do Rio de Janeiro',
		destino: '3 Corações - Jacarepaguá',
		valor: 350.0
	},
	{
		id: 4,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Coca-Cola FEMSA - Duque de Caxias',
		valor: 320.0
	},
	{
		id: 5,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Volkswagen - São José dos Pinhais',
		valor: 2800.0
	},
	{
		id: 6,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Ambev - Nova Iguaçu',
		valor: 300.0
	},
	{
		id: 7,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Petrobras - REDUC Duque de Caxias',
		valor: 330.0
	},
	{
		id: 8,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Embraer - São José dos Campos',
		valor: 1600.0
	},
	{
		id: 9,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Gerdau - Barra Mansa',
		valor: 420.0
	},
	{
		id: 10,
		origem: 'Porto do Rio de Janeiro',
		destino: 'Braskem - Duque de Caxias',
		valor: 340.0
	},
	{
		id: 11,
		origem: 'Porto de Itaguaí',
		destino: 'Nestlé Brasil - Três Rios',
		valor: 480.0
	},
	{
		id: 12,
		origem: 'Porto de Itaguaí',
		destino: 'Nissan do Brasil - Resende',
		valor: 550.0
	},
	{
		id: 13,
		origem: 'Porto de Itaguaí',
		destino: '3 Corações - Jacarepaguá',
		valor: 380.0
	},
	{
		id: 14,
		origem: 'Porto de Itaguaí',
		destino: 'Coca-Cola FEMSA - Duque de Caxias',
		valor: 360.0
	},
	{
		id: 15,
		origem: 'Porto de Itaguaí',
		destino: 'Volkswagen - São José dos Pinhais',
		valor: 2900.0
	},
	{
		id: 16,
		origem: 'Porto de Itaguaí',
		destino: 'Ambev - Nova Iguaçu',
		valor: 340.0
	},
	{
		id: 17,
		origem: 'Porto de Itaguaí',
		destino: 'Petrobras - REDUC Duque de Caxias',
		valor: 370.0
	},
	{
		id: 18,
		origem: 'Porto de Itaguaí',
		destino: 'Embraer - São José dos Campos',
		valor: 1700.0
	},
	{
		id: 19,
		origem: 'Porto de Itaguaí',
		destino: 'Gerdau - Barra Mansa',
		valor: 390.0
	},
	{
		id: 20,
		origem: 'Porto de Itaguaí',
		destino: 'Braskem - Duque de Caxias',
		valor: 380.0
	},
	{
		id: 21,
		origem: 'Porto de Sepetiba',
		destino: 'Nestlé Brasil - Três Rios',
		valor: 520.0
	},
	{
		id: 22,
		origem: 'Porto de Sepetiba',
		destino: 'Nissan do Brasil - Resende',
		valor: 580.0
	},
	{
		id: 23,
		origem: 'Porto de Sepetiba',
		destino: '3 Corações - Jacarepaguá',
		valor: 400.0
	},
	{
		id: 24,
		origem: 'Porto de Sepetiba',
		destino: 'Coca-Cola FEMSA - Duque de Caxias',
		valor: 390.0
	},
	{
		id: 25,
		origem: 'Porto de Sepetiba',
		destino: 'Volkswagen - São José dos Pinhais',
		valor: 2950.0
	},
	{
		id: 26,
		origem: 'Porto de Sepetiba',
		destino: 'Ambev - Nova Iguaçu',
		valor: 370.0
	},
	{
		id: 27,
		origem: 'Porto de Sepetiba',
		destino: 'Petrobras - REDUC Duque de Caxias',
		valor: 350.0
	},
	{
		id: 28,
		origem: 'Porto de Sepetiba',
		destino: 'Embraer - São José dos Campos',
		valor: 1750.0
	},
	{
		id: 29,
		origem: 'Porto de Sepetiba',
		destino: 'Gerdau - Barra Mansa',
		valor: 380.0
	},
	{
		id: 30,
		origem: 'Porto de Sepetiba',
		destino: 'Braskem - Duque de Caxias',
		valor: 400.0
	},
	{
		id: 31,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Nestlé Brasil - Três Rios',
		valor: 420.0
	},
	{
		id: 32,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Nissan do Brasil - Resende',
		valor: 490.0
	},
	{
		id: 33,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: '3 Corações - Jacarepaguá',
		valor: 280.0
	},
	{
		id: 34,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Coca-Cola FEMSA - Duque de Caxias',
		valor: 250.0
	},
	{
		id: 35,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Volkswagen - São José dos Pinhais',
		valor: 2700.0
	},
	{
		id: 36,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Ambev - Nova Iguaçu',
		valor: 230.0
	},
	{
		id: 37,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Petrobras - REDUC Duque de Caxias',
		valor: 260.0
	},
	{
		id: 38,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Embraer - São José dos Campos',
		valor: 1450.0
	},
	{
		id: 39,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Gerdau - Barra Mansa',
		valor: 450.0
	},
	{
		id: 40,
		origem: 'Aeroporto Internacional Tom Jobim (Galeão)',
		destino: 'Braskem - Duque de Caxias',
		valor: 270.0
	},
	{
		id: 41,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Nestlé Brasil - Três Rios',
		valor: 380.0
	},
	{
		id: 42,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Nissan do Brasil - Resende',
		valor: 450.0
	},
	{
		id: 43,
		origem: 'Aeroporto Santos Dumont',
		destino: '3 Corações - Jacarepaguá',
		valor: 240.0
	},
	{
		id: 44,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Coca-Cola FEMSA - Duque de Caxias',
		valor: 280.0
	},
	{
		id: 45,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Volkswagen - São José dos Pinhais',
		valor: 2650.0
	},
	{
		id: 46,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Ambev - Nova Iguaçu',
		valor: 260.0
	},
	{
		id: 47,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Petrobras - REDUC Duque de Caxias',
		valor: 290.0
	},
	{
		id: 48,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Embraer - São José dos Campos',
		valor: 1400.0
	},
	{
		id: 49,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Gerdau - Barra Mansa',
		valor: 410.0
	},
	{
		id: 50,
		origem: 'Aeroporto Santos Dumont',
		destino: 'Braskem - Duque de Caxias',
		valor: 300.0
	},
	{
		id: 51,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Nestlé Brasil - Três Rios',
		valor: 490.0
	},
	{
		id: 52,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Nissan do Brasil - Resende',
		valor: 560.0
	},
	{
		id: 53,
		origem: 'Terminal de Contêineres Libra',
		destino: '3 Corações - Jacarepaguá',
		valor: 340.0
	},
	{
		id: 54,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Coca-Cola FEMSA - Duque de Caxias',
		valor: 310.0
	},
	{
		id: 55,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Volkswagen - São José dos Pinhais',
		valor: 2850.0
	},
	{
		id: 56,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Ambev - Nova Iguaçu',
		valor: 320.0
	},
	{
		id: 57,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Petrobras - REDUC Duque de Caxias',
		valor: 330.0
	},
	{
		id: 58,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Embraer - São José dos Campos',
		valor: 1650.0
	},
	{
		id: 59,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Gerdau - Barra Mansa',
		valor: 430.0
	},
	{
		id: 60,
		origem: 'Terminal de Contêineres Libra',
		destino: 'Braskem - Duque de Caxias',
		valor: 340.0
	},
	// Clientes para Portos e Aeroportos (Rotas de retorno)
	{
		id: 61,
		origem: 'Nestlé Brasil - Três Rios',
		destino: 'Porto do Rio de Janeiro',
		valor: 480.0
	},
	{
		id: 62,
		origem: 'Nestlé Brasil - Três Rios',
		destino: 'Porto de Itaguaí',
		valor: 510.0
	},
	{
		id: 63,
		origem: 'Nestlé Brasil - Três Rios',
		destino: 'Porto de Sepetiba',
		valor: 550.0
	},
	{
		id: 64,
		origem: 'Nestlé Brasil - Três Rios',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 450.0
	},
	{
		id: 65,
		origem: 'Nestlé Brasil - Três Rios',
		destino: 'Aeroporto Santos Dumont',
		valor: 410.0
	},
	{
		id: 66,
		origem: 'Nestlé Brasil - Três Rios',
		destino: 'Terminal de Contêineres Libra',
		valor: 520.0
	},
	{
		id: 67,
		origem: 'Nissan do Brasil - Resende',
		destino: 'Porto do Rio de Janeiro',
		valor: 550.0
	},
	{
		id: 68,
		origem: 'Nissan do Brasil - Resende',
		destino: 'Porto de Itaguaí',
		valor: 580.0
	},
	{
		id: 69,
		origem: 'Nissan do Brasil - Resende',
		destino: 'Porto de Sepetiba',
		valor: 610.0
	},
	{
		id: 70,
		origem: 'Nissan do Brasil - Resende',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 520.0
	},
	{
		id: 71,
		origem: 'Nissan do Brasil - Resende',
		destino: 'Aeroporto Santos Dumont',
		valor: 480.0
	},
	{
		id: 72,
		origem: 'Nissan do Brasil - Resende',
		destino: 'Terminal de Contêineres Libra',
		valor: 590.0
	},
	{
		id: 73,
		origem: '3 Corações - Jacarepaguá',
		destino: 'Porto do Rio de Janeiro',
		valor: 380.0
	},
	{
		id: 74,
		origem: '3 Corações - Jacarepaguá',
		destino: 'Porto de Itaguaí',
		valor: 410.0
	},
	{
		id: 75,
		origem: '3 Corações - Jacarepaguá',
		destino: 'Porto de Sepetiba',
		valor: 430.0
	},
	{
		id: 76,
		origem: '3 Corações - Jacarepaguá',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 310.0
	},
	{
		id: 77,
		origem: '3 Corações - Jacarepaguá',
		destino: 'Aeroporto Santos Dumont',
		valor: 220.0
	},
	{
		id: 78,
		origem: '3 Corações - Jacarepaguá',
		destino: 'Terminal de Contêineres Libra',
		valor: 370.0
	},
	{
		id: 79,
		origem: 'Coca-Cola FEMSA - Duque de Caxias',
		destino: 'Porto do Rio de Janeiro',
		valor: 350.0
	},
	{
		id: 80,
		origem: 'Coca-Cola FEMSA - Duque de Caxias',
		destino: 'Porto de Itaguaí',
		valor: 390.0
	},
	{
		id: 81,
		origem: 'Coca-Cola FEMSA - Duque de Caxias',
		destino: 'Porto de Sepetiba',
		valor: 420.0
	},
	{
		id: 82,
		origem: 'Coca-Cola FEMSA - Duque de Caxias',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 280.0
	},
	{
		id: 83,
		origem: 'Coca-Cola FEMSA - Duque de Caxias',
		destino: 'Aeroporto Santos Dumont',
		valor: 310.0
	},
	{
		id: 84,
		origem: 'Coca-Cola FEMSA - Duque de Caxias',
		destino: 'Terminal de Contêineres Libra',
		valor: 340.0
	},
	{
		id: 85,
		origem: 'Volkswagen - São José dos Pinhais',
		destino: 'Porto do Rio de Janeiro',
		valor: 2900.0
	},
	{
		id: 86,
		origem: 'Volkswagen - São José dos Pinhais',
		destino: 'Porto de Itaguaí',
		valor: 3000.0
	},
	{
		id: 87,
		origem: 'Volkswagen - São José dos Pinhais',
		destino: 'Porto de Sepetiba',
		valor: 3050.0
	},
	{
		id: 88,
		origem: 'Volkswagen - São José dos Pinhais',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 2800.0
	},
	{
		id: 89,
		origem: 'Volkswagen - São José dos Pinhais',
		destino: 'Aeroporto Santos Dumont',
		valor: 2750.0
	},
	{
		id: 90,
		origem: 'Volkswagen - São José dos Pinhais',
		destino: 'Terminal de Contêineres Libra',
		valor: 2950.0
	},
	{
		id: 91,
		origem: 'Ambev - Nova Iguaçu',
		destino: 'Porto do Rio de Janeiro',
		valor: 330.0
	},
	{
		id: 92,
		origem: 'Ambev - Nova Iguaçu',
		destino: 'Porto de Itaguaí',
		valor: 370.0
	},
	{
		id: 93,
		origem: 'Ambev - Nova Iguaçu',
		destino: 'Porto de Sepetiba',
		valor: 400.0
	},
	{
		id: 94,
		origem: 'Ambev - Nova Iguaçu',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 260.0
	},
	{
		id: 95,
		origem: 'Ambev - Nova Iguaçu',
		destino: 'Aeroporto Santos Dumont',
		valor: 290.0
	},
	{
		id: 96,
		origem: 'Ambev - Nova Iguaçu',
		destino: 'Terminal de Contêineres Libra',
		valor: 350.0
	},
	{
		id: 97,
		origem: 'Petrobras - REDUC Duque de Caxias',
		destino: 'Porto do Rio de Janeiro',
		valor: 360.0
	},
	{
		id: 98,
		origem: 'Petrobras - REDUC Duque de Caxias',
		destino: 'Porto de Itaguaí',
		valor: 400.0
	},
	{
		id: 99,
		origem: 'Petrobras - REDUC Duque de Caxias',
		destino: 'Porto de Sepetiba',
		valor: 380.0
	},
	{
		id: 100,
		origem: 'Petrobras - REDUC Duque de Caxias',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 290.0
	},
	{
		id: 101,
		origem: 'Petrobras - REDUC Duque de Caxias',
		destino: 'Aeroporto Santos Dumont',
		valor: 320.0
	},
	{
		id: 102,
		origem: 'Petrobras - REDUC Duque de Caxias',
		destino: 'Terminal de Contêineres Libra',
		valor: 360.0
	},
	{
		id: 103,
		origem: 'Embraer - São José dos Campos',
		destino: 'Porto do Rio de Janeiro',
		valor: 1700.0
	},
	{
		id: 104,
		origem: 'Embraer - São José dos Campos',
		destino: 'Porto de Itaguaí',
		valor: 1800.0
	},
	{
		id: 105,
		origem: 'Embraer - São José dos Campos',
		destino: 'Porto de Sepetiba',
		valor: 1850.0
	},
	{
		id: 106,
		origem: 'Embraer - São José dos Campos',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 1500.0
	},
	{
		id: 107,
		origem: 'Embraer - São José dos Campos',
		destino: 'Aeroporto Santos Dumont',
		valor: 1450.0
	},
	{
		id: 108,
		origem: 'Embraer - São José dos Campos',
		destino: 'Terminal de Contêineres Libra',
		valor: 1750.0
	},
	{
		id: 109,
		origem: 'Gerdau - Barra Mansa',
		destino: 'Porto do Rio de Janeiro',
		valor: 450.0
	},
	{
		id: 110,
		origem: 'Gerdau - Barra Mansa',
		destino: 'Porto de Itaguaí',
		valor: 420.0
	},
	{
		id: 111,
		origem: 'Gerdau - Barra Mansa',
		destino: 'Porto de Sepetiba',
		valor: 410.0
	},
	{
		id: 112,
		origem: 'Gerdau - Barra Mansa',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 480.0
	},
	{
		id: 113,
		origem: 'Gerdau - Barra Mansa',
		destino: 'Aeroporto Santos Dumont',
		valor: 440.0
	},
	{
		id: 114,
		origem: 'Gerdau - Barra Mansa',
		destino: 'Terminal de Contêineres Libra',
		valor: 460.0
	},
	{
		id: 115,
		origem: 'Braskem - Duque de Caxias',
		destino: 'Porto do Rio de Janeiro',
		valor: 370.0
	},
	{
		id: 116,
		origem: 'Braskem - Duque de Caxias',
		destino: 'Porto de Itaguaí',
		valor: 410.0
	},
	{
		id: 117,
		origem: 'Braskem - Duque de Caxias',
		destino: 'Porto de Sepetiba',
		valor: 430.0
	},
	{
		id: 118,
		origem: 'Braskem - Duque de Caxias',
		destino: 'Aeroporto Internacional Tom Jobim (Galeão)',
		valor: 300.0
	},
	{
		id: 119,
		origem: 'Braskem - Duque de Caxias',
		destino: 'Aeroporto Santos Dumont',
		valor: 330.0
	},
	{
		id: 120,
		origem: 'Braskem - Duque de Caxias',
		destino: 'Terminal de Contêineres Libra',
		valor: 370.0
	}
]

// Interface para Frota
export interface Frota {
	id: number
	placa: string
	status: 'DISPONIVEL' | 'INDISPONIVEL' | 'EM_MANUTENCAO'
	motoristaId: number | null // Vincula com Usuario que tem tipo MOTORISTA
}

// Mock Frotas Data
export const mockFrotas: Frota[] = [
	{
		id: 1,
		placa: 'ABC-1234',
		status: 'DISPONIVEL',
		motoristaId: 5 // José Carlos
	},
	{
		id: 2,
		placa: 'DEF-5678',
		status: 'DISPONIVEL',
		motoristaId: 7 // Marco Silva
	},
	{
		id: 3,
		placa: 'GHI-9012',
		status: 'EM_MANUTENCAO',
		motoristaId: 8 // Alessandro Cerqueira
	},
	{
		id: 4,
		placa: 'JKL-3456',
		status: 'DISPONIVEL',
		motoristaId: 9 // Paulo Santos
	},
	{
		id: 5,
		placa: 'MNO-7890',
		status: 'INDISPONIVEL',
		motoristaId: 10 // Ricardo Oliveira
	},
	{
		id: 6,
		placa: 'PQR-1122',
		status: 'DISPONIVEL',
		motoristaId: 11 // Fernando Pinheiro
	},
	{
		id: 7,
		placa: 'STU-3344',
		status: 'DISPONIVEL',
		motoristaId: null // Sem motorista
	},
	{
		id: 8,
		placa: 'VWX-5566',
		status: 'EM_MANUTENCAO',
		motoristaId: null // Sem motorista
	}
]

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

// LocalStorage helper functions for users
const USUARIOS_STORAGE_KEY = 'demo_usuarios'

export const getUsuariosFromStorage = (): Usuario[] => {
	if (typeof window === 'undefined') return mockUsuarios
	
	const stored = localStorage.getItem(USUARIOS_STORAGE_KEY)
	if (stored) {
		try {
			return JSON.parse(stored)
		} catch (e) {
			console.error('Error parsing usuarios from storage:', e)
			return mockUsuarios
		}
	}
	return mockUsuarios
}

export const saveUsuarioToStorage = (usuario: Omit<Usuario, 'id'>): Usuario => {
	const usuarios = getUsuariosFromStorage()
	const newId = Math.max(...usuarios.map(u => u.id), 0) + 1
	const newUsuario: Usuario = {
		...usuario,
		id: newId
	}
	usuarios.push(newUsuario)
	localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuarios))
	return newUsuario
}

export const deleteUsuariosFromStorage = (ids: number[]): void => {
	const usuarios = getUsuariosFromStorage()
	const filtered = usuarios.filter(u => !ids.includes(u.id))
	localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(filtered))
}

export const initializeUsuariosStorage = (): void => {
	if (typeof window === 'undefined') return
	
	const stored = localStorage.getItem(USUARIOS_STORAGE_KEY)
	if (!stored) {
		localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(mockUsuarios))
	}
}
