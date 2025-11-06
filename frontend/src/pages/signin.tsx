import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import Spinner from '../components/spinner'
import { useUser } from '../context/user'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false)
	const [errors, setErrors] = useState({
		email: null as string | null,
		password: null as string | null,
		general: null as string | null
	})
	const [loading, setLoading] = useState(false)

	const { signin } = useUser()
	const navigate = useNavigate()

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev)
	}

	const handleFormSubmition = (e: React.FormEvent) => {
		e.preventDefault() // Prevent default form submission
		setLoading(true)

		const newErrors: typeof errors = {
			email: null,
			password: null,
			general: null
		}

		if (!email) {
			newErrors.email = 'Email is required'
		}

		if (!password) {
			newErrors.password = 'Password is required'
		}

		setErrors(newErrors)

		if (Object.values(newErrors).some((error) => error !== null)) return

		signin({ email, password })
			.then(() => navigate('/dashboard'))
			.catch((e) => {
				newErrors.general = e.message || 'Invalid email or password'
			})
			.finally(() => {
				setErrors(newErrors)
				setLoading(false)
			})
	}

	return (
		<section
			className='flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat p-4 overflow-y-hidden'
			style={{ backgroundImage: 'url(/bg_login.png)' }}>
			<div className='absolute inset-0 flex-1 bg-[rgba(0,0,0,0.75)] flex flex-col justify-center items-center'>
				<form
					className='w-full max-w-[500px] px-6 sm:px-12 md:px-20 py-8 md:py-10 rounded-xl bg-[rgba(150,150,150,0.25)] backdrop-blur-[10px] shadow-lg text-white'
					onSubmit={handleFormSubmition}>
					<img
						src='/logo_ziranlog.png'
						alt='Logo da empresa ZiranLog'
						width={'250'}
						className='mx-auto mb-10'
					/>
					<h1 className='font-poppins text-2xl sm:text-3xl text-medium mx-auto mb-10 text-center'>
						Login
					</h1>
					<div className='flex flex-col gap-2'>
						<div
							className={`flex items-center gap-2 bg-transparent rounded-lg p-2 ${
								errors.email
									? 'border border-red-500'
									: 'border border-gray-300'
							}`}>
							<label htmlFor='email'>
								<Mail
									className='text-gray-400 flex-shrink-0'
									size={18}
								/>
							</label>
							<input
								autoFocus
								id='email'
								type='email'
								value={email}
								placeholder='Email do usuário'
								onChange={(e) => setEmail(e.target.value)}
								className='flex-1 bg-transparent text-sm sm:text-base outline-none'
							/>
						</div>
					</div>
					<p
						className={`${
							errors.email ? 'text-red-500' : 'text-transparent'
						} text-sm mb-2`}>
						{errors.email ? errors.email : 'No errors'}
					</p>
					<div className='flex flex-col gap-2'>
						<div
							className={`flex items-center gap-2 rounded-lg p-2 ${
								errors.password
									? 'border border-red-500'
									: 'border border-gray-300'
							}`}>
							<label htmlFor='password'>
								<Lock
									className='text-gray-400 flex-shrink-0'
									size={18}
								/>
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								id='password'
								value={password}
								placeholder='Senha'
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => setIsPasswordFocused(true)}
								onBlur={() => setIsPasswordFocused(false)}
								className='flex-1 outline-none bg-transparent text-sm sm:text-base'
							/>
							{isPasswordFocused && (
								<button
									type='button'
									onMouseDown={(e) => e.preventDefault()}
									onClick={togglePasswordVisibility}>
									<span className='text-gray-300 text-sm cursor-pointer select-none'>
										{showPassword ? (
											<Eye size={18} />
										) : (
											<EyeOff size={18} />
										)}
									</span>
								</button>
							)}
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
						type='submit'
						className='w-full flex items-center justify-center border border-[rgb(213,16,31)] bg-[rgb(213,16,31)] text-white px-4 py-2 rounded-lg hover:bg-[hsl(355,86%,35%)] hover:border-[hsl(355,86%,35%)] transition-colors my-4 font-medium text-lg'>
						{loading ? <Spinner /> : 'Login'}
					</button>
					{errors?.general !== null && (
						<p className='text-red-500'>{errors.general}</p>
					)}
					{/* <div className='flex items-center justify-center mt-4 gap-2'>
						<p className='text-xs sm:text-sm'>Powered by </p>
						<img
							src='/logo_flowlog.png'
							alt='Logo FlowLog'
							className='h-6 sm:h-8 w-auto object-contain'
						/>
					</div> */}
				</form>
			</div>
		</section>
	)
}

export default SignInPage
