package com.flowlog.service;

import com.flowlog.model.entity.Cliente;
import com.flowlog.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Optional<Cliente> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Cliente criar(Cliente cliente) {
        return repository.save(cliente);
    }

    @Transactional
    public Cliente atualizar(Integer id, Cliente cliente) {
        cliente.setId(id);
        return repository.save(cliente);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<Cliente> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<Cliente> buscarPorCpf(String cpf) {
        return repository.findByCpf(cpf);
    }

    public Optional<Cliente> buscarPorCnpj(String cnpj) {
        return repository.findByCnpj(cnpj);
    }
}
