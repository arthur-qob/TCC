package com.flowlog.controller;

import com.flowlog.dto.FocalCreateDTO;
import com.flowlog.dto.FocalDTO;
import com.flowlog.mapper.FocalMapper;
import com.flowlog.model.entity.Focal;
import com.flowlog.service.FocalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Focais", description = "Operações CRUD sobre Focais")
@RestController
@RequestMapping("/api/focais")
public class FocalController {

    private final FocalService service;

    public FocalController(FocalService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os focais")
    @GetMapping
    public List<FocalDTO> listar() {
        return service.listar().stream()
                .map(FocalMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um focal por ID")
    @GetMapping("/{id}")
    public ResponseEntity<FocalDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(FocalMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo focal")
    @PostMapping
    public ResponseEntity<FocalDTO> criar(@Valid @RequestBody FocalCreateDTO dto) {
        Focal entidade = FocalMapper.toEntity(dto);
        Focal criado = service.criar(entidade);
        FocalDTO responseDto = FocalMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/focais/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um focal existente")
    @PutMapping("/{id}")
    public ResponseEntity<FocalDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody FocalCreateDTO dto
    ) {
        Focal entidade = FocalMapper.toEntity(dto);
        Focal atualizado = service.atualizar(id, entidade);
        return ResponseEntity.ok(FocalMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um focal por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
