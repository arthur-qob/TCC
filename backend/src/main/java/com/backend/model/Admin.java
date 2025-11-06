package com.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin extends Papel {
	// Admin has all permissions - no additional fields needed beyond Papel
}
