import { Eye, SquarePen, UserPlus } from 'lucide-react'
import { Container, Text } from '../components/themed'
import { DataTable, type Column } from '../components/dataTable'
import { StatusPedido, UserRoles, type Pedido, TipoCarga } from '@/utils/types'
import { useTheme } from '@/context/theme'
import { ColorHex } from '../constants/colors'
import { useEffect, useState } from 'react'
import Spinner from '../components/spinner'
import {
	mockClientes,
	mockPedidos,
	mockUsuarios,
	simulateApiDelay
} from '../data/mockData'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal'

interface PedidoFormatado extends Pedido {
	nomeCliente: string
	nomeMotorista: string | null
	actions?: React.JSX.Element
}

const HomePage = () => {
	const user = mockUsuarios[0] as any
	const { actualTheme } = useTheme()
	const navigate = useNavigate()
	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [modalMotoristaIsOpen, setModalMotoristaIsOpen] =
		useState<boolean>(false)
	const [modalPedidoIsOpen, setModalPedidoIsOpen] = useState<boolean>(false)
	const [openPedidoId, setOpenPedidoId] = useState<number | null>(null)

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
	}, [mockPedidos])

	const pedidosFormatados: PedidoFormatado[] = pedidos.map((pedido) => {
		const cliente = mockClientes.find((c) => c.id === pedido.clienteId)
		const motorista = mockUsuarios.find((u) => u.id === pedido.motoristaId)

		return {
			...pedido,
			nomeCliente: cliente ? cliente.nome : 'Desconhecido',
			nomeMotorista: motorista ? motorista.nome : null
		}
	})

	const hasContainerPedidos = pedidos.some(
		(p) => p.tipoCarga === TipoCarga.CONTAINER
	)

	const hasCarretas = pedidos.some((p) => Number(p.qtdCarretas) > 0)

	const columns: Column<PedidoFormatado>[] = [
		{
			id: 'nomeCliente',
			label: 'CLIENTE'
		},
		{
			id: 'nomeMotorista',
			label: 'MOTORISTA',
			render: (value) =>
				value ? (
					value
				) : (
					<button
						type='button'
						className='bg-transparent border-none p-0 m-0 outline-none'
						onClick={(e) => {
							e.stopPropagation()
							setModalMotoristaIsOpen(true)
						}}>
						<UserPlus className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
					</button>
				)
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
			id: 'actions',
			label: 'VER MAIS',
			render: (_value, pedido) => (
				<button
					type='button'
					className='bg-transparent border-none p-0 m-0 outline-none'
					onClick={(e) => {
						e.stopPropagation()
						setModalPedidoIsOpen(true)
						setOpenPedidoId(Number(pedido.id))
					}}>
					<Eye className='mx-auto text-blue-500 hover:text-blue-600 transition-colors duration-300' />
				</button>
			)
		}
	]

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

	const handleRowClick = (pedido: PedidoFormatado) => {
		navigate(`/demo/pedidos/editar/${pedido.id}`)
	}

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<Modal
				isOpen={modalMotoristaIsOpen}
				onClose={() => setModalMotoristaIsOpen(false)}>
				<div className='p-6'>
					<h2 className='text-xl font-semibold mb-4'>
						Atribuir Motorista
					</h2>
					<p className='mb-4'>
						A funcionalidade de atribuição de motorista ainda não
						foi implementada.
					</p>
				</div>
			</Modal>

			<Modal
				isOpen={modalPedidoIsOpen}
				onClose={() => setModalPedidoIsOpen(false)}>
				<section>
					<div className='flex items-center gap-4 border-b pb-3'>
						<Text className='w-fit capitalize text-2xl font-medium'>
							Pedido {openPedidoId}
						</Text>
						<button
							type='button'
							onClick={() =>
								navigate(`/demo/pedidos/editar/${openPedidoId}`)
							}>
							<SquarePen className='text-blue-500 hover:text-blue-600 transition-colors duration-300' />
						</button>
					</div>
					<div className='mt-6 space-y-4'>
						{openPedidoId &&
							pedidosFormatados.find(
								(p) => p.id === openPedidoId
							) &&
							(() => {
								const pedido = pedidosFormatados.find(
									(p) => p.id === openPedidoId
								)!
								return (
									<>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Cliente
												</p>
												<p className='text-base'>
													{pedido.nomeCliente}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Motorista
												</p>
												<p className='text-base'>
													{pedido.nomeMotorista ||
														'Não atribuído'}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Data de Criação
												</p>
												<p className='text-base'>
													{pedido.dataCriacao}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Tipo de Operação
												</p>
												<p className='text-base'>
													{pedido.tipoOperacao}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Tipo de Carga
												</p>
												<p className='text-base'>
													{pedido.tipoCarga}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Status
												</p>
												<p
													className={`w-fit ${
														statusColors[
															pedido.statusPedido
														]?.bg || 'bg-gray-300'
													} ${
														statusColors[
															pedido.statusPedido
														]?.text ||
														'text-gray-700'
													} px-3 py-1 rounded-full text-sm`}>
													{pedido.statusPedido}
												</p>
											</div>
											{pedido.dataExecucao && (
												<div>
													<p className='text-sm font-semibold text-gray-600'>
														Data de Execução
													</p>
													<p className='text-base'>
														{pedido.dataExecucao}
													</p>
												</div>
											)}
											{pedido.numContainerNotaFiscal && (
												<div>
													<p className='text-sm font-semibold text-gray-600'>
														Nº Container/Nota Fiscal
													</p>
													<p className='text-base'>
														{
															pedido.numContainerNotaFiscal
														}
													</p>
												</div>
											)}
											{pedido.qtdContaineres !== null &&
												pedido.qtdContaineres !==
													undefined && (
													<div>
														<p className='text-sm font-semibold text-gray-600'>
															Quantidade de
															Contêineres
														</p>
														<p className='text-base'>
															{
																pedido.qtdContaineres
															}
														</p>
													</div>
												)}
											{pedido.qtdCarretas !== null &&
												pedido.qtdCarretas !==
													undefined && (
													<div>
														<p className='text-sm font-semibold text-gray-600'>
															Quantidade de
															Carretas
														</p>
														<p className='text-base'>
															{pedido.qtdCarretas}
														</p>
													</div>
												)}
											{pedido.imo && (
												<div>
													<p className='text-sm font-semibold text-gray-600'>
														IMO
													</p>
													<p className='text-base'>
														{pedido.imo}
													</p>
												</div>
											)}
											{pedido.rotaId && (
												<div>
													<p className='text-sm font-semibold text-gray-600'>
														Rota ID
													</p>
													<p className='text-base'>
														{pedido.rotaId}
													</p>
												</div>
											)}
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Focal
												</p>
												<p className='text-base'>
													{mockUsuarios.find(
														(u) =>
															u.id ===
															pedido.focalId
													)?.nome ||
														`ID: ${pedido.focalId}`}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Programador
												</p>
												<p className='text-base'>
													{pedido.programadorId
														? mockUsuarios.find(
																(u) =>
																	u.id ===
																	pedido.programadorId
														  )?.nome ||
														  `ID: ${pedido.programadorId}`
														: 'Não atribuído'}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Gerente de Frota
												</p>
												<p className='text-base'>
													{pedido.gerenteFrotaId
														? mockUsuarios.find(
																(u) =>
																	u.id ===
																	pedido.gerenteFrotaId
														  )?.nome ||
														  `ID: ${pedido.gerenteFrotaId}`
														: 'Não atribuído'}
												</p>
											</div>
											<div>
												<p className='text-sm font-semibold text-gray-600'>
													Gerente de Risco
												</p>
												<p className='text-base'>
													{pedido.gerenteRiscoId
														? mockUsuarios.find(
																(u) =>
																	u.id ===
																	pedido.gerenteRiscoId
														  )?.nome ||
														  `ID: ${pedido.gerenteRiscoId}`
														: 'Não atribuído'}
												</p>
											</div>
											{pedido.observacoes && (
												<div className='md:col-span-2'>
													<p className='text-sm font-semibold text-gray-600'>
														Observações
													</p>
													<p className='text-base'>
														{pedido.observacoes}
													</p>
												</div>
											)}
										</div>
									</>
								)
							})()}
					</div>
				</section>
			</Modal>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full'>
				<Text className='w-fit capitalize text-2xl font-medium'>
					Pedidos
				</Text>
				{(user?.tipo === UserRoles.FOCAL ||
					user?.tipo === UserRoles.GERENTE_FROTA ||
					user?.tipo === UserRoles.ADMIN) && (
					<button
						className='w-full sm:w-fit bg-[rgb(15,219,110)] hover:bg-[hsla(149,87%,40%,1.00)] transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base'
						onClick={() => navigate('/demo/pedidos/novo')}>
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
					data={pedidosFormatados}
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
