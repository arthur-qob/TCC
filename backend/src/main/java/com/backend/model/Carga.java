package com.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "cargas")
@Inheritance(strategy = InheritanceType.JOINED)
// Ou torna esta classe abstrata
// public abstract class Carga {
public class Carga {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// Ou adiciona este método
	/**
	 * public TiposCarga getTipoCarga() {
	 * if (this instanceof CargaSolta)
	 * return TiposCarga.SOLTA;
	 * if (this instanceof Container)
	 * return TiposCarga.CONTAINER;
	 * return null;
	 * }
	 */

	@ManyToOne
	@JoinColumn(name = "pedido_id", nullable = false)
	private Pedido pedido;
}