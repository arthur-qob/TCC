import { useState } from 'react'
import CustomSelect from '../../components/select'
import { Container, Text } from '../../components/themed'
import { useTheme } from '@/context/theme'
import { TipoFrota } from '@/utils/types'
import { ColorHex, getColor } from '@/constants/colors'

const CreateFrotaPage = () => {
	const { actualTheme } = useTheme()

	const [nome, setNome] = useState<string>('')
	const [tipo, setTipo] = useState<TipoFrota | null>(null)
	const [placa, setPlaca] = useState<string>('')

	const handleLimpar = () => {
		setNome('')
		setTipo(null)
		setPlaca('')
	}

	const isDark = actualTheme === 'dark'

	const inputClassName = `w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-${getColor(
		'focus',
		isDark ? 'dark' : 'light'
	)} bg-${getColor(
		'input.background',
		isDark ? 'dark' : 'light'
	)} border-${getColor(
		'input.border',
		isDark ? 'dark' : 'light'
	)} text-${getColor(
		'text.primary',
		isDark ? 'dark' : 'light'
	)} placeholder-${getColor('input.placeholder', isDark ? 'dark' : 'light')}`

	const labelClassName = `text-sm font-medium mb-1 block text-${getColor(
		'text.secondary',
		isDark ? 'dark' : 'light'
	)}`

	const handleSubmit = () => {
		console.log({ nome, tipo, placa })
		// TODO: Implement frota creation
	}

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<Text
				as='h1'
				className='font-normal'>
				Cadastrar Frota
			</Text>

			<form
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
								className={labelClassName}>
								Nome da frota{' '}
							</label>
							<input
								type='text'
								name='nome'
								id='nome'
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								className={inputClassName}
								placeholder='Digite o nome completo'
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='tipo'
								className={labelClassName}>
								Tipo da frota{' '}
								<span className='text-red-500'>*</span>
							</label>
							<CustomSelect
								id='tipo'
								defaultValue=''
								options={TipoFrota}
								onChange={(value) =>
									setTipo(value as TipoFrota)
								}
								placeholder='Selecione o tipo da frota'
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='placa'
								className={labelClassName}>
								Placa <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='placa'
								id='placa'
								value={placa}
								onChange={(e) => setPlaca(e.target.value)}
								className={inputClassName}
								placeholder='Digite a placa do veículo'
							/>
						</div>
						{/* <div className='space-y-2'>
							<label htmlFor='responsavel'>
								Responsável pelo veículo
							</label>
							Mostrar uma lista de motoristas
							<CustomSelect />
						</div> */}
					</section>

					{/* Profile Picture Section */}
					<section className='flex flex-col items-center justify-start md:col-span-2 lg:col-span-1'>
						<label className={`${labelClassName} text-center mb-3`}>
							Foto de Perfil
						</label>
						<div
							className='rounded-xl w-full max-w-[200px] sm:max-w-[250px] h-[200px] sm:h-[250px] flex flex-col items-center justify-center text-center border-2 border-dashed transition-colors hover:border-blue-500 cursor-pointer'
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
						}}>
						Cadastrar Frota
					</button>
				</div>
			</form>
		</Container>
	)
}

export default CreateFrotaPage
