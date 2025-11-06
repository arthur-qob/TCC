package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.GerenteRisco;
import com.backend.repository.GerenteRiscoRepository;

@Service
public class GerenteRiscoService {

	private final GerenteRiscoRepository repo;

	public GerenteRiscoService(GerenteRiscoRepository repo) {
		this.repo = repo;
	}

	public List<GerenteRisco> list() {
		return repo.findAll();
	}

	public Optional<GerenteRisco> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<GerenteRisco> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public GerenteRisco create(GerenteRisco g) {
		return repo.save(g);
	}

	public GerenteRisco update(Integer id, GerenteRisco g) {
		g.setIdUser(id);
		return repo.save(g);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
