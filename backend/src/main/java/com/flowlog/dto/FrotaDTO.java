package com.flowlog.dto;

import com.flowlog.model.enums.StatusFrota;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FrotaDTO {
    private Integer id;
    private String placa;
    private StatusFrota status;
    private Integer motoristaId;
}
