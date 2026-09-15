# Padrões de tela e estados obrigatórios

> Matriz que o Claude Code consulta ao criar tela. A tela só está pronta quando TODOS os
> estados obrigatórios do seu padrão estão registrados em `Proto.states()` e clicáveis
> na barra flutuante. Estados extras específicos da tela são bem-vindos.

## 1. Tabela / listagem (ex.: Vagas, Candidatos, Usuários)

| id | label | O que mostrar |
|---|---|---|
| `padrao` | Padrão | 6–12 registros, sem paginação |
| `vazio` | 0 registros | Empty state com ícone, explicação e CTA(s) de criação |
| `muitos` | Muitos + paginação | 50+ registros, paginação funcionando (clicável) |
| `sem-resultado` | Busca sem resultado | Termo aplicado no campo de busca + empty de busca com "limpar filtros" |
| `carregando` | Carregando | Skeleton (classe `.skeleton`), nunca spinner sozinho |
| `erro` | Erro | `.error-banner` com ação "Tentar de novo" |

Golden example: `telas/vagas/lista-de-vagas.html`.

## 2. Formulário / modal de criação-edição

| id | label |
|---|---|
| `padrao` | Formulário vazio (criação) |
| `preenchido` | Edição com dados existentes |
| `erros` | Validação: 2+ campos com `.error` e `.error-msg` |
| `salvando` | Botão em loading, campos desabilitados |
| `sucesso` | Feedback pós-salvar (toast/banner ou redirect simulado) |

## 3. Página de detalhe (ex.: detalhe da vaga, perfil do candidato)

| id | label |
|---|---|
| `padrao` | Registro completo |
| `parcial` | Registro com campos vazios/nunca preenchidos (mostrar "–", não esconder seção) |
| `carregando` | Skeleton da página |
| `nao-encontrado` | 404 do registro (empty state + voltar) |

## 4. Kanban / funil

| id | label |
|---|---|
| `padrao` | Colunas com poucos cards |
| `vazio` | Nenhum candidato no funil |
| `coluna-cheia` | Uma coluna com 20+ cards (scroll interno) |
| `arrastando` | Card em estado de drag (visual) |
| `carregando` / `erro` | Como no padrão tabela |

## 5. Dashboard / visão executiva

| id | label |
|---|---|
| `padrao` | KPIs + gráficos com dados |
| `vazio` | Conta nova, sem dados (onboarding hint) |
| `carregando` | Skeleton dos cards |

## 6. Chat / LIA

| id | label |
|---|---|
| `vazio` | Primeiro uso: saudação + rail de workflow com cards de sugestão |
| `conversa` | Conversa com mensagens (usuário bolha escura, LIA texto com avatar) |
| `digitando` | LIA processando (indicador de 3 pontos) |
| `com-card` | Resposta da LIA com card de ação estruturado (RRP block) |
| `erro` | Falha de envio com retry |

Golden example: `telas/conversar/conversar.html`.

## 7. Autenticação / pré-auth (sem shell)

| id | label |
|---|---|
| `padrao` | Estado inicial |
| demais etapas do fluxo | Uma por estado (ex.: `senha`) |
| `*-invalido` / `*-incorreta` | Cada erro possível |
| `entrando` | Submit em progresso |
| `carregando` | Bootstrap/redirect |

Golden example: `telas/acesso/login.html`.

---

## Componentes canônicos disponíveis (base.css)

`.btn` (`-primary -secondary -ghost -danger -ai -sm`) · `.input` `.select` `.field`
`.search` · `.card` `.kpi(s)` · `.table-wrap` `.tbl` `.tbl-footer` · `.pagination`
`.page-btn` · `.badge-*` `.avatar` `.cell-person` `.chip` · `.tabs` `.tab` ·
`.empty-state` · `.error-banner` · `.skeleton` · `.modal-overlay` `.modal` ·
`.page-actions`.

Faltou componente? Adicionar no `base.css` com nome genérico e registrar aqui.

---

## 8. Busca de candidatos (sourcing)

Padrão usado por `telas/funil/busca-nova.html`, `telas/funil/sourcing-resultados.html`
e `telas/vagas/vaga-busca-modal.html`. A busca existe em dois contextos e eles
compartilham os mesmos componentes: a partir do **Funil de Talentos** (tela cheia) e
a partir de **dentro da vaga** (modal + painel de tela cheia).

### Estados do prompt de busca

| id | label |
|---|---|
| `natural` | Estado inicial: prompt em branco, tags de critério ainda não reconhecidas |
| `historico` | Aba Histórico: buscas anteriores, cada uma abrindo a tela de resultados |
| `digitado` / `jd` / `similar` / `arquetipos` / `boolean` | Um por modo de busca do produto |
| `buscando` | Progresso, com o aviso de créditos reservados |
| `erro` | Falha da fonte global, deixando claro que não houve consumo |

> **Navegação:** o item "Funil de Talentos" do menu abre a **busca**, nunca a lista de
> candidatos, igual ao produto. Os caminhos até a tela com candidatos são o atalho de
> resultados (ícone de tabela na linha dos modos), a aba Histórico e os itens de busca
> em "Recentes" na sidebar. Abas ainda sem tela desenhada apontam para
> `telas/_em-construcao.html`, para nenhum clique morrer.

### Estados dos resultados

| id | label |
|---|---|
| `padrao` | Resultados com a taxonomia no cabeçalho |
| `selecao` | Com candidatos marcados (barra de ações em lote visível) |
| `salvos` | Depois de salvar na vaga: selo "Na vaga" e seleção zerada |
| `ja-vistos` | Aviso de perfis omitidos por já terem sido vistos na vaga |
| `muitos`, `vazio`, `carregando`, `erro` | Como no padrão de tabela |

### Componentes (todos no `base.css`, nunca duplicar por tela)

- `.pill-tabs` / `.pill-tab`: abas em pílula do Funil de Talentos.
- `.query-bar` + `.chip-tax`: barra da busca ativa com a taxonomia. O chip preto de
  origem (Descrição da vaga, Linguagem natural, Boolean...) abre o texto que gerou a
  busca: não existe botão separado para isso, para a barra não repetir o mesmo caminho. A cor do chip
  identifica o critério: cargo neutro, localização roxo, experiência laranja,
  setor ciano, habilidades verde. É a única exceção à regra "ciano só para IA":
  esses chips são exatamente o que a LIA extraiu do texto.
- `.search-card`: caixa de busca (réplica do SmartSearchInput), montada por
  `Busca.caixa()` em `scripts/busca.js`.
- `.eq-modal` (via `Busca.modalEditarHTML()`): modal **Editar sua busca**, réplica do
  `EditQueryModal` do produto (max-w 896, backdrop escuro com blur, cabeçalho com lupa,
  o SmartSearchInput inteiro no corpo e o rodapé Cancelar / Salvar e Buscar). Dentro dele
  cabem a sugestão da LIA (`.lia-sug`) e o painel de qualidade da busca (`.qual`).
  A edição da busca acontece **sempre** nesse modal: nada de painel lateral.
- `.af-modal` (via `Busca.abrirFiltros()`): modal **Filtros Avançados**, réplica do
  `advanced-filters-modal` (navegação lateral com as nove seções, cards de origem da
  busca, chaves de opções, barra de filtros ativos e o rodapé com Limpar filtros,
  contador, Cancelar e Aplicar Filtros). É ele que abre em todo lugar que diz
  "Filtros": na linha de controles da tabela, na caixa de busca e dentro do modal de
  edição.
- `.sel-bar` (via `Busca.selBarHTML()`): barra de ações em lote, logo **abaixo da barra
  da busca**, como no `BulkActionsBar` do produto. Com dez ações possíveis ela satura,
  então o padrão é: uma ação principal com variação em **split button** (salvar na vaga
  e continuar / salvar e voltar), as três mais usadas visíveis (Lista, Mensagem, Triagem
  WSI) e o resto em **Mais ações** (Favoritos, Ocultar, Salvar na Base, Baixar para o
  banco). O contador e o aviso de seleção parcial ficam dentro dessa barra, junto da
  ação, e não na barra da busca.
- `.modal` / `.fs-panel`: diálogo e painel de tela cheia da busca dentro da vaga.
- `.kanban` + `.bg-task`: funil da vaga e a faixa de processamento em segundo plano
  (o quadro é renderizado uma vez e os cards chegam destacados com `.kb-card.novo`).

### Script compartilhado

`scripts/busca.js` expõe `Busca.ic` (ícones), `Busca.caixa()`, `Busca.linhas()`,
`Busca.gerar()`, `Busca.CRITERIOS` e `Busca.TEXTO_JD`. Toda tela nova de busca deve
consumir daí em vez de recriar ícones, dados ou a caixa de busca.
