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
│    └───config.js
├───migrations
│    ├───20250408121138-create-usuario.js
│    ├───20250408121224-create-instituicao.js
│    ├───20250408121314-create-conta.js
│    ├───20250408121328-create-transacao.js
│    └───20250409140110-alter-usuarios-use-cpf-as-pk
├───models
│    ├───conta.js
│    ├───index.js
│    ├───instituicao.js
│    ├───transacao.js
│    └───usuario.js
├───node_modules
│    └─── ...
├───seeders
├───src
│    ├───controllers
│    │    ├───contaController.js
│    │    ├───instituicaoController.js
│    │    ├───transacaoController.js
│    │    └───usuarioController.js
│    ├───database
│    └───routes
│         ├───contaRoutes.js
│         ├───instituicaoRoutes.js
│         ├───transaoRoutes.js
│         └───usuarioRoutes.js
├── .env
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

 Obs: O diretório seeders/ está vazio, mas pode ser usado futuramente para povoar o banco com dados iniciais.

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (Banco de dados relacional)
- Dotenv

## Instalação

### 1. Clone o repositório
```bash
git clone git@github.com:l-guidotti/desafiosCompass.git
cd desafiosCompass
cd openFinanceAPI
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```.env
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
DB_HOST=localhost
DB_DIALECT=postgres
```

### 4. Configure o banco de dados
Edite o arquivo `config/config.js` com as informações do .env:

```js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};
```

### 5. Crie o banco de dados e execute as migrations
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

## Endpoints Disponíveis
### **/instituicoes**

| Método | Rota                               | Ação                                     |
|--------|------------------------------------|-------------------------------------------|
| POST   | `/instituicoes`                   | Cadastrar nova instituição  |

### **/usuarios**

| Método | Rota                               | Ação                                     |
|--------|------------------------------------|-------------------------------------------|             
| POST | `/usuarios` | Cadastrar novo usuário |
| GET | `/usuarios` | Lista todos os usuários cadastrados |
| GET | `/usuarios/:cpf` | Lista o usuário por CPF |
| PUT | `/usuarios/:cpf` | Edita dados do usuário pelo CPF |
| DELETE | `/usuarios/:cpf` | Deleta um usuário pelo CPF |
| GET | `/usuarios/:cpf/extrato` | Gera extrato de transferências em todas as instituições |
| GET | `/usuarios/:cpf/extrato?instituicao=banco%20santander` | Gera extrato de transferências na instituição especificada |

### **/contas**

| Método | Rota                               | Ação                                     |
|--------|------------------------------------|-------------------------------------------|             
| POST | `/:cpf/contas` | Criar nova conta |
| GET | `/contas` | Lista todas as contas |
| GET | `/contas/:id` | Lista conta pelo id da conta |
| DELETE | `/contas/:id` | Deleta conta pelo id da conta |

### **/transacoes**

| Método | Rota                               | Ação                                     |
|--------|------------------------------------|-------------------------------------------|             
| POST | `/usuarios/:cpf/transacoes` | Criar nova transação |
| GET | `/usuarios/:cpf/saldo` | Mostra o saldo acumulado das instituições de cada usuário |
| GET | `/usuarios/:cpf/saldo?instituicao=banco%20santander` | Mostra o  saldo total do usuário naquela insituição |

---

## Contribuição
Sinta-se à vontade para enviar PRs ou abrir issues com sugestões de melhorias. Vamos construir algo massa juntos!

---

## Desenvolvedor
**Lucas Guidotti**
