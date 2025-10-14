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
@Table(name = "gerente_risco")
public class GerenteRisco extends Papel {

	@OneToMany(mappedBy = "gerenteRisco")
	private Set<Pedido> pedidos = new HashSet<>();
}
