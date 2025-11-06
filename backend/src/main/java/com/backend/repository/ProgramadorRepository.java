package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Programador;

@Repository
public interface ProgramadorRepository extends JpaRepository<Programador, Integer> {
	Optional<Programador> findByEmail(String email);
}
