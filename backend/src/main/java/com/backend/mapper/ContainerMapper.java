package com.backend.mapper;

import com.backend.dto.ContainerDTO;
import com.backend.dto.CriarContainerDTO;
import com.backend.model.Container;
import com.backend.model.Pedido;

public class ContainerMapper {

	public static Container toEntity(CriarContainerDTO dto) {
		Container c = new Container();
		c.setNumContainer(dto.getNumContainer());

		if (dto.getPedidoId() != null) {
			Pedido pedido = new Pedido();
			pedido.setId(dto.getPedidoId());
			c.setPedido(pedido);
		}

		return c;
	}

	public static ContainerDTO toDTO(Container c) {
		ContainerDTO dto = new ContainerDTO();
		dto.setId(c.getId());
		dto.setNumContainer(c.getNumContainer());

		if (c.getPedido() != null) {
			dto.setPedidoId(c.getPedido().getId());
		}

		return dto;
	}
}
