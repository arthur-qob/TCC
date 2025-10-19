package com.flowlog.repository;

import com.flowlog.model.entity.Pedido;
import com.flowlog.model.enums.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByStatusPedido(StatusPedido status);
    List<Pedido> findByClienteId(Integer clienteId);
    List<Pedido> findByMotoristaId(Integer motoristaId);
}
