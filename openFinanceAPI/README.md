# API Open Finance - Banco Central Simulado

## Descrição
Essa é uma API RESTful que simula o papel de um "Banco Central" no contexto de Open Finance. O objetivo é consolidar informações bancárias de usuários, permitindo o acesso a saldos e extratos de diferentes instituições financeiras.

## Funcionalidades
- Cadastro de Instituições Financeiras
- Cadastro de Contas para Usuários
- Lançamento de Transações (Crédito/Débito)
- Visualização de Saldo Total Consolidado
- Visualização de Extratos por Instituição ou Geral

## Entidades Principais
- **Usuário**: pode ter contas em diversas instituições
- **Instituição**: representa um banco (ex: Santander)
- **Conta**: associa um usuário a uma instituição e possui um saldo
- **Transação**: representa uma movimentação financeira em uma conta

## Estrutura do Projeto
```
C:.\openFinanceAPI
├───config
│    ├───config.js
│    └───config.json
├───migrations
│    ├───20250408121138-create-usuario.js
│    ├───20250408121224-create-instituicao.js
│    ├───20250408121314-create-conta.js
│    └───20250408121328-create-transacao.js
├───models
│    ├───conta.js
│    ├───index.js
│    ├───instituicao.js
│    ├───transacao.js
│    └───usuario.js
├───node_modules
│    └─── ...
├───seeders
└───src
│    ├───controllers
│    ├───database
│    └───routes
│
├── .env
├── package-lock.json
├── package.json
└── server.js
```

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (Banco de dados relacional)

## Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
Edite o arquivo `config/config.js` com as informações do seu banco PostgreSQL:

```js
module.exports = {
  development: {
    username: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
```

### 4. Crie o banco de dados e execute as migrations
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

## Endpoints Disponíveis

| Método | Rota                               | Ação                                     |
|--------|------------------------------------|-------------------------------------------|
| POST   | `/instituicoes`                   | Cadastrar nova instituição               |
| POST | `/usuarios` | Cadastrar novo usuário |
| GET | `/usuarios` | Lista todos os usuários cadastrados |
| GET | `/usuarios/:cpf` | Lista o usuário por CPF |
| PUT | `/usuarios/:cpf` | Edita dados do usuário pelo CPF |
| DELETE | `/usuarios/:cpf` | Deleta um usuário pelo CPF |

---

## Contribuição
Sinta-se à vontade para enviar PRs ou abrir issues com sugestões de melhorias. Vamos construir algo massa juntos!

---

## Desenvolvedor
**Lucas Guidotti**