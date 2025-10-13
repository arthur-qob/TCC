package com.flowlog.model.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
@Table(name = "gerentes")
public class Gerente extends Papel {

	@OneToMany(mappedBy = "gerenteInicializador")
	private Set<Pedido> pedidosAbertos = new HashSet<>();

	@OneToMany(mappedBy = "gerenteRevisor")
	private Set<Pedido> pedidosRevisados = new HashSet<>();
}
