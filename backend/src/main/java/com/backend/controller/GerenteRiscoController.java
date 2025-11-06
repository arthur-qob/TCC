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

import com.backend.dto.CriarGerenteRiscoDTO;
import com.backend.dto.GerenteRiscoDTO;
import com.backend.mapper.GerenteRiscoMapper;
import com.backend.model.GerenteRisco;
import com.backend.service.AuthorizationService;
import com.backend.service.GerenteRiscoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Gerentes de Risco", description = "Operações CRUD para Gerentes de Risco")
@RestController
@RequestMapping("/api/gerentes-risco")
public class GerenteRiscoController {

	private final GerenteRiscoService service;
	private final PasswordEncoder passwordEncoder;
	private final AuthorizationService authorizationService;

	public GerenteRiscoController(GerenteRiscoService service, PasswordEncoder passwordEncoder,
			AuthorizationService authorizationService) {
		this.service = service;
		this.passwordEncoder = passwordEncoder;
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "Listar todos os gerentes de risco")
	@GetMapping
	public List<GerenteRiscoDTO> list() {
		return service.list().stream()
				.map(GerenteRiscoMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um gerente de risco por ID")
	@GetMapping("/{id}")
	public ResponseEntity<GerenteRiscoDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(GerenteRiscoMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo gerente de risco")
	@PostMapping
	public ResponseEntity<GerenteRiscoDTO> create(@Valid @RequestBody CriarGerenteRiscoDTO in) {
		authorizationService.requireUserCreationPermission();
		GerenteRisco entity = GerenteRiscoMapper.toEntity(in, passwordEncoder);
		GerenteRisco created = service.create(entity);
		GerenteRiscoDTO dto = GerenteRiscoMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/gerentes-risco/" + created.getIdUser()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um gerente de risco por ID")
	@PutMapping("/{id}")
	public ResponseEntity<GerenteRiscoDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarGerenteRiscoDTO in) {
		GerenteRisco entity = GerenteRiscoMapper.toEntity(in, passwordEncoder);
		entity.setIdUser(id);
		GerenteRisco updated = service.update(id, entity);
		return ResponseEntity.ok(GerenteRiscoMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um gerente de risco por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
