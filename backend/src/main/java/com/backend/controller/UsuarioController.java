package com.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.CriarUsuarioDTO;
import com.backend.dto.UsuarioDTO;
import com.backend.mapper.UsuarioMapper;
import com.backend.model.Usuario;
import com.backend.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Usuários", description = "Operações CRUD para Usuários")
@RestController
@RequestMapping("/api/users")
public class UsuarioController {

	private final UsuarioService service;
	private final PasswordEncoder passwordEncoder;

	public UsuarioController(UsuarioService service, PasswordEncoder passwordEncoder) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
	}

	@Operation(summary = "Listar todos os usuários")
	@GetMapping
	public List<UsuarioDTO> list() {
		return service.list().stream()
				.map(UsuarioMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um usuário por ID")
	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(UsuarioMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Buscar um usuário por email")
	@GetMapping("/{email}")
	public ResponseEntity<UsuarioDTO> findByEmail(@PathVariable String email) {
		return service.findByEmail(email)
				.map(UsuarioMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo usuário")
	@PostMapping
	public ResponseEntity<UsuarioDTO> create(@Valid @RequestBody CriarUsuarioDTO in) {
		Usuario entity = UsuarioMapper.toEntity(in, passwordEncoder);
		Usuario created = service.create(entity);
		UsuarioDTO dto = UsuarioMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/users/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um usuário por ID")
	@PutMapping("/{id}")
	public ResponseEntity<UsuarioDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarUsuarioDTO in) {
		Usuario entity = UsuarioMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		Usuario updated = service.update(id, entity);
		return ResponseEntity.ok(UsuarioMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um usuário por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
