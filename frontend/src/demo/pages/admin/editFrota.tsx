import { useEffect, useState } from 'react'
import { Container, Text } from '../../components/themed'
import { useTheme } from '@/context/theme'
import { ColorHex } from '../../constants/colors'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/spinner'
import toast from '../../components/toast'
import { simulateApiDelay, mockFrotas, mockUsuarios } from '../../data/mockData'
import { UserRoles } from '@/utils/types/user.types'

const EditFrotaPage = () => {
	const { actualTheme } = useTheme()
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()

	const [placa, setPlaca] = useState<string>('')
	const [status, setStatus] = useState<'DISPONIVEL' | 'INDISPONIVEL' | 'EM_MANUTENCAO'>('DISPONIVEL')
	const [motoristaId, setMotoristaId] = useState<number | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [isLoadingData, setIsLoadingData] = useState(true)

	// Filtrar apenas motoristas
	const motoristas = mockUsuarios.filter(u => u.tipo === UserRoles.MOTORISTA)

	useEffect(() => {
		loadFrota()
	}, [id])

	const loadFrota = async () => {
		try {
			setIsLoadingData(true)
			await simulateApiDelay()

			const frota = mockFrotas.find(f => f.id === Number(id))

			if (!frota) {
				setError('Frota não encontrada')
				toast.emitToast({
					type: 'error',
					message: 'Frota não encontrada'
				})
				navigate('/demo/admin/frotas')
				return
			}

			setPlaca(frota.placa)
			setStatus(frota.status)
			setMotoristaId(frota.motoristaId)
		} catch (err: any) {
			console.error('Error loading frota:', err)
			setError('Erro ao carregar frota')
		} finally {
			setIsLoadingData(false)
		}
	}

	// Formatar placa brasileira (ABC1234 ou ABC1D23)
	const formatPlaca = (value: string) => {
		const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
		
		if (cleaned.length <= 3) {
			return cleaned
		} else if (cleaned.length <= 7) {
			return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
		}
		
		return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		// Validação
		const placaLimpa = placa.replace(/[^A-Za-z0-9]/g, '')
		
		if (!placa) {
			setError('Por favor, preencha a placa do veículo.')
			return
		}

		if (placaLimpa.length !== 7) {
			setError('A placa deve ter 7 caracteres (ex: ABC-1234).')
			return
		}

		setLoading(true)

		try {
			await simulateApiDelay()
			
			// Encontrar e atualizar a frota
			const frotaIndex = mockFrotas.findIndex(f => f.id === Number(id))
			
			if (frotaIndex === -1) {
				throw new Error('Frota não encontrada')
			}

			mockFrotas[frotaIndex] = {
				...mockFrotas[frotaIndex],
				placa: placa.toUpperCase(),
				status: status,
				motoristaId: motoristaId
			}
			
			console.log('Frota atualizada:', mockFrotas[frotaIndex])

			toast.emitToast({
				type: 'success',
				message: 'Frota atualizada com sucesso!'
			})
			navigate('/demo/admin/frotas')
		} catch (err: any) {
			console.error('Error updating frota:', err)
			const errorMessage =
				err.message || 'Erro ao atualizar frota. Tente novamente.'
			setError(errorMessage)
			toast.emitToast({
				type: 'error',
				message: errorMessage
			})
		} finally {
			setLoading(false)
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

	if (isLoadingData) {
		return (
			<Container animate='fade-up'>
				<div className='flex justify-center items-center min-h-[400px]'>
					<Spinner />
				</div>
			</Container>
		)
	}

	return (
		<Container animate='fade-up'>
			<Text
				as='h1'
				className='font-normal'>
				Editar Frota
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
					className='space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Placa */}
						<div className='space-y-2'>
							<label
								htmlFor='placa'
								className={labelClassName}
								style={labelStyle}>
								Placa do Veículo{' '}
								<span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='placa'
								id='placa'
								value={placa}
								onChange={(e) => {
									const formatted = formatPlaca(e.target.value)
									if (
										formatted.replace(/[^A-Za-z0-9]/g, '')
											.length <= 7
									) {
										setPlaca(formatted)
									}
								}}
								className={inputClassName}
								style={inputStyle}
								placeholder='ABC-1234'
								maxLength={8}
							/>
							<p className='text-xs text-gray-500'>
								Formato: 3 letras + 4 números (ex: ABC-1234 ou
								ABC-1D23)
							</p>
						</div>

						{/* Status */}
						<div className='space-y-2'>
							<label
								htmlFor='status'
								className={labelClassName}
								style={labelStyle}>
								Status do Veículo{' '}
								<span className='text-red-500'>*</span>
							</label>
							<select
								id='status'
								value={status}
								onChange={(e) =>
									setStatus(e.target.value as 'DISPONIVEL' | 'INDISPONIVEL' | 'EM_MANUTENCAO')
								}
								className={inputClassName}
								style={inputStyle}>
								<option value='DISPONIVEL'>
									Disponível
								</option>
								<option value='INDISPONIVEL'>
									Indisponível
								</option>
								<option value='EM_MANUTENCAO'>
									Em Manutenção
								</option>
							</select>
						</div>

						{/* Motorista */}
						<div className='space-y-2 md:col-span-2'>
							<label
								htmlFor='motorista'
								className={labelClassName}
								style={labelStyle}>
								Motorista (Opcional)
							</label>
							<select
								id='motorista'
								value={motoristaId || ''}
								onChange={(e) =>
									setMotoristaId(e.target.value ? Number(e.target.value) : null)
								}
								className={inputClassName}
								style={inputStyle}>
								<option value=''>Sem motorista</option>
								{motoristas.map(motorista => (
									<option key={motorista.id} value={motorista.id}>
										{motorista.nome} ({motorista.email})
									</option>
								))}
							</select>
							<p className='text-xs text-gray-500'>
								Selecione um motorista para vincular à frota
							</p>
						</div>
					</div>

					{/* Status Visual */}
					<div
						className='p-4 rounded-lg border'
						style={{
							backgroundColor: isDark
								? ColorHex.zinc[800]
								: ColorHex.zinc[100],
							borderColor: isDark
								? ColorHex.zinc[700]
								: ColorHex.zinc[300]
						}}>
						<p className='text-sm font-medium mb-2' style={labelStyle}>
							Resumo:
						</p>
						<div className='flex flex-wrap gap-2'>
							<span
								className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
									status === 'DISPONIVEL'
										? 'bg-green-500 text-white'
										: status === 'INDISPONIVEL'
										? 'bg-red-500 text-white'
										: 'bg-yellow-500 text-white'
								}`}>
								{status === 'DISPONIVEL'
									? '🟢 Disponível'
									: status === 'INDISPONIVEL'
									? '🔴 Indisponível'
									: '🟡 Em Manutenção'}
							</span>
							{motoristaId && (
								<span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white'>
									👤 {motoristas.find(m => m.id === motoristaId)?.nome}
								</span>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					<div
						className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-6 border-t'
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
									? ColorHex.zinc[600]
									: ColorHex.zinc[500],
								color: ColorHex.white
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = isDark
									? ColorHex.zinc[700]
									: ColorHex.zinc[600]
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = isDark
									? ColorHex.zinc[600]
									: ColorHex.zinc[500]
							}}
							onClick={() => navigate('/demo/admin/frotas')}>
							Cancelar
						</button>
						<button
							type='submit'
							className='px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:shadow-md active:scale-95'
							style={{
								backgroundColor: isDark
									? ColorHex.green[600]
									: ColorHex.green[500],
								color: ColorHex.white
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = isDark
									? ColorHex.green[700]
									: ColorHex.green[600]
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = isDark
									? ColorHex.green[600]
									: ColorHex.green[500]
							}}
							disabled={loading}>
							{loading ? <Spinner /> : 'Salvar Alterações'}
						</button>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default EditFrotaPage
