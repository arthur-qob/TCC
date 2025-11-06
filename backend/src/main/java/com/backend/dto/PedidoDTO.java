package com.backend.dto;

import java.time.LocalDate;

import com.backend.model.enums.StatusPedido;
import com.backend.model.enums.TiposCarga;
import com.backend.model.enums.TiposOperacao;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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
