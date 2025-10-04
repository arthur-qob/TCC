import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode
} from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
	setTheme: (theme: Theme) => void
	actualTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('theme') as Theme | null
		return savedTheme || 'system'
	})

	const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	})

	const actualTheme = theme === 'system' ? systemTheme : theme

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (e: MediaQueryListEvent) => {
			setSystemTheme(e.matches ? 'dark' : 'light')
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	useEffect(() => {
		localStorage.setItem('theme', theme)
		document.documentElement.classList.toggle('dark', actualTheme === 'dark')

		// Set body background color based on theme
		document.body.style.backgroundColor = actualTheme === 'dark' ? '#000000' : '#f3f4f6'
		document.body.style.transition = 'background-color 0.2s'
	}, [theme, actualTheme])

	const toggleTheme = () => {
		setTheme((prev) => {
			if (prev === 'light') return 'dark'
			if (prev === 'dark') return 'system'
			return 'light'
		})
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, setTheme, actualTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
