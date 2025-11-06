package com.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarUsuarioDTO {

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Deve ser um email válido")
	private String email;

	@NotBlank(message = "Nome é obrigatório")
	@Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
	private String name;

	@NotBlank(message = "Senha é obrigatória")
	@Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
	private String password;
}
