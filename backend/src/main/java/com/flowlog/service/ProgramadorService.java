package com.flowlog.service;

import com.flowlog.model.entity.Programador;
import com.flowlog.repository.ProgramadorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramadorService {

    private final ProgramadorRepository repository;

    public ProgramadorService(ProgramadorRepository repository) {
        this.repository = repository;
    }

    public List<Programador> listar() {
        return repository.findAll();
    }

    public Optional<Programador> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Programador criar(Programador programador) {
        return repository.save(programador);
    }

    @Transactional
    public Programador atualizar(Integer id, Programador programador) {
        programador.setId(id);
        return repository.save(programador);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<Programador> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }
}
