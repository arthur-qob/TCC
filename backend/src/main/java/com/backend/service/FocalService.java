package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Focal;
import com.backend.repository.FocalRepository;

@Service
public class FocalService {

	private final FocalRepository repo;

	public FocalService(FocalRepository repo) {
		this.repo = repo;
	}

	public List<Focal> list() {
		return repo.findAll();
	}

	public Optional<Focal> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Focal> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public Focal create(Focal f) {
		return repo.save(f);
	}

	public Focal update(Integer id, Focal f) {
		f.setIdUser(id);
		return repo.save(f);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
