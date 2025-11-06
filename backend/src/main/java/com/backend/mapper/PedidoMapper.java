package com.backend.mapper;

import com.backend.dto.CriarPedidoDTO;
import com.backend.dto.PedidoDTO;
import com.backend.model.Cliente;
import com.backend.model.Focal;
import com.backend.model.GerenteFrota;
import com.backend.model.GerenteRisco;
import com.backend.model.Motorista;
import com.backend.model.Pedido;
import com.backend.model.Programador;

public class PedidoMapper {

	public static Pedido toEntity(CriarPedidoDTO dto) {
		Pedido p = new Pedido();
		p.setDataExecucao(dto.getDataExecucao());
		p.setTipoCarga(dto.getTipoCarga());
		p.setNumContainer(dto.getNumContainer());
		p.setQtdCarretas(dto.getQtdCarretas());
		p.setTipoOperacao(dto.getTipoOperacao());
		p.setStatusPedido(dto.getStatusPedido());

		if (dto.getClienteId() != null) {
			Cliente cliente = new Cliente();
			cliente.setId(dto.getClienteId());
			p.setCliente(cliente);
		}

		if (dto.getFocalId() != null) {
			Focal focal = new Focal();
			focal.setIdUser(dto.getFocalId());
			p.setFocal(focal);
		}

		if (dto.getProgramadorId() != null) {
			Programador programador = new Programador();
			programador.setIdUser(dto.getProgramadorId());
			p.setProgramador(programador);
		}

		if (dto.getGerenteInicializadorId() != null) {
			GerenteFrota gerente = new GerenteFrota();
			gerente.setIdUser(dto.getGerenteInicializadorId());
			p.setGerenteInicializador(gerente);
		}

		if (dto.getGerenteRevisorId() != null) {
			GerenteFrota gerente = new GerenteFrota();
			gerente.setIdUser(dto.getGerenteRevisorId());
			p.setGerenteRevisor(gerente);
		}

		if (dto.getGerenteRiscoId() != null) {
			GerenteRisco gerente = new GerenteRisco();
			gerente.setIdUser(dto.getGerenteRiscoId());
			p.setGerenteRisco(gerente);
		}

		if (dto.getMotoristaId() != null) {
			Motorista motorista = new Motorista();
			motorista.setIdUser(dto.getMotoristaId());
			p.setMotorista(motorista);
		}

		return p;
	}

	public static PedidoDTO toDTO(Pedido p) {
		PedidoDTO dto = new PedidoDTO();
		dto.setId(p.getId());
		dto.setDataExecucao(p.getDataExecucao());
		dto.setTipoCarga(p.getTipoCarga());
		dto.setNumContainer(p.getNumContainer());
		dto.setQtdCarretas(p.getQtdCarretas());
		dto.setTipoOperacao(p.getTipoOperacao());
		dto.setStatusPedido(p.getStatusPedido());

		if (p.getCliente() != null) {
			dto.setClienteId(p.getCliente().getId());
		}

		if (p.getFocal() != null) {
			dto.setFocalId(p.getFocal().getIdUser());
		}

		if (p.getProgramador() != null) {
			dto.setProgramadorId(p.getProgramador().getIdUser());
		}

		if (p.getGerenteInicializador() != null) {
			dto.setGerenteInicializadorId(p.getGerenteInicializador().getIdUser());
		}

		if (p.getGerenteRevisor() != null) {
			dto.setGerenteRevisorId(p.getGerenteRevisor().getIdUser());
		}

		if (p.getGerenteRisco() != null) {
			dto.setGerenteRiscoId(p.getGerenteRisco().getIdUser());
		}

		if (p.getMotorista() != null) {
			dto.setMotoristaId(p.getMotorista().getIdUser());
		}

		return dto;
	}
}
