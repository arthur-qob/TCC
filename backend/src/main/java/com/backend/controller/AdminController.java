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

import com.backend.dto.AdminDTO;
import com.backend.dto.CriarAdminDTO;
import com.backend.mapper.AdminMapper;
import com.backend.model.Admin;
import com.backend.service.AdminService;
import com.backend.service.AuthorizationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Admins", description = "Operações CRUD para Administradores")
@RestController
@RequestMapping("/api/admins")
public class AdminController {

	private final AdminService service;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;

	public AdminController(AdminService service, PasswordEncoder passwordEncoder,
			AuthorizationService authorizationService) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "Listar todos os administradores")
	@GetMapping
	public List<AdminDTO> list() {
		return service.list().stream()
				.map(AdminMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um administrador por ID")
	@GetMapping("/{id}")
	public ResponseEntity<AdminDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(AdminMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo administrador")
	@PostMapping
	public ResponseEntity<AdminDTO> create(@Valid @RequestBody CriarAdminDTO in) {
		authorizationService.requireUserCreationPermission();
		Admin entity = AdminMapper.toEntity(in, passwordEncoder);
		Admin created = service.create(entity);
		AdminDTO dto = AdminMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/admins/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um administrador por ID")
	@PutMapping("/{id}")
	public ResponseEntity<AdminDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarAdminDTO in) {
		Admin entity = AdminMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		Admin updated = service.update(id, entity);
		return ResponseEntity.ok(AdminMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um administrador por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
