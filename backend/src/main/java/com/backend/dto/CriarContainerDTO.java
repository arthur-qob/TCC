package com.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarContainerDTO extends CriarCargaDTO {

	@NotBlank(message = "Número do container é obrigatório")
	private String numContainer;
}
