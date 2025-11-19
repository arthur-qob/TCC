package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.CriarMotoristaDTO;
import com.backend.dto.MotoristaDTO;
import com.backend.model.Frota;
import com.backend.model.Motorista;

public class MotoristaMapper {

	public static Motorista toEntity(CriarMotoristaDTO dto, PasswordEncoder passwordEncoder) {
		Motorista m = new Motorista();
		m.setNome(dto.getName());
		m.setEmail(dto.getEmail());
		m.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		m.setDataInicio(dto.getDataInicio());
		m.setDataFim(dto.getDataFim());
		m.setCategoria(dto.getCategoria());
		m.setStatus(dto.getStatus());
		m.setProgressoMensal(dto.getProgressoMensal() != null ? dto.getProgressoMensal() : java.math.BigDecimal.ZERO);

		if (dto.getFrotaId() != null) {
			Frota frota = new Frota();
			frota.setId(dto.getFrotaId());
			m.setFrota(frota);
		}

		return m;
	}

	public static MotoristaDTO toDTO(Motorista m) {
		MotoristaDTO dto = new MotoristaDTO();
		dto.setIdUser(m.getIdUser());
		dto.setName(m.getNome());
		dto.setEmail(m.getEmail());
		dto.setDataInicio(m.getDataInicio());
		dto.setDataFim(m.getDataFim());
		dto.setCategoria(m.getCategoria());
		dto.setStatus(m.getStatus());
		dto.setProgressoMensal(m.getProgressoMensal());

		if (m.getFrota() != null) {
			dto.setFrotaId(m.getFrota().getId());
		}

		return dto;
	}
}
