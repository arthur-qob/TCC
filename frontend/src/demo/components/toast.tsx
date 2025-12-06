import { Slide, ToastContainer } from 'react-toastify'

const Toast = () => {
	const storedTheme = localStorage.getItem('theme') || 'light'
	const toastTheme = storedTheme === 'dark' ? 'dark' : 'light'

	return (
		<ToastContainer
			position='top-center'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss={false}
			draggable={false}
			pauseOnHover={false}
			theme={toastTheme}
			transition={Slide}
		/>
	)
}

interface EmitToastProps {
	type?: 'success' | 'error' | 'info' | 'warning'
	message: string
	position?:
		| 'top-right'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-left'
		| 'top-center'
		| 'bottom-center'
}

import { toast } from 'react-toastify'

const emitToast = ({
	type = 'info',
	message,
	position = 'top-center'
}: EmitToastProps) => {
	// Get theme from localStorage, matching ThemeContext logic
	const storedTheme = localStorage.getItem('theme') || 'system'

	// If system theme, check browser preference
	let actualTheme: 'light' | 'dark' = 'light'
	if (storedTheme === 'system') {
		actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	} else {
		actualTheme = storedTheme === 'dark' ? 'dark' : 'light'
	}

	switch (type) {
		case 'success':
			toast.success(message, { position, theme: actualTheme })
			break
		case 'error':
			toast.error(message, { position, theme: actualTheme })
			break
		case 'warning':
			toast.warning(message, { position, theme: actualTheme })
			break
		case 'info':
			toast.info(message, { position, theme: actualTheme })
			break
		default:
			toast(message, { position, theme: actualTheme })
			break
	}
}

export default { Toast, emitToast }
