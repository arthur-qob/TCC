package com.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.backend.model.enums.CategoriasMotorista;
import com.backend.model.enums.StatusMotorista;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MotoristaDTO {

	private Integer idUser;
	private String email;
	private String name;
	private LocalDate dataInicio;
	private LocalDate dataFim;
	private CategoriasMotorista categoria;
	private StatusMotorista status;
	private Integer frotaId;
	private BigDecimal progressoMensal;
}
