package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClienteDTO {

	private Integer id;
	private String nome;
	private String email;
	private String cpf;
	private String cnpj;
	private String telefone;
	private String observacoes;
}
