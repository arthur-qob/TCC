package com.backend.dto;

import java.time.LocalDate;

import com.backend.model.enums.CategoriasMotorista;
import com.backend.model.enums.StatusMotorista;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarMotoristaDTO {

	@NotBlank(message = "Email é obrigatório")
	@Email(message = "Deve ser um email válido")
	private String email;

	@NotBlank(message = "Nome é obrigatório")
	@Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
	private String name;

	@NotBlank(message = "Senha é obrigatória")
	@Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
	private String password;

	private LocalDate dataInicio;
	private LocalDate dataFim;

	@NotNull(message = "Categoria é obrigatória")
	private CategoriasMotorista categoria;

	@NotNull(message = "Status é obrigatório")
	private StatusMotorista status;

	private Integer frotaId;
}
