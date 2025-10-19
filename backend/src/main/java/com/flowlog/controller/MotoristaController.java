package com.flowlog.controller;

import com.flowlog.dto.MotoristaCreateDTO;
import com.flowlog.dto.MotoristaDTO;
import com.flowlog.mapper.MotoristaMapper;
import com.flowlog.model.entity.Motorista;
import com.flowlog.service.MotoristaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Motoristas", description = "Operações CRUD sobre Motoristas")
@RestController
@RequestMapping("/api/motoristas")
public class MotoristaController {

    private final MotoristaService service;

    public MotoristaController(MotoristaService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os motoristas")
    @GetMapping
    public List<MotoristaDTO> listar() {
        return service.listar().stream()
                .map(MotoristaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um motorista por ID")
    @GetMapping("/{id}")
    public ResponseEntity<MotoristaDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(MotoristaMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo motorista")
    @PostMapping
    public ResponseEntity<MotoristaDTO> criar(@Valid @RequestBody MotoristaCreateDTO dto) {
        Motorista entidade = MotoristaMapper.toEntity(dto);
        Motorista criado = service.criar(entidade, dto.getFrotaId());
        MotoristaDTO responseDto = MotoristaMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/motoristas/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um motorista existente")
    @PutMapping("/{id}")
    public ResponseEntity<MotoristaDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody MotoristaCreateDTO dto
    ) {
        Motorista entidade = MotoristaMapper.toEntity(dto);
        Motorista atualizado = service.atualizar(id, entidade, dto.getFrotaId());
        return ResponseEntity.ok(MotoristaMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um motorista por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
