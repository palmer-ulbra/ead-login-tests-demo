# 🔐 login-demo

Tela de login com as três camadas de teste: unitário, integração e E2E.
Node 24+ (roda TypeScript e SQLite nativos, sem build).

```bash
npm install
npx playwright install chromium

npm run dev              # http://localhost:3000, reinicia ao salvar
npm run test:unit        # Vitest: funções puras (src/auth.ts)
npm run test:integracao  # Vitest + Supertest: rota + SQLite em memória
npm run test:e2e         # Playwright: navegador de verdade
```

Usuário semeado: `palmer.oliveira@ulbra.br` / `senha123`.

| Arquivo | O que é |
| --- | --- |
| `src/auth.ts` | validação do formulário e hash de senha (scrypt) |
| `src/db.ts` | cria a tabela `users` e semeia o usuário |
| `src/app.ts` | `POST /api/login` + serve `public/` |
| `public/index.html` | tela de login; ao entrar, guarda o nome no `sessionStorage` e vai para `/secure` |
| `public/secure.html` | área logada: boas-vindas + Sair (volta para o login) |
| `public/cadastro.html` | tela de cadastro (só o título, sem funcionalidade) |
| `public/estilo.css` | visual compartilhado pelas telas |
| `tests/unit/` | testes unitários |
| `tests/integracao/` | testes de integração |
| `e2e/` | testes E2E |
