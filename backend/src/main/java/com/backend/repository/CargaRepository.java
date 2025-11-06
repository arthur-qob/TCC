package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Carga;
import com.backend.model.Pedido;

@Repository
public interface CargaRepository extends JpaRepository<Carga, Integer> {
	List<Carga> findByPedido(Pedido pedido);
}
