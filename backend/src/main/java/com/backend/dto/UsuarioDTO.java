package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UsuarioDTO {

	private Integer idUser;
	private String email;
	private String name;
	private String tipo; // Role type: MOTORISTA, GERENTE_FROTA, GERENTE_RISCO, PROGRAMADOR, FOCAL, or
							// null for basic user

}
