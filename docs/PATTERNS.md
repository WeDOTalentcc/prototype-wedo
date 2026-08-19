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
| `padrao` | Conversa com algumas mensagens |
| `vazio` | Primeiro uso (sugestões de prompt) |
| `digitando` | LIA processando (indicador) |
| `com-card` | Resposta da LIA com card de ação estruturado |
| `erro` | Falha de envio com retry |

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
