package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.CriarGerenteRiscoDTO;
import com.backend.dto.GerenteRiscoDTO;
import com.backend.model.GerenteRisco;

public class GerenteRiscoMapper {

	public static GerenteRisco toEntity(CriarGerenteRiscoDTO dto, PasswordEncoder passwordEncoder) {
		GerenteRisco g = new GerenteRisco();
		g.setNome(dto.getName());
		g.setEmail(dto.getEmail());
		g.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		g.setDataInicio(dto.getDataInicio());
		g.setDataFim(dto.getDataFim());
		return g;
	}

	public static GerenteRiscoDTO toDTO(GerenteRisco g) {
		GerenteRiscoDTO dto = new GerenteRiscoDTO();
		dto.setIdUser(g.getIdUser());
		dto.setName(g.getNome());
		dto.setEmail(g.getEmail());
		dto.setDataInicio(g.getDataInicio());
		dto.setDataFim(g.getDataFim());
		return dto;
	}
}
