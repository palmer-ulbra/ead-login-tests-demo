# login-demo — o sistema e os testes

Documento para orientar a geração de uma imagem (infográfico/diagrama) que explique
o sistema e as camadas de teste. Todo texto que aparecer na imagem deve estar em
português do Brasil.

## O sistema

Uma aplicação web pequena de **login**, usada em aula para mostrar as três camadas de teste.

- **Tela de login** (`/`): campos E-mail e Senha, botão "Entrar" e link "Criar conta".
- **Área logada** (`/secure`): mostra "Bem-vindo, Palmer!" e um botão "Sair", que volta para o login.
- **Tela de cadastro** (`/cadastro`): só o título "Criar conta", sem funcionalidade.
- **Visual:** estilo *glassmorphism*: card translúcido e desfocado sobre um fundo escuro
  com manchas de luz rosa, roxa e ciano.

### Como funciona por dentro

```
Navegador  ──POST /api/login {email, senha}──▶  Servidor Express  ──SELECT──▶  SQLite (tabela users)
           ◀── 200 {nome} | 400 | 401 ────────                     ◀─ nome, senha_hash ─
```

1. O navegador envia e-mail e senha para `POST /api/login`.
2. O servidor valida o formato (e-mail válido, senha preenchida) → se falhar, **400**.
3. Busca o usuário no SQLite e compara a senha com o hash (scrypt) → se não bater, **401**
   "E-mail ou senha incorretos".
4. Se der certo, responde **200** com o nome. O navegador guarda o nome e vai para `/secure`.

Stack: Node 24 + TypeScript, Express, SQLite nativo do Node, HTML/CSS puro.
Usuário de exemplo: `palmer.oliveira@ulbra.br` / `senha123`.

## O que estamos testando

O fluxo de **autenticação**: entrar com a senha certa, ser recusado com a senha errada,
validar o formulário e navegar entre as telas (login → área logada → sair; login → cadastro).

## As três camadas de teste

Pense numa **pirâmide**: a base tem muitos testes, rápidos e baratos; o topo tem poucos,
lentos e realistas. Quanto mais alto, mais do sistema cada teste exercita.

| Camada | Ferramenta | O que exercita | Exemplos de casos | Velocidade |
| --- | --- | --- | --- | --- |
| **Unitário** (base) | Vitest | Funções puras isoladas: validação do formulário e hash de senha. Sem servidor, sem banco | aceita e-mail e senha preenchidos · rejeita e-mail sem @ · rejeita senha vazia · confere a senha certa e recusa a errada | milissegundos |
| **Integração** (meio) | Vitest + Supertest | A rota HTTP `POST /api/login` de verdade + banco SQLite **em memória**. Sem navegador | credenciais certas → 200 e o nome · senha errada → 401 · e-mail desconhecido → 401 · e-mail inválido → 400 | milissegundos a décimos |
| **E2E / ponta a ponta** (topo) | Playwright | O sistema inteiro: navegador real (Chromium) clicando na tela, servidor rodando, banco em arquivo | entra com senha certa, vê "Bem-vindo, Palmer!" e sai · senha errada mostra erro · abrir `/secure` sem login volta para o login · "Criar conta" abre o cadastro | segundos |

Hoje são 4 testes em cada camada (12 no total), todos passando.

### O que cada camada "enxerga"

```
              ┌──────────── E2E (Playwright) ────────────┐
              │ Navegador → HTML/CSS/JS → Servidor → Banco │
              └───────────────────────────────────────────┘
                    ┌──── Integração (Supertest) ────┐
                    │ Requisição HTTP → Rota → Banco  │
                    └─────────────────────────────────┘
                          ┌── Unitário (Vitest) ──┐
                          │  validarLogin()        │
                          │  hashSenha()           │
                          │  verificarSenha()      │
                          └────────────────────────┘
```

## Sugestão para a imagem

- **Formato:** infográfico horizontal (16:9), para slide de aula.
- **Esquerda:** mockup da tela de login no estilo glass (card translúcido, campos E-mail e
  Senha, botão "Entrar" em gradiente roxo→rosa, link "Criar conta"), com uma seta para a
  tela "Bem-vindo, Palmer!" + botão "Sair".
- **Centro:** o fluxo Navegador → Servidor Express → SQLite, com setas e os códigos 200 / 400 / 401.
- **Direita:** a pirâmide de testes em três andares: **Unitário** na base (larga, verde,
  "muitos · rápidos"), **Integração** no meio (azul), **E2E** no topo (estreito, roxo,
  "poucos · lentos · realistas"). Cada andar com o nome da ferramenta (Vitest, Supertest,
  Playwright) e um ícone simples (engrenagem, plugue/API, navegador).
- **Ligação:** linhas ou faixas coloridas mostrando que cada andar da pirâmide cobre um
  pedaço do fluxo do centro (unitário → só as funções; integração → servidor + banco;
  E2E → tudo).
- **Paleta:** fundo azul-marinho escuro (#0f172a) com manchas rosa (#ff6ec4), roxa (#7873f5)
  e ciano (#22d3ee); textos brancos; visual limpo e moderno.
- **Evitar:** excesso de texto, código, logotipos de marcas.
