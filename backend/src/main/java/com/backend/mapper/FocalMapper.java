package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.CriarFocalDTO;
import com.backend.dto.FocalDTO;
import com.backend.model.Focal;

public class FocalMapper {

	public static Focal toEntity(CriarFocalDTO dto, PasswordEncoder passwordEncoder) {
		Focal f = new Focal();
		f.setNome(dto.getName());
		f.setEmail(dto.getEmail());
		f.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		f.setDataInicio(dto.getDataInicio());
		f.setDataFim(dto.getDataFim());
		return f;
	}

	public static FocalDTO toDTO(Focal f) {
		FocalDTO dto = new FocalDTO();
		dto.setIdUser(f.getIdUser());
		dto.setName(f.getNome());
		dto.setEmail(f.getEmail());
		dto.setDataInicio(f.getDataInicio());
		dto.setDataFim(f.getDataFim());
		return dto;
	}
}
