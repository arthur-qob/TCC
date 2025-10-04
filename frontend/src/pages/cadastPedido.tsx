import { useState } from 'react'
import { Container, Text } from '../components/themed'
import { useTheme } from '../context/theme'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { Select, Option } from '@mui/joy'

const CadastrarPedido = () => {
	const { actualTheme } = useTheme()
	const [selectedClient, setSelectedClient] = useState('')
	const [selectedProgramador, setSelectedProgramador] = useState('')
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTipoCarga, setSelectedTipoCarga] = useState('')
	const [selectedOperacao, setSelectedOperacao] = useState('')

	const isDark = actualTheme === 'dark'

	const selectStyles = {
		backgroundColor: isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
		color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
		transition: 'all 0.3s',
		'&:hover': {
			backgroundColor: isDark ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)'
		}
	}

	const listboxStyles = {
		backgroundColor: isDark ? 'rgb(26, 26, 26)' : 'rgb(255, 255, 255)',
		color: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'
	}

	const handleCancel = () => {
		setSelectedClient('')
		setSelectedProgramador('')
		setSelectedDate(null)
		setSelectedTipoCarga('')
		setSelectedOperacao('')
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
		<Container className='flex flex-col items-center justify-center min-h-screen p-8'>
			<div className='w-full max-w-2xl' data-aos='fade-up'>
				<Text className='text-3xl font-normal mb-8'>
					Cadastrar pedido
				</Text>

				<div
					className='rounded-lg p-8 space-y-6'
					style={{
						backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
						border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`
					}}>
					{/* Cliente */}
					<Text>Cliente</Text>
					<Select
						value={selectedClient}
						onChange={(_, newValue) =>
							setSelectedClient(newValue as string)
						}
						placeholder='Selecione o cliente'
						color='neutral'
						variant='outlined'
						size='lg'
						sx={selectStyles}
						slotProps={{
							listbox: {
								sx: listboxStyles
							}
						}}>
						<Option value=''>Selecione o cliente</Option>
						<Option value='3 Corações'>3 Corações</Option>
						<Option value='Ambev'>Ambev</Option>
						<Option value='Nestlé'>Nestlé</Option>
						<Option value='BRF'>BRF</Option>
						<Option value='JBS'>JBS</Option>
						<Option value='Coca-Cola'>Coca-Cola</Option>
					</Select>

					{/* Programador */}
					<Text>Programador</Text>
					<Select
						value={selectedProgramador}
						onChange={(_, newValue) =>
							setSelectedProgramador(newValue as string)
						}
						placeholder='Selecione o Programador'
						color='neutral'
						variant='outlined'
						size='lg'
						sx={selectStyles}
						slotProps={{
							listbox: {
								sx: listboxStyles
							}
						}}>
						<Option value=''>Selecione o Programador</Option>
						<Option value='João Silva'>João Silva</Option>
						<Option value='Maria Santos'>Maria Santos</Option>
						<Option value='Carlos Pereira'>Carlos Pereira</Option>
						<Option value='Ana Costa'>Ana Costa</Option>
					</Select>

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
								onChange={(newValue) =>
									setSelectedDate(newValue)
								}
								sx={{
									backgroundColor: isDark
										? '#2a2a2a'
										: '#f5f5f5',
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
											backgroundColor:
												'rgba(220, 38, 38, 1)'
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
					<Select
						value={selectedTipoCarga}
						onChange={(_, newValue) =>
							setSelectedTipoCarga(newValue as string)
						}
						placeholder='Selecione o Tipo de carga'
						color='neutral'
						variant='outlined'
						size='lg'
						sx={selectStyles}
						slotProps={{
							listbox: {
								sx: listboxStyles
							}
						}}>
						<Option value=''>Selecione o Tipo de carga</Option>
						<Option value='CONTAINER'>CONTAINER</Option>
						<Option value='CARGA SOLTA'>CARGA SOLTA</Option>
					</Select>

					{/* Operação */}
					<Text>Operação</Text>
					<Select
						value={selectedOperacao}
						onChange={(_, newValue) =>
							setSelectedOperacao(newValue as string)
						}
						placeholder='Selecione o Tipo de operação'
						color='neutral'
						variant='outlined'
						size='lg'
						sx={selectStyles}
						slotProps={{
							listbox: {
								sx: listboxStyles
							}
						}}>
						<Option value=''>Selecione o Tipo de operação</Option>
						<Option value='REDEX'>REDEX</Option>
						<Option value='RODOV'>RODOV</Option>
						<Option value='RODOC'>RODOC</Option>
					</Select>

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
			</div>
		</Container>
	)
}

export default CadastrarPedido
