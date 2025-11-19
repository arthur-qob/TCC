export const capitalizeFirst = (text: string) => {
	return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase()
}

export const getInitials2 = (text: string) => {
	return text
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)
}
