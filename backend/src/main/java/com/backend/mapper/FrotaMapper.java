package com.backend.mapper;

import com.backend.dto.CriarFrotaDTO;
import com.backend.dto.FrotaDTO;
import com.backend.model.Frota;

public class FrotaMapper {

	public static Frota toEntity(CriarFrotaDTO dto) {
		Frota f = new Frota();
		f.setPlaca(dto.getPlaca());
		f.setStatus(dto.getStatus());
		return f;
	}

	public static FrotaDTO toDTO(Frota f) {
		FrotaDTO dto = new FrotaDTO();
		dto.setId(f.getId());
		dto.setPlaca(f.getPlaca());
		dto.setStatus(f.getStatus());

		if (f.getMotorista() != null) {
			dto.setMotoristaId(f.getMotorista().getIdUser());
		}

		return dto;
	}
}
