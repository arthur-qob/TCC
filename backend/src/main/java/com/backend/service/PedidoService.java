package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.model.Pedido;
import com.backend.model.enums.StatusPedido;
import com.backend.repository.PedidoRepository;

@Service
public class PedidoService {

	private final PedidoRepository repo;

	public PedidoService(PedidoRepository repo) {
		this.repo = repo;
	}

	public List<Pedido> list() {
		return repo.findAll();
	}

	public Optional<Pedido> findById(Long id) {
		return repo.findById(id);
	}

	public List<Pedido> findByStatusPedido(StatusPedido statusPedido) {
		return repo.findByStatusPedido(statusPedido);
	}

	public Pedido create(Pedido p) {
		return repo.save(p);
	}

	public Pedido update(Long id, Pedido p) {
		p.setId(id);
		return repo.save(p);
	}

	public void delete(Long id) {
		repo.deleteById(id);
	}
}
