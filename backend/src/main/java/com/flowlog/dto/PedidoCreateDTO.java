package com.flowlog.dto;

import com.flowlog.model.enums.StatusPedido;
import com.flowlog.model.enums.TiposCarga;
import com.flowlog.model.enums.TiposOperacao;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoCreateDTO {
    private LocalDate dataExecucao;

    @NotNull(message = "Tipo de carga é obrigatório")
    private TiposCarga tipoCarga;

    private String numContainer;

    @NotNull(message = "Quantidade de carretas é obrigatória")
    private Integer qtdCarretas;

    @NotNull(message = "Tipo de operação é obrigatório")
    private TiposOperacao tipoOperacao;

    @NotNull(message = "Status do pedido é obrigatório")
    private StatusPedido statusPedido;

    private Integer focalId;
    private Integer programadorId;
    private Integer gerenteInicializadorId;
    private Integer gerenteRevisorId;
    private Integer gerenteRiscoId;
    private Integer motoristaId;

    @NotNull(message = "Cliente é obrigatório")
    private Integer clienteId;
}
