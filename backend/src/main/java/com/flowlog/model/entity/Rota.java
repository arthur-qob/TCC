package com.flowlog.model.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "rotas")
public class Rota {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "origem", nullable = false)
	private String origem;

	@Column(name = "destino", nullable = false)
	private String destino;

	@Column(name = "valor", nullable = false)
	private BigDecimal valor;

	@OneToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;
}
