package com.backend.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProgramadorDTO {

	private Integer idUser;
	private String email;
	private String name;
	private LocalDate dataInicio;
	private LocalDate dataFim;
}
