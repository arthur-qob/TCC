import { DataTable, type Column } from '@/components/dataTable'
import Spinner from '@/components/spinner'
import { Container, Text } from '@/components/themed'
import { ColorHex, getColor } from '@/constants/colors'
import { useTheme } from '@/context/theme'
import { userService } from '@/services/userService'
import { usePermissionNavigate } from '@/utils/routes'
import type { Cliente } from '@/utils/types'
import { useEffect, useState } from 'react'
import { Checkbox } from '@mui/material'
import { useUser } from '@/context/user'

const ClientesPage = () => {
	const navigate = usePermissionNavigate()
	const { user } = useUser()
	const [clientes, setClientes] = useState<Cliente[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedClientes, setSelectedClientes] = useState<Set<number>>(
		new Set()
	)
	const [isDeleting, setIsDeleting] = useState(false)
	const { actualTheme } = useTheme()

	useEffect(() => {
		loadClients()
	}, [])

	const loadClients = async () => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await userService.getAllClients()
			setClientes(data)
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

	const toggleUserSelection = (clienteId: number) => {
		setSelectedClientes((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(clienteId)) {
				newSet.delete(clienteId)
			} else {
				newSet.add(clienteId)
			}
			return newSet
		})
	}

	const toggleSelectAll = () => {
		if (selectedClientes.size === clientes.length) {
			setSelectedClientes(new Set())
		} else {
			setSelectedClientes(new Set(clientes.map((c) => c.id)))
		}
	}

	const columns: Column<Cliente>[] = [
		{
			id: 'checkbox' as any,
			label: (
				<Checkbox
					checked={
						clientes.length > 0 &&
						selectedClientes.size === clientes.length
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
			render: (_, cliente) => (
				<Checkbox
					checked={selectedClientes.has(cliente.id)}
					onChange={() => toggleUserSelection(cliente.id)}
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
			id: 'name',
			label: 'NOME',
			sortable: true
		},
		{
			id: 'email',
			label: 'EMAIL',
			sortable: true
		}
	]

	const handleDeleteSelected = async () => {
		if (selectedClientes.size === 0) return

		const confirmDelete = window.confirm(
			`Tem certeza que deseja excluir ${selectedClientes.size} cliente(s) selecionado(s)? Esta ação não pode ser desfeita.`
		)

		if (!confirmDelete) return

		try {
			setIsDeleting(true)
			setError(null)

			// Delete all selected users
			await Promise.all(
				Array.from(selectedClientes).map((clienteId) =>
					userService.deleteUser(clienteId)
				)
			)

			// Reload users list
			await loadClients()
			setSelectedClientes(new Set())
		} catch (err: any) {
			console.error('Error deleting clients:', err)
			setError(
				err.response?.data?.message ||
					'Erro ao excluir clientes. Tente novamente.'
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
					Clientes
				</Text>
				<div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
					{selectedClientes.size > 0 && (
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
								: `Excluir ${selectedClientes.size} selecionado(s)`}
						</button>
					)}
					{(user?.tipo === 'ADMIN' ||
						user?.tipo === 'GERENTE_FROTA') && (
						<button
							onClick={() =>
								navigate('/clientes/cadastrar-cliente')
							}
							className={`w-full sm:w-fit bg-${getColor(
								'success',
								'light'
							)} hover:bg-${getColor(
								'successHover',
								'light'
							)} transition-colors duration-300 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base`}>
							+ Novo Cliente
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
			) : clientes.length === 0 ? (
				<div className='p-8 text-center'>
					<p className='text-gray-600 dark:text-gray-400'>
						Nenhum cliente encontrado
					</p>
				</div>
			) : (
				<DataTable
					columns={columns}
					data={clientes}
					getRowKey={(cliente) => cliente.id}
				/>
			)}
		</Container>
	)
}

export default ClientesPage
