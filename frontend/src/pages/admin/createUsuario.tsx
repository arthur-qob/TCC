import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomSelect from '../../components/select'
import { Container, Text } from '../../components/themed'
import { useTheme } from '../../context/theme'
import type { UserRole } from '../../utils/types'
import {
	CategoriasMotorista,
	StatusMotorista,
	UserRoles
} from '../../utils/types'
import { userService } from '../../services/userService'

const CreateUsuarioPage = () => {
	const { actualTheme } = useTheme()
	const navigate = useNavigate()

	const [nome, setNome] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
	const [categHabilitacao, setCategHabilitacao] =
		useState<CategoriasMotorista | null>(null)
	const [statusMotorista, setStatusMotorista] = useState<StatusMotorista>(
		StatusMotorista.ATIVO
	)
	const [frotaId, setFrotaId] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleLimpar = () => {
		setNome('')
		setEmail('')
		setPassword('')
		setSelectedRole(null)
		setCategHabilitacao(null)
		setStatusMotorista(StatusMotorista.ATIVO)
		setFrotaId('')
		setError(null)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		// Validation
		if (!nome || !email || !password || !selectedRole) {
			setError('Por favor, preencha todos os campos obrigatórios')
			return
		}

		if (password.length < 6) {
			setError('A senha deve ter no mínimo 6 caracteres')
			return
		}

		if (selectedRole === UserRoles.MOTORISTA && !categHabilitacao) {
			setError('Por favor, selecione a categoria de habilitação')
			return
		}

		setIsLoading(true)

		try {
			const baseData = {
				name: nome,
				email,
				password,
				dataInicio: new Date().toISOString().split('T')[0]
			}

			switch (selectedRole) {
				case UserRoles.ADMIN:
					await userService.createAdmin(baseData)
					break
				case UserRoles.PROGRAMADOR:
					await userService.createProgramador(baseData)
					break
				case UserRoles.MOTORISTA:
					await userService.createMotorista({
						...baseData,
						categoria: categHabilitacao!,
						status: statusMotorista,
						frotaId: frotaId ? parseInt(frotaId) : undefined
					})
					break
				case UserRoles.GERENTE_FROTA:
					await userService.createGerenteFrota(baseData)
					break
				case UserRoles.GERENTE_RISCO:
					await userService.createGerenteRisco(baseData)
					break
				case UserRoles.FOCAL:
					await userService.createFocal(baseData)
					break
				default:
					throw new Error('Tipo de usuário inválido')
			}

			// Success - clear form and navigate
			handleLimpar()
			alert('Usuário criado com sucesso!')
			navigate('/admin/users')
		} catch (err: any) {
			console.error('Error creating user:', err)
			const errorMessage =
				err.response?.data?.message ||
				err.response?.data?.errors?.[0] ||
				'Erro ao criar usuário. Tente novamente.'
			setError(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}

	const inputClassName = `w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
		actualTheme === 'dark'
			? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
			: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
	}`

	const labelClassName = `text-sm font-medium mb-1 block ${
		actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
	}`

	return (
		<Container>
			<Text
				as='h1'
				className='font-normal'>
				Cadastrar Usuário
			</Text>

			<div
				className='rounded-xl shadow-lg p-8'
				style={{
					backgroundColor:
						actualTheme === 'dark' ? '#1a1a1a' : '#ffffff',
					border: `1px solid ${
						actualTheme === 'dark' ? '#333' : '#e5e5e5'
					}`
				}}>
				<form
					onSubmit={handleSubmit}
					className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{error && (
						<div className='lg:col-span-3 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700'>
							<p className='text-red-700 dark:text-red-300 text-sm'>
								{error}
							</p>
						</div>
					)}

					<section className='lg:col-span-2 space-y-5'>
						<div className='space-y-2'>
							<label
								htmlFor='nome'
								className={labelClassName}>
								Nome Completo{' '}
								<span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='nome'
								id='nome'
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								className={inputClassName}
								placeholder='Digite o nome completo'
								required
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='email'
								className={labelClassName}>
								Email <span className='text-red-500'>*</span>
							</label>
							<input
								type='email'
								name='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={inputClassName}
								placeholder='usuario@exemplo.com'
								required
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='password'
								className={labelClassName}>
								Senha <span className='text-red-500'>*</span>
							</label>
							<input
								type='password'
								name='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={inputClassName}
								placeholder='Mínimo 6 caracteres'
								minLength={6}
								required
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='role'
								className={labelClassName}>
								Papel do Usuário{' '}
								<span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='role'
								defaultValue={selectedRole || ''}
								options={UserRoles}
								onChange={(value) => {
									if (
										Object.values(UserRoles).includes(
											value as UserRole
										)
									) {
										setSelectedRole(value as UserRole)
									}
								}}
								placeholder='Selecione o papel do usuário'
							/>
						</div>

						{selectedRole === UserRoles.MOTORISTA && (
							<div
								className='space-y-5 pt-4 border-t'
								style={{
									borderColor:
										actualTheme === 'dark'
											? '#333'
											: '#e5e5e5'
								}}>
								<h3
									className={`text-lg font-medium ${
										actualTheme === 'dark'
											? 'text-gray-200'
											: 'text-gray-800'
									}`}>
									Informações do Motorista
								</h3>

								<div className='space-y-2'>
									<label
										htmlFor='frota'
										className={labelClassName}>
										Frota ID
									</label>
									<input
										id='frota'
										type='number'
										value={frotaId}
										onChange={(e) =>
											setFrotaId(e.target.value)
										}
										className={inputClassName}
										placeholder='ID da frota (opcional)'
									/>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='status'
										className={labelClassName}>
										Status{' '}
										<span className='text-red-500'>*</span>
									</label>
									<CustomSelect
										id='status'
										defaultValue={statusMotorista}
										options={StatusMotorista}
										onChange={(value) =>
											setStatusMotorista(
												value as StatusMotorista
											)
										}
										placeholder='Selecione o status'
									/>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='habilitacao'
										className={labelClassName}>
										Categoria de Habilitação{' '}
										<span className='text-red-500'>*</span>
									</label>
									<CustomSelect
										id='habilitacao'
										defaultValue=''
										options={CategoriasMotorista}
										onChange={(value) =>
											setCategHabilitacao(
												value as CategoriasMotorista
											)
										}
										placeholder='Selecione a categoria'
									/>
								</div>
							</div>
						)}
					</section>

					{/* Profile Picture Section */}
					<section className='flex flex-col items-center justify-start'>
						<label className={`${labelClassName} text-center mb-3`}>
							Foto de Perfil
						</label>
						<div
							className='rounded-xl w-full max-w-[250px] h-[250px] flex flex-col items-center justify-center text-center border-2 border-dashed transition-colors hover:border-blue-500 cursor-pointer'
							style={{
								backgroundColor:
									actualTheme === 'dark'
										? '#2a2a2a'
										: '#f3f4f6',
								borderColor:
									actualTheme === 'dark' ? '#444' : '#d1d5db',
								color:
									actualTheme === 'dark'
										? '#9ca3af'
										: '#6b7280'
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
					className='flex justify-between items-center mt-8 pt-6 border-t'
					style={{
						borderColor: actualTheme === 'dark' ? '#333' : '#e5e5e5'
					}}>
					<button
						type='button'
						className='px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95'
						style={{
							backgroundColor:
								actualTheme === 'dark' ? '#dc2626' : '#ef4444',
							color: '#ffffff'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								actualTheme === 'dark' ? '#b91c1c' : '#dc2626'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor =
								actualTheme === 'dark' ? '#dc2626' : '#ef4444'
						}}
						onClick={handleLimpar}>
						Limpar Formulário
					</button>
					<button
						type='submit'
						disabled={isLoading}
						className='px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
						style={{
							backgroundColor:
								actualTheme === 'dark' ? '#16a34a' : '#22c55e',
							color: '#ffffff'
						}}
						onMouseEnter={(e) => {
							if (!isLoading) {
								e.currentTarget.style.backgroundColor =
									actualTheme === 'dark'
										? '#15803d'
										: '#16a34a'
							}
						}}
						onMouseLeave={(e) => {
							if (!isLoading) {
								e.currentTarget.style.backgroundColor =
									actualTheme === 'dark'
										? '#16a34a'
										: '#22c55e'
							}
						}}>
						{isLoading ? 'Cadastrando...' : 'Cadastrar Usuário'}
					</button>
				</div>
			</div>
		</Container>
	)
}

export default CreateUsuarioPage
