import { useEffect, useState } from 'react'

const useScreenSize = () => {
	const [screenSize, setScreenSize] = useState<number>(0)

	useEffect(() => {
		const handleResize = () => {
			setScreenSize(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return screenSize
}

export default useScreenSize
