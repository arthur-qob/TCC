package com.backend.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.dto.CriarUsuarioDTO;
import com.backend.dto.UsuarioDTO;
import com.backend.model.Admin;
import com.backend.model.Focal;
import com.backend.model.GerenteFrota;
import com.backend.model.GerenteRisco;
import com.backend.model.Motorista;
import com.backend.model.Programador;
import com.backend.model.Usuario;

public class UsuarioMapper {

	public static Usuario toEntity(CriarUsuarioDTO dto, PasswordEncoder passwordEncoder) {
		Usuario u = new Usuario();
		u.setNome(dto.getName());
		u.setEmail(dto.getEmail());
		u.setSenhaHasheada(passwordEncoder.encode(dto.getPassword()));
		return u;
	}

	public static UsuarioDTO toDTO(Usuario u) {
		UsuarioDTO dto = new UsuarioDTO();
		dto.setIdUser(u.getIdUser());
		dto.setName(u.getNome());
		dto.setEmail(u.getEmail());

		// Determine user role type
		if (u instanceof Admin) {
			dto.setTipo("ADMIN");
		} else if (u instanceof Motorista) {
			dto.setTipo("MOTORISTA");
		} else if (u instanceof GerenteFrota) {
			dto.setTipo("GERENTE_FROTA");
		} else if (u instanceof GerenteRisco) {
			dto.setTipo("GERENTE_RISCO");
		} else if (u instanceof Programador) {
			dto.setTipo("PROGRAMADOR");
		} else if (u instanceof Focal) {
			dto.setTipo("FOCAL");
		}
		// If none of the above, tipo remains null (basic user)

		return dto;
	}
}
