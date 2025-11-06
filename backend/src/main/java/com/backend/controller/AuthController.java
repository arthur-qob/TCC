package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.LoginDTO;
import com.backend.dto.CriarUsuarioDTO;
import com.backend.mapper.UsuarioMapper;
import com.backend.model.Usuario;
import com.backend.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Tag(name = "Autenticacao", description = "Autenticacao endpoints")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final UsuarioService usuarioService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager gerenciadorAutenticacao;

	public AuthController(UsuarioService usuarioService, PasswordEncoder passwordEncoder,
			AuthenticationManager gerenciadorAutenticacao) {
		this.usuarioService = usuarioService;
		this.passwordEncoder = passwordEncoder;
		this.gerenciadorAutenticacao = gerenciadorAutenticacao;
	}

	@Operation(summary = "Register a new user")
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody CriarUsuarioDTO dto) {
		if (usuarioService.findByEmail(dto.getEmail()).isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("User with this email already exists");
		}

		Usuario user = UsuarioMapper.toEntity(dto, passwordEncoder);
		Usuario created = usuarioService.create(user);

		Authentication authentication = gerenciadorAutenticacao.authenticate(
				new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return ResponseEntity.status(HttpStatus.CREATED)
				.body(UsuarioMapper.toDTO(created));
	}

	@Operation(summary = "Login user")
	@PostMapping("/signin")
	public ResponseEntity<?> signin(@Valid @RequestBody LoginDTO dto, HttpServletRequest request) {
		try {
			Authentication authentication = gerenciadorAutenticacao.authenticate(
					new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			HttpSession session = request.getSession(true);
			session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

			Usuario user = usuarioService.findByEmail(dto.getEmail())
					.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

			return ResponseEntity.ok(UsuarioMapper.toDTO(user));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(java.util.Map.of("message", "Email ou senha inválidos"));
		}
	}

	@Operation(summary = "Logout user")
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		SecurityContextHolder.clearContext();
		return ResponseEntity.ok("Logged out successfully");
	}

	@Operation(summary = "Get current authenticated user")
	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()
				|| authentication.getPrincipal().equals("anonymousUser")) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
		}

		String email = authentication.getName();
		Usuario user = usuarioService.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));

		return ResponseEntity.ok(UsuarioMapper.toDTO(user));
	}
}
