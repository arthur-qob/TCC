package com.flowlog.mapper;

import com.flowlog.dto.PedidoCreateDTO;
import com.flowlog.dto.PedidoDTO;
import com.flowlog.model.entity.Pedido;

public class PedidoMapper {

    public static PedidoDTO toDTO(Pedido pedido) {
        if (pedido == null) return null;

        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setDataExecucao(pedido.getDataExecucao());
        dto.setTipoCarga(pedido.getTipoCarga());
        dto.setNumContainer(pedido.getNumContainer());
        dto.setQtdCarretas(pedido.getQtdCarretas());
        dto.setTipoOperacao(pedido.getTipoOperacao());
        dto.setStatusPedido(pedido.getStatusPedido());

        if (pedido.getFocal() != null) {
            dto.setFocalId(pedido.getFocal().getId());
        }
        if (pedido.getProgramador() != null) {
            dto.setProgramadorId(pedido.getProgramador().getId());
        }
        if (pedido.getGerenteInicializador() != null) {
            dto.setGerenteInicializadorId(pedido.getGerenteInicializador().getId());
        }
        if (pedido.getGerenteRevisor() != null) {
            dto.setGerenteRevisorId(pedido.getGerenteRevisor().getId());
        }
        if (pedido.getGerenteRisco() != null) {
            dto.setGerenteRiscoId(pedido.getGerenteRisco().getId());
        }
        if (pedido.getMotorista() != null) {
            dto.setMotoristaId(pedido.getMotorista().getId());
        }
        if (pedido.getCliente() != null) {
            dto.setClienteId(pedido.getCliente().getId());
        }

        return dto;
    }

    public static Pedido toEntity(PedidoCreateDTO dto) {
        if (dto == null) return null;

        Pedido pedido = new Pedido();
        pedido.setDataExecucao(dto.getDataExecucao());
        pedido.setTipoCarga(dto.getTipoCarga());
        pedido.setNumContainer(dto.getNumContainer());
        pedido.setQtdCarretas(dto.getQtdCarretas());
        pedido.setTipoOperacao(dto.getTipoOperacao());
        pedido.setStatusPedido(dto.getStatusPedido());
        return pedido;
    }

    public static void updateEntity(Pedido pedido, PedidoCreateDTO dto) {
        if (dto == null || pedido == null) return;

        pedido.setDataExecucao(dto.getDataExecucao());
        pedido.setTipoCarga(dto.getTipoCarga());
        pedido.setNumContainer(dto.getNumContainer());
        pedido.setQtdCarretas(dto.getQtdCarretas());
        pedido.setTipoOperacao(dto.getTipoOperacao());
        pedido.setStatusPedido(dto.getStatusPedido());
    }
}
