import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [errors, setErrors] = useState({
		email: null as string | null,
		password: null as string | null
	})
	const [loading, setLoading] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev)
	}

	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		const newErrors = {
			email: null as string | null,
			password: null as string | null
		}

		if (!email) {
			newErrors.email = 'Email is required'
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email is invalid'
		}

		if (!password) {
			newErrors.password = 'Password is required'
		} else if (password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters'
		}

		setErrors(newErrors)

		setTimeout(() => {
			setLoading(false)
			console.log('✅ Login successful with', { email, password })
			navigate('/dashboard')
		}, 2500)
	}

	return (
		<div
			className='flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat p-4'
			style={{ backgroundImage: 'url(/bg_login.png)' }}>
			<div className='absolute inset-0 flex-1 bg-[rgba(0,0,0,0.8)]' />
			<div className='relative z-10 flex flex-col items-center justify-center gap-4 w-full min-h-screen'>
				<section className='w-full max-w-[500px] px-6 sm:px-12 md:px-20 py-8 md:py-10 rounded-xl bg-[rgba(150,150,150,0.25)] backdrop-blur-[10px] shadow-lg text-white'>
					<h1 className='font-poppins text-2xl sm:text-3xl text-medium mx-auto mb-4 text-center'>
						Login
					</h1>
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='email'
							className='text-sm sm:text-base'>
							Email do usuário:
						</label>
						<input
							type='email'
							id='email'
							value={email}
							placeholder='Exemplo: usuario@exemplo.com'
							onChange={(e) => setEmail(e.target.value)}
							className={`flex items-center gap-2 bg-transparent rounded-lg p-2 text-sm sm:text-base outline-none ${
								errors.email
									? 'border border-red-500'
									: 'border border-gray-300'
							}`}
						/>
					</div>
					<p
						className={`${
							errors.email ? 'text-red-500' : 'text-transparent'
						} text-sm mb-2`}>
						{errors.email ? errors.email : 'No errors'}
					</p>
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='password'
							className='text-sm sm:text-base'>
							Senha:
						</label>
						<div
							className={`flex items-center gap-2 rounded-lg p-2 ${
								errors.password
									? 'border border-red-500'
									: 'border border-gray-300'
							}`}>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								value={password}
								placeholder='Exemplo: ********'
								onChange={(e) => setPassword(e.target.value)}
								className='flex-1 outline-none bg-transparent text-sm sm:text-base'
							/>
							<button
								type='button'
								onClick={togglePasswordVisibility}>
								<span className='text-gray-300 text-sm cursor-pointer select-none'>
									{showPassword ? <Eye /> : <EyeOff />}
								</span>
							</button>
						</div>
					</div>
					<p
						className={`${
							errors.password
								? 'text-red-500'
								: 'text-transparent'
						} text-sm mb-2`}>
						{errors.password ? errors.password : 'No errors'}
					</p>
					<p className='text-blue-300 text-sm cursor-pointer hover:underline select-none w-fit'>
						Esqueceu a senha?
					</p>
					<button
						type='button'
						className='w-full flex items-center justify-center border border-[rgb(213,16,31)] bg-[rgb(213,16,31)] text-white px-4 py-2 rounded-lg hover:bg-[hsl(355,86%,35%)] hover:border-[hsl(355,86%,35%)] transition-colors my-4'
						onClick={handleSubmit}>
						{loading ? (
							<ClipLoader
								color='#fff'
								loading={loading}
								size={20}
								aria-label='Loading spinner'
							/>
						) : (
							'Login'
						)}
					</button>
					{/* <div className='flex items-center justify-center mt-4 gap-2'>
						<p className='text-xs sm:text-sm'>Powered by </p>
						<img
							src='/logo_flowlog.png'
							alt='Logo FlowLog'
							className='h-6 sm:h-8 w-auto object-contain'
						/>
					</div> */}
				</section>
			</div>
		</div>
	)
}

export default Login
