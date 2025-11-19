import { useState } from 'react'
import { usePermissionNavigate } from '@/utils/routes'
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
import { ColorHex } from '@/constants/colors'

const CreateUsuarioPage = () => {
	const { actualTheme } = useTheme()
	const navigate = usePermissionNavigate()

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

			console.log('Creating user with role:', selectedRole)
			console.log('Data:', baseData)

			let response
			switch (selectedRole) {
				case UserRoles.ADMIN:
					response = await userService.createAdmin(baseData)
					break
				case UserRoles.PROGRAMADOR:
					response = await userService.createProgramador(baseData)
					break
				case UserRoles.MOTORISTA:
					response = await userService.createMotorista({
						...baseData,
						categoria: categHabilitacao!,
						status: statusMotorista,
						frotaId: frotaId ? parseInt(frotaId) : undefined
					})
					break
				case UserRoles.GERENTE_FROTA:
					response = await userService.createGerenteFrota(baseData)
					break
				case UserRoles.GERENTE_RISCO:
					response = await userService.createGerenteRisco(baseData)
					break
				case UserRoles.FOCAL:
					response = await userService.createFocal(baseData)
					break
				default:
					throw new Error('Tipo de usuário inválido')
			}

			console.log('User created successfully:', response)

			// Success - clear form and navigate
			handleLimpar()
			alert('Usuário criado com sucesso!')
			navigate('/admin/usuarios')
		} catch (err: any) {
			console.error('Error creating user:', err)
			console.error('Error response:', err.response)
			console.error('Error data:', err.response?.data)
			const errorMessage =
				err.response?.data?.message ||
				err.response?.data?.errors?.[0] ||
				err.message ||
				'Erro ao criar usuário. Tente novamente.'
			setError(errorMessage)
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
		<Container animate='fade-up'>
			<Text
				as='h1'
				className='font-normal'>
				Cadastrar Usuário
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
					{error && (
						<div className='md:col-span-2 lg:col-span-3 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700'>
							<p className='text-red-700 dark:text-red-300 text-sm'>
								{error}
							</p>
						</div>
					)}

					<section className='md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-5'>
						<div className='space-y-2'>
							<label
								htmlFor='nome'
								className={labelClassName}
								style={labelStyle}>
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
								style={inputStyle}
								placeholder='Digite o nome completo'
								required
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
								placeholder='usuario@exemplo.com'
								required
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='password'
								className={labelClassName}
								style={labelStyle}>
								Senha <span className='text-red-500'>*</span>
							</label>
							<input
								type='password'
								name='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={inputClassName}
								style={inputStyle}
								placeholder='Mínimo 6 caracteres'
								minLength={6}
								required
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='role'
								className={labelClassName}
								style={labelStyle}>
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
									borderColor: isDark
										? ColorHex.zinc[700]
										: ColorHex.zinc[300]
								}}>
								<h3
									className='text-lg font-medium'
									style={{
										color: isDark
											? ColorHex.zinc[200]
											: ColorHex.zinc[800]
									}}>
									Informações do Motorista
								</h3>

								<div className='space-y-2'>
									<label
										htmlFor='frota'
										className={labelClassName}
										style={labelStyle}>
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
										style={inputStyle}
										placeholder='ID da frota (opcional)'
									/>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='status'
										className={labelClassName}
										style={labelStyle}>
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
										className={labelClassName}
										style={labelStyle}>
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

					{/* Action Buttons */}
					<div
						className='md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t'
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
							{isLoading ? 'Cadastrando...' : 'Cadastrar Usuário'}
						</button>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default CreateUsuarioPage
