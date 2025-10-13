package com.flowlog.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cargas_soltas")
public class CargaSolta extends Carga {

	@Column(name = "num_nota_fiscal", nullable = false)
	private Long numNotaFiscal;

	// Adicionar peso e link para cliente?
}
