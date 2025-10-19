package com.flowlog.controller;

import com.flowlog.dto.GerenteFrotaCreateDTO;
import com.flowlog.dto.GerenteFrotaDTO;
import com.flowlog.mapper.GerenteFrotaMapper;
import com.flowlog.model.entity.GerenteFrota;
import com.flowlog.service.GerenteFrotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Gerentes de Frota", description = "Operações CRUD sobre Gerentes de Frota")
@RestController
@RequestMapping("/api/gerentes-frota")
public class GerenteFrotaController {

    private final GerenteFrotaService service;

    public GerenteFrotaController(GerenteFrotaService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os gerentes de frota")
    @GetMapping
    public List<GerenteFrotaDTO> listar() {
        return service.listar().stream()
                .map(GerenteFrotaMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um gerente de frota por ID")
    @GetMapping("/{id}")
    public ResponseEntity<GerenteFrotaDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(GerenteFrotaMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo gerente de frota")
    @PostMapping
    public ResponseEntity<GerenteFrotaDTO> criar(@Valid @RequestBody GerenteFrotaCreateDTO dto) {
        GerenteFrota entidade = GerenteFrotaMapper.toEntity(dto);
        GerenteFrota criado = service.criar(entidade);
        GerenteFrotaDTO responseDto = GerenteFrotaMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/gerentes-frota/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um gerente de frota existente")
    @PutMapping("/{id}")
    public ResponseEntity<GerenteFrotaDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody GerenteFrotaCreateDTO dto
    ) {
        GerenteFrota entidade = GerenteFrotaMapper.toEntity(dto);
        GerenteFrota atualizado = service.atualizar(id, entidade);
        return ResponseEntity.ok(GerenteFrotaMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um gerente de frota por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
