import { Container, Text } from '@/components/themed'
import { ColorHex } from '@/constants/colors'
import { useTheme } from '@/context/theme'

const CreateRotaPage = () => {
	const { actualTheme } = useTheme()
	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<Text as='h1'>CreateRotaPage</Text>
		</Container>
	)
}

export default CreateRotaPage
