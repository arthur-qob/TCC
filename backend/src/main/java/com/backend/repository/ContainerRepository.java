package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Container;

@Repository
public interface ContainerRepository extends JpaRepository<Container, Integer> {

	Optional<Container> findByNumContainer(String numero);
}
