import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from './context/theme.tsx'
import App from './app.tsx'
import './index.css'
import { UserProvider } from './context/user.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<ThemeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</UserProvider>
	</StrictMode>
)
