import { useState } from 'react'
import {
	TipoCarga,
	TipoOperacao,
	StatusPedido
} from '@/utils/types/pedido.types'
import { Container, Text } from '../components/themed'
import { useTheme } from '../context/theme'
import { usePermissionNavigate } from '@/utils/routes'
import CustomSelect from '@/components/select'
import Spinner from '@/components/spinner'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { Colors, ColorHex, getColor } from '@/constants/colors'

const CreatePedidoPage = () => {
	const navigate = usePermissionNavigate()
	const { actualTheme } = useTheme()

	const [selectedClient, setSelectedClient] = useState('')
	const [origem, setOrigem] = useState<string | null>(null)
	const [destino, setDestino] = useState<string | null>(null)
	const [selectedProgramador, setSelectedProgramador] = useState('')
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTipoCarga, setSelectedTipoCarga] =
		useState<TipoCarga | null>(null)
	const [selectedOperacao, setSelectedOperacao] =
		useState<TipoOperacao | null>(null)
	const [selectedStatus, setSelectedStatus] = useState<StatusPedido | null>(
		null
	)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleLimpar = () => {
		setSelectedClient('')
		setSelectedProgramador('')
		setSelectedDate(null)
		setSelectedTipoCarga(null)
		setSelectedOperacao(null)
		setSelectedStatus(null)
		setError(null)
	}

	const isDark = actualTheme === 'dark'

	const handleSubmit = () => {
		console.log({
			client: selectedClient,
			programador: selectedProgramador,
			date: selectedDate,
			tipoCarga: selectedTipoCarga,
			operacao: selectedOperacao
		})
	}

	const clientes: Record<string, string> = {
		'Cliente A': '1',
		'Cliente B': '2',
		'Cliente C': '3',
		'Cliente D': '4',
		'Cliente E': '5'
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
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<Text className='w-fit capitalize text-2xl font-medium'>
				Abrir Pedido
			</Text>

			<div
				className={`rounded-xl shadow-lg p-4 sm:p-6 md:p-8 bg-${getColor(
					'card',
					isDark ? 'dark' : 'light'
				)} border border-${getColor(
					'border',
					isDark ? 'dark' : 'light'
				)}`}>
				<form
					onSubmit={handleSubmit}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
					{error && (
						<div className='md:col-span-2 lg:col-span-3 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700'>
							<p className='text-red-700 dark:text-red-300 text-sm'>
								{error}
							</p>
						</div>
					)}
					<section className='md:col-span-2 lg:col-span-1 space-y-4 sm:space-y-5'>
						<div className='space-y-2'>
							<CustomSelect
								id='role'
								defaultValue={selectedClient || ''}
								options={clientes}
								onChange={(value) => {
									if (
										Object.values(clientes).includes(
											value as string
										)
									) {
										setSelectedClient(value as string)
									}
								}}
								placeholder='Selecione o cliente'
							/>
						</div>

						<div className='space-y-2'>
							<CustomSelect
								id='role'
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
							/>
						</div>

						<div className='space-y-2'>
							<CustomSelect
								id='role'
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
							/>
						</div>
					</section>
					<section className='md:col-span-2 lg:col-span-1 space-y-4 sm:space-y-5'>
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
													? ColorHex.zinc[900]
													: ColorHex.white,
												color: isDark
													? ColorHex.zinc[300]
													: ColorHex.zinc[900],
												border: `1px solid ${
													isDark
														? ColorHex.zinc[700]
														: ColorHex.zinc[200]
												}`,
												borderRadius: '8px',
												fontSize: '0.875rem',
												boxShadow: isDark
													? '0 2px 4px rgba(0,0,0, 0.5)'
													: '0 2px 4px rgba(0,0,0, 0.05)'
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
												borderRadius: '12px',
												boxShadow: isDark
													? '0 2px 4px rgba(0,0,0, 0.5)'
													: '0 2px 4px rgba(0,0,0, 0.05)'
											},
											'& .MuiPickersCalendarHeader-root':
												{
													color: isDark
														? ColorHex.zinc[300]
														: ColorHex.zinc[900]
												},
											'& .MuiDayCalendar-weekDayLabel': {
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
															ColorHex.red[600]
													}
												},
											'& .MuiIconButton-root': {
												color: isDark
													? ColorHex.zinc[300]
													: ColorHex.zinc[900]
											},
											'& .MuiPickersYear-yearButton': {
												color: isDark
													? ColorHex.zinc[300]
													: ColorHex.zinc[900],
												'&:hover': {
													backgroundColor: isDark
														? ColorHex.zinc[700]
														: ColorHex.zinc[100]
												},
												'&.Mui-selected': {
													backgroundColor:
														ColorHex.red[500],
													color: ColorHex.white,
													'&:hover': {
														backgroundColor:
															ColorHex.red[600]
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

						<div className='space-y-2'>
							<CustomSelect
								id='role'
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
							/>
						</div>

						<div className='space-y-2'>
							<CustomSelect
								id='role'
								defaultValue={selectedClient || ''}
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
							/>
						</div>
					</section>

					<section className='md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-5'>
						<textarea
							placeholder='Observações'
							className={`w-full p-2 border rounded-md resize-none h-24 bg-${getColor(
								'input.background',
								isDark ? 'dark' : 'light'
							)} text-${getColor(
								'text.primary',
								isDark ? 'dark' : 'light'
							)} border-${getColor(
								'input.border',
								isDark ? 'dark' : 'light'
							)}`}></textarea>
					</section>

					<section
						className={`md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-${getColor(
							'border',
							isDark ? 'dark' : 'light'
						)}`}>
						<button
							type='button'
							className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm sm:text-base text-white transition-all duration-200 hover:shadow-md active:scale-95 bg-${getColor(
								'primary',
								isDark ? 'dark' : 'light'
							)} hover:bg-${getColor(
								'primaryHover',
								isDark ? 'dark' : 'light'
							)}`}
							onClick={handleLimpar}>
							Limpar Formulário
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm sm:text-base text-white transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-${getColor(
								'success',
								isDark ? 'dark' : 'light'
							)} hover:bg-${getColor(
								'successHover',
								isDark ? 'dark' : 'light'
							)}`}>
							{isLoading ? <Spinner /> : 'Salvar'}
						</button>
					</section>
				</form>
			</div>
		</Container>
	)
}

export default CreatePedidoPage
