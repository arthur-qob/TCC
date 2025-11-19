-- Create sequence for ID generation (used by GenerationType.AUTO with TABLE_PER_CLASS)
CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1;

-- Base usuarios table (for basic users without roles)
CREATE TABLE usuarios (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL
);

-- Programador table (Admin role)
CREATE TABLE programadores (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL,
    data_inicio DATE,
    data_fim DATE
);

-- Motorista table (Driver role)
CREATE TABLE motoristas (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL,
    data_inicio DATE,
    data_fim DATE,
    categoria VARCHAR(50),
    status VARCHAR(50),
    frota_id INTEGER,
    progresso_mensal DECIMAL(10, 2) DEFAULT 0.00
);

-- GerenteFrota table (Fleet Manager role)
CREATE TABLE gerentes_frota (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL,
    data_inicio DATE,
    data_fim DATE
);

-- GerenteRisco table (Risk Manager role)
CREATE TABLE gerentes_risco (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL,
    data_inicio DATE,
    data_fim DATE
);

-- Focal table (Focal Point role)
CREATE TABLE focais (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL,
    data_inicio DATE,
    data_fim DATE
);

-- Admin table (Super Admin role with all permissions)
CREATE TABLE admin (
    id_user INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hasheada VARCHAR(255) NOT NULL,
    data_inicio DATE,
    data_fim DATE
);

-- Create indexes for email lookups (performance optimization)
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_programadores_email ON programadores(email);
CREATE INDEX idx_motoristas_email ON motoristas(email);
CREATE INDEX idx_gerentes_frota_email ON gerentes_frota(email);
CREATE INDEX idx_gerentes_risco_email ON gerentes_risco(email);
CREATE INDEX idx_focais_email ON focais(email);
CREATE INDEX idx_admin_email ON admin(email);

-- Insert a default admin user (Admin)
-- Password: admin123 (BCrypt hash with strength 10)
INSERT INTO admin (id_user, nome, email, senha_hasheada, data_inicio, data_fim)
VALUES (
    1,
    'Administrador',
    'admin@ziranlog.com',
    '$2a$10$2C3by3Mx7XM243OkDuD/ruxkqh/bhQwGDCQPPN/6tJxw99Qkjhb3O',
    CURRENT_DATE,
    NULL
);
