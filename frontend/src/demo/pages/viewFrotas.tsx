import { DataTable, type Column } from '../components/dataTable'
import Spinner from '../components/spinner'
import { Container, Text } from '../components/themed'
import { ColorHex, getColor } from '../constants/colors'
import { useTheme } from '@/context/theme'
import { useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'
import { mockFrotas, mockUsuarios, simulateApiDelay, type Frota } from '../data/mockData'
import { useNavigate } from 'react-router-dom'
import { UserRoles } from '@/utils/types/user.types'
import { Trash2 } from 'lucide-react'

interface FrotaFormatada extends Frota {
	nomeMotorista: string
}

const FrotasPage = () => {
	const navigate = useNavigate()
	const user = mockUsuarios[0] as any
	const [frotas, setFrotas] = useState<FrotaFormatada[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedFrotas, setSelectedFrotas] = useState<Set<number>>(
		new Set()
	)
	const [isDeleting, setIsDeleting] = useState(false)
	const { actualTheme } = useTheme()

	useEffect(() => {
		loadFrotas()
	}, [])

	const loadFrotas = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await simulateApiDelay()
			
			// Formatar frotas com nome do motorista
			const frotasFormatadas = mockFrotas.map(frota => {
				const motorista = frota.motoristaId 
					? mockUsuarios.find(u => u.id === frota.motoristaId)
					: null
				
				return {
					...frota,
					nomeMotorista: motorista?.nome || 'Sem motorista'
				}
			})
			
			setFrotas(frotasFormatadas)
		} catch (err: any) {
			console.error('Error loading frotas:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao carregar frotas. Tente novamente.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	const toggleFrotaSelection = (frotaId: number) => {
		setSelectedFrotas((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(frotaId)) {
				newSet.delete(frotaId)
			} else {
				newSet.add(frotaId)
			}
			return newSet
		})
	}

	const toggleSelectAll = () => {
		if (selectedFrotas.size === frotas.length) {
			setSelectedFrotas(new Set())
		} else {
			setSelectedFrotas(new Set(frotas.map((f) => f.id)))
		}
	}

	const getStatusBadge = (status: string) => {
		const statusMap = {
			DISPONIVEL: { bg: 'bg-green-500', text: '🟢 Disponível' },
			INDISPONIVEL: { bg: 'bg-red-500', text: '🔴 Indisponível' },
			EM_MANUTENCAO: { bg: 'bg-yellow-500', text: '🟡 Em Manutenção' }
		}

		const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.DISPONIVEL

		return (
			<span className={`${statusInfo.bg} text-white px-3 py-1 rounded-full text-xs font-semibold inline-block`}>
				{statusInfo.text}
			</span>
		)
	}

	const columns: Column<FrotaFormatada>[] = [
		{
			id: 'checkbox' as any,
			label: (
				<Checkbox
					checked={
						frotas.length > 0 &&
						selectedFrotas.size === frotas.length
					}
					onChange={toggleSelectAll}
					sx={{
						color: '#9ca3af',
						'&.Mui-checked': {
							color: '#0fdb6e'
						}
					}}
				/>
			),
			sortable: false,
			render: (_, frota) => (
				<Checkbox
					checked={selectedFrotas.has(frota.id)}
					onChange={() => toggleFrotaSelection(frota.id)}
					sx={{
						color: '#9ca3af',
						'&.Mui-checked': {
							color: '#0fdb6e'
						}
					}}
				/>
			)
		},
		{
			id: 'id',
			label: 'ID',
			sortable: true
		},
		{
			id: 'placa',
			label: 'PLACA',
			sortable: true
		},
		{
			id: 'status',
			label: 'STATUS',
			sortable: true,
			render: (value) => getStatusBadge(value as string)
		},
		{
			id: 'nomeMotorista',
			label: 'MOTORISTA',
			sortable: true
		},
		{
			id: 'actions' as any,
			label: 'AÇÕES',
			sortable: false,
			render: (_, frota) => (
				<button
					type='button'
					onClick={(e) => handleDeleteSingle(frota.id, e)}
					className='text-red-500 hover:text-red-700 transition-colors p-2'
					title='Excluir frota'>
					<Trash2 size={20} />
				</button>
			)
		}
	]

	const handleDeleteSelected = async () => {
		if (selectedFrotas.size === 0) return

		const confirmDelete = window.confirm(
			`Tem certeza que deseja excluir ${selectedFrotas.size} frota(s) selecionada(s)? Esta ação não pode ser desfeita.`
		)

		if (!confirmDelete) return

		try {
			setIsDeleting(true)
			setError(null)

			await simulateApiDelay()

			// Remove from mockFrotas
			const frotasToDelete = Array.from(selectedFrotas)
			frotasToDelete.forEach(id => {
				const index = mockFrotas.findIndex(f => f.id === id)
				if (index > -1) {
					mockFrotas.splice(index, 1)
				}
			})

			// Update local state
			setFrotas((prev) =>
				prev.filter((frota) => !selectedFrotas.has(frota.id))
			)
			setSelectedFrotas(new Set())
		} catch (err: any) {
			console.error('Error deleting frotas:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao excluir frotas. Tente novamente.'
			)
		} finally {
			setIsDeleting(false)
		}
	}

	const handleDeleteSingle = async (frotaId: number, e: React.MouseEvent) => {
		e.stopPropagation() // Previne navegação para edição

		const confirmDelete = window.confirm(
			'Tem certeza que deseja excluir esta frota? Esta ação não pode ser desfeita.'
		)

		if (!confirmDelete) return

		try {
			await simulateApiDelay()

			// Remove from mockFrotas
			const index = mockFrotas.findIndex(f => f.id === frotaId)
			if (index > -1) {
				mockFrotas.splice(index, 1)
			}

			// Update local state
			setFrotas((prev) => prev.filter((frota) => frota.id !== frotaId))
		} catch (err: any) {
			console.error('Error deleting frota:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao excluir frota. Tente novamente.'
			)
		}
	}

	const handleRowClick = (frota: FrotaFormatada) => {
		navigate(`/demo/admin/frotas/editar/${frota.id}`)
	}

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
				<Text className='w-fit capitalize text-2xl font-medium'>
					Frotas
				</Text>
				<div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
					{selectedFrotas.size > 0 && (
						<button
							onClick={handleDeleteSelected}
							disabled={isDeleting}
							className={`w-full sm:w-fit bg-${getColor(
								'primary',
								'light'
							)} hover:bg-${getColor(
								'primaryHover',
								'light'
							)} transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base`}>
							{isDeleting
								? 'Excluindo...'
								: `Excluir ${selectedFrotas.size} selecionado(s)`}
						</button>
					)}
					{(user?.tipo === UserRoles.ADMIN ||
						user?.tipo === UserRoles.GERENTE_FROTA) && (
						<button
							onClick={() =>
								navigate('/demo/admin/frotas/novo')
							}
							className={`w-full sm:w-fit bg-${getColor(
								'success',
								'light'
							)} hover:bg-${getColor(
								'successHover',
								'light'
							)} transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base`}>
							+ Nova Frota
						</button>
					)}
				</div>
			</div>

			{error && (
				<div className='p-4 mb-6 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700'>
					<p className='text-red-700 dark:text-red-300 text-sm'>
						{error}
					</p>
				</div>
			)}

			{isLoading ? (
				<div className='flex justify-center items-center min-h-full'>
					<Spinner />
				</div>
			) : frotas.length === 0 ? (
				<div className='p-8 text-center'>
					<p className='text-gray-600 dark:text-gray-400'>
						Nenhuma frota encontrada
					</p>
				</div>
			) : (
				<DataTable
					columns={columns}
					data={frotas}
					getRowKey={(frota) => frota.id}
					onRowClick={handleRowClick}
				/>
			)}
		</Container>
	)
}

export default FrotasPage
