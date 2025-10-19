package com.flowlog.mapper;

import com.flowlog.dto.FocalCreateDTO;
import com.flowlog.dto.FocalDTO;
import com.flowlog.model.entity.Focal;

public class FocalMapper {

    public static FocalDTO toDTO(Focal focal) {
        if (focal == null) return null;

        FocalDTO dto = new FocalDTO();
        dto.setId(focal.getId());
        dto.setNome(focal.getNome());
        dto.setEmail(focal.getEmail());
        dto.setDataInicio(focal.getDataInicio());
        dto.setDataFim(focal.getDataFim());
        return dto;
    }

    public static Focal toEntity(FocalCreateDTO dto) {
        if (dto == null) return null;

        Focal focal = new Focal();
        focal.setNome(dto.getNome());
        focal.setEmail(dto.getEmail());
        focal.setSenha(dto.getSenha());
        focal.setDataInicio(dto.getDataInicio());
        focal.setDataFim(dto.getDataFim());
        return focal;
    }

    public static void updateEntity(Focal focal, FocalCreateDTO dto) {
        if (dto == null || focal == null) return;

        focal.setNome(dto.getNome());
        focal.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            focal.setSenha(dto.getSenha());
        }
        focal.setDataInicio(dto.getDataInicio());
        focal.setDataFim(dto.getDataFim());
    }
}
