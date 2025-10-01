import { useNavigate } from 'react-router-dom'

const HomePage = () => {
	const navigate = useNavigate()

	return (
		<div className='flex flex-col items-center justify-start min-h-screen bg-gray-100 gap-4'>
			<div
				className={`min-h-screen bg-gray-100 transition-all duration-300 `}>
				{/* ${
					isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
				} */}
				<div className='p-8'>
					<div className='max-w-7xl mx-auto'>
						<h2 className='text-3xl font-bold text-gray-800 mb-6 mt-12 lg:mt-0'>
							Bem-vindo ao Dashboard
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<div
									key={item}
									className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
									<h3 className='text-lg font-semibold text-gray-800 mb-2'>
										Card {item}
									</h3>
									<p className='text-gray-600'>
										Conteúdo do card de exemplo para
										demonstrar o layout.
									</p>
								</div>
							))}
						</div>

						<div className='flex justify-center mt-6'>
							<button
								className='border border-[rgb(10,132,255)] bg-[rgb(10,132,255)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(0,112,235)] transition-colors duration-300'
								type='button'
								onClick={() => {
									navigate('/login')
								}}>
								Login page
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
