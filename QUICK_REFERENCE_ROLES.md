# Quick Reference: Accessing User Role (Papel)

## Import What You Need

```typescript
import { useUser } from '../context/user'
import { UserRoles } from '../utils/types/user.types'
import {
	hasPermission,
	getRoleDisplayName,
	Permissions
} from '../utils/roleUtils'
```

## Basic Usage

### Get Current User and Role

```typescript
const { user, getUserRole, hasRole, isAuthenticated } = useUser()

const role = getUserRole() // Returns UserRole | null
const isDriver = hasRole(UserRoles.MOTORISTA) // Returns boolean
```

### Check User Role

```typescript
// Method 1: Using hasRole helper
if (hasRole(UserRoles.GERENTE_FROTA)) {
	// User is Fleet Manager
}

// Method 2: Direct access
if (user?.tipo === UserRoles.GERENTE_FROTA) {
	// User is Fleet Manager
}

// Method 3: Using getUserRole
const role = getUserRole()
if (role === UserRoles.MOTORISTA) {
	// User is Driver
}
```

## All Available Roles

```typescript
UserRoles.MOTORISTA // Driver
UserRoles.GERENTE_FROTA // Fleet Manager
UserRoles.GERENTE_RISCO // Risk Manager
UserRoles.PROGRAMADOR // Programmer/Admin
UserRoles.FOCAL // Focal Point
```

## Conditional Rendering

```typescript
// Show component only to specific role
{
	hasRole(UserRoles.GERENTE_FROTA) && <FleetManagement />
}

// Show to multiple roles
{
	;(hasRole(UserRoles.GERENTE_FROTA) || hasRole(UserRoles.PROGRAMADOR)) && (
		<AdminPanel />
	)
}

// Hide from specific role
{
	!hasRole(UserRoles.MOTORISTA) && <CreateOrderButton />
}
```

## Permission-Based Access

```typescript
// Using the permission system
const role = getUserRole()

if (hasPermission(role, 'MANAGE_FLEET')) {
	// User can manage fleet
}

if (hasPermission(role, 'CREATE_ORDERS')) {
	// User can create orders
}

// All available permissions:
Permissions.MANAGE_FLEET
Permissions.VIEW_FLEET
Permissions.MANAGE_RISK
Permissions.VIEW_RISK
Permissions.MANAGE_USERS
Permissions.MANAGE_ROUTES
Permissions.VIEW_ROUTES
Permissions.CREATE_ORDERS
Permissions.VIEW_ORDERS
Permissions.MANAGE_CLIENTS
```

## Display Role Name

```typescript
const role = getUserRole()
const roleName = getRoleDisplayName(role)
// Returns: "Motorista", "Gerente de Frota", "Gerente de Risco", etc.
```

## Protected Component Pattern

```typescript
const ProtectedComponent = () => {
	const { hasRole } = useUser()

	// Only allow Programador and Gerente Frota
	if (!hasRole(UserRoles.PROGRAMADOR) && !hasRole(UserRoles.GERENTE_FROTA)) {
		return <div>Access Denied</div>
	}

	return <div>Protected Content</div>
}
```

## Switch Statement for Different Views

```typescript
const DashboardContent = () => {
	const role = getUserRole()

	switch (role) {
		case UserRoles.MOTORISTA:
			return <DriverDashboard />
		case UserRoles.GERENTE_FROTA:
			return <FleetManagerDashboard />
		case UserRoles.GERENTE_RISCO:
			return <RiskManagerDashboard />
		case UserRoles.PROGRAMADOR:
			return <AdminDashboard />
		case UserRoles.FOCAL:
			return <FocalDashboard />
		default:
			return <DefaultDashboard />
	}
}
```

## Custom Hooks for Permissions

```typescript
const useCanManageFleet = () => {
	const { hasRole } = useUser()
	return hasRole(UserRoles.GERENTE_FROTA) || hasRole(UserRoles.PROGRAMADOR)
}

// Usage
const MyComponent = () => {
	const canManageFleet = useCanManageFleet()

	return <div>{canManageFleet && <button>Edit Fleet</button>}</div>
}
```

## Navigation Guards

```typescript
const ProtectedRoute = ({ allowedRoles, children }) => {
	const { getUserRole, isAuthenticated } = useUser()

	if (!isAuthenticated) {
		return <Navigate to='/login' />
	}

	const role = getUserRole()
	if (role && !allowedRoles.includes(role)) {
		return <Navigate to='/unauthorized' />
	}

	return children
}

// Usage
;<ProtectedRoute
	allowedRoles={[UserRoles.PROGRAMADOR, UserRoles.GERENTE_FROTA]}>
	<AdminPage />
</ProtectedRoute>
```

## Check Authentication + Role

```typescript
const { isAuthenticated, hasRole } = useUser()

if (isAuthenticated && hasRole(UserRoles.MOTORISTA)) {
	// Authenticated driver
}

if (isAuthenticated && !getUserRole()) {
	// Authenticated but no specific role (basic user)
}
```

## Backend Note

The backend now returns the `tipo` field in the response from:

-   `/api/auth/signin` - Login endpoint
-   `/api/auth/signup` - Registration endpoint
-   `/api/auth/me` - Current user endpoint

The `tipo` field will be one of: `"MOTORISTA"`, `"GERENTE_FROTA"`, `"GERENTE_RISCO"`, `"PROGRAMADOR"`, `"FOCAL"`, or `null` for basic users.
