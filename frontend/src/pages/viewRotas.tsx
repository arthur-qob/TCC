import { Container, Text } from '@/components/themed'
import { ColorHex } from '@/constants/colors'
import { useTheme } from '@/context/theme'

const RotasPage = () => {
	const { actualTheme } = useTheme()

	return (
		<Container
			animate='fade-up'
			className={`${
				actualTheme === 'dark'
					? `bg-[${ColorHex.zinc[950]}]`
					: `bg-[${ColorHex.white}]`
			}`}>
			<Text className='w-fit capitalize text-2xl font-medium'>
				RotasPage
			</Text>
		</Container>
	)
}

export default RotasPage
