package com.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarClienteDTO {

	@NotBlank(message = "Nome é obrigatório")
	@Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
	private String nome;

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Deve ser um email válido")
	private String email;

	private String cpf;

	private String cnpj;
}
