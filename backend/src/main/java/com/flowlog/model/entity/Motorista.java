package com.flowlog.model.entity;

import java.util.HashSet;
import java.util.Set;

import com.flowlog.model.enums.CategoriasMotorista;
import com.flowlog.model.enums.StatusMotorista;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
@Table(name = "motoristas")
public class Motorista extends Papel {
	
	@Column(name = "categoria", nullable = false)
	@Enumerated(EnumType.STRING)
	private CategoriasMotorista categoria;
	
	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusMotorista status;

	@OneToOne
	@JoinColumn(name = "frota_id")
	private Frota frota;

	@OneToMany(mappedBy = "motorista")
	private Set<Pedido> pedidosTransportados = new HashSet<>();
}
