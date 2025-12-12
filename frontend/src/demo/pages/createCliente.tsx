import { useEffect, useState } from 'react'
import { Container, Text } from '../components/themed'
import { useTheme } from '@/context/theme'
import { ColorHex } from '../constants/colors'
import { usePermissionNavigate } from '@/utils/routes'
import Spinner from '../components/spinner'
import toast from '../components/toast'
import { simulateApiDelay } from '../data/mockData'

const CreateClientePage = () => {
	const { actualTheme } = useTheme()
	const navigate = usePermissionNavigate()

	const [nome, setNome] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [selectedClientDoc, setSelectedClientDoc] = useState<'cpf' | 'cnpj'>(
		'cpf'
	)
	const [cpf, setCpf] = useState<string>('')
	const [cnpj, setCnpj] = useState<string>('')
	const [telefone, setTelefone] = useState<string>('')
	const [observacoes, setObservacoes] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const handleLimpar = () => {
		setNome('')
		setEmail('')
		setCpf('')
		setCnpj('')
	}

	const formatCPF = (value: string) => {
		const numbers = value.replace(/\D/g, '')
		if (numbers.length <= 3) return numbers
		if (numbers.length <= 6)
			return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
		if (numbers.length <= 9)
			return `${numbers.slice(0, 3)}.${numbers.slice(
				3,
				6
			)}.${numbers.slice(6)}`
		return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
			6,
			9
		)}-${numbers.slice(9, 11)}`
	}

	const formatCNPJ = (value: string) => {
		const numbers = value.replace(/\D/g, '')
		if (numbers.length <= 2) return numbers
		if (numbers.length <= 5)
			return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
		if (numbers.length <= 8)
			return `${numbers.slice(0, 2)}.${numbers.slice(
				2,
				5
			)}.${numbers.slice(5)}`
		if (numbers.length <= 12)
			return `${numbers.slice(0, 2)}.${numbers.slice(
				2,
				5
			)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
		return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(
			5,
			8
		)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
	}

	const formatTelefone = (value: string) => {
		const numbers = value.replace(/\D/g, '')
		if (numbers.length === 0) return ''
		if (numbers.length <= 2) return `(${numbers}`
		if (numbers.length <= 6)
			return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
		if (numbers.length <= 10)
			return `(${numbers.slice(0, 2)}) ${numbers.slice(
				2,
				6
			)}-${numbers.slice(6)}`
		// For 11 digits (9XXXX-XXXX format)
		return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
			7,
			11
		)}`
	}

	const labelClassName = 'text-sm font-medium mb-1 block'

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (
			!nome ||
			!email ||
			(selectedClientDoc === 'cpf' && !cpf) ||
			(selectedClientDoc === 'cnpj' && !cnpj)
		) {
			setError('Por favor, preencha todos os campos obrigatórios.')
			return
		}

		setLoading(true)

		try {
			await simulateApiDelay()
			
			// Importar mockClientes para adicionar o novo cliente
			const { mockClientes } = await import('../data/mockData')
			
			// Gerar novo ID (próximo ID disponível)
			const novoId = Math.max(...mockClientes.map(c => c.id)) + 1
			
			// Criar novo cliente
			const novoCliente = {
				id: novoId,
				nome,
				email,
				cpfCnpj: selectedClientDoc === 'cpf' ? cpf : cnpj,
				telefone: telefone || '',
				observacoes: observacoes || ''
			}
			
			// Adicionar ao array mockClientes
			mockClientes.push(novoCliente)
			
			console.log('Cliente criado com sucesso:', novoCliente)
			console.log('Total de clientes:', mockClientes.length)

			handleLimpar()
			toast.emitToast({
				type: 'success',
				message: 'Cliente cadastrado com sucesso!'
			})
			navigate('/demo/clientes')
		} catch (err: any) {
			console.error('Error creating client:', err)
			const errorMessage =
				err.message || 'Erro ao criar cliente. Tente novamente.'
			setError(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (error) {
			toast.emitToast({
				type: 'error',
				message: error
			})
		}
	}, [error])

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

	return (
		<Container animate='fade-up'>
			<Text
				as='h1'
				className='font-normal'>
				Cadastrar Cliente
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
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
					<section className='md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-5'>
						<div className='space-y-2'>
							<label
								htmlFor='nome'
								className={labelClassName}
								style={labelStyle}>
								Nome do Cliente{' '}
								<span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome'
								id='nome'
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								className={inputClassName}
								style={inputStyle}
								placeholder='Digite o nome do cliente'
							/>
						</div>
						<div className='space-y-2'>
							<label
								htmlFor='email'
								className={labelClassName}
								style={labelStyle}>
								Email <span className='text-red-500'>*</span>
							</label>
							<input
								type='email'
								name='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={inputClassName}
								style={inputStyle}
								placeholder='cliente@exemplo.com'
							/>
						</div>
						<div className='space-y-2'>
							<label
								className={labelClassName}
								style={labelStyle}>
								Tipo de Documento{' '}
								<span className='text-red-500'>*</span>
							</label>
							<div className='flex gap-3'>
								<button
									type='button'
									onClick={() => setSelectedClientDoc('cpf')}
									className='flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200'
									style={{
										backgroundColor:
											selectedClientDoc === 'cpf'
												? isDark
													? ColorHex.red[900]
													: ColorHex.red[500]
												: isDark
												? ColorHex.zinc[800]
												: ColorHex.zinc[200],
										color:
											selectedClientDoc === 'cpf'
												? ColorHex.white
												: isDark
												? ColorHex.zinc[300]
												: ColorHex.zinc[700],
										border: `2px solid ${
											selectedClientDoc === 'cpf'
												? isDark
													? ColorHex.red[600]
													: ColorHex.red[500]
												: isDark
												? ColorHex.zinc[700]
												: ColorHex.zinc[300]
										}`
									}}>
									CPF
								</button>
								<button
									type='button'
									onClick={() => setSelectedClientDoc('cnpj')}
									className='flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200'
									style={{
										backgroundColor:
											selectedClientDoc === 'cnpj'
												? isDark
													? ColorHex.red[900]
													: ColorHex.red[500]
												: isDark
												? ColorHex.zinc[800]
												: ColorHex.zinc[200],
										color:
											selectedClientDoc === 'cnpj'
												? ColorHex.white
												: isDark
												? ColorHex.zinc[300]
												: ColorHex.zinc[700],
										border: `2px solid ${
											selectedClientDoc === 'cnpj'
												? isDark
													? ColorHex.red[700]
													: ColorHex.red[500]
												: isDark
												? ColorHex.zinc[700]
												: ColorHex.zinc[300]
										}`
									}}>
									CNPJ
								</button>
							</div>
						</div>{' '}
						{selectedClientDoc === 'cpf' ? (
							<div className='space-y-2'>
								<label
									htmlFor='cpf'
									className={labelClassName}
									style={labelStyle}>
									CPF <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									name='cpf'
									id='cpf'
									value={cpf}
									onChange={(e) => {
										const formatted = formatCPF(
											e.target.value
										)
										if (
											formatted.replace(/\D/g, '')
												.length <= 11
										) {
											setCpf(formatted)
										}
									}}
									className={inputClassName}
									style={inputStyle}
									placeholder='XXX.XXX.XXX-XX'
									maxLength={14}
								/>
							</div>
						) : (
							<div className='space-y-2'>
								<label
									htmlFor='cnpj'
									className={labelClassName}
									style={labelStyle}>
									CNPJ <span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									name='cnpj'
									id='cnpj'
									value={cnpj}
									onChange={(e) => {
										const formatted = formatCNPJ(
											e.target.value
										)
										if (
											formatted.replace(/\D/g, '')
												.length <= 14
										) {
											setCnpj(formatted)
										}
									}}
									className={inputClassName}
									style={inputStyle}
									placeholder='XX.XXX.XXX/000X-XX'
									maxLength={18}
								/>
							</div>
						)}
						<div className='space-y-2'>
							<label
								htmlFor='telefone'
								className={labelClassName}
								style={labelStyle}>
								Telefone
							</label>

							<input
								id='telefone'
								type='tel'
								value={telefone}
								onChange={(e) => {
									const formatted = formatTelefone(
										e.target.value
									)
									if (
										formatted.replace(/\D/g, '').length <=
										11
									) {
										setTelefone(formatted)
									}
								}}
								className={inputClassName}
								style={inputStyle}
								placeholder='(XX) XXXXX-XXXX'
								maxLength={15}
							/>
						</div>
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
								className={inputClassName}
								style={inputStyle}
								placeholder='Observações adicionais'
								rows={4}></textarea>
						</div>
					</section>

					{/* Profile Picture Section */}
					<section className='flex flex-col items-center justify-start md:col-span-2 lg:col-span-1'>
						<label
							className={`${labelClassName} text-center mb-3`}
							style={labelStyle}>
							Foto de Perfil
						</label>
						<div
							className='rounded-xl w-full max-w-[200px] sm:max-w-[250px] h-[200px] sm:h-[250px] flex flex-col items-center justify-center text-center border-2 border-dashed transition-colors hover:border-blue-500 cursor-pointer'
							style={{
								backgroundColor: isDark
									? ColorHex.zinc[800]
									: ColorHex.zinc[100],
								borderColor: isDark
									? ColorHex.zinc[700]
									: ColorHex.zinc[300],
								color: isDark
									? ColorHex.zinc[400]
									: ColorHex.zinc[600]
							}}>
							<svg
								className='w-16 h-16 mb-3'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M12 4v16m8-8H4'
								/>
							</svg>
							<p className='text-sm px-4'>
								Clique para adicionar uma foto de perfil
							</p>
						</div>
					</section>
				</form>

				{/* Action Buttons */}
				<div
					className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t'
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
						onClick={handleSubmit}
						disabled={loading}>
						{loading ? <Spinner /> : 'Cadastrar Cliente'}
					</button>
				</div>
			</div>
		</Container>
	)
}

export default CreateClientePage
