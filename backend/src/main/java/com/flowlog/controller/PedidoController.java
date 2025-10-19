package com.flowlog.controller;

import com.flowlog.dto.PedidoCreateDTO;
import com.flowlog.dto.PedidoDTO;
import com.flowlog.mapper.PedidoMapper;
import com.flowlog.model.entity.Pedido;
import com.flowlog.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Pedidos", description = "Operações CRUD sobre Pedidos")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os pedidos")
    @GetMapping
    public List<PedidoDTO> listar() {
        return service.listar().stream()
                .map(PedidoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um pedido por ID")
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(PedidoMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo pedido")
    @PostMapping
    public ResponseEntity<PedidoDTO> criar(@Valid @RequestBody PedidoCreateDTO dto) {
        Pedido entidade = PedidoMapper.toEntity(dto);
        Pedido criado = service.criar(entidade, dto.getClienteId(), dto.getMotoristaId());
        PedidoDTO responseDto = PedidoMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/pedidos/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um pedido existente")
    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody PedidoCreateDTO dto
    ) {
        Pedido entidade = PedidoMapper.toEntity(dto);
        Pedido atualizado = service.atualizar(id, entidade, dto.getClienteId(), dto.getMotoristaId());
        return ResponseEntity.ok(PedidoMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um pedido por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
