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
const SESSION_TIMESTAMP_KEY = 'session_timestamp'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUserState] = useState<Usuario | null>(null)
	const [isCheckingSession, setIsCheckingSession] = useState(true)

	useEffect(() => {
		const checkSession = async () => {
			const storedUser = localStorage.getItem(USER_STORAGE_KEY)
			const sessionTimestamp = localStorage.getItem(SESSION_TIMESTAMP_KEY)

			if (storedUser && sessionTimestamp) {
				try {
					const parsedUser = JSON.parse(storedUser) as Usuario
					const timestamp = parseInt(sessionTimestamp, 10)
					const currentTime = Date.now()
					const sessionAge = currentTime - timestamp

					// Check if session is still valid (less than 24 hours)
					if (sessionAge < SESSION_DURATION_MS) {
						// Session is valid, verify with backend
						try {
							await authService.getCurrentUser()
							setUserState(parsedUser)
						} catch (error) {
							// Backend session invalid, clear local storage
							console.error('Backend session invalid:', error)
							localStorage.removeItem(USER_STORAGE_KEY)
							localStorage.removeItem(SESSION_TIMESTAMP_KEY)
							setUserState(null)
						}
					} else {
						// Session expired, clear storage
						console.log('Session expired after 24 hours')
						localStorage.removeItem(USER_STORAGE_KEY)
						localStorage.removeItem(SESSION_TIMESTAMP_KEY)
						setUserState(null)
					}
				} catch (error) {
					console.error('Error parsing stored user:', error)
					localStorage.removeItem(USER_STORAGE_KEY)
					localStorage.removeItem(SESSION_TIMESTAMP_KEY)
					setUserState(null)
				}
			}

			setIsCheckingSession(false)
		}

		checkSession()
	}, [])

	const setUser = (userData: Usuario | null) => {
		setUserState((userData) => userData)

		if (userData) {
			localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
			localStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString())
		} else {
			localStorage.removeItem(USER_STORAGE_KEY)
			localStorage.removeItem(SESSION_TIMESTAMP_KEY)
		}
	}

	const signin = async (credentials: LoginRequest): Promise<Usuario> => {
		console.log('signin called in context with:', credentials.email)
		try {
			const userData = await authService.signin(credentials)
			console.log('authService.signin returned:', userData)
			setUser(userData)
			return userData
		} catch (e) {
			console.log('authService.signin failed:', e)
			setUser(null)
			throw e
		}
	}

	const signup = async (data: SignupRequest): Promise<Usuario> => {
		try {
			const userData = await authService.signup(data)
			setUser(userData)
			return userData
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

	const refreshUser = async (): Promise<Usuario> => {
		try {
			const userData = await authService.getCurrentUser()
			setUser(userData)
			return userData
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
		isAuthenticated: user !== null,
		isCheckingSession
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
