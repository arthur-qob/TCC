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

import com.backend.dto.CriarProgramadorDTO;
import com.backend.dto.ProgramadorDTO;
import com.backend.mapper.ProgramadorMapper;
import com.backend.model.Programador;
import com.backend.service.AuthorizationService;
import com.backend.service.ProgramadorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Programadores", description = "Operações CRUD para Programadores")
@RestController
@RequestMapping("/api/programadores")
public class ProgramadorController {

	private final ProgramadorService service;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;

	public ProgramadorController(ProgramadorService service, PasswordEncoder passwordEncoder,
			AuthorizationService authorizationService) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "Listar todos os programadores")
	@GetMapping
	public List<ProgramadorDTO> list() {
		return service.list().stream()
				.map(ProgramadorMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um programador por ID")
	@GetMapping("/{id}")
	public ResponseEntity<ProgramadorDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(ProgramadorMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo programador")
	@PostMapping
	public ResponseEntity<ProgramadorDTO> create(@Valid @RequestBody CriarProgramadorDTO in) {
		authorizationService.requireUserCreationPermission();
		Programador entity = ProgramadorMapper.toEntity(in, passwordEncoder);
		Programador created = service.create(entity);
		ProgramadorDTO dto = ProgramadorMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/programadores/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um programador por ID")
	@PutMapping("/{id}")
	public ResponseEntity<ProgramadorDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarProgramadorDTO in) {
		Programador entity = ProgramadorMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		Programador updated = service.update(id, entity);
		return ResponseEntity.ok(ProgramadorMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um programador por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
