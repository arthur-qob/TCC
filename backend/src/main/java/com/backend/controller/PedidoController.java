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

import com.backend.dto.CriarPedidoDTO;
import com.backend.dto.PedidoDTO;
import com.backend.mapper.PedidoMapper;
import com.backend.model.Pedido;
import com.backend.service.PedidoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Pedidos", description = "Operações CRUD para Pedidos")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

	private final PedidoService service;

	public PedidoController(PedidoService service) {
		this.service = service;
	}

	@Operation(summary = "Listar todos os pedidos")
	@GetMapping
	public List<PedidoDTO> list() {
		return service.list().stream()
				.map(PedidoMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Operation(summary = "Buscar um pedido por ID")
	@GetMapping("/{id}")
	public ResponseEntity<PedidoDTO> findById(@PathVariable Long id) {
		return service.findById(id)
				.map(PedidoMapper::toDTO)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Criar um novo pedido")
	@PostMapping
	public ResponseEntity<PedidoDTO> create(@Valid @RequestBody CriarPedidoDTO in) {
		Pedido entity = PedidoMapper.toEntity(in);
		Pedido created = service.create(entity);
		PedidoDTO dto = PedidoMapper.toDTO(created);
		return ResponseEntity
				.created(URI.create("/api/pedidos/" + created.getId()))
				.body(dto);
	}

	@Operation(summary = "Atualizar um pedido por ID")
	@PutMapping("/{id}")
	public ResponseEntity<PedidoDTO> update(
			@PathVariable Long id,
			@Valid @RequestBody CriarPedidoDTO in) {
		Pedido entity = PedidoMapper.toEntity(in);
		entity.setId(id);
		Pedido updated = service.update(id, entity);
		return ResponseEntity.ok(PedidoMapper.toDTO(updated));
	}

	@Operation(summary = "Deletar um pedido por ID")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
