package com.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarCargaDTO {

	@NotNull(message = "ID do Pedido é obrigatório")
	private Long pedidoId;
}
