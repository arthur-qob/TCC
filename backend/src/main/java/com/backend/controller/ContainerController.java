package com.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.ContainerDTO;
import com.backend.dto.CriarContainerDTO;
import com.backend.mapper.ContainerMapper;
import com.backend.model.Container;
import com.backend.service.ContainerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Containers", description = "Operações CRUD para Containers")
@RestController
@RequestMapping("/api/containers")
public class ContainerController {

	private final ContainerService service;

	public ContainerController(ContainerService service) {
		this.service = service;
	}

	@Operation(summary = "Listar todos os containers")
	@GetMapping
	public List<ContainerDTO> list() {
		return service.list().stream()
				.map(ContainerMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um container por ID")
	@GetMapping("/{id}")
	public ResponseEntity<ContainerDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(ContainerMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Buscar um container por número de identificação")
	@GetMapping("/{numero}")
	public ResponseEntity<ContainerDTO> findByNumContainer(@PathVariable String numero) {
		return service.findByNumContainer(numero)
				.map(ContainerMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Cria um novo container")
	@PostMapping
	public ResponseEntity<ContainerDTO> create(@Valid @RequestBody CriarContainerDTO in) {
		Container entity = ContainerMapper.toEntity(in);
		Container created = service.create(entity);
		ContainerDTO dto = ContainerMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/containers/" + created.getId()))
				.body(dto);
	}

	@Operation(summary = "Atualiza um container por ID")
	@PutMapping("/{id}")
	public ResponseEntity<ContainerDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarContainerDTO in) {
		Container entity = ContainerMapper.toEntity(in);
		entity.setId(id);
		Container updated = service.update(id, entity);
		return ResponseEntity.ok(ContainerMapper.toDTO(updated));
	}

	@Operation(summary = "Deleta um container por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
