package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.GerenteFrota;

@Repository
public interface GerenteFrotaRepository extends JpaRepository<GerenteFrota, Integer> {
	Optional<GerenteFrota> findByEmail(String email);
}
