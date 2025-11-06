package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Usuario;
import com.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

	private final UsuarioRepository repo;

	public UsuarioService(UsuarioRepository repo) {
		this.repo = repo;
	}

	public List<Usuario> list() {
		return repo.findAll();
	}

	public Optional<Usuario> findById(Integer id) {
		return repo.findById(id);
	}

	public Optional<Usuario> findByEmail(String email) {
		return repo.findByEmail(email);
	}

	public Usuario create(Usuario u) {
		return repo.save(u);
	}

	public Usuario update(Integer id, Usuario u) {
		u.setIdUser(id);
		return repo.save(u);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
