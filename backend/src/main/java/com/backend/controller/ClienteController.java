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

import com.backend.dto.ClienteDTO;
import com.backend.dto.CriarClienteDTO;
import com.backend.mapper.ClienteMapper;
import com.backend.model.Cliente;
import com.backend.service.ClienteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Clientes", description = "Operações CRUD para Clientes")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

	private final ClienteService service;

	public ClienteController(ClienteService service) {
		this.service = service;
	}

	@Operation(summary = "Listar todos os clientes")
	@GetMapping
	public List<ClienteDTO> list() {
		return service.list().stream()
				.map(ClienteMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um cliente por ID")
	@GetMapping("/{id}")
	public ResponseEntity<ClienteDTO> findById(@PathVariable Integer id) {
		return service.findById(id)
				.map(ClienteMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo cliente")
	@PostMapping
	public ResponseEntity<ClienteDTO> create(@Valid @RequestBody CriarClienteDTO in) {
		Cliente entity = ClienteMapper.toEntity(in);
		Cliente created = service.create(entity);
		ClienteDTO dto = ClienteMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/clientes/" + created.getId()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um cliente por ID")
	@PutMapping("/{id}")
	public ResponseEntity<ClienteDTO> update(
			@PathVariable Integer id,
			@Valid @RequestBody CriarClienteDTO in) {
		Cliente entity = ClienteMapper.toEntity(in);
		entity.setId(id);
		Cliente updated = service.update(id, entity);
		return ResponseEntity.ok(ClienteMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um cliente por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
