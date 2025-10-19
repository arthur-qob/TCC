package com.flowlog.repository;

import com.flowlog.model.entity.Programador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProgramadorRepository extends JpaRepository<Programador, Integer> {
    Optional<Programador> findByEmail(String email);
}
