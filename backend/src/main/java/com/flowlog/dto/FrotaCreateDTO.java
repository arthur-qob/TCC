package com.flowlog.dto;

import com.flowlog.model.enums.StatusFrota;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FrotaCreateDTO {
    @NotBlank(message = "Placa é obrigatória")
    private String placa;

    @NotNull(message = "Status é obrigatório")
    private StatusFrota status;
}
