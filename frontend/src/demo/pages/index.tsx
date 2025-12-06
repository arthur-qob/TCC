import { Eye, SquarePen, UserPlus } from 'lucide-react'
import { Container, Text } from '../components/themed'
import { DataTable, type Column } from '../components/dataTable'
import { usePermissionNavigate } from '@/utils/routes'
import { StatusPedido, UserRoles, type Pedido } from '@/utils/types'
import { capitalizeFirst } from '@/utils/stringFormatters'
import { useTheme } from '@/context/theme'
import { ColorHex } from '../constants/colors'
import { useEffect, useState } from 'react'
import Spinner from '../components/spinner'
import { mockPedidos, mockUsuarios, simulateApiDelay } from '../data/mockData'

const HomePage = () => {
	const user = mockUsuarios[0] as any // Simulated logged-in user
	const { actualTheme } = useTheme()
	const navigate = usePermissionNavigate()
	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadPedidos = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await simulateApiDelay()
			setPedidos(mockPedidos)
		} catch (err: any) {
			console.error('Error loading orders:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao carregar pedidos. Tente novamente.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadPedidos()
	}, [])

	const statusColors: Record<StatusPedido, { bg: string; text: string }> = {
		[StatusPedido.PENDENTE]: {
			bg: 'bg-yellow-300',
			text: 'text-yellow-700'
		},
		[StatusPedido.APROVADO]: { bg: 'bg-blue-300', text: 'text-blue-700' },
		[StatusPedido.EM_ANDAMENTO]: {
			bg: 'bg-purple-300',
			text: 'text-purple-700'
		},
		[StatusPedido.CONCLUIDO]: {
			bg: 'bg-green-300',
			text: 'text-green-700'
		},
		[StatusPedido.CANCELADO]: { bg: 'bg-red-300', text: 'text-red-700' }
	}

	const columns: Column<Pedido>[] = [
		{
			id: 'motoristaId',
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
			id: 'statusPedido',
			label: 'STATUS',
			render: (value) => {
				const status = value as StatusPedido
				return (
					<p
						className={`w-fit mx-auto ${
							statusColors[status]?.bg || 'bg-gray-300'
						} ${
							statusColors[status]?.text || 'text-gray-700'
						} p-2 rounded-full`}>
						{status}
					</p>
				)
			}
		},
		{
			id: 'dataCriacao',
			label: 'CRIADO EM'
		},
		{
			id: 'tipoOperacao',
			label: 'OPERAÇÃO'
		},
		{
			id: 'tipoCarga',
			label: 'TIPO CARGA'
		},
		{
			id: 'clienteId',
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

	const handleRowClick = (order: Pedido) => {
		navigate(`/demo/cadastrar-pedido?id=${order.id}`)
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
					Pedidos
				</Text>
				{(user?.tipo === UserRoles.FOCAL ||
					user?.tipo === UserRoles.GERENTE_FROTA ||
					user?.tipo === UserRoles.ADMIN) && (
					<button
						className='w-full sm:w-fit bg-[rgb(15,219,110)] hover:bg-[hsla(149,87%,40%,1.00)] transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base'
						onClick={() => navigate('/demo/cadastrar-pedido')}>
						Criar novo pedido
					</button>
				)}
			</div>
			{isLoading ? (
				<div className='flex justify-center items-center min-h-full'>
					<Spinner />
				</div>
			) : pedidos.length > 0 ? (
				<DataTable
					columns={columns}
					data={pedidos}
					getRowKey={(order) => order.id}
					showActionsColumn={showActions}
					renderActions={() =>
						user?.tipo ? roleActions[user.tipo] : null
					}
					onRowClick={handleRowClick}
				/>
			) : (
				<p className='mt-6 text-center text-gray-500'>
					Nenhum pedido encontrado.
				</p>
			)}
		</Container>
	)
}

export default HomePage
