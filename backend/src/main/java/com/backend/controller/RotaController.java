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

import com.backend.dto.CriarRotaDTO;
import com.backend.dto.RotaDTO;
import com.backend.mapper.RotaMapper;
import com.backend.model.Rota;
import com.backend.service.RotaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Rotas", description = "Operações CRUD para Rotas")
@RestController
@RequestMapping("/api/rotas")
public class RotaController {

	private final RotaService service;

	public RotaController(RotaService service) {
		this.service = service;
	}

	@Operation(summary = "Listar todas as rotas")
	@GetMapping
	public List<RotaDTO> list() {
		return service.list().stream()
				.map(RotaMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar uma rota por ID")
	@GetMapping("/{id}")
	public ResponseEntity<RotaDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(RotaMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar uma nova rota")
	@PostMapping
	public ResponseEntity<RotaDTO> create(@Valid @RequestBody CriarRotaDTO in) {
		Rota entity = RotaMapper.toEntity(in);
		Rota created = service.create(entity);
		RotaDTO dto = RotaMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/rotas/" + created.getId()))
				.body(dto);
	}

	@Operation(summary = "Atualizar uma rota por ID")
	@PutMapping("/{id}")
	public ResponseEntity<RotaDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarRotaDTO in) {
		Rota entity = RotaMapper.toEntity(in);
		entity.setId(id);
		Rota updated = service.update(id, entity);
		return ResponseEntity.ok(RotaMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar uma rota por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
