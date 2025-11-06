package com.backend.dto;

import java.time.LocalDate;

import com.backend.model.enums.StatusPedido;
import com.backend.model.enums.TiposCarga;
import com.backend.model.enums.TiposOperacao;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CriarPedidoDTO {

	private LocalDate dataExecucao;

	@NotNull(message = "Tipo de carga é obrigatório")
	private TiposCarga tipoCarga;

	private String numContainer;

	@NotNull(message = "Quantidade de carretas é obrigatória")
	@Positive(message = "Quantidade de carretas deve ser positiva")
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

	@NotNull(message = "ID do Cliente é obrigatório")
	private Integer clienteId;
}
