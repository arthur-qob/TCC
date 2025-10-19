package com.flowlog.dto;

import com.flowlog.model.enums.CategoriasMotorista;
import com.flowlog.model.enums.StatusMotorista;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotoristaDTO {
    private Integer id;
    private String nome;
    private String email;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private CategoriasMotorista categoria;
    private StatusMotorista status;
    private Integer frotaId;
}
