package com.tutorial;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest(classes = com.backend.Application.class)
class ApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testAdminPassword() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String password = "admin123";
		String hash = "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLdbE0dj5.lSMy3RxC8e5s6HJQny";

		boolean matches = encoder.matches(password, hash);
		System.out.println("Password: " + password);
		System.out.println("Hash: " + hash);
		System.out.println("Matches: " + matches);

		// Also generate a new hash to verify
		String newHash = encoder.encode(password);
		System.out.println("New hash for same password: " + newHash);
	}

}