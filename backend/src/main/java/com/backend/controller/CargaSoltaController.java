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

import com.backend.dto.CargaSoltaDTO;
import com.backend.dto.CriarCargaSoltaDTO;
import com.backend.mapper.CargaSoltaMapper;
import com.backend.model.CargaSolta;
import com.backend.service.CargaSoltaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Cargas Soltas", description = "Operações CRUD para Cargas Soltas")
@RestController
@RequestMapping("/api/cargas-soltas")
public class CargaSoltaController {

	private final CargaSoltaService service;

	public CargaSoltaController(CargaSoltaService service) {
		this.service = service;
	}

	@Operation(summary = "Listar todas as cargas soltas")
	@GetMapping
	public List<CargaSoltaDTO> list() {
		return service.list().stream()
				.map(CargaSoltaMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar uma carga solta por ID")
	@GetMapping("/{id}")
	public ResponseEntity<CargaSoltaDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(CargaSoltaMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Buscar uma carga solta por número de nota fiscal")
	@GetMapping("/{numero}")
	public ResponseEntity<CargaSoltaDTO> findByNotaFiscal(@PathVariable Long numero) {
		return service.findByNotaFiscal(numero)
				.map(CargaSoltaMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Cria uma nova carga solta")
	@PostMapping
	public ResponseEntity<CargaSoltaDTO> create(@Valid @RequestBody CriarCargaSoltaDTO in) {
		CargaSolta entity = CargaSoltaMapper.toEntity(in);
		CargaSolta created = service.create(entity);
		CargaSoltaDTO dto = CargaSoltaMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/cargas-soltas/" + created.getId()))
				.body(dto);
	}

	@Operation(summary = "Atualiza uma carga solta por ID")
	@PutMapping("/{id}")
	public ResponseEntity<CargaSoltaDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarCargaSoltaDTO in) {
		CargaSolta entity = CargaSoltaMapper.toEntity(in);
		entity.setId(id);
		CargaSolta updated = service.update(id, entity);
		return ResponseEntity.ok(CargaSoltaMapper.toDTO(updated));
	}

	@Operation(summary = "Deleta uma carga solta por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
