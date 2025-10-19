package com.flowlog.repository;

import com.flowlog.model.entity.GerenteFrota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GerenteFrotaRepository extends JpaRepository<GerenteFrota, Integer> {
    Optional<GerenteFrota> findByEmail(String email);
}
