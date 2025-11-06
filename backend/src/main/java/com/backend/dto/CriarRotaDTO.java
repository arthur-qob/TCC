package com.backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarRotaDTO {

	@NotBlank(message = "Origem é obrigatória")
	private String origem;

	@NotBlank(message = "Destino é obrigatório")
	private String destino;

	@NotNull(message = "Valor é obrigatório")
	@Positive(message = "Valor deve ser positivo")
	private BigDecimal valor;

	@NotNull(message = "ID do Cliente é obrigatório")
	private Integer clienteId;
}
