package com.backend.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.backend.model.enums.StatusPedido;
import com.backend.model.enums.TiposCarga;
import com.backend.model.enums.TiposOperacao;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "pedidos")
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "data_execucao") // Data de saída de entrega | Colocar hora?
	private LocalDate dataExecucao;

	@Column(name = "tipo_carga", nullable = false)
	@Enumerated(EnumType.STRING)
	private TiposCarga tipoCarga;

	// Caso o tipo de carga seja CONTAINER, pedir o número de container
	@Column(name = "num_container")
	private String numContainer;

	@Column(name = "qtd_carretas", nullable = false)
	private Integer qtdCarretas;

	@Column(name = "tipo_operacao", nullable = false)
	@Enumerated(EnumType.STRING)
	private TiposOperacao tipoOperacao;

	@Column(name = "status_pedido", nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusPedido statusPedido;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "focal_id")
	private Focal focal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "programador_id")
	private Programador programador;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gerente_inicializador")
	private GerenteFrota gerenteInicializador;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gerente_revisor")
	private GerenteFrota gerenteRevisor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gerente_risco")
	private GerenteRisco gerenteRisco;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "motorista_id")
	private Motorista motorista;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cliente_id", nullable = false)
	private Cliente cliente;

	@OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Carga> cargas = new HashSet<>();
}