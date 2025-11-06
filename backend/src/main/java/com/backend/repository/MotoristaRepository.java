package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Motorista;
import com.backend.model.enums.StatusMotorista;

@Repository
public interface MotoristaRepository extends JpaRepository<Motorista, Integer> {
	Optional<Motorista> findByEmail(String email);

	List<Motorista> findByStatus(StatusMotorista status);
}
