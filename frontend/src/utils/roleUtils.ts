/**
 * Role-based utilities and helpers
 *
 * This file provides utility functions and constants for working with user roles.
 */

import type { UserRole } from '../utils/types/user.types'
import { UserRoles } from '../utils/types/user.types'

/**
 * Role display names (for UI)
 */
export const RoleDisplayNames: Record<UserRole, string> = {
	[UserRoles.MOTORISTA]: 'Motorista',
	[UserRoles.GERENTE_FROTA]: 'Gerente de Frota',
	[UserRoles.GERENTE_RISCO]: 'Gerente de Risco',
	[UserRoles.PROGRAMADOR]: 'Programador',
	[UserRoles.FOCAL]: 'Focal'
}

/**
 * Get display name for a role
 */
export const getRoleDisplayName = (
	role: UserRole | null | undefined
): string => {
	if (!role) return 'Usuário'
	return RoleDisplayNames[role] || 'Desconhecido'
}

/**
 * Role hierarchy levels (higher number = more permissions)
 */
export const RoleHierarchy: Record<UserRole, number> = {
	[UserRoles.MOTORISTA]: 1,
	[UserRoles.FOCAL]: 2,
	[UserRoles.GERENTE_RISCO]: 3,
	[UserRoles.GERENTE_FROTA]: 3,
	[UserRoles.PROGRAMADOR]: 4
}

/**
 * Check if roleA has equal or higher permissions than roleB
 */
export const hasEqualOrHigherPermissions = (
	roleA: UserRole | null | undefined,
	roleB: UserRole
): boolean => {
	if (!roleA) return false
	return RoleHierarchy[roleA] >= RoleHierarchy[roleB]
}

/**
 * Manager roles (all types of managers)
 */
export const MANAGER_ROLES: UserRole[] = [
	UserRoles.GERENTE_FROTA,
	UserRoles.GERENTE_RISCO
]

/**
 * Check if role is a manager role
 */
export const isManagerRole = (role: UserRole | null | undefined): boolean => {
	if (!role) return false
	return MANAGER_ROLES.includes(role)
}

/**
 * Admin roles (highest permissions)
 */
export const ADMIN_ROLES: UserRole[] = [UserRoles.PROGRAMADOR]

/**
 * Check if role is an admin role
 */
export const isAdminRole = (role: UserRole | null | undefined): boolean => {
	if (!role) return false
	return ADMIN_ROLES.includes(role)
}

/**
 * Get role color for UI (Tailwind classes)
 */
export const getRoleColor = (role: UserRole | null | undefined): string => {
	if (!role) return 'bg-gray-500'

	switch (role) {
		case UserRoles.MOTORISTA:
			return 'bg-blue-500'
		case UserRoles.FOCAL:
			return 'bg-green-500'
		case UserRoles.GERENTE_FROTA:
			return 'bg-purple-500'
		case UserRoles.GERENTE_RISCO:
			return 'bg-orange-500'
		case UserRoles.PROGRAMADOR:
			return 'bg-red-500'
		default:
			return 'bg-gray-500'
	}
}

/**
 * Get role icon (you can replace these with actual icon components)
 */
export const getRoleIcon = (role: UserRole | null | undefined): string => {
	if (!role) return '👤'

	switch (role) {
		case UserRoles.MOTORISTA:
			return '🚗'
		case UserRoles.FOCAL:
			return '📋'
		case UserRoles.GERENTE_FROTA:
			return '🚛'
		case UserRoles.GERENTE_RISCO:
			return '⚠️'
		case UserRoles.PROGRAMADOR:
			return '💻'
		default:
			return '👤'
	}
}

/**
 * Permission definitions
 */
export const Permissions = {
	// Fleet management
	MANAGE_FLEET: [
		UserRoles.GERENTE_FROTA,
		UserRoles.PROGRAMADOR
	] as UserRole[],
	VIEW_FLEET: [
		UserRoles.GERENTE_FROTA,
		UserRoles.MOTORISTA,
		UserRoles.PROGRAMADOR
	] as UserRole[],

	// Risk management
	MANAGE_RISK: [UserRoles.GERENTE_RISCO, UserRoles.PROGRAMADOR] as UserRole[],
	VIEW_RISK: [
		UserRoles.GERENTE_RISCO,
		UserRoles.FOCAL,
		UserRoles.PROGRAMADOR
	] as UserRole[],

	// User management
	MANAGE_USERS: [UserRoles.PROGRAMADOR] as UserRole[],

	// Route management
	MANAGE_ROUTES: [
		UserRoles.GERENTE_FROTA,
		UserRoles.PROGRAMADOR
	] as UserRole[],
	VIEW_ROUTES: [
		UserRoles.GERENTE_FROTA,
		UserRoles.MOTORISTA,
		UserRoles.PROGRAMADOR
	] as UserRole[],

	// Order management
	CREATE_ORDERS: [
		UserRoles.GERENTE_FROTA,
		UserRoles.FOCAL,
		UserRoles.PROGRAMADOR
	] as UserRole[],
	VIEW_ORDERS: [
		UserRoles.GERENTE_FROTA,
		UserRoles.MOTORISTA,
		UserRoles.FOCAL,
		UserRoles.PROGRAMADOR
	] as UserRole[],

	// Client management
	MANAGE_CLIENTS: [
		UserRoles.GERENTE_FROTA,
		UserRoles.FOCAL,
		UserRoles.PROGRAMADOR
	] as UserRole[]
}

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (
	role: UserRole | null | undefined,
	permission: keyof typeof Permissions
): boolean => {
	if (!role) return false
	return Permissions[permission].includes(role)
}

/**
 * Get all permissions for a role
 */
export const getRolePermissions = (
	role: UserRole | null | undefined
): string[] => {
	if (!role) return []

	return Object.entries(Permissions)
		.filter(([_, roles]) => roles.includes(role))
		.map(([permission]) => permission)
}
