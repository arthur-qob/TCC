package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.GerenteFrota;
import com.backend.repository.GerenteFrotaRepository;

@Service
public class GerenteFrotaService {

	private final GerenteFrotaRepository repo;

	public GerenteFrotaService(GerenteFrotaRepository repo) {
		this.repo = repo;
	}

	public List<GerenteFrota> list() {
		return repo.findAll();
	}

	public Optional<GerenteFrota> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<GerenteFrota> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public GerenteFrota create(GerenteFrota g) {
		return repo.save(g);
	}

	public GerenteFrota update(Integer id, GerenteFrota g) {
		g.setIdUser(id);
		return repo.save(g);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
