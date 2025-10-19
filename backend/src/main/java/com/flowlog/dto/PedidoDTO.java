package com.flowlog.dto;

import com.flowlog.model.enums.StatusPedido;
import com.flowlog.model.enums.TiposCarga;
import com.flowlog.model.enums.TiposOperacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {
    private Long id;
    private LocalDate dataExecucao;
    private TiposCarga tipoCarga;
    private String numContainer;
    private Integer qtdCarretas;
    private TiposOperacao tipoOperacao;
    private StatusPedido statusPedido;
    private Integer focalId;
    private Integer programadorId;
    private Integer gerenteInicializadorId;
    private Integer gerenteRevisorId;
    private Integer gerenteRiscoId;
    private Integer motoristaId;
    private Integer clienteId;
}
