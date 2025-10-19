package com.flowlog.controller;

import com.flowlog.dto.GerenteRiscoCreateDTO;
import com.flowlog.dto.GerenteRiscoDTO;
import com.flowlog.mapper.GerenteRiscoMapper;
import com.flowlog.model.entity.GerenteRisco;
import com.flowlog.service.GerenteRiscoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Gerentes de Risco", description = "Operações CRUD sobre Gerentes de Risco")
@RestController
@RequestMapping("/api/gerentes-risco")
public class GerenteRiscoController {

    private final GerenteRiscoService service;

    public GerenteRiscoController(GerenteRiscoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os gerentes de risco")
    @GetMapping
    public List<GerenteRiscoDTO> listar() {
        return service.listar().stream()
                .map(GerenteRiscoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um gerente de risco por ID")
    @GetMapping("/{id}")
    public ResponseEntity<GerenteRiscoDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(GerenteRiscoMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo gerente de risco")
    @PostMapping
    public ResponseEntity<GerenteRiscoDTO> criar(@Valid @RequestBody GerenteRiscoCreateDTO dto) {
        GerenteRisco entidade = GerenteRiscoMapper.toEntity(dto);
        GerenteRisco criado = service.criar(entidade);
        GerenteRiscoDTO responseDto = GerenteRiscoMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/gerentes-risco/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um gerente de risco existente")
    @PutMapping("/{id}")
    public ResponseEntity<GerenteRiscoDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody GerenteRiscoCreateDTO dto
    ) {
        GerenteRisco entidade = GerenteRiscoMapper.toEntity(dto);
        GerenteRisco atualizado = service.atualizar(id, entidade);
        return ResponseEntity.ok(GerenteRiscoMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um gerente de risco por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
