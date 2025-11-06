package com.backend.mapper;

import com.backend.dto.CargaSoltaDTO;
import com.backend.dto.CriarCargaSoltaDTO;
import com.backend.model.CargaSolta;
import com.backend.model.Pedido;

public class CargaSoltaMapper {

	public static CargaSolta toEntity(CriarCargaSoltaDTO dto) {
		CargaSolta c = new CargaSolta();
		c.setNumNotaFiscal(dto.getNumNotaFiscal());

		if (dto.getPedidoId() != null) {
			Pedido pedido = new Pedido();
			pedido.setId(dto.getPedidoId());
			c.setPedido(pedido);
		}

		return c;
	}

	public static CargaSoltaDTO toDTO(CargaSolta c) {
		CargaSoltaDTO dto = new CargaSoltaDTO();
		dto.setId(c.getId());
		dto.setNumNotaFiscal(c.getNumNotaFiscal());

		if (c.getPedido() != null) {
			dto.setPedidoId(c.getPedido().getId());
		}

		return dto;
	}
}
