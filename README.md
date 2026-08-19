# prototype-wedo — Protótipo navegável do produto WeDOTalent

Protótipo de alta fidelidade da plataforma LIA em **HTML/CSS/JS puro, sem build**.
Substitui o Replit como bancada de design: abre instantâneo em qualquer browser e serve
de referência visual para a engenharia.

## Rodando

```bash
# direto (funciona via file://)
open index.html

# ou com servidor local
python3 -m http.server 8090
# → http://localhost:8090
```

## Como usar

- **`index.html`** — galeria de todas as telas, agrupadas por área, com status
  (Rascunho / Em revisão / Aprovado).
- Em cada tela, a **barra flutuante** embaixo alterna os estados (0 registros, muitos +
  paginação, carregando, erro...). Teclas **1–9** trocam de estado, **0** recolhe a
  barra. A URL com `?estado=<id>` é compartilhável para apontar um estado específico
  numa revisão.

## Criando telas (via Claude Code)

O harness completo está no `CLAUDE.md` (contrato) e `docs/PATTERNS.md` (matriz de
estados obrigatórios por tipo de tela). Em resumo: peça a tela, e o Claude entrega o
HTML em `telas/<area>/`, com todos os estados registrados, dados realistas via
`scripts/mock.js` e registro no `screens.js`.

Referências dentro do projeto:

- `telas/_template.html` — esqueleto de tela nova
- `telas/vagas/lista-de-vagas.html` — golden example de tabela
- `telas/acesso/login.html` — golden example pré-auth (pixel-faithful do produto)

## Deploy

Futuro: GitHub Pages a partir da `main` (mesmo modelo do `prototype-admin`).
