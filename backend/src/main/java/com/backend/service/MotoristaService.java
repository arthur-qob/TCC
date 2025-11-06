package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Motorista;
import com.backend.model.enums.StatusMotorista;
import com.backend.repository.MotoristaRepository;

@Service
public class MotoristaService {

	private final MotoristaRepository repo;

	public MotoristaService(MotoristaRepository repo) {
		this.repo = repo;
	}

	public List<Motorista> list() {
		return repo.findAll();
	}

	public Optional<Motorista> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Motorista> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public List<Motorista> findByStatus(StatusMotorista status) {
		return repo.findByStatus(status);
	}

	public Motorista create(Motorista m) {
		return repo.save(m);
	}

	public Motorista update(Integer id, Motorista m) {
		m.setIdUser(id);
		return repo.save(m);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
