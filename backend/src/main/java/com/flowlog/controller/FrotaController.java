package com.flowlog.controller;

import com.flowlog.dto.FrotaCreateDTO;
import com.flowlog.dto.FrotaDTO;
import com.flowlog.mapper.FrotaMapper;
import com.flowlog.model.entity.Frota;
import com.flowlog.service.FrotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Frotas", description = "Operações CRUD sobre Frotas")
@RestController
@RequestMapping("/api/frotas")
public class FrotaController {

    private final FrotaService service;

    public FrotaController(FrotaService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todas as frotas")
    @GetMapping
    public List<FrotaDTO> listar() {
        return service.listar().stream()
                .map(FrotaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca uma frota por ID")
    @GetMapping("/{id}")
    public ResponseEntity<FrotaDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(FrotaMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria uma nova frota")
    @PostMapping
    public ResponseEntity<FrotaDTO> criar(@Valid @RequestBody FrotaCreateDTO dto) {
        Frota entidade = FrotaMapper.toEntity(dto);
        Frota criado = service.criar(entidade);
        FrotaDTO responseDto = FrotaMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/frotas/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza uma frota existente")
    @PutMapping("/{id}")
    public ResponseEntity<FrotaDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody FrotaCreateDTO dto
    ) {
        Frota entidade = FrotaMapper.toEntity(dto);
        Frota atualizado = service.atualizar(id, entidade);
        return ResponseEntity.ok(FrotaMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta uma frota por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
