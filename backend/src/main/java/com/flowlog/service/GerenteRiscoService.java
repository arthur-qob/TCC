package com.flowlog.service;

import com.flowlog.model.entity.GerenteRisco;
import com.flowlog.repository.GerenteRiscoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GerenteRiscoService {

    private final GerenteRiscoRepository repository;

    public GerenteRiscoService(GerenteRiscoRepository repository) {
        this.repository = repository;
    }

    public List<GerenteRisco> listar() {
        return repository.findAll();
    }

    public Optional<GerenteRisco> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public GerenteRisco criar(GerenteRisco gerenteRisco) {
        return repository.save(gerenteRisco);
    }

    @Transactional
    public GerenteRisco atualizar(Integer id, GerenteRisco gerenteRisco) {
        gerenteRisco.setId(id);
        return repository.save(gerenteRisco);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<GerenteRisco> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}
