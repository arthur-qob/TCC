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

import com.backend.dto.CriarFrotaDTO;
import com.backend.dto.FrotaDTO;
import com.backend.mapper.FrotaMapper;
import com.backend.model.Frota;
import com.backend.service.FrotaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Frotas", description = "Operações CRUD para Frotas")
@RestController
@RequestMapping("/api/frotas")
public class FrotaController {

	private final FrotaService service;

	public FrotaController(FrotaService service) {
		this.service = service;
	}

	@Operation(summary = "Listar todas as frotas")
	@GetMapping
	public List<FrotaDTO> list() {
		return service.list().stream()
				.map(FrotaMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar uma frota por ID")
	@GetMapping("/{id}")
	public ResponseEntity<FrotaDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(FrotaMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar uma nova frota")
	@PostMapping
	public ResponseEntity<FrotaDTO> create(@Valid @RequestBody CriarFrotaDTO in) {
		Frota entity = FrotaMapper.toEntity(in);
		Frota created = service.create(entity);
		FrotaDTO dto = FrotaMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/frotas/" + created.getId()))
				.body(dto);
	}

	@Operation(summary = "Atualizar uma frota por ID")
	@PutMapping("/{id}")
	public ResponseEntity<FrotaDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarFrotaDTO in) {
		Frota entity = FrotaMapper.toEntity(in);
		entity.setId(id);
		Frota updated = service.update(id, entity);
		return ResponseEntity.ok(FrotaMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar uma frota por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
