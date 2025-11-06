package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Carga;
import com.backend.repository.CargaRepository;

@Service
public class CargaService {

	private final CargaRepository repo;

	public CargaService(CargaRepository repo) {
		this.repo = repo;
	}

	public List<Carga> list() {
		return repo.findAll();
	}

	public Optional<Carga> findById(Integer id) {
		return repo.findById(id);
	}

	public Carga create(Carga c) {
		return repo.save(c);
	}

	public Carga update(Integer id, Carga c) {
		c.setId(id);
		return repo.save(c);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
