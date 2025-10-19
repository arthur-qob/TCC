package com.flowlog.repository;

import com.flowlog.model.entity.GerenteRisco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GerenteRiscoRepository extends JpaRepository<GerenteRisco, Integer> {
    Optional<GerenteRisco> findByEmail(String email);
}
