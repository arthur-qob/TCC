export const getCSSVariable = (variable: string) => {
	if (typeof window === 'undefined') return '' // Prevent SSR issues in Next.js
	return getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim()
}

export const Colors = {
	light: {
		background: getCSSVariable('--light-background'),
		text: getCSSVariable('--light-text'),
		button: getCSSVariable('--light-button'),
		panel: getCSSVariable('--light-panel'),
		border: getCSSVariable('--light-border')
	},
	dark: {
		background: getCSSVariable('--dark-background'),
		text: getCSSVariable('--dark-text'),
		button: getCSSVariable('--dark-button'),
		panel: getCSSVariable('--dark-panel'),
		border: getCSSVariable('--dark-border')
	},
	static: {
		danger: getCSSVariable('--static-danger')
	}
}
