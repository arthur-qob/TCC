package com.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarFocalDTO {

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Deve ser um email válido")
	private String email;

	@NotBlank(message = "Nome é obrigatório")
	@Size(max = 100, message = "Nome deve ter até 100 caracteres")
	private String name;

	@NotBlank(message = "Senha é obrigatória")
	@Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
	private String password;

	private LocalDate dataInicio;
	private LocalDate dataFim;
}
