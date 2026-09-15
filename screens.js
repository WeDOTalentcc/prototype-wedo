/* =============================================================
   Manifesto de telas — FONTE ÚNICA de navegação
   Toda tela nova DEVE ser registrada aqui (o index e a sidebar
   são gerados a partir desta lista). Ordem = ordem no menu.

   status: "rascunho" | "em-revisao" | "aprovado"
   ============================================================= */
window.SCREENS = [
  {
    area: "Conversar",
    items: [
      {
        id: "conversar",
        titulo: "Conversar (chat da LIA)",
        arquivo: "telas/conversar/conversar.html",
        status: "em-revisao",
        descricao: "Chat da LIA em página cheia: rail de workflow com 22 cards por etapa, conversa com streaming, card de ação e erro de envio.",
      },
    ],
  },
  {
    area: "Acesso",
    items: [
      {
        id: "login",
        titulo: "Login",
        arquivo: "telas/acesso/login.html",
        status: "em-revisao",
        shell: "none",
        descricao: "Réplica pixel-faithful do login do produto: hero com nuvens animadas, fluxo em 2 etapas (email → senha), erros, SSO Microsoft.",
      },
      {
        id: "boas-vindas",
        titulo: "Boas-vindas (pós-login)",
        arquivo: "telas/acesso/boas-vindas.html",
        status: "em-revisao",
        shell: "none",
        descricao: "Sequência animada de boas-vindas: cérebro, typewriter, Como Funciona em 5 passos, logo e CTA. Estados pulam para cada momento.",
      },
    ],
  },
  {
    area: "Vagas",
    items: [
      {
        id: "vagas-lista",
        titulo: "Lista de Vagas",
        arquivo: "telas/vagas/lista-de-vagas.html",
        status: "em-revisao",
        descricao: "Tabela de vagas com busca, filtros, paginação e todos os estados. Tela exemplar (golden example) do harness.",
      },
    ],
  },
  {
    area: "Funil de Talentos",
    items: [
      {
        id: "busca-nova",
        titulo: "Nova busca de candidatos",
        arquivo: "telas/funil/busca-nova.html",
        status: "rascunho",
        descricao: "Caixa de busca do funil (SmartSearchInput): modos linguagem natural, similar, descrição da vaga, boolean e arquétipos, tags de critérios, fonte e aviso de crédito. Traz a prévia da taxonomia que a LIA extraiu antes de disparar a busca.",
      },
      {
        id: "sourcing-resultados",
        titulo: "Sourcing: resultados da busca",
        arquivo: "telas/funil/sourcing-resultados.html",
        status: "rascunho",
        descricao: "Resultados da busca com a proposta de taxonomia no cabeçalho, painel único de edição da busca, salvar na vaga sem sair da busca e continuação da mesma busca sem repetir quem já foi visto.",
      },
    ],
  },
  {
    area: "Vaga",
    items: [
      {
        id: "vaga-busca-modal",
        titulo: "Buscar candidatos dentro da vaga",
        arquivo: "telas/vagas/vaga-busca-modal.html",
        status: "rascunho",
        descricao: "Fluxo modal da busca aberta de dentro da vaga: diálogo com contexto da vaga e os dois modos (buscar e selecionar / adicionar automaticamente), painel de tela cheia com progresso e resultados, e o salvamento com os dois caminhos.",
      },
      {
        id: "vaga-kanban",
        titulo: "Funil da vaga (kanban)",
        arquivo: "telas/vagas/vaga-kanban.html",
        status: "rascunho",
        descricao: "Kanban do funil da vaga. Mostra a proposta de importação em segundo plano: o quadro é renderizado uma única vez e os candidatos salvos na busca chegam destacados, sem recarregar a cada processamento.",
      },
    ],
  },
  /* Adicione novas áreas/telas acima deste comentário, seguindo o shape:
  (e mapeie o label do menu em NAV_MAP abaixo para o link do menu apontar pra tela)
  {
    area: "Funil de Talentos",
    items: [
      { id: "funil-kanban", titulo: "Kanban do Funil", arquivo: "telas/funil/kanban.html",
        status: "rascunho", descricao: "..." },
    ],
  },
  */
];

/* =============================================================
   NAV_MAP — label do menu do produto → id da tela no protótipo.
   Item de menu SEM entrada aqui navega para telas/_em-construcao.html
   (todos os links ficam sempre navegáveis). Ao criar a tela de um
   item do menu, adicionar a linha aqui.
   ============================================================= */
window.NAV_MAP = {
  "Conversar": "conversar",
  "Vagas": "vagas-lista",
  "Funil de Talentos": "sourcing-resultados",
};
