import { Eye, SquarePen, UserPlus } from 'lucide-react'
import { Container, Text } from '../components/themed'
import { DataTable, type Column } from '../components/dataTable'
import { usePermissionNavigate } from '@/utils/routes'
import { useUser } from '@/context/user'
import { UserRoles } from '@/utils/types'
import { capitalizeFirst } from '@/utils/stringFormatters'
import { useTheme } from '@/context/theme'
import { ColorHex } from '@/constants/colors'

interface OrderData {
	id: number
	driver: string | null
	status: string
	createdAt: string
	operation: string
	cargoType: string
	client: string
}

const HomePage = () => {
	const { user } = useUser()
	const { actualTheme } = useTheme()
	const navigate = usePermissionNavigate()

	const ordersData: OrderData[] = [
		{
			id: 1,
			driver: null,
			status: 'Transporte',
			createdAt: '29/08/2025',
			operation: 'REDEX',
			cargoType: 'CONTAINER',
			client: '3 Corações'
		},
		{
			id: 2,
			driver: 'João Silva',
			status: 'Programando',
			createdAt: '30/08/2025',
			operation: 'REDEX',
			cargoType: 'CARGA SOLTA',
			client: 'Ambev'
		},
		{
			id: 3,
			driver: null,
			status: 'Concluído',
			createdAt: '28/08/2025',
			operation: 'RODOV',
			cargoType: 'CONTAINER',
			client: 'Nestlé'
		},
		{
			id: 4,
			driver: 'Carlos Pereira',
			status: 'Cancelado',
			createdAt: '27/08/2025',
			operation: 'RODOV',
			cargoType: 'CARGA SOLTA',
			client: 'BRF'
		},
		{
			id: 5,
			driver: 'Ana Costa',
			status: 'Em Análise',
			createdAt: '31/08/2025',
			operation: 'RODOC',
			cargoType: 'CONTAINER',
			client: 'JBS'
		},
		{
			id: 6,
			driver: null,
			status: 'Pendente',
			createdAt: '01/09/2025',
			operation: 'REDEX',
			cargoType: 'CARGA SOLTA',
			client: 'Coca-Cola'
		}
	]

	const statusColors: Record<string, { bg: string; text: string }> = {
		Programando: { bg: 'bg-yellow-300', text: 'text-yellow-700' },
		Transporte: { bg: 'bg-blue-300', text: 'text-blue-700' },
		Concluído: { bg: 'bg-green-300', text: 'text-green-700' },
		Cancelado: { bg: 'bg-red-300', text: 'text-red-700' },
		'Em Análise': { bg: 'bg-purple-300', text: 'text-purple-700' },
		Pendente: { bg: 'bg-orange-300', text: 'text-orange-700' }
	}

	const columns: Column<OrderData>[] = [
		{
			id: 'driver',
			label: 'MOTORISTA',
			render: (value) =>
				value ? (
					value
				) : user?.tipo === UserRoles.FOCAL ? (
					'Não definido'
				) : (
					<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
				)
		},
		{
			id: 'status',
			label: 'STATUS',
			render: (value) => (
				<p
					className={`w-fit mx-auto ${
						statusColors[value]?.bg || 'bg-gray-300'
					} ${
						statusColors[value]?.text || 'text-gray-700'
					} p-2 rounded-full`}>
					{value}
				</p>
			)
		},
		{
			id: 'createdAt',
			label: 'CRIADO EM'
		},
		{
			id: 'operation',
			label: 'OPERAÇÃO'
		},
		{
			id: 'cargoType',
			label: 'TIPO CARGA'
		},
		{
			id: 'client',
			label: 'CLIENTE'
		}
	]

	const roleActions: Record<string, React.JSX.Element> = {
		FOCAL: (
			<Eye className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		),
		PROGRAMADOR: (
			<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		),
		GERENTE_FROTA: (
			<SquarePen className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		),
		ADMIN: (
			<SquarePen className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		)
	}

	const showActions =
		user?.tipo === UserRoles.GERENTE_FROTA ||
		user?.tipo === UserRoles.PROGRAMADOR

	const handleRowClick = (order: OrderData) => {
		navigate(`/cadastrar-pedido?id=${order.id}`)
	}

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full'>
				<Text className='w-fit capitalize text-2xl font-medium'>
					{user?.tipo ? capitalizeFirst(user.tipo) : 'No user'}
				</Text>
				{(user?.tipo === UserRoles.FOCAL ||
					user?.tipo === UserRoles.GERENTE_FROTA ||
					user?.tipo === UserRoles.ADMIN) && (
					<button
						className='w-full sm:w-fit bg-[rgb(15,219,110)] hover:bg-[hsla(149,87%,40%,1.00)] transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base'
						onClick={() => navigate('/cadastrar-pedido')}>
						Criar novo pedido
					</button>
				)}
			</div>
			<DataTable
				columns={columns}
				data={ordersData}
				getRowKey={(order) => order.id}
				showActionsColumn={showActions}
				renderActions={() =>
					user?.tipo ? roleActions[user.tipo] : null
				}
				onRowClick={handleRowClick}
			/>
		</Container>
	)
}

export default HomePage
