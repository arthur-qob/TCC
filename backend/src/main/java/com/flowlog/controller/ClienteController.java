package com.flowlog.controller;

import com.flowlog.dto.ClienteCreateDTO;
import com.flowlog.dto.ClienteDTO;
import com.flowlog.mapper.ClienteMapper;
import com.flowlog.model.entity.Cliente;
import com.flowlog.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Clientes", description = "Operações CRUD sobre Clientes")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os clientes")
    @GetMapping
    public List<ClienteDTO> listar() {
        return service.listar().stream()
                .map(ClienteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um cliente por ID")
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ClienteMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo cliente")
    @PostMapping
    public ResponseEntity<ClienteDTO> criar(@Valid @RequestBody ClienteCreateDTO dto) {
        Cliente entidade = ClienteMapper.toEntity(dto);
        Cliente criado = service.criar(entidade);
        ClienteDTO responseDto = ClienteMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/clientes/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um cliente existente")
    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody ClienteCreateDTO dto
    ) {
        Cliente entidade = ClienteMapper.toEntity(dto);
        Cliente atualizado = service.atualizar(id, entidade);
        return ResponseEntity.ok(ClienteMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um cliente por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
