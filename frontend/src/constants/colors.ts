// Tailwind-based color system
export const Colors = {
	primary: { light: 'red-500', dark: 'red-600' },
	primaryHover: { light: 'red-600', dark: 'red-700' },
	success: { light: 'green-500', dark: 'green-600' },
	successHover: { light: 'green-600', dark: 'green-700' },
	background: { light: 'zinc-100', dark: 'zinc-950' },
	card: { light: 'white', dark: 'zinc-900' },
	border: { light: 'zinc-300', dark: 'zinc-700' },
	borderSubtle: { light: 'zinc-200', dark: 'zinc-800' },
	text: {
		primary: { light: 'zinc-900', dark: 'white' },
		secondary: { light: 'zinc-700', dark: 'zinc-300' },
		muted: { light: 'zinc-500', dark: 'zinc-500' }
	},
	input: {
		background: { light: 'white', dark: 'zinc-800' },
		border: { light: 'zinc-300', dark: 'zinc-600' },
		placeholder: { light: 'zinc-500', dark: 'zinc-400' }
	},
	hover: { light: 'zinc-300', dark: 'zinc-700' },
	focus: 'red-500'
}

// Hex color mappings for MUI inline styles
export const ColorHex = {
	zinc: {
		50: '#fafafa',
		100: '#f4f4f5',
		200: '#e4e4e7',
		300: '#d4d4d8',
		400: '#a1a1aa',
		500: '#71717a',
		600: '#52525b',
		700: '#3f3f46',
		800: '#27272a',
		900: '#18181b',
		950: '#09090b'
	},
	red: {
		400: '#f87171',
		500: '#ef4444',
		600: '#dc2626',
		700: '#b91c1c',
		900: '#7f1d1d'
	},
	green: {
		300: '#86efac',
		500: '#22c55e',
		600: '#16a34a',
		700: '#15803d'
	},
	white: '#ffffff'
}

// Utility function to get color value by theme
export function getColor(path: string, theme: 'light' | 'dark'): string {
	const keys = path.split('.')
	let value: any = Colors

	for (const key of keys) {
		value = value[key]
		if (!value) return ''
	}

	if (typeof value === 'object' && 'light' in value && 'dark' in value) {
		return value[theme]
	}

	return value
}
