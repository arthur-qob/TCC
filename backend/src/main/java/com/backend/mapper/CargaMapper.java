package com.backend.mapper;

import com.backend.dto.CargaDTO;
import com.backend.dto.CriarCargaDTO;
import com.backend.model.Carga;
import com.backend.model.Pedido;

public class CargaMapper {

	public static Carga toEntity(CriarCargaDTO dto) {
		Carga c = new Carga();

		if (dto.getPedidoId() != null) {
			Pedido pedido = new Pedido();
			pedido.setId(dto.getPedidoId());
			c.setPedido(pedido);
		}

		return c;
	}

	public static CargaDTO toDTO(Carga c) {
		CargaDTO dto = new CargaDTO();
		dto.setId(c.getId());

		if (c.getPedido() != null) {
			dto.setPedidoId(c.getPedido().getId());
		}

		return dto;
	}
}
