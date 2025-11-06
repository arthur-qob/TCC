package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
	Optional<Cliente> findByEmail(String email);

	Optional<Cliente> findByCpf(String cpf);

	Optional<Cliente> findByCnpj(String cnpj);
}
