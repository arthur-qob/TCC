package com.backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.model.Usuario;
import com.backend.repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final UsuarioRepository userRepository;

	public CustomUserDetailsService(UsuarioRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

		return org.springframework.security.core.userdetails.User.builder()
				.username(user.getEmail())
				.password(user.getSenhaHasheada())
				.roles("USER")
				.build();
	}
}
