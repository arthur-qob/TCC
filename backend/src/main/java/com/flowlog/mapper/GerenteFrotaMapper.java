package com.flowlog.mapper;

import com.flowlog.dto.GerenteFrotaCreateDTO;
import com.flowlog.dto.GerenteFrotaDTO;
import com.flowlog.model.entity.GerenteFrota;

public class GerenteFrotaMapper {

    public static GerenteFrotaDTO toDTO(GerenteFrota gerenteFrota) {
        if (gerenteFrota == null) return null;

        GerenteFrotaDTO dto = new GerenteFrotaDTO();
        dto.setId(gerenteFrota.getId());
        dto.setNome(gerenteFrota.getNome());
        dto.setEmail(gerenteFrota.getEmail());
        dto.setDataInicio(gerenteFrota.getDataInicio());
        dto.setDataFim(gerenteFrota.getDataFim());
        return dto;
    }

    public static GerenteFrota toEntity(GerenteFrotaCreateDTO dto) {
        if (dto == null) return null;

        GerenteFrota gerenteFrota = new GerenteFrota();
        gerenteFrota.setNome(dto.getNome());
        gerenteFrota.setEmail(dto.getEmail());
        gerenteFrota.setSenha(dto.getSenha());
        gerenteFrota.setDataInicio(dto.getDataInicio());
        gerenteFrota.setDataFim(dto.getDataFim());
        return gerenteFrota;
    }

    public static void updateEntity(GerenteFrota gerenteFrota, GerenteFrotaCreateDTO dto) {
        if (dto == null || gerenteFrota == null) return;

        gerenteFrota.setNome(dto.getNome());
        gerenteFrota.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            gerenteFrota.setSenha(dto.getSenha());
        }
        gerenteFrota.setDataInicio(dto.getDataInicio());
        gerenteFrota.setDataFim(dto.getDataFim());
    }
}
