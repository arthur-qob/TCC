package com.flowlog.repository;

import com.flowlog.model.entity.Motorista;
import com.flowlog.model.enums.StatusMotorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MotoristaRepository extends JpaRepository<Motorista, Integer> {
    Optional<Motorista> findByEmail(String email);
    List<Motorista> findByStatus(StatusMotorista status);
}
