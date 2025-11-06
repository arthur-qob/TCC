import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Paper
} from '@mui/material'
import {
	Eye,
	ChevronsUpDown,
	ChevronUp,
	ChevronDown,
	SquarePen,
	UserPlus
} from 'lucide-react'
import { useState } from 'react'
import { Container, Text } from '../components/themed'
import { useTheme } from '../context/theme'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/user'
import { UserRoles } from '../utils/types'

interface OrderData {
	id: number
	driver: string | null
	status: string
	createdAt: string
	operation: string
	cargoType: string
	client: string
}

type SortField = keyof Omit<OrderData, 'id'>
type SortDirection = 'asc' | 'desc' | null

const HomePage = () => {
	const { user } = useUser()
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
	const { actualTheme } = useTheme()
	const [sortField, setSortField] = useState<SortField | null>(null)
	const [sortDirection, setSortDirection] = useState<SortDirection>(null)
	const navigate = useNavigate()

	const statusColors: Record<string, { bg: string; text: string }> = {
		Programando: { bg: 'bg-yellow-300', text: 'text-yellow-700' },
		Transporte: { bg: 'bg-blue-300', text: 'text-blue-700' },
		Concluído: { bg: 'bg-green-300', text: 'text-green-700' },
		Cancelado: { bg: 'bg-red-300', text: 'text-red-700' },
		'Em Análise': { bg: 'bg-purple-300', text: 'text-purple-700' },
		Pendente: { bg: 'bg-orange-300', text: 'text-orange-700' }
	}

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			if (sortDirection === 'asc') {
				setSortDirection('desc')
			} else if (sortDirection === 'desc') {
				setSortDirection(null)
				setSortField(null)
			}
		} else {
			setSortField(field)
			setSortDirection('asc')
		}
	}

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) {
			return (
				<ChevronsUpDown
					size={16}
					className='ml-2 inline'
				/>
			)
		}
		if (sortDirection === 'asc') {
			return (
				<ChevronUp
					size={16}
					className='ml-2 inline'
				/>
			)
		}
		return (
			<ChevronDown
				size={16}
				className='ml-2 inline'
			/>
		)
	}

	const sortedOrders = [...ordersData].sort((a, b) => {
		if (!sortField || !sortDirection) return 0

		const aValue = a[sortField]
		const bValue = b[sortField]

		if (aValue === null && bValue === null) return 0
		if (aValue === null) return sortDirection === 'asc' ? 1 : -1
		if (bValue === null) return sortDirection === 'asc' ? -1 : 1

		if (sortField === 'createdAt') {
			const parseDate = (dateStr: string) => {
				const [day, month, year] = dateStr.split('/')
				return new Date(Number(year), Number(month) - 1, Number(day))
			}
			const aTime = parseDate(aValue as string).getTime()
			const bTime = parseDate(bValue as string).getTime()

			if (sortDirection === 'asc') {
				return aTime > bTime ? 1 : -1
			}
			return aTime < bTime ? 1 : -1
		}

		const aString = String(aValue)
		const bString = String(bValue)

		if (sortDirection === 'asc') {
			return aString > bString ? 1 : -1
		}
		return aString < bString ? 1 : -1
	})

	const orders = sortedOrders

	const roleActions: Record<string, React.JSX.Element> = {
		FOCAL: (
			<Eye className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		),
		PROGRAMADOR: (
			<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300'></UserPlus>
		),
		GERENTE_FROTA: (
			<SquarePen className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		),
		ADMIN: (
			<SquarePen className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		)
	}

	return (
		<Container>
			<Text className='w-fit capitalize text-2xl font-medium'>
				{user?.tipo || 'No user'}
			</Text>
			{(user?.tipo === UserRoles.FOCAL ||
				user?.tipo === UserRoles.GERENTE_FROTA ||
				user?.tipo === UserRoles.PROGRAMADOR) && (
				<button
					className='w-fit bg-[rgb(15,219,110)] hover:bg-[hsla(149,87%,40%,1.00)] transition-colors duration-300 text-white px-2 py-3 rounded-xl shadow-lg'
					onClick={() => navigate('/cadastrar-pedido')}>
					Criar novo pedido
				</button>
			)}
			<TableContainer
				component={Paper}
				sx={{
					backgroundColor:
						actualTheme === 'dark' ? '#1a1a1a' : '#ffffff',
					transition: 'background-color 0.2s',
					borderRadius: '10px',
					boxShadow:
						'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
				}}>
				<Table>
					<TableHead>
						<TableRow
							sx={{
								backgroundColor:
									actualTheme === 'dark'
										? '#2a2a2a'
										: '#ffffff'
							}}>
							<TableCell
								align='center'
								sx={{
									fontWeight: 'bold',
									color:
										actualTheme === 'dark'
											? '#ffffff'
											: '#000000',
									cursor: 'pointer',
									userSelect: 'none'
								}}
								onClick={() => handleSort('driver')}>
								<div className='flex items-center justify-center'>
									MOTORISTA
									{getSortIcon('driver')}
								</div>
							</TableCell>
							<TableCell
								align='center'
								sx={{
									fontWeight: 'bold',
									color:
										actualTheme === 'dark'
											? '#ffffff'
											: '#000000',
									cursor: 'pointer',
									userSelect: 'none'
								}}
								onClick={() => handleSort('status')}>
								<div className='flex items-center justify-center'>
									STATUS
									{getSortIcon('status')}
								</div>
							</TableCell>
							<TableCell
								align='center'
								sx={{
									fontWeight: 'bold',
									color:
										actualTheme === 'dark'
											? '#ffffff'
											: '#000000',
									cursor: 'pointer',
									userSelect: 'none'
								}}
								onClick={() => handleSort('createdAt')}>
								<div className='flex items-center justify-center'>
									CRIADO EM
									{getSortIcon('createdAt')}
								</div>
							</TableCell>
							<TableCell
								align='center'
								sx={{
									fontWeight: 'bold',
									color:
										actualTheme === 'dark'
											? '#ffffff'
											: '#000000',
									cursor: 'pointer',
									userSelect: 'none'
								}}
								onClick={() => handleSort('operation')}>
								<div className='flex items-center justify-center'>
									OPERAÇÃO
									{getSortIcon('operation')}
								</div>
							</TableCell>
							<TableCell
								align='center'
								sx={{
									fontWeight: 'bold',
									color:
										actualTheme === 'dark'
											? '#ffffff'
											: '#000000',
									cursor: 'pointer',
									userSelect: 'none'
								}}
								onClick={() => handleSort('cargoType')}>
								<div className='flex items-center justify-center'>
									TIPO CARGA
									{getSortIcon('cargoType')}
								</div>
							</TableCell>
							<TableCell
								align='center'
								sx={{
									fontWeight: 'bold',
									color:
										actualTheme === 'dark'
											? '#ffffff'
											: '#000000',
									cursor: 'pointer',
									userSelect: 'none'
								}}
								onClick={() => handleSort('client')}>
								<div className='flex items-center justify-center'>
									CLIENTE
									{getSortIcon('client')}
								</div>
							</TableCell>
							{(user?.tipo === UserRoles.GERENTE_FROTA ||
								user?.tipo === UserRoles.PROGRAMADOR) && (
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									AÇÕES
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => (
							<TableRow
								key={order.id}
								hover
								sx={{
									cursor: 'pointer',
									'&:hover': {
										backgroundColor:
											actualTheme === 'dark'
												? '#2a2a2a'
												: '#f5f5f5'
									}
								}}>
								<TableCell
									align='center'
									sx={{
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									{order.driver ? (
										order.driver
									) : user?.tipo === UserRoles.FOCAL ? (
										'Não definido'
									) : (
										<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300'></UserPlus>
									)}
								</TableCell>
								<TableCell align='center'>
									<p
										className={`w-fit mx-auto ${
											statusColors[order.status]?.bg ||
											'bg-gray-300'
										} ${
											statusColors[order.status]?.text ||
											'text-gray-700'
										} p-2 rounded-full`}>
										{order.status}
									</p>
								</TableCell>
								<TableCell
									align='center'
									sx={{
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									{order.createdAt}
								</TableCell>
								<TableCell
									align='center'
									sx={{
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									{order.operation}
								</TableCell>
								<TableCell
									align='center'
									sx={{
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									{order.cargoType}
								</TableCell>
								<TableCell
									align='center'
									sx={{
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									{order.client}
								</TableCell>
								{(user?.tipo === UserRoles.GERENTE_FROTA ||
									user?.tipo === UserRoles.PROGRAMADOR) && (
									<TableCell
										align='center'
										sx={{
											color:
												actualTheme === 'dark'
													? '#ffffff'
													: '#000000'
										}}>
										{user?.tipo && roleActions[user.tipo]}
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default HomePage
