package com.flowlog.mapper;

import com.flowlog.dto.ProgramadorCreateDTO;
import com.flowlog.dto.ProgramadorDTO;
import com.flowlog.model.entity.Programador;

public class ProgramadorMapper {

    public static ProgramadorDTO toDTO(Programador programador) {
        if (programador == null) return null;

        ProgramadorDTO dto = new ProgramadorDTO();
        dto.setId(programador.getId());
        dto.setNome(programador.getNome());
        dto.setEmail(programador.getEmail());
        dto.setDataInicio(programador.getDataInicio());
        dto.setDataFim(programador.getDataFim());
        return dto;
    }

    public static Programador toEntity(ProgramadorCreateDTO dto) {
        if (dto == null) return null;

        Programador programador = new Programador();
        programador.setNome(dto.getNome());
        programador.setEmail(dto.getEmail());
        programador.setSenha(dto.getSenha());
        programador.setDataInicio(dto.getDataInicio());
        programador.setDataFim(dto.getDataFim());
        return programador;
    }

    public static void updateEntity(Programador programador, ProgramadorCreateDTO dto) {
        if (dto == null || programador == null) return;

        programador.setNome(dto.getNome());
        programador.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            programador.setSenha(dto.getSenha());
        }
        programador.setDataInicio(dto.getDataInicio());
        programador.setDataFim(dto.getDataFim());
    }
}
