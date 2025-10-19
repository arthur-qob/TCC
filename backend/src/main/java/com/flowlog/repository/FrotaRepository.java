package com.flowlog.repository;

import com.flowlog.model.entity.Frota;
import com.flowlog.model.enums.StatusFrota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FrotaRepository extends JpaRepository<Frota, Integer> {
    Optional<Frota> findByPlaca(String placa);
    List<Frota> findByStatus(StatusFrota status);
}
