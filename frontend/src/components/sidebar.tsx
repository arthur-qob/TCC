import { useState } from 'react'
import {
	Home,
	Users,
	Route,
	Settings,
	BarChart2,
	FileText,
	Bell,
	LogOut,
	Truck,
	BookUser
} from 'lucide-react'
import { useTheme } from '../context/theme'
import { usePermissionNavigate } from '@/utils/routes'
import { useUser } from '../context/user'
import { sidebarRoutesPerRole } from '../utils/routes'
import { useMemo } from 'react'
import MenuButton from './menuButton'
import { capitalizeFirst, getInitials2 } from '@/utils/stringFormatters'

interface MenuItem {
	icon: React.ComponentType<{ size?: number; className?: string }>
	label: string
	href: string
	badge?: number
}

interface SidebarProps {
	className?: string
}

const Sidebar = ({ className = '' }: SidebarProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(true)
	const { actualTheme } = useTheme()
	const navigate = usePermissionNavigate()
	const { user, logout } = useUser()

	// Map menu labels to icons
	const iconMap: Record<
		string,
		React.ComponentType<{ size?: number; className?: string }>
	> = {
		Dashboard: Home,
		Usuários: Users,
		Clientes: BookUser,
		Rotas: Route,
		Frotas: Truck,
		Relatórios: BarChart2,
		Documentos: FileText,
		Notificações: Bell,
		Configurações: Settings
	}

	// Generate menu items based on user role
	const menuItems: MenuItem[] = useMemo(() => {
		if (!user?.tipo) return []

		const routes =
			sidebarRoutesPerRole[
				user?.tipo as keyof typeof sidebarRoutesPerRole
			]
		if (!routes) return []

		return Object.entries(routes).map(([label, href]) => ({
			icon: iconMap[label] || Home,
			label,
			href
		}))
	}, [user?.tipo])

	const handleNavigation = () => {
		setIsOpen(false)
		setIsCollapsed(true)
	}

	return (
		<>
			{/* Mobile Toggle Button */}
			<MenuButton
				isOpen={!isCollapsed}
				onClick={() => {
					const newIsOpen = !isOpen
					setIsOpen(newIsOpen)
					if (newIsOpen) {
						setIsCollapsed(false)
					} else {
						setIsCollapsed(true)
					}
				}}
				className={`lg:hidden fixed top-4 ${
					isOpen ? 'left-48' : 'left-4'
				} z-50 transition-left duration-300`}
				aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
				aria-expanded={isOpen}
			/>

			{/* Sidebar Overlay */}
			<div
				className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
					isOpen || !isCollapsed
						? 'opacity-100'
						: 'opacity-0 pointer-events-none'
				}`}
				onClick={() => {
					setIsOpen(false)
					setIsCollapsed(true)
				}}
				aria-hidden='true'
			/>

			{/* Sidebar */}
			<aside
				className={`
					fixed top-0 left-0 bottom-0 min-h-[100dvh] z-40
					transition-all duration-300 ease-in-out
					${isCollapsed && !isOpen ? 'w-20' : 'w-64'}
					${isOpen ? 'translate-x-0' : '-translate-x-full'}
					lg:translate-x-0 lg:${isCollapsed ? 'w-20' : 'w-64'} flex flex-col
					${
						actualTheme === 'dark'
							? 'bg-[rgb(42,42,42)] text-white'
							: 'bg-white text-gray-900'
					}
					${className}
				`}
				role='navigation'
				aria-label='Menu principal'>
				{/* Header */}
				<div
					className={`px-6 py-4 flex items-center ${
						isCollapsed ? 'justify-center' : 'justify-between'
					}`}>
					<div
						className={`overflow-hidden transition-all ${
							isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'
						}`}>
						<img
							src='/logo_ziranlog.png'
							alt='FlowLog'
							className='h-8 w-auto object-contain'
						/>
					</div>

					{/* Desktop Collapse Toggle */}
					<MenuButton
						isOpen={!isCollapsed}
						onClick={() => setIsCollapsed(!isCollapsed)}
						className='hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-colors flex-shrink-0'
						aria-label={
							isCollapsed
								? 'Expandir sidebar'
								: 'Recolher sidebar'
						}
					/>
				</div>

				{/* Navigation Menu */}
				<div
					className={`h-full mt-[2px] shadow-xl border-r ${
						actualTheme === 'dark'
							? 'border-r-[rgb(42,42,42)]'
							: 'border-r-gray-300'
					} flex-1 flex flex-col justify-between`}>
					<nav className='flex-1 p-4 overflow-y-auto '>
						<ul className='space-y-2'>
							{menuItems.map((item, index) => (
								<li key={index}>
									<button
										onClick={() => {
											navigate(item.href)
											handleNavigation()
										}}
										className={`flex items-center ${
											isCollapsed ? 'justify-center' : ''
										} gap-3 px-4 py-3 rounded-lg w-full
									transition-all group relative cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-red-500
									${actualTheme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-300'}`}
										title={isCollapsed ? item.label : ''}>
										<item.icon
											className={`w-[25px] transition-colors flex-shrink-0 ${
												actualTheme === 'dark'
													? 'text-gray-400 group-hover:text-red-500'
													: 'text-gray-400 group-hover:text-red-500'
											}`}
										/>
										{!isCollapsed && (
											<span
												className={`font-medium transition-all ${
													isCollapsed
														? 'w-0 opacity-0'
														: 'w-auto opacity-100'
												} whitespace-nowrap overflow-hidden`}>
												{item.label}
											</span>
										)}
										{item.badge && !isCollapsed && (
											<span className='ml-auto bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full'>
												{item.badge}
											</span>
										)}
										{item.badge && isCollapsed && (
											<span className='absolute -top-1 -right-1 w-3 h-3 bg-red-600 text-white rounded-full' />
										)}
									</button>
								</li>
							))}
						</ul>
					</nav>
					{/* User Info Footer */}
					<div
						className={`p-4 border-t ${
							actualTheme === 'dark'
								? 'border-gray-700'
								: 'border-gray-300'
						}`}>
						<div
							className={`flex items-center ${
								isCollapsed ? '' : 'gap-3'
							} px-4 py-3 rounded-lg transition-colors cursor-pointer ${
								isCollapsed ? 'justify-center' : ''
							} ${
								actualTheme === 'dark'
									? 'hover:bg-gray-700'
									: 'hover:bg-gray-300'
							}`}>
							<div
								className='w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-center flex-shrink-0'
								title={user?.name || 'Usuário'}>
								<span className='text-sm font-bold'>
									{user?.name ? getInitials2(user.name) : 'U'}
								</span>
							</div>
							<div
								className={`flex-1 transition-all overflow-hidden ${
									isCollapsed
										? 'w-0 opacity-0'
										: 'w-auto opacity-100'
								}`}>
								<p className='text-sm font-medium whitespace-nowrap'>
									{user?.name || 'Usuário'}
								</p>
								<p
									className={`text-xs whitespace-nowrap ${
										actualTheme === 'dark'
											? 'text-gray-400'
											: 'text-gray-500'
									}`}>
									{user?.email || 'email@exemplo.com'}
								</p>
								<p
									className={`text-xs whitespace-nowrap ${
										actualTheme === 'dark'
											? 'text-gray-400'
											: 'text-gray-500'
									}`}>
									{user?.tipo
										? capitalizeFirst(user.tipo).replace(
												'_',
												' '
										  )
										: 'Tipo de usuário'}
								</p>
							</div>
						</div>
						{/* Logout Button */}
						{user && (
							<>
								<button
									onClick={async () => {
										await logout()
										navigate('/signin')
									}}
									className={`mt-2 w-full flex items-center ${
										isCollapsed ? '' : 'gap-3'
									} px-4 py-3 rounded-lg
								${
									actualTheme === 'dark'
										? 'hover:bg-red-800/30'
										: 'hover:bg-red-800/10'
								} text-red-500 transition-colors
								focus:outline-none focus:ring-2 focus:ring-red-500
								${isCollapsed ? 'justify-center' : ''}`}
									title={isCollapsed ? 'Sair' : ''}
									aria-label='Sair'>
									<LogOut
										size={20}
										className='flex-shrink-0'
									/>
									<span
										className={`font-medium transition-all ${
											isCollapsed
												? 'w-0 opacity-0'
												: 'w-auto opacity-100'
										} whitespace-nowrap overflow-hidden`}>
										Sair
									</span>
								</button>
							</>
						)}
					</div>
				</div>
			</aside>
		</>
	)
}

export default Sidebar
