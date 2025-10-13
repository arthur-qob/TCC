package com.flowlog.model.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "nome", nullable = false)
	private String nome;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "cpf")
	private String cpf;
	
	@Column(name = "cnpj")
	private String cnpj;

	@OneToOne(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
	private Rota rota;

	@OneToMany(mappedBy = "cliente")
	private Set<Pedido> pedidos = new HashSet<>();

	public void setCnpj(String cnpj) {
		if (isValidCNPJ(cnpj)) {
			this.cnpj = cnpj;
		} else {
			throw new IllegalArgumentException("Invalid CNPJ: " + cnpj);
		}
	}

	public void setCpf(String cpf) {
		if (isValidCPF(cpf)) {
			this.cpf = cpf;
		} else {
			throw new IllegalArgumentException("Invalid CPF: " + cpf);
		}
	}

	private static boolean isValidCNPJ(String cnpj) {
        if (cnpj == null) return false;

        cnpj = cnpj.replaceAll("\\D", "");

        if (cnpj.length() != 14) return false;

        if (cnpj.matches("(\\d)\\1{13}")) return false;

        try {
            int[] weights1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            int[] weights2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

            int sum = 0;
            for (int i = 0; i < 12; i++) {
                sum += Character.getNumericValue(cnpj.charAt(i)) * weights1[i];
            }
            
			int mod = sum % 11;
            int checkDigit1 = (mod < 2) ? 0 : 11 - mod;

            sum = 0;
            for (int i = 0; i < 13; i++) {
                sum += Character.getNumericValue(cnpj.charAt(i)) * weights2[i];
            }
            
			mod = sum % 11;
            int checkDigit2 = (mod < 2) ? 0 : 11 - mod;

            return checkDigit1 == Character.getNumericValue(cnpj.charAt(12))
                && checkDigit2 == Character.getNumericValue(cnpj.charAt(13));

        } catch (Exception e) {
            return false;
        }
    }

	private static boolean isValidCPF(String cpf) {
        if (cpf == null) return false;

        cpf = cpf.replaceAll("\\D", "");

        if (cpf.length() != 11) return false;

        if (cpf.matches("(\\d)\\1{10}")) return false;

        try {
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
            }
            int mod = sum % 11;
            int checkDigit1 = (mod < 2) ? 0 : 11 - mod;

            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
            }
            mod = sum % 11;
            int checkDigit2 = (mod < 2) ? 0 : 11 - mod;

            return checkDigit1 == Character.getNumericValue(cpf.charAt(9))
                && checkDigit2 == Character.getNumericValue(cpf.charAt(10));

        } catch (Exception e) {
            return false;
        }
    }
}
