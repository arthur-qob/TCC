package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Frota;
import com.backend.model.enums.StatusFrota;
import com.backend.repository.FrotaRepository;

@Service
public class FrotaService {

	private final FrotaRepository repo;

	public FrotaService(FrotaRepository repo) {
		this.repo = repo;
	}

	public List<Frota> list() {
		return repo.findAll();
	}

	public Optional<Frota> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Frota> findByPlaca(String placa) {
		return repo.findByPlaca(placa);
	}

	public List<Frota> findByStatus(StatusFrota status) {
		return repo.findByStatus(status);
	}

	public Frota create(Frota f) {
		return repo.save(f);
	}

	public Frota update(Integer id, Frota f) {
		f.setId(id);
		return repo.save(f);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
