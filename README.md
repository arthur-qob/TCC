# FlowLog - Sistema de Gestão Logística

## Descrição

API RESTful para gerenciamento de operações logísticas, incluindo gestão de Clientes, Motoristas, Frotas, Pedidos e Cargas. Implementada em Spring Boot 3.5.6 com Java 17 e Maven.

### Funcionalidades

* CRUD completo para Clientes, Motoristas, Frotas e Pedidos
* Gestão de diferentes tipos de usuários (Focal, Programador, Gerente de Frota, Gerente de Risco, Motorista)
* Sistema de herança para entidades de usuários e cargas
* Validação de CPF/CNPJ para clientes
* Rastreamento de status de pedidos, frotas e motoristas
* Suporte para diferentes tipos de carga (Container e Carga Solta)
* Persistência em PostgreSQL via Spring Data JPA
* Migrações controladas com Flyway
* Documentação interativa via Swagger (SpringDoc OpenAPI)
* Monitoramento com Spring Boot Actuator
* Validações de payload com Bean Validation

## Tecnologias Utilizadas

* Java 17
* Spring Boot 3.5.6
* Spring Data JPA
* Flyway
* Spring Boot Actuator
* SpringDoc OpenAPI 2.8.8
* Bean Validation (Hibernate Validator)
* PostgreSQL 14+
* Lombok
* Maven

## Pré-requisitos

* Java 17 instalado
* Maven 3.x (pode usar ./mvnw)
* PostgreSQL 14+ em execução

## Configuração do Banco de Dados

1. Acesse o PostgreSQL:

   ```bash
   psql -U postgres
   ```

2. Crie o banco de dados:

   ```sql
   CREATE DATABASE flowlog_db;
   ```

3. Atualize as credenciais em `backend/src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/flowlog_db
   spring.datasource.username=postgres
   spring.datasource.password=sua_senha
   ```

## Executando a Aplicação

### Usando Maven Wrapper

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

### Usando JAR

```bash
cd backend
./mvnw clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

A aplicação estará disponível em: `http://localhost:8080`

## Endpoints Principais

### Clientes

* `GET /api/clientes` — lista todos os clientes
* `POST /api/clientes` — cria um cliente
* `GET /api/clientes/{id}` — busca por ID
* `PUT /api/clientes/{id}` — atualiza por ID
* `DELETE /api/clientes/{id}` — remove por ID

### Frotas

* `GET /api/frotas` — lista todas as frotas
* `POST /api/frotas` — cria uma frota
* `GET /api/frotas/{id}` — busca por ID
* `PUT /api/frotas/{id}` — atualiza por ID
* `DELETE /api/frotas/{id}` — remove por ID

### Motoristas

* `GET /api/motoristas` — lista todos os motoristas
* `POST /api/motoristas` — cria um motorista
* `GET /api/motoristas/{id}` — busca por ID
* `PUT /api/motoristas/{id}` — atualiza por ID
* `DELETE /api/motoristas/{id}` — remove por ID

### Pedidos

* `GET /api/pedidos` — lista todos os pedidos
* `POST /api/pedidos` — cria um pedido
* `GET /api/pedidos/{id}` — busca por ID
* `PUT /api/pedidos/{id}` — atualiza por ID
* `DELETE /api/pedidos/{id}` — remove por ID

## Documentação Interativa

Acesse a documentação Swagger UI:

```
http://localhost:8080/swagger-ui.html
```

JSON do OpenAPI:

```
http://localhost:8080/v3/api-docs
```

## Modelo de Domínio

### Hierarquia de Usuários

```
Usuario (base)
  └── Papel (abstrato)
      ├── Focal
      ├── Programador
      ├── GerenteFrota
      ├── GerenteRisco
      └── Motorista
```

### Hierarquia de Cargas

```
Carga (base)
  ├── Container
  └── CargaSolta
```

### Entidades Principais

* **Cliente**: Informações de clientes (CPF ou CNPJ obrigatório)
* **Frota**: Veículos disponíveis para transporte
* **Motorista**: Motoristas com categorias e status
* **Pedido**: Solicitações de transporte com rotas e cargas
* **Rota**: Rotas de origem/destino com valores

## Enums

* **StatusFrota**: DISPONIVEL, INDISPONIVEL, EM_MANUTENCAO
* **StatusMotorista**: ATIVO, INATIVO, FERIAS, AFASTADO
* **StatusPedido**: ABERTO, EM_ANDAMENTO, CONCLUIDO, CANCELADO
* **TiposCarga**: CONTAINER, SOLTA
* **TiposOperacao**: IMPORTACAO, EXPORTACAO
* **CategoriasMotorista**: A, B, C, D, E

## Monitoramento

Endpoints do Actuator disponíveis:

* `GET /actuator/health` — status da aplicação
* `GET /actuator/info` — informações da aplicação
* `GET /actuator/metrics` — métricas da aplicação

## Estrutura do Projeto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/flowlog/
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── exception/       # Exception Handlers
│   │   │   ├── mapper/          # Entity-DTO Mappers
│   │   │   ├── model/
│   │   │   │   ├── entity/      # JPA Entities
│   │   │   │   └── enums/       # Enumerations
│   │   │   ├── repository/      # JPA Repositories
│   │   │   ├── service/         # Business Logic
│   │   │   └── Application.java # Main Application
│   │   └── resources/
│   │       ├── db/migration/    # Flyway Scripts
│   │       └── application.properties
│   └── test/                    # Tests
└── pom.xml
```

## Próximos Passos

1. Implementar autenticação e autorização (Spring Security)
2. Adicionar testes unitários e de integração
3. Implementar endpoints para Focal, Programador, GerenteFrota e GerenteRisco
4. Adicionar paginação e ordenação nos endpoints de listagem
5. Implementar filtros avançados de busca
6. Adicionar documentação de API mais detalhada
7. Configurar perfis de desenvolvimento e produção
8. Implementar cache com Redis
9. Adicionar logs estruturados
10. Criar frontend React/Vue.js

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
