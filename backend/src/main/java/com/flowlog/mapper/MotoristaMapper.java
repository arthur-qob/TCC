package com.flowlog.mapper;

import com.flowlog.dto.MotoristaCreateDTO;
import com.flowlog.dto.MotoristaDTO;
import com.flowlog.model.entity.Motorista;

public class MotoristaMapper {

    public static MotoristaDTO toDTO(Motorista motorista) {
        if (motorista == null) return null;

        MotoristaDTO dto = new MotoristaDTO();
        dto.setId(motorista.getId());
        dto.setNome(motorista.getNome());
        dto.setEmail(motorista.getEmail());
        dto.setDataInicio(motorista.getDataInicio());
        dto.setDataFim(motorista.getDataFim());
        dto.setCategoria(motorista.getCategoria());
        dto.setStatus(motorista.getStatus());
        if (motorista.getFrota() != null) {
            dto.setFrotaId(motorista.getFrota().getId());
        }
        return dto;
    }

    public static Motorista toEntity(MotoristaCreateDTO dto) {
        if (dto == null) return null;

        Motorista motorista = new Motorista();
        motorista.setNome(dto.getNome());
        motorista.setEmail(dto.getEmail());
        motorista.setSenha(dto.getSenha());
        motorista.setDataInicio(dto.getDataInicio());
        motorista.setDataFim(dto.getDataFim());
        motorista.setCategoria(dto.getCategoria());
        motorista.setStatus(dto.getStatus());
        return motorista;
    }

    public static void updateEntity(Motorista motorista, MotoristaCreateDTO dto) {
        if (dto == null || motorista == null) return;

        motorista.setNome(dto.getNome());
        motorista.setEmail(dto.getEmail());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            motorista.setSenha(dto.getSenha());
        }
        motorista.setDataInicio(dto.getDataInicio());
        motorista.setDataFim(dto.getDataFim());
        motorista.setCategoria(dto.getCategoria());
        motorista.setStatus(dto.getStatus());
    }
}
