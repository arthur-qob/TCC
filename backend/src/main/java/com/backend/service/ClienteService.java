package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Cliente;
import com.backend.repository.ClienteRepository;

@Service
public class ClienteService {

	private final ClienteRepository repo;

	public ClienteService(ClienteRepository repo) {
		this.repo = repo;
	}

	public List<Cliente> list() {
		return repo.findAll();
	}

	public Optional<Cliente> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Cliente> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public Optional<Cliente> findByCpf(String cpf) {
		return repo.findByCpf(cpf);
	}

	public Optional<Cliente> findByCnpj(String cnpj) {
		return repo.findByCnpj(cnpj);
	}

	public Cliente create(Cliente c) {
		return repo.save(c);
	}

	public Cliente update(Integer id, Cliente c) {
		c.setId(id);
		return repo.save(c);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
