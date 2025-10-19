package com.flowlog.controller;

import com.flowlog.dto.ProgramadorCreateDTO;
import com.flowlog.dto.ProgramadorDTO;
import com.flowlog.mapper.ProgramadorMapper;
import com.flowlog.model.entity.Programador;
import com.flowlog.service.ProgramadorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Programadores", description = "Operações CRUD sobre Programadores")
@RestController
@RequestMapping("/api/programadores")
public class ProgramadorController {

    private final ProgramadorService service;

    public ProgramadorController(ProgramadorService service) {
        this.service = service;
    }

    @Operation(summary = "Lista todos os programadores")
    @GetMapping
    public List<ProgramadorDTO> listar() {
        return service.listar().stream()
                .map(ProgramadorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Busca um programador por ID")
    @GetMapping("/{id}")
    public ResponseEntity<ProgramadorDTO> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(ProgramadorMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cria um novo programador")
    @PostMapping
    public ResponseEntity<ProgramadorDTO> criar(@Valid @RequestBody ProgramadorCreateDTO dto) {
        Programador entidade = ProgramadorMapper.toEntity(dto);
        Programador criado = service.criar(entidade);
        ProgramadorDTO responseDto = ProgramadorMapper.toDTO(criado);
        return ResponseEntity
                .created(URI.create("/api/programadores/" + criado.getId()))
                .body(responseDto);
    }

    @Operation(summary = "Atualiza um programador existente")
    @PutMapping("/{id}")
    public ResponseEntity<ProgramadorDTO> atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody ProgramadorCreateDTO dto
    ) {
        Programador entidade = ProgramadorMapper.toEntity(dto);
        Programador atualizado = service.atualizar(id, entidade);
        return ResponseEntity.ok(ProgramadorMapper.toDTO(atualizado));
    }

    @Operation(summary = "Deleta um programador por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
