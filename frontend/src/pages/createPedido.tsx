import { useState } from 'react'
import { Container, Text } from '../components/themed'
import { useTheme } from '../context/theme'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import CustomSelect from '../components/select'
import { TipoCarga, TipoOperacao } from '../utils/types'
import { useNavigate } from 'react-router-dom'

const CreatePedidoPage = () => {
	const { actualTheme } = useTheme()
	const [selectedClient, setSelectedClient] = useState('')
	const [selectedProgramador, setSelectedProgramador] = useState('')
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTipoCarga, setSelectedTipoCarga] = useState('')
	const [selectedOperacao, setSelectedOperacao] = useState('')

	const navigate = useNavigate()

	const isDark = actualTheme === 'dark'

	const handleCancel = () => {
		setSelectedClient('')
		setSelectedProgramador('')
		setSelectedDate(null)
		setSelectedTipoCarga('')
		setSelectedOperacao('')

		navigate('/dashboard')
	}

	const handleSubmit = () => {
		console.log({
			client: selectedClient,
			programador: selectedProgramador,
			date: selectedDate,
			tipoCarga: selectedTipoCarga,
			operacao: selectedOperacao
		})
	}

	return (
		<Container>
			<Text
				as='h1'
				className='font-normal'>
				Abrir pedido
			</Text>

			<div
				className='rounded-lg p-8 space-y-6'
				style={{
					backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
					border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`
				}}>
				{/* Cliente */}
				<Text>Cliente</Text>
				{/* <CustomSelect /> */}

				{/* Programador */}
				<Text>Programador</Text>
				{/* <CustomSelect /> */}

				{/* Data do pedido */}
				<div className='space-y-2'>
					<label
						className='block text-sm'
						style={{
							color: isDark ? '#ffffff' : '#000000'
						}}>
						Data do pedido
					</label>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={ptBR}>
						<DateCalendar
							value={selectedDate}
							onChange={(newValue) => setSelectedDate(newValue)}
							sx={{
								backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
								borderRadius: '8px',
								width: 'fit-content',
								'& .MuiPickersCalendarHeader-root': {
									color: isDark ? '#ffffff' : '#000000'
								},
								'& .MuiDayCalendar-weekDayLabel': {
									color: isDark ? '#888' : '#666'
								},
								'& .MuiPickersDay-root': {
									color: isDark ? '#ffffff' : '#000000',
									'&:hover': {
										backgroundColor: isDark
											? '#444'
											: '#e0e0e0'
									}
								},
								'& .MuiPickersDay-root.Mui-selected': {
									backgroundColor: 'rgba(220, 38, 38, 1)',
									color: '#ffffff',
									'&:hover': {
										backgroundColor: 'rgba(220, 38, 38, 1)'
									}
								},
								'& .MuiIconButton-root': {
									color: isDark ? '#ffffff' : '#000000'
								}
							}}
						/>
					</LocalizationProvider>
				</div>

				{/* Tipo da carga */}
				<Text>Tipo da carga</Text>
				<CustomSelect options={TipoCarga} />

				{/* Operação */}
				<Text>Operação</Text>
				<CustomSelect options={TipoOperacao} />

				{/* Buttons */}
				<div className='flex justify-end gap-4 pt-4'>
					<button
						onClick={handleCancel}
						className='px-6 py-2.5 rounded-lg font-medium transition-colors'
						style={{
							backgroundColor: 'rgba(220, 38, 38, 1)',
							color: '#ffffff'
						}}>
						Cancelar
					</button>
					<button
						onClick={handleSubmit}
						className='px-6 py-2.5 rounded-lg font-medium transition-colors'
						style={{
							backgroundColor: '#0fdb6e',
							color: '#ffffff'
						}}>
						Criar Pedido
					</button>
				</div>
			</div>
		</Container>
	)
}

export default CreatePedidoPage
