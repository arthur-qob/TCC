package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.GerenteRisco;

@Repository
public interface GerenteRiscoRepository extends JpaRepository<GerenteRisco, Integer> {
	Optional<GerenteRisco> findByEmail(String email);
}
