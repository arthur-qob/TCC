-- Create base usuarios table (inheritance root)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Create papel table (extends usuarios)
CREATE TABLE papel (
    id INTEGER PRIMARY KEY REFERENCES usuarios(id),
    data_inicio DATE,
    data_fim DATE
);

-- Create focais table (extends papel)
CREATE TABLE focais (
    id INTEGER PRIMARY KEY REFERENCES papel(id)
);

-- Create programadores table (extends papel)
CREATE TABLE programadores (
    id INTEGER PRIMARY KEY REFERENCES papel(id)
);

-- Create gerentes table (GerenteFrota - extends papel)
CREATE TABLE gerentes (
    id INTEGER PRIMARY KEY REFERENCES papel(id)
);

-- Create gerente_risco table (extends papel)
CREATE TABLE gerente_risco (
    id INTEGER PRIMARY KEY REFERENCES papel(id)
);

-- Create motoristas table (extends papel)
CREATE TABLE motoristas (
    id INTEGER PRIMARY KEY REFERENCES papel(id),
    categoria VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    frota_id INTEGER
);

-- Create frotas table
CREATE TABLE frotas (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL
);

-- Create cliente table
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    cnpj VARCHAR(18),
    CONSTRAINT check_cpf_or_cnpj CHECK (cpf IS NOT NULL OR cnpj IS NOT NULL)
);

-- Create rotas table
CREATE TABLE rotas (
    id SERIAL PRIMARY KEY,
    origem VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    cliente_id INTEGER REFERENCES cliente(id)
);

-- Create pedidos table
CREATE TABLE pedidos (
    id BIGSERIAL PRIMARY KEY,
    data_execucao DATE,
    tipo_carga VARCHAR(50) NOT NULL,
    num_container VARCHAR(255),
    qtd_carretas INTEGER NOT NULL,
    tipo_operacao VARCHAR(50) NOT NULL,
    status_pedido VARCHAR(50) NOT NULL,
    focal_id INTEGER REFERENCES focais(id),
    programador_id INTEGER REFERENCES programadores(id),
    gerente_inicializador INTEGER REFERENCES gerentes(id),
    gerente_revisor INTEGER REFERENCES gerentes(id),
    gerente_risco INTEGER REFERENCES gerente_risco(id),
    motorista_id INTEGER REFERENCES motoristas(id),
    cliente_id INTEGER NOT NULL REFERENCES cliente(id)
);

-- Create cargas table (inheritance root)
CREATE TABLE cargas (
    id SERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL REFERENCES pedidos(id)
);

-- Create containers table (extends cargas)
CREATE TABLE containers (
    id INTEGER PRIMARY KEY REFERENCES cargas(id),
    num_container VARCHAR(255) NOT NULL
);

-- Create cargas_soltas table (extends cargas)
CREATE TABLE cargas_soltas (
    id INTEGER PRIMARY KEY REFERENCES cargas(id),
    num_nota_fiscal BIGINT NOT NULL
);

-- Add foreign key for motoristas -> frotas
ALTER TABLE motoristas
    ADD CONSTRAINT fk_motorista_frota
    FOREIGN KEY (frota_id) REFERENCES frotas(id);

-- Add foreign key for frotas -> motoristas (one-to-one)
-- Note: This is handled by the frota_id in motoristas table

-- Create indexes for better performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_cliente_email ON cliente(email);
CREATE INDEX idx_cliente_cpf ON cliente(cpf);
CREATE INDEX idx_cliente_cnpj ON cliente(cnpj);
CREATE INDEX idx_frotas_placa ON frotas(placa);
CREATE INDEX idx_frotas_status ON frotas(status);
CREATE INDEX idx_motoristas_status ON motoristas(status);
CREATE INDEX idx_pedidos_status ON pedidos(status_pedido);
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_motorista ON pedidos(motorista_id);
