# 📦 Backend - Sistema de Matrículas (NestJS)

Este é o backend da aplicação de matrículas, construído com **NestJS**, **Prisma**, **SQLite** e **PNPM**. Ele expõe uma API REST para gerenciar Alunos, Turmas e Matrículas.

---

## 🚀 Tecnologias Utilizadas

### ✅ [NestJS](https://nestjs.com/)

> Framework Node.js para construção de aplicações escaláveis e estruturadas em TypeScript.

- Modular e com injeção de dependência
- Ótimo para APIs REST
- Arquitetura bem definida

### ✅ [Prisma ORM](https://www.prisma.io/)

> ORM moderno e typesafe para acesso a banco de dados.

- Geração automática de tipos TypeScript
- Migrations eficientes
- Integração perfeita com SQLite e outros bancos

### ✅ [SQLite](https://www.sqlite.org/index.html)

> Banco de dados leve e baseado em arquivos.

- Ideal para projetos pequenos/independentes
- Sem necessidade de servidor de banco externo
- Fácil de resetar no desenvolvimento

### ✅ [PNPM](https://pnpm.io/)

> Gerenciador de pacotes rápido e eficiente.

- Substituto mais performático ao NPM/Yarn
- Usa cache global e links simbólicos

---

## ⚙️ Como rodar o projeto

### 🔧 Pré-requisitos

- Node.js `>=18`
- PNPM instalado globalmente
- Docker e Docker Compose (opcional)

---

### 🧪 Rodando localmente (sem Docker)

```bash
# 1. Instale as dependências
pnpm install

# 2. Gere o banco de dados com Prisma
pnpm prisma migrate dev

# 3. Rode a API
pnpm start:dev
```
