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

import com.backend.dto.CriarGerenteFrotaDTO;
import com.backend.dto.GerenteFrotaDTO;
import com.backend.mapper.GerenteFrotaMapper;
import com.backend.model.GerenteFrota;
import com.backend.service.AuthorizationService;
import com.backend.service.GerenteFrotaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Gerentes de Frota", description = "Operações CRUD para Gerentes de Frota")
@RestController
@RequestMapping("/api/gerentes-frota")
public class GerenteFrotaController {

	private final GerenteFrotaService service;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;

	public GerenteFrotaController(GerenteFrotaService service, PasswordEncoder passwordEncoder,
			AuthorizationService authorizationService) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "Listar todos os gerentes de frota")
	@GetMapping
	public List<GerenteFrotaDTO> list() {
		return service.list().stream()
				.map(GerenteFrotaMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um gerente de frota por ID")
	@GetMapping("/{id}")
	public ResponseEntity<GerenteFrotaDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(GerenteFrotaMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo gerente de frota")
	@PostMapping
	public ResponseEntity<GerenteFrotaDTO> create(@Valid @RequestBody CriarGerenteFrotaDTO in) {
		authorizationService.requireUserCreationPermission();
		GerenteFrota entity = GerenteFrotaMapper.toEntity(in, passwordEncoder);
		GerenteFrota created = service.create(entity);
		GerenteFrotaDTO dto = GerenteFrotaMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/gerentes-frota/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um gerente de frota por ID")
	@PutMapping("/{id}")
	public ResponseEntity<GerenteFrotaDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarGerenteFrotaDTO in) {
		GerenteFrota entity = GerenteFrotaMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		GerenteFrota updated = service.update(id, entity);
		return ResponseEntity.ok(GerenteFrotaMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um gerente de frota por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
