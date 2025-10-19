import { useState } from 'react'
import CustomSelect from '../../components/select'
import { Container, Text } from '../../components/themed'
import { useTheme } from '../../context/theme'

const CreateUsuarioPage = () => {
	const { actualTheme } = useTheme()

	const [nome, setNome] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [selectedRole, setSelectedRole] = useState<string>('')

	const roles = {
		Focal: 'focal',
		Programador: 'programador',
		'Gerente de Frota': 'gerente_frota',
		'Gerente de Risco': 'gerente_risco',
		Motorista: 'motorista',
		Administrador: 'admin'
	}

	return (
		<Container>
			<Text
				as='h1'
				className='font-normal'>
				Cadastrar Usuário
			</Text>

			<form
				className='rounded-lg px-8 py-5 space-y-6 flex flex-col justify-between items-start'
				style={{
					backgroundColor:
						actualTheme === 'dark' ? '#1a1a1a' : '#ffffff',
					border: `1px solid ${
						actualTheme === 'dark' ? '#333' : '#e5e5e5'
					}`
				}}>
				<div className='w-full flex flex-row justify-between items-start'>
					<section>
						<div className='flex flex-row jusitfy-center gap-5 mb-5'>
							<label htmlFor='nome'>Nome:</label>
							<input
								type='text'
								name='nome'
								id='nome'
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								className='rounded-lg border border-gray-300 px-2 py-1'
							/>
						</div>
						<div className='flex flex-row jusitfy-center gap-5 mb-5'>
							<label htmlFor='email'>Email:</label>
							<input
								type='email'
								name='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='rounded-lg border border-gray-300 px-2 py-1'
							/>
						</div>
						<div className='flex flex-row jusitfy-center gap-5 mb-5'>
							<label htmlFor='role'>Papel:</label>
							<CustomSelect
								id='role'
								defaultValue=''
								options={roles}
								onChange={(value) => setSelectedRole(value)}
								placeholder='Selecione o papel do usuário'
							/>
						</div>
						{selectedRole === 'motorista' ? (
							<div className='flex flex-row jusitfy-center gap-5 mb-5'>
								<label htmlFor='frota'>Frota: </label>
								<input
									id='frota'
									type='text'
									className='rounded-lg border border-gray-300 px-2 py-1'
								/>
							</div>
						) : null}
					</section>
					<section className='flex jusitfy-start'>
						<div className='rounded-lg w-[250px] h-[250px] bg-gray-300 flex items-center justify-center text-center'>
							<p>Insert user's profile picture here!</p>
						</div>
					</section>
				</div>
				<button
					className='self-end bg-green-500 p-2 rounded-lg text-white hover:bg-green-600 transition-colors duration-300'
					type='submit'>
					Cadastrar
				</button>
			</form>
		</Container>
	)
}

export default CreateUsuarioPage
