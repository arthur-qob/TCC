package com.backend.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RotaDTO {

	private Integer id;
	private String origem;
	private String destino;
	private BigDecimal valor;
	private Integer clienteId;
}
