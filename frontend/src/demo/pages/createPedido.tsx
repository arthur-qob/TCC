import { useEffect, useState } from 'react'
import {
	TipoCarga,
	TipoOperacao,
	StatusPedido
} from '@/utils/types/pedido.types'
import { type Cliente } from '@/utils/types/cliente.types'
import { Container, Text } from '../components/themed'
import { useTheme } from '@/context/theme'
import { usePermissionNavigate } from '@/utils/routes'
import CustomSelect from '../components/select'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { ColorHex } from '../constants/colors'
import toast from '../components/toast'
import { mockClientes, simulateApiDelay } from '../data/mockData'

const CreatePedidoPage = () => {
	const navigate = usePermissionNavigate()
	const { actualTheme } = useTheme()
	const [clientes, setClientes] = useState<Cliente[]>([])

	const [selectedClient, setSelectedClient] = useState('')
	const [origem, setOrigem] = useState<string | null>(null)
	const [destino, setDestino] = useState<string | null>(null)
	const [selectedProgramador, setSelectedProgramador] = useState('')
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTipoCarga, setSelectedTipoCarga] =
		useState<TipoCarga | null>(null)
	const [selectedOperacao, setSelectedOperacao] =
		useState<TipoOperacao | null>(null)
	const [observacoes, setObservacoes] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		loadClients()
	}, [])

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

	const handleLimpar = () => {
		setSelectedClient('')
		setSelectedProgramador('')
		setSelectedDate(null)
		setSelectedTipoCarga(null)
		setSelectedOperacao(null)
		setObservacoes('')
		setOrigem(null)
		setDestino(null)
		setError(null)
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		const pedidoData = {
			client: selectedClient,
			programador: selectedProgramador,
			date: selectedDate,
			tipoCarga: selectedTipoCarga,
			operacao: selectedOperacao,
			origem,
			destino,
			observacoes
		}

		console.log('Pedido created (DEMO):', pedidoData)

		try {
			setIsLoading(true)
			await simulateApiDelay()

			// Após criação bem-sucedida, navegar de volta para a lista de pedidos
			alert('Pedido criado com sucesso!')
			navigate('/demo/pedidos')
		} catch (err: any) {
			setError('Erro ao criar pedido. Tente novamente.')
		} finally {
			setIsLoading(false)
		}
	}

	const origens: Record<string, string> = {
		'Cliente A': '1',
		'Cliente B': '2',
		'Cliente C': '3',
		'Cliente D': '4',
		'Cliente E': '5'
	}

	const destinos: Record<string, string> = {
		'Cliente A': '1',
		'Cliente B': '2',
		'Cliente C': '3',
		'Cliente D': '4',
		'Cliente E': '5'
	}

	return (
		<Container animate='fade-up'>
			<Text
				as='h1'
				className='font-normal'>
				Abrir Pedido
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
					onSubmit={handleSubmit}
					className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
					{error && (
						<div className='md:col-span-2 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700'>
							<p className='text-red-700 dark:text-red-300 text-sm'>
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
								defaultValue={selectedClient || ''}
								options={Object.fromEntries(
									clientes.map((client: any) => [
										client.nome,
										client.id
									])
								)}
								onChange={(value) => {
									if (
										clientes.some(
											(client: any) => client.id === value
										)
									) {
										setSelectedClient(value as string)
									}
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
								defaultValue={origem || ''}
								options={origens}
								onChange={(value) => {
									if (
										Object.values(origens).includes(
											value as string
										)
									) {
										setOrigem(value as string)
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
								defaultValue={destino || ''}
								options={destinos}
								onChange={(value) => {
									if (
										Object.values(destinos).includes(
											value as string
										)
									) {
										setDestino(value as string)
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
									value={selectedDate}
									onChange={(newValue) =>
										setSelectedDate(newValue)
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
								htmlFor='tipoCarga'
								className={labelClassName}
								style={labelStyle}>
								Tipo de Carga{' '}
								<span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='tipoCarga'
								defaultValue={selectedTipoCarga || ''}
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
								defaultValue={selectedOperacao || ''}
								options={TipoOperacao}
								onChange={(value) => {
									if (
										Object.values(TipoOperacao).includes(
											value as TipoOperacao
										)
									) {
										setSelectedOperacao(
											value as TipoOperacao
										)
									}
								}}
								placeholder='Selecione o tipo de operação'
								className={inputClassName}
							/>
						</div>
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
							onClick={handleLimpar}>
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

export default CreatePedidoPage
