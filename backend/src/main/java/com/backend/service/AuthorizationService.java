package com.backend.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.backend.model.Admin;
import com.backend.model.GerenteFrota;
import com.backend.model.Usuario;

@Service
public class AuthorizationService {

	private final UsuarioService usuarioService;

	public AuthorizationService(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	/**
	 * Get the currently authenticated user
	 * 
	 * @return the current Usuario
	 * @throws AccessDeniedException if not authenticated
	 */
	public Usuario getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()
				|| authentication.getPrincipal().equals("anonymousUser")) {
			throw new AccessDeniedException("Not authenticated");
		}

		String email = authentication.getName();
		return usuarioService.findByEmail(email)
				.orElseThrow(() -> new AccessDeniedException("User not found"));
	}

	/**
	 * Check if the current user can create other users
	 * Only Admin and GerenteFrota can create users
	 * 
	 * @throws AccessDeniedException if user is not authorized
	 */
	public void requireUserCreationPermission() {
		Usuario currentUser = getCurrentUser();

		if (!(currentUser instanceof Admin) && !(currentUser instanceof GerenteFrota)) {
			throw new AccessDeniedException("Only Admin and Gerente de Frota can create users");
		}
	}

	/**
	 * Check if the current user is an Admin
	 * 
	 * @return true if current user is Admin, false otherwise
	 */
	public boolean isAdmin() {
		try {
			Usuario currentUser = getCurrentUser();
			return currentUser instanceof Admin;
		} catch (AccessDeniedException e) {
			return false;
		}
	}

	/**
	 * Check if the current user is a Gerente de Frota
	 * 
	 * @return true if current user is GerenteFrota, false otherwise
	 */
	public boolean isGerenteFrota() {
		try {
			Usuario currentUser = getCurrentUser();
			return currentUser instanceof GerenteFrota;
		} catch (AccessDeniedException e) {
			return false;
		}
	}

	/**
	 * Check if the current user can create users (Admin or GerenteFrota)
	 * 
	 * @return true if user can create users, false otherwise
	 */
	public boolean canCreateUsers() {
		return isAdmin() || isGerenteFrota();
	}
}
