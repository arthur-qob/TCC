import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Usuario, UserRole } from '../utils/types/user.types'
import type {
	LoginRequest,
	SignupRequest,
	AuthContextType
} from '../utils/types/auth.types'
import { authService } from '../services/authService'

const UserContext = createContext<AuthContextType | undefined>(undefined)

interface UserProviderProps {
	children: ReactNode
}

const USER_STORAGE_KEY = 'current_user'

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUserState] = useState<Usuario | null>(null)

	useEffect(() => {
		const storedUser = localStorage.getItem(USER_STORAGE_KEY)
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser) as Usuario
				setUserState(parsedUser)
			} catch (error) {
				console.error('Error parsing stored user:', error)
				localStorage.removeItem(USER_STORAGE_KEY)
			}
		}
	}, [])

	const setUser = (userData: Usuario | null) => {
		setUserState(userData)
		if (userData) {
			localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
		} else {
			localStorage.removeItem(USER_STORAGE_KEY)
		}
	}

	const signin = async (credentials: LoginRequest): Promise<void> => {
		try {
			const userData = await authService.signin(credentials)
			setUser(userData)
		} catch (e) {
			setUser(null)
			throw e
		}
	}

	const signup = async (data: SignupRequest): Promise<void> => {
		try {
			const userData = await authService.signup(data)
			setUser(userData)
		} catch (error) {
			setUser(null)
			throw error
		}
	}

	const logout = async (): Promise<void> => {
		try {
			await authService.logout()
			setUser(null)
		} catch (error) {
			throw error
		}
	}

	const refreshUser = async (): Promise<void> => {
		try {
			const userData = await authService.getCurrentUser()
			setUser(userData)
		} catch (error) {
			setUser(null)
			throw error
		}
	}

	const getUserRole = (): UserRole | null => {
		return user?.tipo ?? null
	}

	const hasRole = (role: UserRole): boolean => {
		return user?.tipo === role
	}

	const value: AuthContextType = {
		user,
		signin,
		signup,
		logout,
		refreshUser,
		getUserRole,
		hasRole,
		isAuthenticated: user !== null
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = (): AuthContextType => {
	const context = useContext(UserContext)

	if (context === undefined) {
		throw new Error('useUser deve ser usado dentro de um UserProvider')
	}

	return context
}
