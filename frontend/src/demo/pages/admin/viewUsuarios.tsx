import { useEffect, useRef, useState } from 'react'
import { usePermissionNavigate } from '@/utils/routes'
import { Checkbox } from '@mui/material'
import { Container, Text } from '../../components/themed'
import { DataTable, type Column } from '../../components/dataTable'
import type { Usuario } from '@/utils/types/user.types'
import Spinner from '../../components/spinner'
import { ColorHex, getColor } from '../../constants/colors'
import { useTheme } from '@/context/theme'
import { mockUsuarios, simulateApiDelay } from '../../data/mockData'

const UsersPage = () => {
	const navigate = usePermissionNavigate()
	const [users, setUsers] = useState<Usuario[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set())
	const [isDeleting, setIsDeleting] = useState(false)
	const { actualTheme } = useTheme()

	const hasAnimated = useRef(false)

	useEffect(() => {
		hasAnimated.current = true
	}, [])

	useEffect(() => {
		loadUsers()
	}, [])

	const loadUsers = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await simulateApiDelay()
			setUsers(mockUsuarios)
		} catch (err: any) {
			console.error('Error loading users:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao carregar usuários. Tente novamente.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	const getRoleLabel = (tipo?: string) => {
		const roleLabels: Record<string, string> = {
			ADMIN: 'Administrador',
			PROGRAMADOR: 'Programador',
			MOTORISTA: 'Motorista',
			GERENTE_FROTA: 'Gerente de Frota',
			GERENTE_RISCO: 'Gerente de Risco',
			FOCAL: 'Focal'
		}
		return tipo ? roleLabels[tipo] || tipo : 'Usuário'
	}

	const getRoleBadgeColor = (tipo?: string) => {
		const colors: Record<string, { bg: string; text: string }> = {
			ADMIN: {
				bg: 'bg-purple-300',
				text: 'text-purple-700'
			},
			PROGRAMADOR: {
				bg: 'bg-blue-300',
				text: 'text-blue-700'
			},
			MOTORISTA: {
				bg: 'bg-green-300',
				text: 'text-green-700'
			},
			GERENTE_FROTA: {
				bg: 'bg-yellow-300',
				text: 'text-yellow-700'
			},
			GERENTE_RISCO: {
				bg: 'bg-red-300',
				text: 'text-red-700'
			},
			FOCAL: {
				bg: 'bg-indigo-300',
				text: 'text-indigo-700'
			}
		}
		return (
			colors[tipo || ''] || {
				bg: 'bg-gray-300',
				text: 'text-gray-700'
			}
		)
	}

	const toggleUserSelection = (userId: number) => {
		setSelectedUsers((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(userId)) {
				newSet.delete(userId)
			} else {
				newSet.add(userId)
			}
			return newSet
		})
	}

	const toggleSelectAll = () => {
		if (selectedUsers.size === users.length) {
			setSelectedUsers(new Set())
		} else {
			setSelectedUsers(new Set(users.map((u) => u.idUser)))
		}
	}

	const columns: Column<Usuario>[] = [
		{
			id: 'checkbox' as any,
			label: (
				<Checkbox
					checked={
						users.length > 0 && selectedUsers.size === users.length
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
			render: (_, user) => (
				<Checkbox
					checked={selectedUsers.has(user.idUser)}
					onChange={() => toggleUserSelection(user.idUser)}
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
			id: 'idUser',
			label: 'ID',
			sortable: true
		},
		{
			id: 'name',
			label: 'NOME',
			sortable: true
		},
		{
			id: 'email',
			label: 'EMAIL',
			sortable: true
		},
		{
			id: 'tipo',
			label: 'PAPEL',
			sortable: true,
			render: (tipo) => {
				const roleColors = getRoleBadgeColor(tipo)
				return (
					<p
						className={`w-fit mx-auto ${roleColors.bg} ${roleColors.text} p-2 rounded-full`}>
						{getRoleLabel(tipo)}
					</p>
				)
			}
		}
	]

	const handleDeleteSelected = async () => {
		if (selectedUsers.size === 0) return

		const confirmDelete = window.confirm(
			`Tem certeza que deseja excluir ${selectedUsers.size} usuário(s) selecionado(s)? Esta ação não pode ser desfeita.`
		)

		if (!confirmDelete) return

		try {
			setIsDeleting(true)
			setError(null)

			await simulateApiDelay()

			// Filter out deleted users from local state
			setUsers((prev) =>
				prev.filter((user) => !selectedUsers.has(user.idUser))
			)
			setSelectedUsers(new Set())
		} catch (err: any) {
			console.error('Error deleting users:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao excluir usuários. Tente novamente.'
			)
		} finally {
			setIsDeleting(false)
		}
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
					Usuários
				</Text>
				<div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
					{selectedUsers.size > 0 && (
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
								: `Excluir ${selectedUsers.size} selecionado(s)`}
						</button>
					)}
					<button
						onClick={() =>
							navigate('/demo/admin/cadastrar-usuario')
						}
						className={`w-full sm:w-fit bg-${getColor(
							'success',
							'light'
						)} hover:bg-${getColor(
							'successHover',
							'light'
						)} transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base`}>
						+ Novo Usuário
					</button>
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
			) : users.length === 0 ? (
				<div className='p-8 text-center'>
					<p className='text-gray-600 dark:text-gray-400'>
						Nenhum usuário encontrado
					</p>
				</div>
			) : (
				<DataTable
					columns={columns}
					data={users}
					getRowKey={(user) => user.idUser}
				/>
			)}
		</Container>
	)
}

export default UsersPage
