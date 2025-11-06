package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Cliente;
import com.backend.model.Rota;

@Repository
public interface RotaRepository extends JpaRepository<Rota, Integer> {
	List<Rota> findByCliente(Cliente cliente);

	List<Rota> findByOrigem(String origem);

	List<Rota> findByDestino(String destino);
}
