package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.CargaSolta;
import com.backend.repository.CargaSoltaRepository;

@Service
public class CargaSoltaService {

	private final CargaSoltaRepository repo;

	public CargaSoltaService(CargaSoltaRepository repo) {
		this.repo = repo;
	}

	public List<CargaSolta> list() {
		return repo.findAll();
	}

	public Optional<CargaSolta> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<CargaSolta> findByNotaFiscal(Long numNotaFiscal) {
		return repo.findByNumNotaFiscal(numNotaFiscal);
	}

	public CargaSolta create(CargaSolta c) {
		return repo.save(c);
	}

	public CargaSolta update(Integer id, CargaSolta c) {
		c.setId(id);
		return repo.save(c);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
