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

import com.backend.dto.CriarMotoristaDTO;
import com.backend.dto.MotoristaDTO;
import com.backend.mapper.MotoristaMapper;
import com.backend.model.Motorista;
import com.backend.service.AuthorizationService;
import com.backend.service.MotoristaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Motoristas", description = "Operações CRUD para Motoristas")
@RestController
@RequestMapping("/api/motoristas")
public class MotoristaController {

	private final MotoristaService service;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;

	public MotoristaController(MotoristaService service, PasswordEncoder passwordEncoder,
			AuthorizationService authorizationService) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "Listar todos os motoristas")
	@GetMapping
	public List<MotoristaDTO> list() {
		return service.list().stream()
				.map(MotoristaMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um motorista por ID")
	@GetMapping("/{id}")
	public ResponseEntity<MotoristaDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(MotoristaMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo motorista")
	@PostMapping
	public ResponseEntity<MotoristaDTO> create(@Valid @RequestBody CriarMotoristaDTO in) {
		authorizationService.requireUserCreationPermission();
		Motorista entity = MotoristaMapper.toEntity(in, passwordEncoder);
		Motorista created = service.create(entity);
		MotoristaDTO dto = MotoristaMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/motoristas/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um motorista por ID")
	@PutMapping("/{id}")
	public ResponseEntity<MotoristaDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarMotoristaDTO in) {
		Motorista entity = MotoristaMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		Motorista updated = service.update(id, entity);
		return ResponseEntity.ok(MotoristaMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um motorista por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
