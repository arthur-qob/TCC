package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.CriarProgramadorDTO;
import com.backend.dto.ProgramadorDTO;
import com.backend.model.Programador;

public class ProgramadorMapper {

	public static Programador toEntity(CriarProgramadorDTO dto, PasswordEncoder passwordEncoder) {
		Programador p = new Programador();
		p.setNome(dto.getName());
		p.setEmail(dto.getEmail());
		p.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		p.setDataInicio(dto.getDataInicio());
		p.setDataFim(dto.getDataFim());
		return p;
	}

	public static ProgramadorDTO toDTO(Programador p) {
		ProgramadorDTO dto = new ProgramadorDTO();
		dto.setIdUser(p.getIdUser());
		dto.setName(p.getNome());
		dto.setEmail(p.getEmail());
		dto.setDataInicio(p.getDataInicio());
		dto.setDataFim(p.getDataFim());
		return dto;
	}
}
