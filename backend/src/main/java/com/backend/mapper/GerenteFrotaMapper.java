package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.CriarGerenteFrotaDTO;
import com.backend.dto.GerenteFrotaDTO;
import com.backend.model.GerenteFrota;

public class GerenteFrotaMapper {

	public static GerenteFrota toEntity(CriarGerenteFrotaDTO dto, PasswordEncoder passwordEncoder) {
		GerenteFrota g = new GerenteFrota();
		g.setNome(dto.getName());
		g.setEmail(dto.getEmail());
		g.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		g.setDataInicio(dto.getDataInicio());
		g.setDataFim(dto.getDataFim());
		return g;
	}

	public static GerenteFrotaDTO toDTO(GerenteFrota g) {
		GerenteFrotaDTO dto = new GerenteFrotaDTO();
		dto.setIdUser(g.getIdUser());
		dto.setName(g.getNome());
		dto.setEmail(g.getEmail());
		dto.setDataInicio(g.getDataInicio());
		dto.setDataFim(g.getDataFim());
		return dto;
	}
}
