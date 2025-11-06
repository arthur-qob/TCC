package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Cliente;
import com.backend.model.Motorista;
import com.backend.model.Pedido;
import com.backend.model.enums.StatusPedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	List<Pedido> findByCliente(Cliente cliente);

	List<Pedido> findByMotorista(Motorista motorista);

	List<Pedido> findByStatusPedido(StatusPedido statusPedido);
}
