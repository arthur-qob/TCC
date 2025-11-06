package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Programador;
import com.backend.repository.ProgramadorRepository;

@Service
public class ProgramadorService {

	private final ProgramadorRepository repo;

	public ProgramadorService(ProgramadorRepository repo) {
		this.repo = repo;
	}

	public List<Programador> list() {
		return repo.findAll();
	}

	public Optional<Programador> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Programador> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public Programador create(Programador p) {
		return repo.save(p);
	}

	public Programador update(Integer id, Programador p) {
		p.setIdUser(id);
		return repo.save(p);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
