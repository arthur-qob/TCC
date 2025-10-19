package com.flowlog.service;

import com.flowlog.model.entity.GerenteFrota;
import com.flowlog.repository.GerenteFrotaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GerenteFrotaService {

    private final GerenteFrotaRepository repository;

    public GerenteFrotaService(GerenteFrotaRepository repository) {
        this.repository = repository;
    }

    public List<GerenteFrota> listar() {
        return repository.findAll();
    }

    public Optional<GerenteFrota> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public GerenteFrota criar(GerenteFrota gerenteFrota) {
        return repository.save(gerenteFrota);
    }

    @Transactional
    public GerenteFrota atualizar(Integer id, GerenteFrota gerenteFrota) {
        gerenteFrota.setId(id);
        return repository.save(gerenteFrota);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<GerenteFrota> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}
