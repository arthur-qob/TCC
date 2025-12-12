import { Container, Text } from '../components/themed'
import { useTheme } from '@/context/theme'
import { ColorHex } from '../constants/colors'
import { Trophy, TrendingUp, Users, Package } from 'lucide-react'

interface RankingItem {
	nome: string
	valor: number
	porcentagem: number
}

const HomePage = () => {
	const { actualTheme } = useTheme()

	// Dados fictícios - Ranking de Motoristas
	const rankingMotoristas: RankingItem[] = [
		{ nome: 'José Carlos', valor: 156, porcentagem: 100 },
		{ nome: 'Marco Silva', valor: 142, porcentagem: 91 },
		{ nome: 'Alessandro Cerqueira', valor: 128, porcentagem: 82 },
		{ nome: 'Paulo Santos', valor: 115, porcentagem: 74 },
		{ nome: 'Ricardo Oliveira', valor: 98, porcentagem: 63 }
	]

	// Dados fictícios - Ranking de Pedidos por Mês
	const rankingPedidos: RankingItem[] = [
		{ nome: 'Dezembro 2024', valor: 487, porcentagem: 100 },
		{ nome: 'Novembro 2024', valor: 456, porcentagem: 94 },
		{ nome: 'Outubro 2024', valor: 412, porcentagem: 85 },
		{ nome: 'Setembro 2024', valor: 389, porcentagem: 80 },
		{ nome: 'Agosto 2024', valor: 365, porcentagem: 75 }
	]

	// Dados fictícios - Ranking de Clientes
	const rankingClientes: RankingItem[] = [
		{ nome: 'Nestlé Brasil - Três Rios', valor: 89, porcentagem: 100 },
		{ nome: 'Nissan do Brasil - Resende', valor: 76, porcentagem: 85 },
		{ nome: 'Coca-Cola FEMSA - Duque de Caxias', valor: 68, porcentagem: 76 },
		{ nome: 'Volkswagen - São José dos Pinhais', valor: 54, porcentagem: 61 },
		{ nome: 'Ambev - Nova Iguaçu', valor: 48, porcentagem: 54 }
	]

	const RankingCard = ({
		titulo,
		icone,
		dados,
		cor,
		unidade
	}: {
		titulo: string
		icone: React.ReactNode
		dados: RankingItem[]
		cor: string
		unidade: string
	}) => {
		return (
			<div
				className={`p-6 rounded-xl shadow-lg border ${
					actualTheme === 'dark'
						? 'bg-zinc-800 border-zinc-700'
						: 'bg-white border-gray-200'
				}`}>
				<div className='flex items-center gap-3 mb-6'>
					<div className={`p-3 rounded-lg ${cor}`}>{icone}</div>
					<Text className='text-xl font-semibold'>{titulo}</Text>
				</div>

				<div className='space-y-4'>
					{dados.map((item, index) => (
						<div
							key={index}
							className='space-y-2'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									{index === 0 && (
										<Trophy
											className='text-yellow-500'
											size={20}
										/>
									)}
									<span
										className={`font-medium ${
											index === 0 ? 'text-lg' : 'text-base'
										}`}>
										{item.nome}
									</span>
								</div>
								<span className='font-bold text-lg'>
									{item.valor} {unidade}
								</span>
							</div>
							<div className='w-full h-3 bg-gray-200 rounded-full overflow-hidden'>
								<div
									className={`h-full rounded-full transition-all duration-500 ${
										index === 0
											? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
											: index === 1
											? 'bg-gradient-to-r from-gray-300 to-gray-500'
											: index === 2
											? 'bg-gradient-to-r from-orange-300 to-orange-500'
											: cor.replace('bg-', 'bg-gradient-to-r from-') + '-400 to-' + cor.replace('bg-', '') + '-600'
									}`}
									style={{ width: `${item.porcentagem}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<div className='flex items-center gap-3 mb-8'>
				<TrendingUp
					size={32}
					className='text-blue-500'
				/>
				<Text className='text-3xl font-bold'>Relatórios e Rankings</Text>
			</div>

			<div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
				<p className='text-blue-800 text-sm'>
					📊 <strong>Período de análise:</strong> Últimos 6 meses (Junho
					- Novembro 2025)
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
				{/* Ranking de Motoristas */}
				<RankingCard
					titulo='Top 5 Motoristas'
					icone={
						<Users
							className='text-white'
							size={24}
						/>
					}
					dados={rankingMotoristas}
					cor='bg-blue-500'
					unidade='entregas'
				/>

				{/* Ranking de Pedidos */}
				<RankingCard
					titulo='Pedidos por Mês'
					icone={
						<Package
							className='text-white'
							size={24}
						/>
					}
					dados={rankingPedidos}
					cor='bg-purple-500'
					unidade='pedidos'
				/>

				{/* Ranking de Clientes */}
				<RankingCard
					titulo='Top 5 Clientes'
					icone={
						<TrendingUp
							className='text-white'
							size={24}
						/>
					}
					dados={rankingClientes}
					cor='bg-green-500'
					unidade='pedidos'
				/>
			</div>

			{/* Resumo Estatístico */}
			<div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div
					className={`p-6 rounded-xl text-center shadow-lg ${
						actualTheme === 'dark'
							? 'bg-gradient-to-br from-blue-900 to-blue-700'
							: 'bg-gradient-to-br from-blue-500 to-blue-600'
					}`}>
					<p className='text-white text-sm font-medium mb-2'>
						Total de Entregas
					</p>
					<p className='text-white text-4xl font-bold'>2.209</p>
					<p className='text-blue-100 text-xs mt-2'>
						+12% vs período anterior
					</p>
				</div>

				<div
					className={`p-6 rounded-xl text-center shadow-lg ${
						actualTheme === 'dark'
							? 'bg-gradient-to-br from-purple-900 to-purple-700'
							: 'bg-gradient-to-br from-purple-500 to-purple-600'
					}`}>
					<p className='text-white text-sm font-medium mb-2'>
						Total de Pedidos
					</p>
					<p className='text-white text-4xl font-bold'>2.109</p>
					<p className='text-purple-100 text-xs mt-2'>
						+8% vs período anterior
					</p>
				</div>

				<div
					className={`p-6 rounded-xl text-center shadow-lg ${
						actualTheme === 'dark'
							? 'bg-gradient-to-br from-green-900 to-green-700'
							: 'bg-gradient-to-br from-green-500 to-green-600'
					}`}>
					<p className='text-white text-sm font-medium mb-2'>
						Clientes Ativos
					</p>
					<p className='text-white text-4xl font-bold'>10</p>
					<p className='text-green-100 text-xs mt-2'>
						+2 novos este mês
					</p>
				</div>
			</div>
		</Container>
	)
}

export default HomePage
