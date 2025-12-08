import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '@/context/theme'
import { ColorHex } from '../constants/colors'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	size?: 'sm' | 'md' | 'lg' | 'xl'
	showCloseButton?: boolean
}

interface ModalPortalProps {
	children: React.ReactNode
}

const ModalPortal = ({ children }: ModalPortalProps) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	return mounted ? createPortal(children, document.body) : null
}

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = 'md',
	showCloseButton = true
}: ModalProps) => {
	const { actualTheme } = useTheme()
	const modalRef = useRef<HTMLDivElement>(null)
	const isDark = actualTheme === 'dark'
	const [isClosing, setIsClosing] = useState(false)
	const [shouldRender, setShouldRender] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true)
			setIsClosing(true)
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setIsClosing(false)
				})
			})
		}
	}, [isOpen])

	const handleClose = () => {
		setIsClosing(true)
		setTimeout(() => {
			setShouldRender(false)
			onClose()
		}, 300)
	}

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				handleClose()
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			handleClose()
		}
	}

	if (!shouldRender) return null

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-lg',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl'
	}

	return (
		<ModalPortal>
			<div
				className='fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300'
				onClick={handleBackdropClick}
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					backdropFilter: 'blur(4px)',
					opacity: isClosing ? 0 : 1,
					transition: 'opacity 300ms ease-in-out'
				}}>
				<div
					ref={modalRef}
					className={`relative w-full ${sizeClasses[size]} rounded-xl shadow-2xl`}
					style={{
						backgroundColor: isDark
							? ColorHex.zinc[900]
							: ColorHex.white,
						border: `1px solid ${
							isDark ? ColorHex.zinc[700] : ColorHex.zinc[300]
						}`,
						maxHeight: '90vh',
						display: 'flex',
						flexDirection: 'column',
						transform: isClosing ? 'scale(0.95)' : 'scale(1)',
						opacity: isClosing ? 0 : 1,
						transition: 'all 300ms ease-in-out'
					}}>
					{(title || showCloseButton) && (
						<div
							className='flex items-center justify-between p-6 border-b'
							style={{
								borderColor: isDark
									? ColorHex.zinc[700]
									: ColorHex.zinc[300]
							}}>
							{title && (
								<h2
									className='text-xl font-semibold'
									style={{
										color: isDark
											? ColorHex.zinc[100]
											: ColorHex.zinc[900]
									}}>
									{title}
								</h2>
							)}
							{showCloseButton && (
								<button
									onClick={handleClose}
									className='p-2 rounded-lg transition-colors hover:bg-opacity-10 hover:bg-gray-500'
									style={{
										color: isDark
											? ColorHex.zinc[400]
											: ColorHex.zinc[600]
									}}>
									<X size={20} />
								</button>
							)}
						</div>
					)}

					<div
						className='flex-1 overflow-y-auto p-6'
						style={{
							color: isDark
								? ColorHex.zinc[100]
								: ColorHex.zinc[900]
						}}>
						{children}
					</div>
				</div>
			</div>
		</ModalPortal>
	)
}

export default Modal
