package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.AdminDTO;
import com.backend.dto.CriarAdminDTO;
import com.backend.model.Admin;

public class AdminMapper {

	public static Admin toEntity(CriarAdminDTO dto, PasswordEncoder passwordEncoder) {
		Admin admin = new Admin();
		admin.setNome(dto.getName());
		admin.setEmail(dto.getEmail());
		admin.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		admin.setDataInicio(dto.getDataInicio());
		admin.setDataFim(dto.getDataFim());
		return admin;
	}

	public static AdminDTO toDTO(Admin admin) {
		AdminDTO dto = new AdminDTO();
		dto.setIdUser(admin.getIdUser());
		dto.setName(admin.getNome());
		dto.setEmail(admin.getEmail());
		dto.setDataInicio(admin.getDataInicio());
		dto.setDataFim(admin.getDataFim());
		return dto;
	}
}
