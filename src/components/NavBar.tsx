import React from 'react'
import styles from '@/styles/modules/navbar.module.scss'
import Button from './Button'

const NavBar = () => {
	return (
		<nav className={styles.navBar}>
			<section className={styles.navBarBody}>
				<a
					className={styles.title}
					href='#'>
					[APP-NAME]
				</a>
				<ul className={styles.navBarMenu}>
					<li className={styles.navItem}>Serviços</li>
					<li className={styles.navItem}>Sobre</li>
					<li className={styles.navItem}>Contato</li>
				</ul>
			</section>

			<section className={styles.btnSection}>
				<Button
					title='Entrar'
					onPress={() => {}}
				/>
				<Button
					title='Registrar'
					variant='outlined'
					onPress={() => {}}
				/>
				<Button
					variant='text'
					title='ADMIN'
					onPress={() => {}}
				/>
			</section>
		</nav>
	)
}

export default NavBar
