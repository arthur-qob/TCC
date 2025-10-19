package com.flowlog.service;

import com.flowlog.model.entity.Frota;
import com.flowlog.model.enums.StatusFrota;
import com.flowlog.repository.FrotaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FrotaService {

    private final FrotaRepository repository;

    public FrotaService(FrotaRepository repository) {
        this.repository = repository;
    }

    public List<Frota> listar() {
        return repository.findAll();
    }

    public Optional<Frota> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Frota criar(Frota frota) {
        return repository.save(frota);
    }

    @Transactional
    public Frota atualizar(Integer id, Frota frota) {
        frota.setId(id);
        return repository.save(frota);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<Frota> buscarPorPlaca(String placa) {
        return repository.findByPlaca(placa);
    }

    public List<Frota> buscarPorStatus(StatusFrota status) {
        return repository.findByStatus(status);
    }
}
