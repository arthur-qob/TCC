import React from 'react'
import styles from '@/styles/modules/container.module.scss'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
	style?: React.CSSProperties
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
	return <section className={styles.container}>{children}</section>
}

export default Container
