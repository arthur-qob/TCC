import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Paper,
	Checkbox
} from '@mui/material'
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import { Container, Text } from '../../components/themed'
import { useTheme } from '../../context/theme'
import { userService } from '../../services/userService'
import type { Usuario } from '../../utils/types/user.types'
import Spinner from '../../components/spinner'

type SortField = 'idUser' | 'name' | 'email' | 'tipo'
type SortDirection = 'asc' | 'desc' | null

const UsersPage = () => {
	const { actualTheme } = useTheme()
	const navigate = useNavigate()
	const [users, setUsers] = useState<Usuario[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set())
	const [isDeleting, setIsDeleting] = useState(false)
	const [sortField, setSortField] = useState<SortField | null>(null)
	const [sortDirection, setSortDirection] = useState<SortDirection>(null)

	useEffect(() => {
		loadUsers()
	}, [])

	const loadUsers = async () => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await userService.getAllUsers()
			setUsers(data)
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

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			if (sortDirection === 'asc') {
				setSortDirection('desc')
			} else if (sortDirection === 'desc') {
				setSortDirection(null)
				setSortField(null)
			}
		} else {
			setSortField(field)
			setSortDirection('asc')
		}
	}

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) {
			return (
				<ChevronsUpDown
					size={16}
					className='ml-2 inline'
				/>
			)
		}
		if (sortDirection === 'asc') {
			return (
				<ChevronUp
					size={16}
					className='ml-2 inline'
				/>
			)
		}
		return (
			<ChevronDown
				size={16}
				className='ml-2 inline'
			/>
		)
	}

	const sortedUsers = [...users].sort((a, b) => {
		if (!sortField || !sortDirection) return 0

		const aValue = a[sortField]
		const bValue = b[sortField]

		if (aValue === null && bValue === null) return 0
		if (aValue === null || aValue === undefined)
			return sortDirection === 'asc' ? 1 : -1
		if (bValue === null || bValue === undefined)
			return sortDirection === 'asc' ? -1 : 1

		const aString = String(aValue)
		const bString = String(bValue)

		if (sortDirection === 'asc') {
			return aString > bString ? 1 : -1
		}
		return aString < bString ? 1 : -1
	})

	const handleDeleteSelected = async () => {
		if (selectedUsers.size === 0) return

		const confirmDelete = window.confirm(
			`Tem certeza que deseja excluir ${selectedUsers.size} usuário(s) selecionado(s)? Esta ação não pode ser desfeita.`
		)

		if (!confirmDelete) return

		try {
			setIsDeleting(true)
			setError(null)

			// Delete all selected users
			await Promise.all(
				Array.from(selectedUsers).map((userId) =>
					userService.deleteUser(userId)
				)
			)

			// Reload users list
			await loadUsers()
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
		<Container>
			<div className='flex justify-between items-center mb-6'>
				<Text className='w-fit capitalize text-2xl font-medium'>
					Usuários
				</Text>
				<div className='flex gap-3'>
					{selectedUsers.size > 0 && (
						<button
							onClick={handleDeleteSelected}
							disabled={isDeleting}
							className='w-fit bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white px-4 py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'>
							{isDeleting
								? 'Excluindo...'
								: `Excluir ${selectedUsers.size} selecionado(s)`}
						</button>
					)}
					<button
						onClick={() => navigate('/admin/cadastrar-usuario')}
						className='w-fit bg-[rgb(15,219,110)] hover:bg-[hsla(149,87%,40%,1.00)] transition-colors duration-300 text-white px-4 py-3 rounded-xl shadow-lg'>
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
				<Spinner />
			) : users.length === 0 ? (
				<div className='p-8 text-center'>
					<p
						style={{
							color:
								actualTheme === 'dark' ? '#9ca3af' : '#6b7280'
						}}>
						Nenhum usuário encontrado
					</p>
				</div>
			) : (
				<TableContainer
					component={Paper}
					sx={{
						backgroundColor:
							actualTheme === 'dark' ? '#1a1a1a' : '#ffffff',
						transition: 'background-color 0.2s',
						borderRadius: '10px',
						boxShadow:
							'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
					}}>
					<Table>
						<TableHead>
							<TableRow
								sx={{
									backgroundColor:
										actualTheme === 'dark'
											? '#2a2a2a'
											: '#ffffff'
								}}>
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									<Checkbox
										checked={
											users.length > 0 &&
											selectedUsers.size === users.length
										}
										onChange={toggleSelectAll}
										sx={{
											color:
												actualTheme === 'dark'
													? '#ffffff'
													: '#000000',
											'&.Mui-checked': {
												color: '#0fdb6e'
											}
										}}
									/>
								</TableCell>
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000',
										cursor: 'pointer',
										userSelect: 'none'
									}}
									onClick={() => handleSort('idUser')}>
									<div className='flex items-center justify-center'>
										ID
										{getSortIcon('idUser')}
									</div>
								</TableCell>
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000',
										cursor: 'pointer',
										userSelect: 'none'
									}}
									onClick={() => handleSort('name')}>
									<div className='flex items-center justify-center'>
										NOME
										{getSortIcon('name')}
									</div>
								</TableCell>
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000',
										cursor: 'pointer',
										userSelect: 'none'
									}}
									onClick={() => handleSort('email')}>
									<div className='flex items-center justify-center'>
										EMAIL
										{getSortIcon('email')}
									</div>
								</TableCell>
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000',
										cursor: 'pointer',
										userSelect: 'none'
									}}
									onClick={() => handleSort('tipo')}>
									<div className='flex items-center justify-center'>
										PAPEL
										{getSortIcon('tipo')}
									</div>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedUsers.map((user) => {
								const roleColors = getRoleBadgeColor(user.tipo)
								return (
									<TableRow
										key={user.idUser}
										hover
										sx={{
											cursor: 'pointer',
											'&:hover': {
												backgroundColor:
													actualTheme === 'dark'
														? '#2a2a2a'
														: '#f5f5f5'
											}
										}}>
										<TableCell
											align='center'
											sx={{
												color:
													actualTheme === 'dark'
														? '#ffffff'
														: '#000000'
											}}>
											<Checkbox
												checked={selectedUsers.has(
													user.idUser
												)}
												onChange={() =>
													toggleUserSelection(
														user.idUser
													)
												}
												sx={{
													color:
														actualTheme === 'dark'
															? '#ffffff'
															: '#000000',
													'&.Mui-checked': {
														color: '#0fdb6e'
													}
												}}
											/>
										</TableCell>
										<TableCell
											align='center'
											sx={{
												color:
													actualTheme === 'dark'
														? '#ffffff'
														: '#000000'
											}}>
											{user.idUser}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												color:
													actualTheme === 'dark'
														? '#ffffff'
														: '#000000'
											}}>
											{user.name}
										</TableCell>
										<TableCell
											align='center'
											sx={{
												color:
													actualTheme === 'dark'
														? '#ffffff'
														: '#000000'
											}}>
											{user.email}
										</TableCell>
										<TableCell align='center'>
											<p
												className={`w-fit mx-auto ${roleColors.bg} ${roleColors.text} p-2 rounded-full`}>
												{getRoleLabel(user.tipo)}
											</p>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	)
}

export default UsersPage
