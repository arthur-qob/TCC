package com.backend.dto;

import com.backend.model.enums.StatusFrota;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FrotaDTO {

	private Integer id;
	private String placa;
	private StatusFrota status;
	private Integer motoristaId;
}
