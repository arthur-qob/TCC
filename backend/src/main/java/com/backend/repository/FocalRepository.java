package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Focal;

@Repository
public interface FocalRepository extends JpaRepository<Focal, Integer> {
	Optional<Focal> findByEmail(String email);
}
