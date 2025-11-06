package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Frota;
import com.backend.model.enums.StatusFrota;

@Repository
public interface FrotaRepository extends JpaRepository<Frota, Integer> {
	Optional<Frota> findByPlaca(String placa);

	List<Frota> findByStatus(StatusFrota status);
}
