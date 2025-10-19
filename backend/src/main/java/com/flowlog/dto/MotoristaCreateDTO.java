package com.flowlog.dto;

import com.flowlog.model.enums.CategoriasMotorista;
import com.flowlog.model.enums.StatusMotorista;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotoristaCreateDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    private LocalDate dataInicio;
    private LocalDate dataFim;

    @NotNull(message = "Categoria é obrigatória")
    private CategoriasMotorista categoria;

    @NotNull(message = "Status é obrigatório")
    private StatusMotorista status;

    private Integer frotaId;
}
