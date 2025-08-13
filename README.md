# Banco API Tests (REST)

Automação de testes para a API **REST** do projeto [Banco API](https://github.com/juliodelimas/banco-api).  
Esta suíte valida endpoints como **/login**, **/contas** e **/transferencias**, cobrindo respostas, _status codes_, regras de negócio e geração de relatórios em HTML.

> Repositório da suíte de testes: `https://github.com/NatanManoel/banco-api-tests`  
> API sob teste (REST): `http://localhost:3000` (padrão do projeto Banco API)

---

## 📌 Objetivo

Garantir a qualidade da API REST do Banco API com testes automatizados que:
- Validam contratos e regras de negócio fundamentais (ex.: valores mínimos de transferência, autenticação JWT, contas ativas e saldo suficiente).
- Facilitam a execução local e em CI.
- Produzem **relatórios Mochawesome** em HTML para análise rápida dos resultados.

---

## 🧰 Stack utilizada

- **Node.js** (JavaScript)
- **[Mocha](https://mochajs.org/)** — _test runner_
- **[Chai](https://www.chaijs.com/)** — asserções (`expect`/`should`/`assert`)
- **[Supertest](https://github.com/visionmedia/supertest)** — cliente HTTP para testar APIs
- **[dotenv](https://github.com/motdotla/dotenv)** — variáveis de ambiente
- **[Mochawesome](https://github.com/adamgruber/mochawesome)** — relatório HTML

> Todas as dependências estão listadas no `package.json` do projeto.

---

## 📦 Pré-requisitos

1. **Node.js** LTS (>= 18) e **npm** instalados.  
2. **API sob teste em execução.** Siga o README da API do Júlio de Lima. Por padrão:
   - REST sobe em **`http://localhost:3000`** (Swagger em `http://localhost:3000/api-docs`).
3. (Opcional) Banco de dados e dados de exemplo configurados conforme o projeto da API.

---

## 🗂️ Estrutura de diretórios

```
banco-api-tests/
├── fixtures/              # Dados estáticos e payloads de apoio aos testes
├── helpers/               # Funções utilitárias (ex.: autenticação, geração de tokens)
├── test/                  # Suítes de teste por recurso/endpoint
├── .gitignore
├── package.json
└── package-lock.json
```
> O relatório HTML do Mochawesome é gerado automaticamente no diretório `mochawesome-report/` após a execução dos testes.

---

## ⚙️ Configuração do `.env`

Crie um arquivo **`.env`** na raiz do repositório com o seguinte conteúdo:

```ini
# URL base da API REST sob teste
BASE_URL=http://localhost:3000
```

- A variável `BASE_URL` é **obrigatória** e aponta para a instância da API sob teste.  
- Caso a sua API esteja em outra porta/host, ajuste o valor.

---

## ▶️ Como executar

### 1) Instalar dependências
```bash
npm install
```

### 2) Rodar **todos** os testes (com relatório HTML)
Se existir o script `test` no `package.json`:
```bash
npm test
```
Ou diretamente com o Mocha (útil em CI ou ambientes sem scripts):
```bash
npx mocha --recursive "test/**/*.js" --reporter mochawesome
```

### 3) Rodar uma suíte/arquivo específico
```bash
npx mocha test/transferencias/*.js --reporter mochawesome
# ou
npx mocha test/login.test.js --reporter mochawesome
```

### 4) Filtrar por um caso/descrição específico (grep)
```bash
npx mocha --grep "transferência com sucesso" --reporter mochawesome
```

---

## 📊 Relatórios (Mochawesome)

Após a execução, o **Mochawesome** gera um relatório navegável em:
```
mochawesome-report/mochawesome.html
```
Basta abrir este arquivo no navegador para visualizar **estatísticas**, **suites**, **assertivas** e **logs**.

> Dica: em pipelines CI, publique o HTML como artefato para download.

---

## 🧪 Escopo dos testes (exemplos comuns)

- **Autenticação (`POST /login`)**  
  - Credenciais válidas geram **JWT** com expiração.  
  - Credenciais inválidas retornam erro apropriadamente.
- **Contas (`GET /contas` e `GET /contas/:id`)**  
  - Listagem paginada.  
  - Consulta por ID retorna dados corretos.
- **Transferências (`POST /transferencias`)**  
  - Valor mínimo **R$ 10,00**.  
  - Saldo suficiente na conta de origem.  
  - Contas **ativas**.  
  - Transferências **> R$ 5.000,00** podem exigir um **token adicional** (ex.: `"123456"`), conforme regras da API.

> Os detalhes exatos das regras vêm da API sob teste e podem ser atualizados lá. Ajuste este projeto sempre que a API evoluir.

---

## 🧩 Convenções e dicas

- **Nomeação de testes:** arquivos dentro de `test/` podem usar sufixos `.test.js` ou `.spec.js`.  
- **Helpers:** funções de autenticação ou _setup_ comum ficam em `helpers/`.  
- **Fixtures:** mantenha _payloads_ e massas de teste em `fixtures/` para reuso e clareza.  
- **Timeouts do Mocha:** ajuste com `--timeout 10000` se a API estiver mais lenta que o padrão (2s).  
- **Idempotência:** quando possível, crie e limpe dados no início/fim dos testes para evitar dependências entre casos.

---

## 🧱 Scripts úteis (sugestão)

Se desejar, adicione estes scripts no seu `package.json`:

```json
{
  "scripts": {
    "test": "mocha --recursive \"test/**/*.js\" --reporter mochawesome",
    "test:watch": "mocha --watch --recursive \"test/**/*.js\"",
    "report:open": "node -e \"require('child_process').exec(process.platform==='win32'?'start \\\"\\\\\\?\\mochawesome-report\\mochawesome.html\\\\\\?\\\"':'xdg-open \\\"mochawesome-report/mochawesome.html\\\"')\""
  }
}
```

> Os nomes e _globs_ podem ser adaptados à sua organização de pastas/arquivos.

---

## ❗ Troubleshooting

- **`ECONNREFUSED` / testes não conseguem conectar à API**  
  Verifique se a API está rodando e se `BASE_URL` aponta para o host/porta corretos.
- **Erros intermitentes de tempo**  
  Aumente o timeout do Mocha: `npx mocha --timeout 10000 ...`
- **Relatório não foi gerado**  
  Confirme o uso do `--reporter mochawesome` ou do script `npm test` que já configura o reporter.

---

## 📚 Documentação das dependências

- Node.js — https://nodejs.org/
- Mocha — https://mochajs.org/
- Chai — https://www.chaijs.com/
- Supertest — https://github.com/visionmedia/supertest
- dotenv — https://github.com/motdotla/dotenv
- Mochawesome — https://github.com/adamgruber/mochawesome

---

## 🔗 API sob teste

- Repositório da API: https://github.com/juliodelimas/banco-api
- REST (padrão): `http://localhost:3000` — Swagger em `http://localhost:3000/api-docs`

---

## 🤝 Contribuindo

1. Abra uma _issue_ descrevendo a melhoria/bug.  
2. Crie um _branch_ a partir de `main`.  
3. Envie um _pull request_ com descrição clara do que foi alterado.

---

## 📄 Licença

Este repositório de testes segue a mesma licença do repositório principal, salvo indicação diferente no `LICENSE`. Verifique o arquivo de licença do projeto.
