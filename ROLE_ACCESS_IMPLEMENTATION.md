# User Role (Papel) Access Implementation

## Summary

Successfully implemented role (papel) access throughout the application, allowing you to identify and use the user's role in the frontend.

## Changes Made

### Backend Changes

#### 1. `UsuarioDTO.java` - Added role type field

-   **File**: `backend/src/main/java/com/backend/dto/UsuarioDTO.java`
-   **Change**: Added `tipo` field (String) to store role type
-   **Values**: `MOTORISTA`, `GERENTE_FROTA`, `GERENTE_RISCO`, `PROGRAMADOR`, `FOCAL`, or `null` for basic users

#### 2. `UsuarioMapper.java` - Populate role type

-   **File**: `backend/src/main/java/com/backend/mapper/UsuarioMapper.java`
-   **Change**: Updated `toDTO()` method to detect user's role type using `instanceof` checks
-   **Logic**: Checks if user is instance of Motorista, GerenteFrota, GerenteRisco, Programador, or Focal

### Frontend Changes

#### 3. `user.types.ts` - Added role types

-   **File**: `frontend/src/utils/types/user.types.ts`
-   **Changes**:
    -   Added `UserRoles` const object with all role constants
    -   Added `UserRole` type for type safety
    -   Updated `Usuario` interface to include optional `tipo` field

#### 4. `auth.types.ts` - Enhanced authentication context

-   **File**: `frontend/src/utils/types/auth.types.ts`
-   **Changes**:
    -   Changed `AuthResponse` to alias `Usuario` type
    -   Updated `AuthContextType` to include:
        -   `refreshUser()` - Refresh user data from backend
        -   `getUserRole()` - Get current user's role
        -   `hasRole(role)` - Check if user has specific role

#### 5. `user.tsx` - Updated user context

-   **File**: `frontend/src/context/user.tsx`
-   **Changes**:
    -   **Bug Fix**: Changed localStorage to store full user object instead of just ID
    -   **Bug Fix**: Changed `USER_STORAGE_KEY` from empty string to `'tcc_user'`
    -   Added `refreshUser()` method to fetch latest user data
    -   Added `getUserRole()` helper method
    -   Added `hasRole(role)` helper method
    -   Improved type safety with `Usuario` type casting

#### 6. `index.ts` - Fixed exports

-   **File**: `frontend/src/utils/types/index.ts`
-   **Change**: Properly export all type modules instead of circular self-reference

### Example Usage

Created comprehensive example files:

-   `frontend/src/examples/roleUsageExample.tsx` - Complete usage examples
-   `frontend/src/utils/roleUtils.ts` - Utility functions for role management

## How to Use

### 1. Access User Role in Components

```typescript
import { useUser } from '../context/user'
import { UserRoles } from '../utils/types/user.types'

const MyComponent = () => {
	const { user, getUserRole, hasRole } = useUser()

	// Get the role
	const role = getUserRole() // Returns UserRole | null

	// Check specific role
	if (hasRole(UserRoles.MOTORISTA)) {
		// Show motorista-specific content
	}

	// Direct access
	if (user?.tipo === UserRoles.GERENTE_FROTA) {
		// Show fleet manager content
	}
}
```

### 2. Conditional Rendering

```typescript
const Dashboard = () => {
	const { hasRole } = useUser()

	return (
		<div>
			{hasRole(UserRoles.GERENTE_FROTA) && <FleetManagementPanel />}
			{hasRole(UserRoles.MOTORISTA) && <DriverDashboard />}
		</div>
	)
}
```

### 3. Protected Routes/Components

```typescript
const ProtectedComponent = () => {
	const { hasRole } = useUser()

	if (!hasRole(UserRoles.PROGRAMADOR) && !hasRole(UserRoles.GERENTE_FROTA)) {
		return <AccessDenied />
	}

	return <SensitiveContent />
}
```

### 4. Custom Permission Hooks

```typescript
const usePermissions = () => {
	const { hasRole } = useUser()

	const canManageFleet =
		hasRole(UserRoles.GERENTE_FROTA) || hasRole(UserRoles.PROGRAMADOR)
	const canManageRisk =
		hasRole(UserRoles.GERENTE_RISCO) || hasRole(UserRoles.PROGRAMADOR)

	return { canManageFleet, canManageRisk }
}
```

## Available Roles

From `UserRoles` constant:

-   `UserRoles.MOTORISTA` - Driver
-   `UserRoles.GERENTE_FROTA` - Fleet Manager
-   `UserRoles.GERENTE_RISCO` - Risk Manager
-   `UserRoles.PROGRAMADOR` - Programmer/Admin
-   `UserRoles.FOCAL` - Focal point

## Testing

1. **Backend**: Restart your Spring Boot server to pick up the changes
2. **Frontend**: The types should compile without errors
3. **Authentication**:
    - Sign in with different user types
    - Check the `user` object in React DevTools
    - Verify `user.tipo` contains the correct role
    - Test `getUserRole()` and `hasRole()` methods

## Bug Fixes Included

1. **localStorage Storage**: Now stores the complete user object (not just ID)
2. **Storage Key**: Changed from empty string to proper `'tcc_user'` key
3. **Type Exports**: Fixed circular export in `index.ts`

## Notes

-   If a user has no specific role (basic Usuario), `tipo` will be `undefined`/`null`
-   The backend uses `instanceof` to determine role type during authentication
-   Frontend helper methods are null-safe and won't crash if user is not authenticated
-   Role checking happens client-side, but you should also verify permissions on the backend

## Next Steps

1. Update your route guards to use `hasRole()` for protected routes
2. Update navigation/sidebar to show/hide items based on role
3. Add role-based UI elements throughout your application
4. Consider adding role-based API error handling
5. Test with actual user accounts of different roles

## Files Modified

**Backend (2 files)**:

-   `backend/src/main/java/com/backend/dto/UsuarioDTO.java`
-   `backend/src/main/java/com/backend/mapper/UsuarioMapper.java`

**Frontend (6 files)**:

-   `frontend/src/utils/types/user.types.ts`
-   `frontend/src/utils/types/auth.types.ts`
-   `frontend/src/utils/types/index.ts`
-   `frontend/src/context/user.tsx`
-   `frontend/src/examples/roleUsageExample.tsx` (new)
-   `frontend/src/utils/roleUtils.ts` (new)

## Role Utilities (`roleUtils.ts`)

The `roleUtils.ts` file provides additional helper functions:

### Display Utilities

-   `getRoleDisplayName(role)` - Get user-friendly role names in Portuguese
-   `getRoleColor(role)` - Get Tailwind color classes for roles
-   `getRoleIcon(role)` - Get emoji icons for roles

### Permission System

-   `hasPermission(role, permission)` - Check if role has specific permission
-   `Permissions` object - Centralized permission definitions
    -   `MANAGE_FLEET`, `VIEW_FLEET`
    -   `MANAGE_RISK`, `VIEW_RISK`
    -   `MANAGE_USERS`
    -   `MANAGE_ROUTES`, `VIEW_ROUTES`
    -   `CREATE_ORDERS`, `VIEW_ORDERS`
    -   `MANAGE_CLIENTS`

### Role Hierarchy

-   `hasEqualOrHigherPermissions(roleA, roleB)` - Compare role levels
-   `isManagerRole(role)` - Check if role is a manager
-   `isAdminRole(role)` - Check if role is admin/programmer

Example usage:

```typescript
import {
	hasPermission,
	getRoleDisplayName,
	Permissions
} from '../utils/roleUtils'

const MyComponent = () => {
	const { getUserRole } = useUser()
	const role = getUserRole()

	return (
		<div>
			<h2>{getRoleDisplayName(role)}</h2>
			{hasPermission(role, 'MANAGE_FLEET') && (
				<button>Manage Fleet</button>
			)}
		</div>
	)
}
```
