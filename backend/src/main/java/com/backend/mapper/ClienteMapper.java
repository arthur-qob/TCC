package com.backend.mapper;

import com.backend.dto.ClienteDTO;
import com.backend.dto.CriarClienteDTO;
import com.backend.model.Cliente;

public class ClienteMapper {

	public static Cliente toEntity(CriarClienteDTO dto) {
		Cliente c = new Cliente();
		c.setNome(dto.getNome());
		c.setEmail(dto.getEmail());
		if (dto.getCpf() != null && !dto.getCpf().isEmpty()) {
			c.setCpf(dto.getCpf());
		}
		if (dto.getCnpj() != null && !dto.getCnpj().isEmpty()) {
			c.setCnpj(dto.getCnpj());
		}
		c.setTelefone(dto.getTelefone());
		c.setObservacoes(dto.getObservacoes());
		return c;
	}

	public static ClienteDTO toDTO(Cliente c) {
		ClienteDTO dto = new ClienteDTO();
		dto.setId(c.getId());
		dto.setNome(c.getNome());
		dto.setEmail(c.getEmail());
		dto.setCpf(c.getCpf());
		dto.setCnpj(c.getCnpj());
		dto.setTelefone(c.getTelefone());
		dto.setObservacoes(c.getObservacoes());
		return dto;
	}
}
