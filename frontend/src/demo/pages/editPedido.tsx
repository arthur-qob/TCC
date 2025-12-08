import { useNavigate, useParams } from 'react-router-dom'
import { Container, Text } from '../components/themed'
import { ColorHex } from '../constants/colors'
import { useTheme } from '@/context/theme'
import { useEffect, useState } from 'react'
import {
	type Cliente,
	type Pedido,
	type Rota,
	TipoCarga,
	TipoOperacao
} from '@/utils/types'
import {
	mockClientes,
	mockPedidos,
	mockRotas,
	simulateApiDelay
} from '../data/mockData'
import CustomSelect from '../components/select'
import toast from '../components/toast'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ptBR } from 'date-fns/locale'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const EditPedidoPage = () => {
	const { id: idPedido } = useParams()
	const navigate = useNavigate()
	const { actualTheme } = useTheme()

	const [pedido, setPedido] = useState<Pedido | null>(null)
	const [clientes, setClientes] = useState<Cliente[]>([])
	const [rotas, setRotas] = useState<Rota[]>([])
	const [origens, setOrigens] = useState<string[]>([])
	const [destinos, setDestinos] = useState<string[]>([])

	const [selectedCliente, setSelectedCliente] = useState<string | null>(null)
	const [selectedOrigem, setSelectedOrigem] = useState<string | null>(null)
	const [selectedDestino, setSelectedDestino] = useState<string | null>(null)
	const [selectedDataExecucao, setSelectedDataExecucao] =
		useState<Date | null>(null)
	const [selectedTipoCarga, setSelectedTipoCarga] =
		useState<TipoCarga | null>(null)
	const [selectedTipoOperacao, setSelectedTipoOperacao] =
		useState<TipoOperacao | null>(null)
	const [qtdContainers, setQtdContainers] = useState<number>(1)
	const [qtdCarretas, setQtdCarretas] = useState<number>(1)
	const [observacoes, setObservacoes] = useState<string>('')

	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadPedido()
		loadClients()
		loadRotas()
	}, [])

	useEffect(() => {
		if (pedido) {
			setSelectedCliente(
				clientes.find((c) => c.id === pedido.clienteId)?.nome || ''
			)
			setSelectedOrigem(
				rotas.find((r) => r.id === pedido.rotaId)?.origem || ''
			)
			setSelectedDestino(
				rotas.find((r) => r.id === pedido.rotaId)?.destino || ''
			)
			setSelectedDataExecucao(
				pedido.dataExecucao ? new Date(pedido.dataExecucao) : null
			)
			setSelectedTipoCarga(pedido.tipoCarga)
			setSelectedTipoOperacao(pedido.tipoOperacao)
			setQtdCarretas(pedido.qtdCarretas || 1)
			setObservacoes(pedido.observacoes || '')
		}
	}, [pedido])

	useEffect(() => {
		if (rotas.length > 0) {
			extractOrigemDestino()
		}
	}, [rotas])

	const loadClients = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await simulateApiDelay()
			setClientes(mockClientes)
		} catch (err: any) {
			console.error('Error loading users:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao carregar usuários. Tente novamente.'
			)
			toast.emitToast({
				type: 'error',
				message:
					err.response?.data?.message ||
					'Erro ao carregar usuários. Tente novamente.'
			})
		} finally {
			setIsLoading(false)
		}
	}

	const loadRotas = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await simulateApiDelay()
			setRotas(mockRotas)
		} catch (err: any) {
			console.error('Error loading routes:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao carregar rotas. Tente novamente.'
			)
			toast.emitToast({
				type: 'error',
				message:
					err.response?.data?.message ||
					'Erro ao carregar rotas. Tente novamente.'
			})
		} finally {
			setIsLoading(false)
		}
	}

	const extractOrigemDestino = (rotaPedido?: Rota) => {
		const origensSet = new Set<string>()
		const destinosSet = new Set<string>()

		rotas.forEach((rota) => {
			origensSet.add(rota.origem)
			destinosSet.add(rota.destino)
		})
		setOrigens(Array.from(origensSet))
		setDestinos(Array.from(destinosSet))
	}

	const loadPedido = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await simulateApiDelay()
			setPedido(
				mockPedidos.find((p) => p.id === Number(idPedido)) || null
			)
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

	const isDark = actualTheme === 'dark'

	const inputStyle = {
		backgroundColor: isDark ? ColorHex.zinc[800] : ColorHex.white,
		borderColor: isDark ? ColorHex.zinc[700] : ColorHex.zinc[300],
		color: isDark ? ColorHex.zinc[100] : ColorHex.zinc[900]
	}

	const inputClassName =
		'w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500'

	const labelStyle = {
		color: isDark ? ColorHex.zinc[400] : ColorHex.zinc[700]
	}

	const labelClassName = 'text-sm font-medium mb-1 block'

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<Text className='w-fit capitalize text-2xl font-medium'>
				Editar Pedido #{idPedido}
			</Text>

			<div
				className='rounded-xl shadow-lg p-4 sm:p-6 md:p-8'
				style={{
					backgroundColor: isDark
						? ColorHex.zinc[900]
						: ColorHex.white,
					border: `1px solid ${
						isDark ? ColorHex.zinc[700] : ColorHex.zinc[300]
					}`
				}}>
				<form
					// onSubmit={handleSubmit}
					className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
					{error && (
						<div className='md:col-span-2 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700'>
							<p className='text-red-900 dark:text-red-500 text-sm'>
								{error}
							</p>
						</div>
					)}

					<section className='md:col-span-1 space-y-4 sm:space-y-5'>
						<div className='space-y-2'>
							<label
								htmlFor='cliente'
								className={labelClassName}
								style={labelStyle}>
								Cliente <span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='cliente'
								value={selectedCliente || ''}
								options={Object.fromEntries(
									mockClientes.map((client: any) => [
										client.nome,
										client.nome
									])
								)}
								onChange={(value) => {
									setSelectedCliente(value as string)
								}}
								placeholder='Selecione o cliente'
								className={inputClassName}
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='origem'
								className={labelClassName}
								style={labelStyle}>
								Origem <span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='origem'
								value={selectedOrigem || ''}
								options={origens}
								onChange={(value) => {
									if (
										Object.values(origens).includes(
											value as string
										)
									) {
										setSelectedOrigem(value as string)
									}
								}}
								placeholder='Selecione a origem'
								className={inputClassName}
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='destino'
								className={labelClassName}
								style={labelStyle}>
								Destino <span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='destino'
								value={selectedDestino || ''}
								options={destinos}
								onChange={(value) => {
									if (
										Object.values(destinos).includes(
											value as string
										)
									) {
										setSelectedDestino(value as string)
									}
								}}
								placeholder='Selecione o destino'
								className={inputClassName}
							/>
						</div>
					</section>

					<section className='md:col-span-1 space-y-4 sm:space-y-5'>
						<div className='space-y-2'>
							<label
								htmlFor='data'
								className={labelClassName}
								style={labelStyle}>
								Data do Pedido{' '}
								<span className='text-red-500'>*</span>
							</label>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								adapterLocale={ptBR}>
								<DatePicker
									label='Data do pedido'
									value={selectedDataExecucao}
									onChange={(newValue) =>
										setSelectedDataExecucao(newValue)
									}
									slotProps={{
										textField: {
											fullWidth: true,
											InputProps: {
												style: {
													backgroundColor: isDark
														? ColorHex.zinc[800]
														: ColorHex.white,
													color: isDark
														? ColorHex.zinc[100]
														: ColorHex.zinc[900],
													border: `1px solid ${
														isDark
															? ColorHex.zinc[700]
															: ColorHex.zinc[300]
													}`,
													borderRadius: '8px',
													fontSize: '0.875rem'
												}
											},
											InputLabelProps: {
												style: {
													color: isDark
														? ColorHex.zinc[500]
														: ColorHex.zinc[600],
													fontSize: '0.875rem'
												}
											}
										},
										openPickerIcon: {
											sx: {
												color: isDark
													? ColorHex.zinc[300]
													: ColorHex.zinc[900]
											}
										},
										popper: {
											sx: {
												'& .MuiPaper-root': {
													backgroundColor: isDark
														? ColorHex.zinc[900]
														: ColorHex.white,
													border: `1px solid ${
														isDark
															? ColorHex.zinc[700]
															: ColorHex.zinc[200]
													}`,
													borderRadius: '12px'
												},
												'& .MuiPickersCalendarHeader-root':
													{
														color: isDark
															? ColorHex.zinc[300]
															: ColorHex.zinc[900]
													},
												'& .MuiDayCalendar-weekDayLabel':
													{
														color: isDark
															? ColorHex.zinc[500]
															: ColorHex.zinc[600]
													},
												'& .MuiPickersDay-root': {
													color: isDark
														? ColorHex.zinc[300]
														: ColorHex.zinc[900],
													'&:hover': {
														backgroundColor: isDark
															? ColorHex.zinc[700]
															: ColorHex.zinc[100]
													}
												},
												'& .MuiPickersDay-root.Mui-selected':
													{
														backgroundColor:
															ColorHex.red[500],
														color: ColorHex.white,
														'&:hover': {
															backgroundColor:
																ColorHex
																	.red[600]
														}
													},
												'& .MuiIconButton-root': {
													color: isDark
														? ColorHex.zinc[300]
														: ColorHex.zinc[900]
												},
												'& .MuiPickersYear-yearButton':
													{
														color: isDark
															? ColorHex.zinc[300]
															: ColorHex
																	.zinc[900],
														'&:hover': {
															backgroundColor:
																isDark
																	? ColorHex
																			.zinc[700]
																	: ColorHex
																			.zinc[100]
														},
														'&.Mui-selected': {
															backgroundColor:
																ColorHex
																	.red[500],
															color: ColorHex.white,
															'&:hover': {
																backgroundColor:
																	ColorHex
																		.red[600]
															}
														}
													}
											}
										}
									}}
									sx={{
										width: '100%'
									}}
								/>
							</LocalizationProvider>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='tipoOperacao'
								className={labelClassName}
								style={labelStyle}>
								Tipo de Operação{' '}
								<span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='tipoOperacao'
								value={selectedTipoOperacao || ''}
								options={TipoOperacao}
								onChange={(value) => {
									if (
										Object.values(TipoOperacao).includes(
											value as TipoOperacao
										)
									) {
										setSelectedTipoOperacao(
											value as TipoOperacao
										)
									}
								}}
								placeholder='Selecione o tipo de operação'
								className={inputClassName}
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='tipoCarga'
								className={labelClassName}
								style={labelStyle}>
								Tipo de Carga{' '}
								<span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='tipoCarga'
								value={selectedTipoCarga || ''}
								options={TipoCarga}
								onChange={(value) => {
									if (
										Object.values(TipoCarga).includes(
											value as TipoCarga
										)
									) {
										setSelectedTipoCarga(value as TipoCarga)
									}
								}}
								placeholder='Selecione o tipo de carga'
								className={inputClassName}
							/>
						</div>

						{selectedTipoCarga === TipoCarga.CONTAINER && (
							<>
								<div className='space-y-2'>
									<label
										htmlFor='qtdContainers'
										className={labelClassName}
										style={labelStyle}>
										Quantidade de Containers{' '}
										<span className='text-red-500'>*</span>
									</label>
									<input
										type='number'
										id='qtdContainers'
										min='1'
										value={qtdContainers}
										onChange={(e) =>
											setQtdContainers(
												Number(e.target.value)
											)
										}
										placeholder='Digite a quantidade de containers'
										className={inputClassName}
										style={inputStyle}
									/>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='qtdCarretas'
										className={labelClassName}
										style={labelStyle}>
										Quantidade de Carretas{' '}
										<span className='text-red-500'>*</span>
									</label>
									<input
										type='number'
										id='qtdCarretas'
										min='1'
										value={qtdCarretas}
										onChange={(e) =>
											setQtdCarretas(
												Number(e.target.value)
											)
										}
										placeholder='Digite a quantidade de carretas'
										className={inputClassName}
										style={inputStyle}
									/>
								</div>
							</>
						)}
					</section>

					<section className='md:col-span-2 space-y-4 sm:space-y-5'>
						<div className='space-y-2'>
							<label
								htmlFor='observacoes'
								className={labelClassName}
								style={labelStyle}>
								Observações
							</label>
							<textarea
								id='observacoes'
								value={observacoes}
								onChange={(e) => setObservacoes(e.target.value)}
								placeholder='Digite observações adicionais...'
								className='w-full rounded-lg border px-3 py-2 resize-none h-24 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500'
								style={inputStyle}
							/>
						</div>
					</section>

					<div
						className='md:col-span-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t'
						style={{
							borderColor: isDark
								? ColorHex.zinc[700]
								: ColorHex.zinc[300]
						}}>
						<button
							type='button'
							className='px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:shadow-md active:scale-95'
							style={{
								backgroundColor: isDark
									? ColorHex.red[600]
									: ColorHex.red[500],
								color: ColorHex.white
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = isDark
									? ColorHex.red[700]
									: ColorHex.red[600]
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = isDark
									? ColorHex.red[600]
									: ColorHex.red[500]
							}}
							// onClick={handleLimpar}
						>
							Limpar Formulário
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className='px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
							style={{
								backgroundColor: isDark
									? ColorHex.green[600]
									: ColorHex.green[500],
								color: ColorHex.white
							}}
							onMouseEnter={(e) => {
								if (!isLoading) {
									e.currentTarget.style.backgroundColor =
										isDark
											? ColorHex.green[700]
											: ColorHex.green[600]
								}
							}}
							onMouseLeave={(e) => {
								if (!isLoading) {
									e.currentTarget.style.backgroundColor =
										isDark
											? ColorHex.green[600]
											: ColorHex.green[500]
								}
							}}>
							{isLoading ? 'Salvando...' : 'Salvar Pedido'}
						</button>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default EditPedidoPage
