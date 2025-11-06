import { useState } from 'react'
import CustomSelect from '../../components/select'
import { Container, Text } from '../../components/themed'
import { useTheme } from '../../context/theme'
import { TipoFrota } from '../../utils/types'

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

	const inputClassName = `w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
		actualTheme === 'dark'
			? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
			: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
	}`

	const labelClassName = `text-sm font-medium mb-1 block ${
		actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
	}`

	const handleSubmit = () => {
		console.log({ nome, tipo, placa })
		// TODO: Implement frota creation
	}

	return (
		<Container>
			<Text
				as='h1'
				className='font-normal'>
				Cadastrar Frota
			</Text>

			<form
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
					<section className='lg:col-span-2 space-y-5'>
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
						className='px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95'
						style={{
							backgroundColor:
								actualTheme === 'dark' ? '#16a34a' : '#22c55e',
							color: '#ffffff'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								actualTheme === 'dark' ? '#15803d' : '#16a34a'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor =
								actualTheme === 'dark' ? '#16a34a' : '#22c55e'
						}}>
						Cadastrar Frota
					</button>
				</div>
			</form>
		</Container>
	)
}

export default CreateFrotaPage
