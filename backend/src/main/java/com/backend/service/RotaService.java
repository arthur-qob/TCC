package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Rota;
import com.backend.repository.RotaRepository;

@Service
public class RotaService {

	private final RotaRepository repo;

	public RotaService(RotaRepository repo) {
		this.repo = repo;
	}

	public List<Rota> list() {
		return repo.findAll();
	}

	public Optional<Rota> findById(Integer id) {
		return repo.findById(id);
	}

	public List<Rota> findByOrigem(String origem) {
		return repo.findByOrigem(origem);
	}

	public List<Rota> findByDestino(String destino) {
		return repo.findByDestino(destino);
	}

	public Rota create(Rota r) {
		return repo.save(r);
	}

	public Rota update(Integer id, Rota r) {
		r.setId(id);
		return repo.save(r);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
