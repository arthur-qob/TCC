-- Create Cliente table
CREATE TABLE cliente (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    cnpj VARCHAR(18),
    telefone VARCHAR(20),
    observacoes TEXT,
    CONSTRAINT check_cpf_or_cnpj CHECK (cpf IS NOT NULL OR cnpj IS NOT NULL)
);

-- Create Frotas table
CREATE TABLE frotas (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL
);

-- Create Rotas table
CREATE TABLE rotas (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    origem VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    cliente_id INTEGER,
    CONSTRAINT fk_rotas_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

-- Create Pedidos table
CREATE TABLE pedidos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    data_execucao DATE,
    tipo_carga VARCHAR(50) NOT NULL,
    num_container VARCHAR(50),
    qtd_carretas INTEGER NOT NULL,
    tipo_operacao VARCHAR(50) NOT NULL,
    status_pedido VARCHAR(50) NOT NULL,
    focal_id INTEGER,
    programador_id INTEGER,
    gerente_inicializador INTEGER,
    gerente_revisor INTEGER,
    gerente_risco INTEGER,
    motorista_id INTEGER,
    cliente_id INTEGER NOT NULL,
    CONSTRAINT fk_pedidos_focal FOREIGN KEY (focal_id) REFERENCES focais(id_user),
    CONSTRAINT fk_pedidos_programador FOREIGN KEY (programador_id) REFERENCES programadores(id_user),
    CONSTRAINT fk_pedidos_gerente_inicializador FOREIGN KEY (gerente_inicializador) REFERENCES gerentes_frota(id_user),
    CONSTRAINT fk_pedidos_gerente_revisor FOREIGN KEY (gerente_revisor) REFERENCES gerentes_frota(id_user),
    CONSTRAINT fk_pedidos_gerente_risco FOREIGN KEY (gerente_risco) REFERENCES gerentes_risco(id_user),
    CONSTRAINT fk_pedidos_motorista FOREIGN KEY (motorista_id) REFERENCES motoristas(id_user),
    CONSTRAINT fk_pedidos_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

-- Create Cargas table (base table for JOINED inheritance)
CREATE TABLE cargas (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    pedido_id BIGINT NOT NULL,
    CONSTRAINT fk_cargas_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Create Containers table (extends Cargas)
CREATE TABLE containers (
    id INTEGER PRIMARY KEY,
    num_container VARCHAR(50) NOT NULL,
    CONSTRAINT fk_containers_cargas FOREIGN KEY (id) REFERENCES cargas(id)
);

-- Create Cargas_Soltas table (extends Cargas)
CREATE TABLE cargas_soltas (
    id INTEGER PRIMARY KEY,
    num_nota_fiscal BIGINT NOT NULL,
    CONSTRAINT fk_cargas_soltas_cargas FOREIGN KEY (id) REFERENCES cargas(id)
);

-- Add foreign key from motorista to frotas (if not already in user table)
ALTER TABLE motoristas ADD CONSTRAINT fk_motorista_frota FOREIGN KEY (frota_id) REFERENCES frotas(id);

-- Create indexes for performance
CREATE INDEX idx_cliente_email ON cliente(email);
CREATE INDEX idx_cliente_cpf ON cliente(cpf);
CREATE INDEX idx_cliente_cnpj ON cliente(cnpj);
CREATE INDEX idx_frotas_placa ON frotas(placa);
CREATE INDEX idx_pedidos_status ON pedidos(status_pedido);
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_motorista ON pedidos(motorista_id);
CREATE INDEX idx_cargas_pedido ON cargas(pedido_id);
