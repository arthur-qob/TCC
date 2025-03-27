'use client'

import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react'

type colorTheme = 'light' | 'dark'
type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
	currentTheme: colorTheme
	setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
	currentTheme: 'light',
	setTheme: () => {}
})

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [theme, setTheme] = useState<Theme>('system')
	const [systemTheme, setSystemTheme] = useState<colorTheme>('light')

	useEffect(() => {
		// Check the system theme using matchMedia for web
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		// Set system theme based on user's OS preference
		const updateSystemTheme = () => {
			setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
		}

		// Initial theme setup
		updateSystemTheme()

		// Add event listener for changes to the system theme
		mediaQuery.addEventListener('change', updateSystemTheme)

		// Cleanup event listener on component unmount
		return () => {
			mediaQuery.removeEventListener('change', updateSystemTheme)
		}
	}, [])

	const currentTheme: colorTheme = theme === 'system' ? systemTheme : theme

	return (
		<ThemeContext.Provider value={{ currentTheme, setTheme }}>
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
