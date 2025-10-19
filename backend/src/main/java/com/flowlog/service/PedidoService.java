package com.flowlog.service;

import com.flowlog.model.entity.Pedido;
import com.flowlog.model.enums.StatusPedido;
import com.flowlog.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final ClienteRepository clienteRepository;
    private final MotoristaRepository motoristaRepository;

    public PedidoService(PedidoRepository repository,
                         ClienteRepository clienteRepository,
                         MotoristaRepository motoristaRepository) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
        this.motoristaRepository = motoristaRepository;
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Optional<Pedido> buscarPorId(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Pedido criar(Pedido pedido, Integer clienteId, Integer motoristaId) {
        if (clienteId != null) {
            clienteRepository.findById(clienteId).ifPresent(pedido::setCliente);
        }
        if (motoristaId != null) {
            motoristaRepository.findById(motoristaId).ifPresent(pedido::setMotorista);
        }
        return repository.save(pedido);
    }

    @Transactional
    public Pedido atualizar(Long id, Pedido pedido, Integer clienteId, Integer motoristaId) {
        pedido.setId(id);
        if (clienteId != null) {
            clienteRepository.findById(clienteId).ifPresent(pedido::setCliente);
        }
        if (motoristaId != null) {
            motoristaRepository.findById(motoristaId).ifPresent(pedido::setMotorista);
        }
        return repository.save(pedido);
    }

    @Transactional
    public void excluir(Long id) {
        repository.deleteById(id);
    }

    public List<Pedido> buscarPorStatus(StatusPedido status) {
        return repository.findByStatusPedido(status);
    }

    public List<Pedido> buscarPorCliente(Integer clienteId) {
        return repository.findByClienteId(clienteId);
    }

    public List<Pedido> buscarPorMotorista(Integer motoristaId) {
        return repository.findByMotoristaId(motoristaId);
    }
}
