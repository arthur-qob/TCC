package com.flowlog.service;

import com.flowlog.model.entity.Motorista;
import com.flowlog.model.enums.StatusMotorista;
import com.flowlog.repository.FrotaRepository;
import com.flowlog.repository.MotoristaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MotoristaService {

    private final MotoristaRepository repository;
    private final FrotaRepository frotaRepository;

    public MotoristaService(MotoristaRepository repository, FrotaRepository frotaRepository) {
        this.repository = repository;
        this.frotaRepository = frotaRepository;
    }

    public List<Motorista> listar() {
        return repository.findAll();
    }

    public Optional<Motorista> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    @Transactional
    public Motorista criar(Motorista motorista, Integer frotaId) {
        if (frotaId != null) {
            frotaRepository.findById(frotaId).ifPresent(motorista::setFrota);
        }
        return repository.save(motorista);
    }

    @Transactional
    public Motorista atualizar(Integer id, Motorista motorista, Integer frotaId) {
        motorista.setId(id);
        if (frotaId != null) {
            frotaRepository.findById(frotaId).ifPresent(motorista::setFrota);
        }
        return repository.save(motorista);
    }

    @Transactional
    public void excluir(Integer id) {
        repository.deleteById(id);
    }

    public Optional<Motorista> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public List<Motorista> buscarPorStatus(StatusMotorista status) {
        return repository.findByStatus(status);
    }
}
