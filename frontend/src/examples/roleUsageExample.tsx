/**
 * Example: How to use user role (papel) information
 *
 * This file demonstrates how to access and use the user's role
 * in your components after the implementation.
 */

import { useUser } from '../context/user'
import { UserRoles } from '../utils/types/user.types'

export const RoleUsageExample = () => {
	const { user, getUserRole, hasRole, isAuthenticated } = useUser()

	// Example 1: Display user role
	const displayUserRole = () => {
		if (!isAuthenticated) {
			return <p>Not authenticated</p>
		}

		const role = getUserRole()
		if (!role) {
			return <p>User: {user?.name} (Basic User - No Role)</p>
		}

		return (
			<div>
				<p>User: {user?.name}</p>
				<p>Email: {user?.email}</p>
				<p>Role: {role}</p>
			</div>
		)
	}

	// Example 2: Conditional rendering based on role
	const renderMotoristaContent = () => {
		if (hasRole(UserRoles.MOTORISTA)) {
			return (
				<div>
					<h2>Motorista Dashboard</h2>
					<p>Welcome, driver!</p>
					{/* Motorista-specific content */}
				</div>
			)
		}
		return null
	}

	// Example 3: Multiple role checks
	const renderManagerContent = () => {
		const isGerenteFrota = hasRole(UserRoles.GERENTE_FROTA)
		const isGerenteRisco = hasRole(UserRoles.GERENTE_RISCO)

		if (isGerenteFrota || isGerenteRisco) {
			return (
				<div>
					<h2>Manager Dashboard</h2>
					{isGerenteFrota && <p>Fleet Management Access</p>}
					{isGerenteRisco && <p>Risk Management Access</p>}
				</div>
			)
		}
		return null
	}

	// Example 4: Direct access to user.tipo
	const checkRoleDirectly = () => {
		switch (user?.tipo) {
			case UserRoles.MOTORISTA:
				return 'Driver View'
			case UserRoles.GERENTE_FROTA:
				return 'Fleet Manager View'
			case UserRoles.GERENTE_RISCO:
				return 'Risk Manager View'
			case UserRoles.PROGRAMADOR:
				return 'Programmer View'
			case UserRoles.FOCAL:
				return 'Focal View'
			default:
				return 'Default View'
		}
	}

	// Example 5: Protected component/route
	const ProtectedContent = () => {
		// Only show to Gerente Frota or Programador
		if (
			!hasRole(UserRoles.GERENTE_FROTA) &&
			!hasRole(UserRoles.PROGRAMADOR)
		) {
			return <p>Access Denied</p>
		}

		return (
			<div>
				<h3>Protected Content</h3>
				<p>Only visible to Fleet Managers and Programmers</p>
			</div>
		)
	}

	return (
		<div>
			<h1>Role Usage Examples</h1>
			{displayUserRole()}
			{renderMotoristaContent()}
			{renderManagerContent()}
			<p>Current view: {checkRoleDirectly()}</p>
			<ProtectedContent />
		</div>
	)
}

// Example 6: Custom hook for role-based logic
export const useRolePermissions = () => {
	const { getUserRole, hasRole } = useUser()

	const canManageFleet = () => {
		return (
			hasRole(UserRoles.GERENTE_FROTA) || hasRole(UserRoles.PROGRAMADOR)
		)
	}

	const canManageRisk = () => {
		return (
			hasRole(UserRoles.GERENTE_RISCO) || hasRole(UserRoles.PROGRAMADOR)
		)
	}

	const canManageUsers = () => {
		return hasRole(UserRoles.PROGRAMADOR)
	}

	const canCreatePedidos = () => {
		const role = getUserRole()
		return role !== null && role !== UserRoles.MOTORISTA
	}

	return {
		canManageFleet,
		canManageRisk,
		canManageUsers,
		canCreatePedidos
	}
}

// Example 7: Usage in a component
export const DashboardWithPermissions = () => {
	const { canManageFleet, canManageUsers } = useRolePermissions()

	return (
		<div>
			<h1>Dashboard</h1>
			{canManageFleet() && <button>Manage Fleet</button>}
			{canManageUsers() && <button>Manage Users</button>}
		</div>
	)
}
