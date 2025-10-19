package com.flowlog.mapper;

import com.flowlog.dto.GerenteRiscoCreateDTO;
import com.flowlog.dto.GerenteRiscoDTO;
import com.flowlog.model.entity.GerenteRisco;

public class GerenteRiscoMapper {

    public static GerenteRiscoDTO toDTO(GerenteRisco gerenteRisco) {
        if (gerenteRisco == null) return null;

        GerenteRiscoDTO dto = new GerenteRiscoDTO();
        dto.setId(gerenteRisco.getId());
        dto.setNome(gerenteRisco.getNome());
        dto.setEmail(gerenteRisco.getEmail());
        dto.setDataInicio(gerenteRisco.getDataInicio());
        dto.setDataFim(gerenteRisco.getDataFim());
        return dto;
    }

    public static GerenteRisco toEntity(GerenteRiscoCreateDTO dto) {
        if (dto == null) return null;

        GerenteRisco gerenteRisco = new GerenteRisco();
        gerenteRisco.setNome(dto.getNome());
        gerenteRisco.setEmail(dto.getEmail());
        gerenteRisco.setSenha(dto.getSenha());
        gerenteRisco.setDataInicio(dto.getDataInicio());
        gerenteRisco.setDataFim(dto.getDataFim());
        return gerenteRisco;
    }

    public static void updateEntity(GerenteRisco gerenteRisco, GerenteRiscoCreateDTO dto) {
        if (dto == null || gerenteRisco == null) return;

        gerenteRisco.setNome(dto.getNome());
        gerenteRisco.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            gerenteRisco.setSenha(dto.getSenha());
        }
        gerenteRisco.setDataInicio(dto.getDataInicio());
        gerenteRisco.setDataFim(dto.getDataFim());
    }
}
