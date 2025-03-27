'use client'

import Button from '@/components/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '@/styles/modules/welcome.module.scss'
import React, { useEffect } from 'react'
import Container from '@/components/Container'
import { Spinner } from 'react-bootstrap'
import { useTheme } from '@/contexts/ThemeContext'
import useScreenSize from '@/hooks/useScreenSize'
import NavBar from '@/components/NavBar'

export default function HomeScreen() {
	const { currentTheme } = useTheme()

	const screenSize = useScreenSize()

	const isLoading = false

	useEffect(() => {
		const htmlElement = document.documentElement
		htmlElement.setAttribute('data-theme', currentTheme)
	}, [currentTheme])

	const breakPoints = [576, 768, 992, 1200]

	while (screenSize === 0) {
		return (
			<Container>
				<Spinner animation='border' />
			</Container>
		)
	}

	return (
		<>
			{screenSize < breakPoints[1] ? (
				<Container>
					<article className={styles.article}>
						<h1 className={styles.title}>
							Bem-vindo(a) ao [app-name]
						</h1>
						<p className={styles.subtitle}>
							Gerenciamento de comissionamento de caminhoneiros
						</p>
					</article>

					<section className={styles.btnSection}>
						<Button
							title='Entrar'
							onPress={() => {}}
							loading={isLoading}
						/>
						<Button
							title='Registrar'
							variant='outlined'
							onPress={() => {}}
							loading={isLoading}
						/>
						<Button
							variant='text'
							title='ADMIN'
							onPress={() => {}}
						/>
					</section>
				</Container>
			) : (
				<Container>
					<NavBar />
					<article className={styles.article}>
						<h1 className={styles.title}>
							Bem-vindo(a) ao [app-name]
						</h1>
						<p className={styles.subtitle}>
							Gerenciamento de comissionamento de caminhoneiros
						</p>
					</article>
				</Container>
			)}
		</>
	)
}
