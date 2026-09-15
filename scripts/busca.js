/* =============================================================
   Busca — peças compartilhadas pelas telas de busca de candidatos
   (Funil de Talentos e busca aberta de dentro da vaga).

   Exporta:
     Busca.ic            ícones lucide inline usados nas telas de busca
     Busca.TEXTO_JD      descrição de vaga usada como exemplo (seed fixa)
     Busca.CRITERIOS     taxonomia extraída pela LIA a partir do texto
     Busca.MODOS         modos de busca do produto (natural, similar, jd...)
     Busca.gerar(n, off) candidatos determinísticos para as tabelas
     Busca.caixa(opts)   HTML da caixa de busca (SmartSearchInput)
     Busca.linhas(lista) HTML das linhas da tabela de candidatos
   ============================================================= */
(function () {
  "use strict";

  const I = (p, s) => `<svg width="${s || 16}" height="${s || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

  const ic = {
    back: (s) => I('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>', s),
    search: (s) => I('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', s),
    brief: (s) => I('<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>', s),
    pin: (s) => I('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', s),
    clock: (s) => I('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', s),
    build: (s) => I('<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M2 22h20"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>', s),
    code: (s) => I('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>', s),
    doc: (s) => I('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/>', s),
    sliders: (s) => I('<line x1="4" x2="20" y1="7" y2="7"/><line x1="4" x2="20" y1="13" y2="13"/><line x1="4" x2="20" y1="19" y2="19"/><circle cx="9" cy="7" r="2.4" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="2.4" fill="currentColor" stroke="none"/><circle cx="8" cy="19" r="2.4" fill="currentColor" stroke="none"/>', s),
    chevD: (s) => I('<path d="m6 9 6 6 6-6"/>', s),
    x: (s) => I('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', s),
    check: (s) => I('<polyline points="20 6 9 17 4 12"/>', s),
    plus: (s) => I('<path d="M5 12h14"/><path d="M12 5v14"/>', s),
    globe: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', s),
    db: (s) => I('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>', s),
    book: (s) => I('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z"/>', s),
    arrow: (s) => I('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', s),
    coin: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M9.5 9.5h5"/><path d="M9.5 14.5h5"/>', s),
    eye: (s) => I('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>', s),
    alert: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>', s),
    brain: (s) => I('<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>', s),
    users: (s) => I('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', s),
    binary: (s) => I('<rect x="14" y="14" width="6" height="6" rx="1"/><rect x="4" y="4" width="6" height="6" rx="1"/><path d="M4 20h2v-6H4"/><path d="M14 10h2V4h-2"/>', s),
    target: (s) => I('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', s),
    mouse: (s) => I('<path d="M12.6 12.6 19 21l-2.2 1.5L12.6 15l-3 3V3l9 9Z"/>', s),
    spark: (s) => I('<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/>', s),
    mail: (s) => I('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/>', s),
    phone: (s) => I('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>', s),
    lista: (s) => I('<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>', s),
    prancheta: (s) => I('<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>', s),
    estrela: (s) => I('<path d="M11.5 3.2a.6.6 0 0 1 1 0l2.2 4.5 5 .7a.6.6 0 0 1 .3 1l-3.6 3.5.9 5a.6.6 0 0 1-.9.6L12 16.1l-4.4 2.4a.6.6 0 0 1-.9-.6l.9-5-3.6-3.5a.6.6 0 0 1 .3-1l5-.7Z"/>', s),
    olhoCortado: (s) => I('<path d="M10.7 5.1A9.9 9.9 0 0 1 12 5c6.4 0 10 7 10 7a15 15 0 0 1-2.2 3.1"/><path d="M6.6 6.6A15.3 15.3 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="m2 2 20 20"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>', s),
    nuvem: (s) => I('<path d="M12 13v8l-4-4"/><path d="m12 21 4-4"/><path d="M4.4 15.5A5 5 0 0 1 7 6a7 7 0 0 1 13.3 2.2A4.5 4.5 0 0 1 19.5 17"/>', s),
    mais: (s) => I('<circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="12" r="1.6"/>', s),
    alerta: (s) => I('<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', s),
    varinha: (s) => I('<path d="m15 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/><path d="M9 11 3 17l4 4 6-6"/><path d="m14 14 1 1"/>', s),
    tendencia: (s) => I('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>', s),
    info: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>', s),
    home: (s) => I('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', s),
    zap: (s) => I('<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>', s),
    filtro: (s) => I('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>', s),
    tabela: (s) => I('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>', s),
    mic: (s) => I('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>', s),
  };

  const TEXTO_JD = `Sobre a vaga: procuramos Analista Financeiro Sênior para atuar no time de planejamento financeiro em São Paulo, modelo híbrido, 3 dias no escritório.

Responsabilidades:
• Atender às demandas de FP&A, construindo e mantendo o modelo de projeção de resultados da companhia;
• Elaborar o orçamento anual e as revisões trimestrais junto às áreas de negócio;
• Apoiar o fechamento mensal, analisando desvios de orçado x realizado e propondo planos de ação;
• Construir relatórios gerenciais e apresentações para o board e para o conselho;
• Dar suporte a estudos de viabilidade, valuation e projetos de M&A.

Requisitos:
• Superior completo em Administração, Economia, Engenharia ou Contabilidade;
• 5+ anos de experiência no mercado financeiro;
• Domínio de Excel avançado, Power BI e SQL;
• Certificação CPA-20 será considerada diferencial;
• Inglês avançado para interação com investidores.`;

  const CRITERIOS = [
    { k: "cargo", cls: "chip-cargo", ico: "brief", label: "Cargo", valor: "Analista Financeiro Sênior" },
    { k: "local", cls: "chip-local", ico: "pin", label: "Localização", valor: "São Paulo" },
    { k: "exp", cls: "chip-exp", ico: "clock", label: "Experiência", valor: "5+ anos" },
    { k: "setor", cls: "chip-setor", ico: "build", label: "Setor", valor: "Mercado financeiro" },
    { k: "s1", cls: "chip-skill", ico: "code", label: "Habilidades", valor: "Excel avançado" },
    { k: "s2", cls: "chip-skill", ico: "code", label: "Habilidades", valor: "Power BI" },
    { k: "s3", cls: "chip-skill", ico: "code", label: "Habilidades", valor: "SQL" },
    { k: "s4", cls: "chip-skill", ico: "code", label: "Habilidades", valor: "CPA-20" },
    { k: "s5", cls: "chip-skill", ico: "code", label: "Habilidades", valor: "Inglês avançado" },
  ];

  /* os 5 critérios que o produto mostra como tags no box de busca */
  const TAGS = [
    { k: "local", ico: "pin", label: "Localização", cls: "chip-local", valor: "São Paulo" },
    { k: "cargo", ico: "brief", label: "Cargo", cls: "chip-cargo", valor: "Analista Financeiro Sênior" },
    { k: "exp", ico: "clock", label: "Experiência", cls: "chip-exp", valor: "5+ anos" },
    { k: "setor", ico: "build", label: "Setor", cls: "chip-setor", valor: "Mercado financeiro" },
    { k: "skills", ico: "code", label: "Habilidades", cls: "chip-skill", valor: "Excel, Power BI, SQL, CPA-20" },
  ];

  const MODOS = [
    { k: "natural", label: "Linguagem Natural", ico: "brain" },
    { k: "similar", label: "Similar", ico: "users" },
    { k: "jd", label: "Descrição da Vaga", ico: "doc" },
    { k: "boolean", label: "Boolean", ico: "binary" },
    { k: "arquetipos", label: "Arquétipos", ico: "target" },
  ];

  const CARGOS_LINHA = [
    "FP&A | Financial Planning | Corporate Finance | Financial Modeling | BI",
    "Finance Executive | FP&A | Financial Manager | Valuation | Securities Analyst",
    "Equity Research Analyst | Renda Variável | Buy Side",
    "CPA-20 | BackOffice | Analista de Cadastro | Onboarding | Fundos",
    "FP&A Manager | Corporate Finance | Financial Analysis | Valuation",
    "Controller | Planejamento Financeiro | Orçamento | Power BI",
    "Analista de Investimentos | CPA-20 | Asset Management",
    "Business Partner Financeiro | Budget | Forecast | SAP",
    "Tesouraria | Fluxo de Caixa | Hedge | Derivativos",
    "Consultor Financeiro | CPA-20 | Private Banking",
    "Analista de Crédito Sênior | Risco | Basileia",
    "Planejamento Financeiro | M&A | Due Diligence | Excel avançado",
  ];

  function gerar(n, offset, seed) {
    const m = Mock.seed(seed || 23);
    // consome a sequência até o offset para manter ids estáveis entre telas
    for (let i = 0; i < (offset || 0); i++) m.candidato();
    const lista = Array.from({ length: n }, (_, i) => {
      const c = m.candidato();
      return {
        id: "c" + ((offset || 0) + i),
        nome: c.nome,
        iniciais: c.iniciais,
        cargo: CARGOS_LINHA[((offset || 0) + i) % CARGOS_LINHA.length],
        score: 68 + (c.score % 30),
        fonte: ((offset || 0) + i) % 3 === 1 ? "local" : "global",
      };
    });
    return lista.sort((a, b) => b.score - a.score);
  }

  /* HTML das linhas da tabela de candidatos (compartilhado) */
  function linhas(lista, sel, salvos) {
    sel = sel || new Set();
    salvos = salvos || new Set();
    return lista.map((c) => {
      const on = sel.has(c.id);
      const salvo = salvos.has(c.id);
      const ring = c.score >= 80 ? "" : c.score >= 65 ? " media" : " baixa";
      return `<tr class="${salvo ? "row-salvo" : ""}" data-id="${c.id}">
        <td class="c-check"><button class="check ${on ? "on" : ""}" data-check="${c.id}" role="checkbox" aria-checked="${on}" aria-label="Selecionar ${c.nome}">${ic.check(12)}</button></td>
        <td class="c-match"><span class="match-ring${ring}">${c.score}</span></td>
        <td class="c-fonte"><span class="fonte-ico" title="${c.fonte === "global" ? "Busca global" : "Banco de talentos"}">${c.fonte === "global" ? ic.globe(17) : ic.db(17)}</span></td>
        <td><div class="nome-cell"><span class="avatar">${c.iniciais}</span><span class="nm">${c.nome}</span>
          ${salvo ? `<span class="badge badge-cyan">${ic.check(11)} Na vaga</span>` : ""}</div></td>
        <td class="c-cargo">${c.cargo}</td>
      </tr>`;
    }).join("");
  }

  /* Sugestões do estado vazio (mesmas do produto em homologação) */
  const SUGESTOES = [
    "Professora de matemática para ensino médio em Belo Horizonte",
    "Enfermeiro com COREN ativo para hospital em São Paulo",
    "Vendedor externo com experiência em bens de consumo",
    "Analista financeiro com CPA-20 para mercado financeiro",
    "Desenvolvedora backend sênior remota, Node.js e Python",
  ];

  /* ícone de cada critério dentro da tag */
  const TAG_CLS = { local: "f-local", cargo: "f-cargo", exp: "f-exp", setor: "f-setor", skills: "f-skills" };

  /* Caixa de busca (réplica do SmartSearchInput). opts:
     { modo, modos, texto, placeholder, tags: "vazio"|"preenchido", fonte,
       email, telefone, sugestoes, semSubmit, semFiltros, preview, altura }   */
  function caixa(opts) {
    opts = opts || {};
    const modo = opts.modo || "natural";
    const fonte = opts.fonte || "hibrida";
    const preenchido = opts.tags === "preenchido";
    const temTexto = !!(opts.texto || "").trim();

    const modos = (opts.modos || MODOS).map((mo) => `
      <button class="sc-mode ${mo.k === modo ? "active" : ""}" data-modo="${mo.k}" aria-pressed="${mo.k === modo}">
        ${ic[mo.ico](14)}${mo.label}
      </button>`).join("");

    const filtros = opts.semFiltros ? "" : `
      <button class="sc-mode ${preenchido ? "on-filtros" : ""}" data-filtros>
        ${ic.filtro(14)}Filtros${preenchido ? ' <span class="badge badge-gray" style="margin-left:2px">5</span>' : ""}
      </button>
      <button class="sc-gotoresults" aria-label="Ir para os resultados">${ic.tabela(16)}</button>`;

    const tags = TAGS.map((t) => `
      <span class="crit ${preenchido ? "filled " + TAG_CLS[t.k] : ""}" title="${preenchido ? t.valor : t.label}">
        <span class="ico-box">${ic[t.ico](12)}</span>
        <span class="lbl">${t.label}</span>
        ${preenchido ? `<span class="sep">·</span><span class="val">${t.valor}</span>` : ""}
      </span>`).join("");

    const preview = opts.preview ? `
      <div class="tax-preview">
        <span class="lbl">${ic.brain(13)} A LIA entendeu</span>
        ${CRITERIOS.map((c) => `<span class="chip-tax ${c.cls}">${ic[c.ico](11)} ${c.valor}</span>`).join("")}
      </div>` : "";

    const liaSug = opts.sugestaoLia ? `
      <div class="lia-sug">
        ${ic.varinha(14)}
        <span class="txt"><b>Sugestão: </b>${opts.sugestaoLia}</span>
        <button class="aceitar" data-aceitar><kbd>Tab</kbd> Aceitar</button>
        <button class="fechar" data-dispensar aria-label="Dispensar sugestão">${ic.x(12)}</button>
      </div>` : "";

    const q = opts.qualidade;
    const cor = !q ? "" : q.score >= 60 ? "var(--status-success)" : q.score >= 40 ? "var(--status-warning)" : "var(--status-error)";
    const qualidade = q ? `
      <div class="qual">
        <div class="qual-linha">
          <div class="qual-barra">
            <div class="top"><span class="lbl">Qualidade da busca</span><span class="val" style="color:${cor}">${q.score}%</span></div>
            <div class="trilho"><i style="width:${q.score}%;background:${cor}"></i></div>
          </div>
          ${q.proxima ? `<span class="qual-proxima">${ic.tendencia(12)} ${q.proxima}</span>` : ""}
        </div>
        ${(q.alertas || []).map((a) => `
          <div class="qual-alerta ${a.tipo}">
            ${a.tipo === "aviso" ? ic.alerta(14) : ic.info(14)}
            <span>${a.msg}${a.acao ? ` <button class="acao">${a.acao}</button>` : ""}</span>
          </div>`).join("")}
      </div>` : "";

    const sugestoes = opts.sugestoes === false || temTexto ? "" : `
      <div class="sc-sug">
        <span class="lbl">Sugestões:</span>
        <div class="chips">${SUGESTOES.map((sg) => `<button class="sug-chip">${sg}</button>`).join("")}</div>
      </div>`;

    return `
      <div class="search-card">
        <div class="sc-modes">${modos}${filtros}</div>
        <div class="sc-body">
          <div class="sc-field">
            <textarea rows="2" style="min-height:${opts.altura || 56}px"
              placeholder="${opts.placeholder || "Ex: Desenvolvedores Python com 5+ anos em São Paulo..."}">${opts.texto || ""}</textarea>
            <div class="sc-toolbar">
              <div class="sc-sources">
                <button class="src-btn ${fonte === "local" ? "on-local" : ""}" data-fonte="local" aria-label="Seu banco de talentos (gratuito)">${ic.home(14)}</button>
                <button class="src-btn ${fonte === "hibrida" ? "on-hibrida" : ""}" data-fonte="hibrida" aria-label="Busca híbrida: local mais global">${ic.zap(14)}</button>
                <button class="src-btn ${fonte === "global" ? "on-global" : ""}" data-fonte="global" aria-label="Busca global">${ic.globe(14)}</button>
                <span class="src-sep"></span>
                <button class="src-btn ${opts.email === false ? "" : "on-contato"}" data-contato="email" aria-label="Apenas com Email">${ic.mail(14)}</button>
                <button class="src-btn ${opts.telefone ? "on-contato" : ""}" data-contato="telefone" aria-label="Apenas com Telefone">${ic.phone(14)}</button>
                <span class="src-sep"></span>
                <button class="src-btn" aria-label="Ditar a busca">${ic.mic(14)}</button>
              </div>
              ${opts.semSubmit ? "" : `<button class="sc-submit ${temTexto ? "ativo" : ""}" data-buscar aria-label="Buscar candidatos">${ic.search(16)}</button>`}
            </div>
          </div>

          ${liaSug}

          <div class="sc-tags">
            ${tags}
            <button class="assistente" data-assistente>${ic.brain(14)} Assistente de Busca</button>
          </div>

          ${sugestoes}
          ${qualidade}
        </div>
        ${preview}
      </div>`;
  }


  /* ---------- barra de ações em lote (BulkActionsBar do produto) ----------
     O produto já tem 8 ações aqui. Com as duas do salvamento seriam dez
     botões competindo, então: ação principal com variação (split button),
     as três mais usadas visíveis e o resto em "Mais ações".                */
  function selBarHTML(o) {
    const n = o.n, total = o.total;
    const principal = o.daVaga
      ? `<span class="split">
           <button class="sel-btn principal" data-sel="salvar">${ic.plus(14)} Salvar na vaga e continuar</button>
           <button class="sel-btn caret" data-sel="variacoes" aria-label="Outras formas de salvar">${ic.chevD(14)}</button>
         </span>`
      : `<button class="sel-btn principal" data-sel="escolher" style="border-radius:var(--radius-sm)">${ic.brief(14)} Adicionar à vaga…</button>`;
    return `
      <div class="sel-bar">
        <span class="sel-qtd">
          <span class="circ">${ic.users(14)}</span>
          <span class="txt">${n} candidato${n > 1 ? "s" : ""} selecionado${n > 1 ? "s" : ""}</span>
          <span class="sel-chip">${n} de ${total}</span>
        </span>
        <span class="sel-acoes">
          ${principal}
          <button class="sel-btn" data-sel="lista">${ic.lista(14)} Lista</button>
          <button class="sel-btn" data-sel="mensagem">${ic.mail(14)} Mensagem</button>
          <button class="sel-btn" data-sel="wsi">${ic.prancheta(14)} Triagem WSI</button>
          <button class="sel-btn" data-sel="mais">${ic.mais(14)} Mais ações</button>
        </span>
        <button class="sel-btn sel-fechar" data-sel="limpar" aria-label="Limpar seleção">${ic.x(14)}</button>
        ${n < total ? `<p class="sel-aviso" style="flex-basis:100%;margin:0">${ic.alerta(12)} A ação vai atingir só os ${n} carregados. Carregue mais para incluir os outros ${total - n}.</p>` : ""}
      </div>`;
  }

  function menuVariacoes(n) {
    return `
      <button data-acao="voltar">${ic.arrow(14)} <span>Salvar e voltar para a vaga
        <span class="desc">Envia os ${n} e abre o funil da vaga</span></span></button>
      <div class="sep"></div>
      <button data-acao="continuar">${ic.plus(14)} <span>Salvar na vaga e continuar
        <span class="desc">Mantém você na busca para escolher mais</span></span></button>`;
  }

  function menuMais(n) {
    return `
      <button data-acao="favoritos">${ic.estrela(14)} Favoritos</button>
      <button data-acao="ocultar">${ic.olhoCortado(14)} Ocultar da busca</button>
      <div class="sep"></div>
      <div class="grupo">Trazer para a base do cliente</div>
      <button data-acao="base">${ic.db(14)} Salvar na Base (${Math.min(n, 3)})</button>
      <button data-acao="banco">${ic.nuvem(14)} Baixar para o banco (${n})</button>`;
  }

  /* menu ancorado, usado pelo split e pelo "Mais ações" */
  function abrirMenu(ancora, html, onEscolha, hospedeiro) {
    fecharMenus();
    const host = hospedeiro || document.body;
    const r = ancora.getBoundingClientRect();
    const el = document.createElement("div");
    el.className = "menu-acoes";
    el.style.top = (r.bottom + window.scrollY + 6) + "px";
    el.style.left = Math.max(12, r.left + window.scrollX - 120) + "px";
    el.innerHTML = html;
    host.appendChild(el);
    el.querySelectorAll("[data-acao]").forEach((b) =>
      b.addEventListener("click", () => { const a = b.dataset.acao; fecharMenus(); onEscolha(a); }));
    setTimeout(() => document.addEventListener("click", fecharAoClicarFora), 0);
  }
  function fecharAoClicarFora(ev) { if (!ev.target.closest(".menu-acoes")) fecharMenus(); }
  function fecharMenus() {
    document.querySelectorAll(".menu-acoes").forEach((el) => el.remove());
    document.removeEventListener("click", fecharAoClicarFora);
  }


  /* ---------- modal "Editar sua busca" (EditQueryModal do produto) ---------- */
  function modalEditarHTML(o) {
    o = o || {};
    return `
      <div class="eq-scrim" data-eq-scrim>
        <div class="eq-modal" role="dialog" aria-label="Editar sua busca">
          <div class="eq-head">
            <h2>${ic.search(16)} Editar sua busca</h2>
            <p>Refine sua busca com linguagem natural. A LIA irá analisar e sugerir melhorias.</p>
          </div>
          <div class="eq-body" id="eq-body">${o.corpo || ""}</div>
          <div class="eq-foot">
            <button class="eq-btn" data-eq="cancelar">Cancelar</button>
            <button class="eq-btn primario" data-eq="salvar">Salvar e Buscar</button>
          </div>
        </div>
      </div>`;
  }

  window.Busca = { ic, TEXTO_JD, CRITERIOS, TAGS, MODOS, CARGOS_LINHA, SUGESTOES, gerar, linhas, caixa,
    selBarHTML, menuVariacoes, menuMais, abrirMenu, fecharMenus, modalEditarHTML };
})();
