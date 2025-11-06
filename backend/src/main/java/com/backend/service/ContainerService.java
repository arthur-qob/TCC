package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Container;
import com.backend.repository.ContainerRepository;

@Service
public class ContainerService {

	private final ContainerRepository repo;

	public ContainerService(ContainerRepository repo) {
		this.repo = repo;
	}

	public List<Container> list() {
		return repo.findAll();
	}

	public Optional<Container> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Container> findByNumContainer(String numero) {
		return repo.findByNumContainer(numero);
	}

	public Container create(Container c) {
		return repo.save(c);
	}

	public Container update(Integer id, Container c) {
		c.setId(id);
		return repo.save(c);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
