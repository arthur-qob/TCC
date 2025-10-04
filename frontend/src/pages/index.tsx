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

type SortField =
	| 'driver'
	| 'status'
	| 'createdAt'
	| 'operation'
	| 'cargoType'
	| 'client'
type SortDirection = 'asc' | 'desc' | null
import { Container, Text } from '../components/themed'
import { useTheme } from '../context/theme'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
	const role: string = 'focal'
	const ordersData = [
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

		let aValue = a[sortField]
		let bValue = b[sortField]

		// Handle null values
		if (aValue === null && bValue === null) return 0
		if (aValue === null) return sortDirection === 'asc' ? 1 : -1
		if (bValue === null) return sortDirection === 'asc' ? -1 : 1

		// Special handling for date sorting (createdAt field)
		if (sortField === 'createdAt') {
			// Convert DD/MM/YYYY to Date object for proper comparison
			const parseDate = (dateStr: string) => {
				const [day, month, year] = dateStr.split('/')
				return new Date(Number(year), Number(month) - 1, Number(day))
			}
			aValue = parseDate(aValue as string).getTime()
			bValue = parseDate(bValue as string).getTime()
		}

		if (sortDirection === 'asc') {
			return aValue > bValue ? 1 : -1
		}
		return aValue < bValue ? 1 : -1
	})

	const orders = sortedOrders

	const roleActions: Record<string, React.JSX.Element> = {
		focal: (
			<Eye className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		),
		programador: (
			<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300'></UserPlus>
		),
		gerente: (
			<SquarePen className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
		)
	}

	return (
		<Container className='flex flex-col items-end min-h-screen gap-4'>
			<div
				className='w-[95%] px-5 py-8 flex flex-col gap-10'
				data-aos='fade-up'>
				<Text className='w-fit capitalize text-2xl font-medium'>
					{role}
				</Text>
				{(role === 'focal' || role === 'gerente') && (
					<button
						className='w-fit bg-[rgb(15,219,110)] hover:bg-[hsla(149,87%,40%,1.00)] transition-colors duration-300 text-white px-2 py-3 rounded-xl shadow-lg'
						onClick={() => navigate('/cadastrarPedido')}>
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
								{role === 'gerente' && (
									<TableCell
										align='center'
										sx={{
											fontWeight: 'bold',
											color:
												actualTheme === 'dark'
													? '#ffffff'
													: '#000000'
										}}></TableCell>
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
										) : role === 'focal' ? (
											'Não definido'
										) : (
											<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300'></UserPlus>
										)}
									</TableCell>
									<TableCell align='center'>
										<p
											className={`w-fit mx-auto ${
												statusColors[order.status]
													?.bg || 'bg-gray-300'
											} ${
												statusColors[order.status]
													?.text || 'text-gray-700'
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
									{role === 'gerente' && (
										<TableCell
											align='center'
											sx={{
												color:
													actualTheme === 'dark'
														? '#ffffff'
														: '#000000'
											}}>
											{roleActions[role]}
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Container>
	)
}

export default HomePage
