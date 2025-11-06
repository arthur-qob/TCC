package com.backend.dto;

import com.backend.model.enums.StatusFrota;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarFrotaDTO {

	@NotBlank(message = "Placa é obrigatória")
	private String placa;

	@NotNull(message = "Status é obrigatório")
	private StatusFrota status;
}
