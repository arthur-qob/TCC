import { useState } from 'react'
import {
	Home,
	Users,
	Settings,
	BarChart2,
	FileText,
	Bell,
	Menu,
	X,
	LogOut,
	ChevronLeft,
	Sun,
	Moon,
	Monitor
} from 'lucide-react'
import { useTheme } from '../context/theme'

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
	const { theme, toggleTheme, actualTheme } = useTheme()

	const menuItems: MenuItem[] = [
		{ icon: Home, label: 'Dashboard', href: '#' },
		{ icon: Users, label: 'Usuários', href: '#' },
		{ icon: BarChart2, label: 'Relatórios', href: '#' },
		{ icon: FileText, label: 'Documentos', href: '#' },
		{ icon: Bell, label: 'Notificações', href: '#', badge: 3 },
		{ icon: Settings, label: 'Configurações', href: '#' }
	]

	const handleNavigation = () => {
		if (window.innerWidth < 1024) {
			setIsOpen(false)
		}
	}

	return (
		<>
			{/* Mobile Toggle Button */}
			<button
				onClick={() => {
					setIsOpen(!isOpen)
					setIsCollapsed(false)
				}}
				className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg'
				aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
				aria-expanded={isOpen}>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className='lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm'
					onClick={() => setIsOpen(false)}
					aria-hidden='true'
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
					fixed top-0 left-0 h-screen z-40
					transition-all duration-300 ease-in-out
					${isCollapsed ? 'w-20' : 'w-64'}
					${isOpen ? 'translate-x-0' : '-translate-x-full'}
					lg:translate-x-0 flex flex-col shadow-2xl
					${actualTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
					${className}
				`}
				role='navigation'
				aria-label='Menu principal'>
				{/* Header */}
				<div
					className={`p-6 border-b flex items-center ${
						isCollapsed ? 'justify-center' : 'justify-between'
					} ${
						actualTheme === 'dark'
							? 'border-gray-700'
							: 'border-gray-300'
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
						<div className='flex items-center gap-2 mt-2'>
							<span
								className={`text-xs whitespace-nowrap ${
									actualTheme === 'dark'
										? 'text-gray-400'
										: 'text-gray-500'
								}`}>
								Powered by
							</span>
							<a
								href='https://github.com/arthur-qob/FlowLog'
								target='_blank'>
								<img
									src='/logo_flowlog.png'
									alt='FlowLog'
									className='h-4 w-auto object-contain'
								/>
							</a>
						</div>
					</div>

					{/* Desktop Collapse Toggle */}
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-colors flex-shrink-0 ${
							actualTheme === 'dark'
								? 'text-white hover:bg-gray-800'
								: 'text-gray-900 hover:bg-gray-800 hover:text-white'
						}`}
						aria-label={
							isCollapsed
								? 'Expandir sidebar'
								: 'Recolher sidebar'
						}>
						<ChevronLeft
							size={20}
							className={`transition-transform ${
								isCollapsed ? 'rotate-180' : ''
							}`}
						/>
					</button>
				</div>

				{/* Navigation Menu */}
				<nav className='flex-1 p-4 overflow-y-auto'>
					<ul className='space-y-2'>
						{menuItems.map((item, index) => (
							<li key={index}>
								<a
									href={item.href}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg
										transition-all group relative
										focus:outline-none focus:ring-2 focus:ring-red-500
										${actualTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
									onClick={handleNavigation}
									title={isCollapsed ? item.label : ''}>
									<item.icon
										size={20}
										className={`w-[18px] transition-colors flex-shrink-0 ${
											actualTheme === 'dark'
												? 'text-gray-400 group-hover:text-red-400'
												: 'text-gray-400 group-hover:text-red-400'
										}`}
									/>
									<span
										className={`font-medium transition-all ${
											isCollapsed
												? 'w-0 opacity-0'
												: 'w-auto opacity-100'
										} whitespace-nowrap overflow-hidden`}>
										{item.label}
									</span>
									{item.badge && !isCollapsed && (
										<span className='ml-auto bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full'>
											{item.badge}
										</span>
									)}
									{item.badge && isCollapsed && (
										<span className='absolute -top-1 -right-1 w-3 h-3 bg-red-600 text-white rounded-full' />
									)}
								</a>
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
							className='w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0'
							title='Fábio Ramos'>
							<span className='text-sm font-bold'>FR</span>
						</div>
						<div
							className={`flex-1 transition-all overflow-hidden ${
								isCollapsed
									? 'w-0 opacity-0'
									: 'w-auto opacity-100'
							}`}>
							<p className='text-sm font-medium whitespace-nowrap'>
								Fábio Ramos
							</p>
							<p
								className={`text-xs whitespace-nowrap ${
									actualTheme === 'dark'
										? 'text-gray-400'
										: 'text-gray-500'
								}`}>
								fabioramos@ziranlog.com.br
							</p>
						</div>
					</div>

					{/* Theme Toggle */}
					<button
						onClick={toggleTheme}
						className={`mt-2 w-full flex items-center ${
							isCollapsed ? '' : 'gap-3'
						} px-4 py-3 rounded-lg transition-colors
							focus:outline-none focus:ring-2 focus:ring-red-500
							${isCollapsed ? 'justify-center' : ''}
							${actualTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
						title={
							isCollapsed
								? theme === 'light'
									? 'Tema claro'
									: theme === 'dark'
									? 'Tema escuro'
									: 'Tema do sistema'
								: ''
						}
						aria-label='Alternar tema'>
						{theme === 'light' ? (
							<Sun
								size={20}
								className='flex-shrink-0'
							/>
						) : theme === 'dark' ? (
							<Moon
								size={20}
								className='flex-shrink-0'
							/>
						) : (
							<Monitor
								size={20}
								className='flex-shrink-0'
							/>
						)}
						<span
							className={`font-medium transition-all ${
								isCollapsed
									? 'w-0 opacity-0'
									: 'w-auto opacity-100'
							} whitespace-nowrap overflow-hidden`}>
							{theme === 'light'
								? 'Tema claro'
								: theme === 'dark'
								? 'Tema escuro'
								: 'Tema do sistema'}
						</span>
					</button>

					{/* Logout Button */}
					<button
						className={`mt-2 w-full flex items-center ${
							isCollapsed ? '' : 'gap-3'
						} px-4 py-3 rounded-lg
							${
								actualTheme === 'dark'
									? 'hover:bg-red-800/30'
									: 'hover:bg-red-800/10'
							} text-red-400 transition-colors
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
				</div>
			</aside>
		</>
	)
}

export default Sidebar
