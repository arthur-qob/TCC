package com.flowlog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GerenteFrotaDTO {
    private Integer id;
    private String nome;
    private String email;
    private LocalDate dataInicio;
    private LocalDate dataFim;
}
