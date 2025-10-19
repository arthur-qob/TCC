package com.flowlog.mapper;

import com.flowlog.dto.FrotaCreateDTO;
import com.flowlog.dto.FrotaDTO;
import com.flowlog.model.entity.Frota;

public class FrotaMapper {

    public static FrotaDTO toDTO(Frota frota) {
        if (frota == null) return null;

        FrotaDTO dto = new FrotaDTO();
        dto.setId(frota.getId());
        dto.setPlaca(frota.getPlaca());
        dto.setStatus(frota.getStatus());
        if (frota.getMotorista() != null) {
            dto.setMotoristaId(frota.getMotorista().getId());
        }
        return dto;
    }

    public static Frota toEntity(FrotaCreateDTO dto) {
        if (dto == null) return null;

        Frota frota = new Frota();
        frota.setPlaca(dto.getPlaca());
        frota.setStatus(dto.getStatus());
        return frota;
    }

    public static void updateEntity(Frota frota, FrotaCreateDTO dto) {
        if (dto == null || frota == null) return;

        frota.setPlaca(dto.getPlaca());
        frota.setStatus(dto.getStatus());
    }
}
