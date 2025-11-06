package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Admin;
import com.backend.repository.AdminRepository;

@Service
public class AdminService {

	private final AdminRepository repo;

	public AdminService(AdminRepository repo) {
		this.repo = repo;
	}

	public List<Admin> list() {
		return repo.findAll();
	}

	public Optional<Admin> findById(Integer id) {
		return repo.findById(id);
	}

	public Admin create(Admin admin) {
		return repo.save(admin);
	}

	public Admin update(Integer id, Admin admin) {
		admin.setIdUser(id);
		return repo.save(admin);
	}

	public void delete(Integer id) {
		repo.deleteById(id);
	}
}
