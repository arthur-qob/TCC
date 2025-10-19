package com.flowlog.mapper;

import com.flowlog.dto.ClienteCreateDTO;
import com.flowlog.dto.ClienteDTO;
import com.flowlog.model.entity.Cliente;

public class ClienteMapper {

    public static ClienteDTO toDTO(Cliente cliente) {
        if (cliente == null) return null;

        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setNome(cliente.getNome());
        dto.setEmail(cliente.getEmail());
        dto.setCpf(cliente.getCpf());
        dto.setCnpj(cliente.getCnpj());
        return dto;
    }

    public static Cliente toEntity(ClienteCreateDTO dto) {
        if (dto == null) return null;

        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        if (dto.getCpf() != null) {
            cliente.setCpf(dto.getCpf());
        }
        if (dto.getCnpj() != null) {
            cliente.setCnpj(dto.getCnpj());
        }
        return cliente;
    }

    public static void updateEntity(Cliente cliente, ClienteCreateDTO dto) {
        if (dto == null || cliente == null) return;

        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        if (dto.getCpf() != null) {
            cliente.setCpf(dto.getCpf());
        }
        if (dto.getCnpj() != null) {
            cliente.setCnpj(dto.getCnpj());
        }
    }
}
