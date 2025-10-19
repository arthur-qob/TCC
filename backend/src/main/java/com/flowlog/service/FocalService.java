package com.flowlog.service;

import com.flowlog.model.entity.Focal;
import com.flowlog.repository.FocalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FocalService {

    private final FocalRepository repository;

    public FocalService(FocalRepository repository) {
        this.repository = repository;
    }

    public List<Focal> listar() {
        return repository.findAll();
    }

    public Optional<Focal> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Focal criar(Focal focal) {
        return repository.save(focal);
    }

    @Transactional
    public Focal atualizar(Integer id, Focal focal) {
        focal.setId(id);
        return repository.save(focal);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<Focal> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}
