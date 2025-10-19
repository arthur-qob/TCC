package com.flowlog.repository;

import com.flowlog.model.entity.Focal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FocalRepository extends JpaRepository<Focal, Integer> {
    Optional<Focal> findByEmail(String email);
}
