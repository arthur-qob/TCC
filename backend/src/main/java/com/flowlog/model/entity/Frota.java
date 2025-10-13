package com.flowlog.model.entity;

import com.flowlog.model.enums.StatusFrota;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "frotas")
public class Frota {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "placa", nullable = false, unique = true)
	private String placa;

	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusFrota status;

	@OneToOne(mappedBy = "frota")
	private Motorista motorista;
}
