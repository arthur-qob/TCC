package com.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarCargaSoltaDTO extends CriarCargaDTO {

	@NotNull(message = "Número da nota fiscal é obrigatório")
	private Long numNotaFiscal;
}
