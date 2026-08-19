# prototype-wedo — Protótipo navegável do produto WeDOTalent

> Estas regras têm **prioridade sobre o comportamento padrão**. Este repositório é a
> bancada de design do produto (plataforma LIA). Quem pede as telas é o **Paulo**
> (CEO/PM) via Claude Code; quem consome é o time de engenharia como referência visual.
> Responda **sempre em pt-BR**.

## O que é este projeto

Protótipo de alta fidelidade em **HTML/CSS/JS puro, sem build step** (mesmo modelo do
`prototype-admin`). Cada tela é um HTML navegável. Substitui o Replit como superfície de
design: precisa abrir instantâneo, nunca travar e funcionar com `open index.html` ou
qualquer servidor estático.

**Fonte de fidelidade visual:** o produto real em `../prototype/plataforma-lia` (branch
`main`, clone do Replit). Antes de criar QUALQUER tela, procurar a tela correspondente lá
(`src/app/[locale]/...` + `src/components/...`) e replicar layout, espaçamentos, textos
(pt-BR de `messages/pt-BR.json`) e comportamento. Só inventar layout quando a tela ainda
não existir no produto, e aí seguir o design system daqui.

## A regra de ouro: toda tela nasce COMPLETA

Quando o Paulo pedir "faz a tela X", entregar sempre:

1. **A tela** em `telas/<area>/<nome-kebab>.html`, copiada de `telas/_template.html`.
2. **TODOS os estados obrigatórios** do padrão da tela registrados em `Proto.states()`
   (matriz completa em `docs/PATTERNS.md`). Tela de tabela sem estado "0 registros" ou
   sem "muitos + paginação" está INCOMPLETA — não entregar assim.
3. **Registro no `screens.js`** (manifesto da galeria) **e no `NAV_MAP`** (label do menu
   → id da tela), para o item do menu real passar a abrir a tela.
4. **Dados realistas** via `Mock.seed(<n fixo>)` — nunca lorem ipsum, nunca `Math.random()`
   solto (a seed fixa mantém screenshots estáveis entre aberturas).
5. **LIA presente** (`Lia.mount({roteiro: [...]})`) em toda tela logada, com um roteiro
   de conversa CONTEXTUAL à tela (o que o recrutador pediria ali), simulando a LIA
   digitando e respondendo em streaming.

## Design System (obrigatório)

Ler `docs/DESIGN-SYSTEM.md` antes de qualquer UI. Resumo do não-negociável: interface
monocromática 90% + acentos WeDo 10% com semântica fixa (**cyan = exclusivo de IA/LIA**,
green = sucesso/candidatos, orange = alerta, purple = insights, magenta = urgência);
botão primário escuro; raios 12/8px; sombras leves; sem gradiente (exceto a bolha da
LIA); ícones lucide 16px stroke-2; `prefers-reduced-motion` respeitado. Fontes completas
em `../prototype/plataforma-lia/docs/02-design-system.md` e `.../CLAUDE.md`.

## Shell: o menu É o do produto

O `scripts/shell.js` replica a sidebar real do produto (`sidebar.tsx`): logo + colapso,
busca ⌘K + sino, Conversar/Conversas, Decidir (Indicadores), Recrutar (Vagas, Funil de
Talentos + bancos), Agentes BETA (Marketplace + agentes), Projetos, Recentes e rodapé
(avatar, config, idioma, ajuda, progresso de setup). **Não inventar itens de menu**: a
estrutura muda só quando o produto mudar. Todo item é navegável: com tela no protótipo
(via `NAV_MAP`) abre a tela; sem tela, abre `telas/_em-construcao.html`.

A **barra flutuante de estados** (proto.js) aparece sozinha ao registrar os estados —
é ela que permite ao avaliador clicar e ver a tela vazia, cheia, com erro etc.
Teclas 1–9 trocam de estado; 0 recolhe a barra; `?estado=<id>` na URL é deep link.

## Estrutura

```
prototype-wedo/
├── CLAUDE.md            ← você está aqui (contrato)
├── index.html           ← galeria de telas (gerada do screens.js)
├── screens.js           ← MANIFESTO ÚNICO de telas (registrar toda tela nova)
├── styles/tokens.css    ← design tokens WeDO — única fonte de cor
├── styles/base.css      ← componentes canônicos (tabela, botões, badges, modal...)
├── scripts/proto.js     ← motor de estados + barra flutuante
├── scripts/shell.js     ← sidebar + topbar do produto (telas logadas)
├── scripts/mock.js      ← dados fake determinísticos pt-BR
├── assets/logos/        ← logos oficiais
├── docs/PATTERNS.md     ← matriz de estados obrigatórios por tipo de tela
└── telas/<area>/*.html  ← uma tela por arquivo
    └── _template.html   ← esqueleto para copiar
```

## Regras de construção (não negociáveis)

- **Cores:** NENHUM hex fora de `styles/tokens.css` — sempre `var(--token)`. (Mesma
  regra do lint:colors do admin-ui; aqui vale por disciplina.) Exceção única: cores de
  marca de terceiros (logo Microsoft, LinkedIn) inline na própria tela.
- **Componentes:** usar os do `base.css`. Se faltar componente, criar NO `base.css`
  (nome genérico, documentar em `docs/PATTERNS.md`) — nunca CSS duplicado por tela.
  CSS local só para layout específico daquela tela.
- **Shell:** toda tela logada começa com `<div id="shell" data-nav="<label do menu>">`
  e conteúdo em `<div id="tela">` (com `.page-head` próprio — o produto não tem topbar
  global). Telas pré-auth (login, boas-vindas, triagem pública do candidato) NÃO usam
  shell — layout próprio, marcar `shell: "none"` no screens.js (exemplos:
  `telas/acesso/login.html`, `telas/acesso/boas-vindas.html`).
- **Sem dependências externas** de JS/CSS (CDN de framework proibido). Exceção: Google
  Fonts (Inter / Source Serif 4 / Open Sans) via `<link>`, com fallback de sistema.
- **Ícones:** SVG inline no padrão lucide (stroke currentColor, stroke-width 2, 16px).
  Copiar os paths de telas existentes antes de desenhar novos.
- **Copy sempre pt-BR**, realista, tom do produto. Textos de telas que existem no
  produto vêm de `../prototype/plataforma-lia/messages/pt-BR.json`.
- **Status da tela** no screens.js: `rascunho` → `em-revisao` → `aprovado` (badge
  aparece na topbar e na galeria). Tela nova nasce `rascunho`; quem promove é o Paulo.
- **Acessibilidade mínima:** aria-label na barra e em botões só-ícone, `alt` em
  imagens, foco visível (o base.css já cuida).

## Tela exemplar (copiar o jeito, não só o template)

- **Tabela:** `telas/vagas/lista-de-vagas.html` (KPIs, busca, filtros, paginação, 6 estados).
- **Chat:** `telas/conversar/conversar.html` (empty state com rail de workflow de 9 nós e
  22 cards fiéis ao `chat-workflow-reels.tsx`, conversa com streaming, card RRP, erro).
- **Pré-auth:** `telas/acesso/login.html` e `telas/acesso/boas-vindas.html`.

Ao criar tela de um padrão novo (kanban, formulário...), o primeiro exemplar daquele
padrão vira a nova referência — caprichar.

## Gotchas aprendidos (não repetir)

- `[hidden]` já é neutralizado globalmente no base.css (`display:none !important`) —
  classe com `display:flex` NÃO pode vencer o atributo (bug que já aconteceu 2x).
- SVG inline: cor via `stroke` com `var(--token)` funciona, mas confira se o token
  EXISTE no tokens.css (token inexistente rende preto silenciosamente).
- Rail/reels: nós têm cor por etapa via `color-mix(in srgb, <accent> 10%, transparent)`
  (mesma técnica do produto).

## Checklist antes de entregar qualquer tela (rodar SEMPRE)

- [ ] Comparou com a tela real do `../prototype/plataforma-lia`? (quando existir)
- [ ] Todos os estados obrigatórios do padrão registrados e CLICÁVEIS na barra?
- [ ] Cada estado renderiza sem erro no console? (testar com Chrome headless ou abrir)
- [ ] Zero hex fora do tokens.css? (`grep -nE '#[0-9A-Fa-f]{3,6}' telas/<arquivo>`)
- [ ] Registrada no `screens.js` com descrição e status `rascunho`?
- [ ] Dados via `Mock.seed()` com seed fixa? Nada de lorem ipsum?
- [ ] Abre direto via `file://` e via servidor estático (caminhos relativos `../../`)?

## Fluxo de trabalho

- Servidor local: `python3 -m http.server 8090` na raiz → `http://localhost:8090`.
- Não fazer commit/push sem o Paulo ou o Rodrigo aprovarem a tela visualmente.
- Deploy futuro: GitHub Pages (push na `main`), igual ao prototype-admin.
- O protótipo é **fonte de DESIGN**, não de comportamento de negócio: regra de negócio
  divergente entre protótipo e business-docs se resolve nos business-docs (não aqui).
