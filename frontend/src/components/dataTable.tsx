import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Paper
} from '@mui/material'
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../context/theme'

export interface Column<T> {
	id: keyof T
	label: string | React.ReactNode
	align?: 'left' | 'center' | 'right'
	sortable?: boolean
	renderHeader?: () => React.ReactNode
	render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
	columns: Column<T>[]
	data: T[]
	getRowKey: (row: T) => string | number
	showActionsColumn?: boolean
	renderActions?: (row: T) => React.ReactNode
	onRowClick?: (row: T) => void
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, any>>({
	columns,
	data,
	getRowKey,
	showActionsColumn = false,
	renderActions,
	onRowClick
}: DataTableProps<T>) {
	const { actualTheme } = useTheme()
	const [sortField, setSortField] = useState<keyof T | null>(null)
	const [sortDirection, setSortDirection] = useState<SortDirection>(null)

	const handleSort = (field: keyof T) => {
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

	const getSortIcon = (field: keyof T) => {
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

	const sortedData = [...data].sort((a, b) => {
		if (!sortField || !sortDirection) return 0

		const aValue = a[sortField]
		const bValue = b[sortField]

		if (aValue === null && bValue === null) return 0
		if (aValue === null) return sortDirection === 'asc' ? 1 : -1
		if (bValue === null) return sortDirection === 'asc' ? -1 : 1

		// Handle date strings in format DD/MM/YYYY
		if (typeof aValue === 'string' && aValue.includes('/')) {
			const parseDate = (dateStr: string) => {
				const [day, month, year] = dateStr.split('/')
				return new Date(Number(year), Number(month) - 1, Number(day))
			}
			const aTime = parseDate(aValue).getTime()
			const bTime = parseDate(bValue as string).getTime()

			if (sortDirection === 'asc') {
				return aTime > bTime ? 1 : -1
			}
			return aTime < bTime ? 1 : -1
		}

		const aString = String(aValue)
		const bString = String(bValue)

		if (sortDirection === 'asc') {
			return aString > bString ? 1 : -1
		}
		return aString < bString ? 1 : -1
	})

	return (
		<div className='w-full overflow-x-auto'>
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
										? 'rgb(42, 42, 42)'
										: 'rgb(255, 255, 255)'
							}}>
							{columns.map((column) => (
								<TableCell
									key={String(column.id)}
									align={column.align || 'center'}
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000',
										cursor:
											column.sortable !== false
												? 'pointer'
												: 'default',
										userSelect: 'none'
									}}
									onClick={() =>
										column.sortable !== false &&
										handleSort(column.id)
									}>
									<div className='flex items-center justify-center'>
										{column.label}
										{column.sortable !== false &&
											getSortIcon(column.id)}
									</div>
								</TableCell>
							))}
							{showActionsColumn && (
								<TableCell
									align='center'
									sx={{
										fontWeight: 'bold',
										color:
											actualTheme === 'dark'
												? '#ffffff'
												: '#000000'
									}}>
									AÇÕES
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedData.map((row) => (
							<TableRow
								key={getRowKey(row)}
								hover
								sx={{
									cursor: onRowClick ? 'pointer' : 'default',
									'&:hover': {
										backgroundColor:
											actualTheme === 'dark'
												? '#2a2a2a'
												: '#f5f5f5'
									}
								}}
								onClick={() => onRowClick?.(row)}>
								{columns.map((column) => (
									<TableCell
										key={String(column.id)}
										align={column.align || 'center'}
										sx={{
											color:
												actualTheme === 'dark'
													? '#ffffff'
													: '#000000'
										}}>
										{column.render
											? column.render(row[column.id], row)
											: row[column.id]}
									</TableCell>
								))}
								{showActionsColumn && (
									<TableCell
										align='center'
										sx={{
											color:
												actualTheme === 'dark'
													? '#ffffff'
													: '#000000'
										}}>
										{renderActions?.(row)}
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
