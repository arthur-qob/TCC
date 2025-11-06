package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.CargaSolta;

@Repository
public interface CargaSoltaRepository extends JpaRepository<CargaSolta, Integer> {
	Optional<CargaSolta> findByNumNotaFiscal(Long numNotaFiscal);
}
