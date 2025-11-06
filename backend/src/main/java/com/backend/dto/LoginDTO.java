package com.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDTO {

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Deve ser um email válido")
	private String email;

	@NotBlank(message = "Senha é obrigatória")
	private String password;
}
