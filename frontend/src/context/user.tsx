import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { UsuarioDTO, TiposUsuario } from '../types'
import { authService } from '../services/authService'

interface UserContextType {
	user: UsuarioDTO | null
	loading: boolean
	error: string | null
	setUser: (user: UsuarioDTO | null) => void
	getRole: () => TiposUsuario | null
	isAuthenticated: () => boolean
	loadUser: () => Promise<void>
	clearUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const USER_ID_KEY = 'flowlog_user_id'
const USER_DATA_KEY = 'flowlog_user_data'

interface UserProviderProps {
	children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUserState] = useState<UsuarioDTO | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const setUser = (userData: UsuarioDTO | null) => {
		setUserState(userData)

		if (userData) {
			localStorage.setItem(USER_ID_KEY, userData.id.toString())
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
		} else {
			localStorage.removeItem(USER_ID_KEY)
			localStorage.removeItem(USER_DATA_KEY)
		}
	}

	const getRole = (): TiposUsuario | null => {
		return user?.role || null
	}

	const isAuthenticated = (): boolean => {
		return user !== null
	}

	const loadUser = async () => {
		setLoading(true)
		setError(null)

		try {
			const token = localStorage.getItem('flowlog_token')

			if (!token) {
				setUser(null)
				return
			}

			const userData = await authService.getCurrentUser()
			setUser(userData)
		} catch (err) {
			console.error('Erro ao carregar dados do usu�rio:', err)
			setError('Falha ao carregar dados do usu�rio')
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	const clearUser = () => {
		setUser(null)
		localStorage.removeItem('flowlog_token')
	}

	useEffect(() => {
		const initializeUser = async () => {
			const storedUserData = localStorage.getItem(USER_DATA_KEY)
			const token = localStorage.getItem('flowlog_token')

			if (storedUserData && token) {
				try {
					const parsedUser = JSON.parse(storedUserData) as UsuarioDTO
					setUserState(parsedUser)

					loadUser()
				} catch (err) {
					console.error('Erro ao parsear dados do localStorage:', err)
					await loadUser()
				}
			} else {
				if (token) {
					await loadUser()
				} else {
					setLoading(false)
				}
			}
		}

		initializeUser()
	}, [])

	const value: UserContextType = {
		user,
		loading,
		error,
		setUser,
		getRole,
		isAuthenticated,
		loadUser,
		clearUser
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => {
	const context = useContext(UserContext)

	if (context === undefined) {
		throw new Error('useUser deve ser usado dentro de um UserProvider')
	}

	return context
}

export const useIsRole = (role: TiposUsuario): boolean => {
	const { user } = useUser()
	return user?.role === role
}

export const useHasAnyRole = (roles: TiposUsuario[]): boolean => {
	const { user } = useUser()
	return user !== null && roles.includes(user.role)
}
