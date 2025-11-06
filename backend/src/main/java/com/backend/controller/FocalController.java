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

import com.backend.dto.CriarFocalDTO;
import com.backend.dto.FocalDTO;
import com.backend.mapper.FocalMapper;
import com.backend.model.Focal;
import com.backend.service.AuthorizationService;
import com.backend.service.FocalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Focais", description = "Operações CRUD para Focais")
@RestController
@RequestMapping("/api/focais")
public class FocalController {

	private final FocalService service;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;

	public FocalController(FocalService service, PasswordEncoder passwordEncoder,
			AuthorizationService authorizationService) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "Listar todos os focais")
	@GetMapping
	public List<FocalDTO> list() {
		return service.list().stream()
				.map(FocalMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um focal por ID")
	@GetMapping("/{id}")
	public ResponseEntity<FocalDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(FocalMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo focal")
	@PostMapping
	public ResponseEntity<FocalDTO> create(@Valid @RequestBody CriarFocalDTO in) {
		authorizationService.requireUserCreationPermission();
		Focal entity = FocalMapper.toEntity(in, passwordEncoder);
		Focal created = service.create(entity);
		FocalDTO dto = FocalMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/focais/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um focal por ID")
	@PutMapping("/{id}")
	public ResponseEntity<FocalDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarFocalDTO in) {
		Focal entity = FocalMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		Focal updated = service.update(id, entity);
		return ResponseEntity.ok(FocalMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um focal por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
