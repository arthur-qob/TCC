package com.backend.mapper;

import com.backend.dto.CriarRotaDTO;
import com.backend.dto.RotaDTO;
import com.backend.model.Cliente;
import com.backend.model.Rota;

public class RotaMapper {

	public static Rota toEntity(CriarRotaDTO dto) {
		Rota r = new Rota();
		r.setOrigem(dto.getOrigem());
		r.setDestino(dto.getDestino());
		r.setValor(dto.getValor());

		if (dto.getClienteId() != null) {
			Cliente cliente = new Cliente();
			cliente.setId(dto.getClienteId());
			r.setCliente(cliente);
		}

		return r;
	}

	public static RotaDTO toDTO(Rota r) {
		RotaDTO dto = new RotaDTO();
		dto.setId(r.getId());
		dto.setOrigem(r.getOrigem());
		dto.setDestino(r.getDestino());
		dto.setValor(r.getValor());

		if (r.getCliente() != null) {
			dto.setClienteId(r.getCliente().getId());
		}

		return dto;
	}
}
