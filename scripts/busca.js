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
    home: (s) => I('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', s),
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

  /* Caixa de busca (SmartSearchInput). opts:
     { modo, texto, placeholder, tags: "vazio"|"preenchido", fonte, compacta,
       preview: bool (prévia da taxonomia), botao: texto do primário }        */
  function caixa(opts) {
    opts = opts || {};
    const modo = opts.modo || "natural";
    const modos = (opts.modos || MODOS).map((mo) => `
      <button class="sc-mode ${mo.k === modo ? "active" : ""}" data-modo="${mo.k}">
        <span class="${mo.k === "natural" ? "ai" : ""}">${ic[mo.ico](14)}</span>${mo.label}
      </button>`).join("");
    const preenchido = opts.tags === "preenchido";
    const tags = TAGS.map((t) => preenchido
      ? `<span class="chip-tax ${t.cls}">${ic[t.ico](12)} ${t.valor}</span>`
      : `<span class="crit">${ic[t.ico](12)} ${t.label}</span>`).join("");
    const fonte = opts.fonte || "global";
    const nota = fonte === "local"
      ? `<span class="credits-note free">Busca local: sem custo</span>`
      : fonte === "hibrida"
        ? `<span class="credits-note paid">Busca híbrida: consome créditos só na parcela global</span>`
        : `<span class="credits-note paid">Busca global: consome créditos</span>`;
    const preview = opts.preview ? `
      <div class="tax-preview">
        <span class="lbl">${ic.brain(13)} A LIA entendeu</span>
        ${CRITERIOS.map((c) => `<span class="chip-tax ${c.cls}">${ic[c.ico](11)} ${c.valor}</span>`).join("")}
      </div>` : "";
    return `
      <div class="search-card">
        <div class="sc-modes">${modos}</div>
        <div class="sc-input">
          <textarea style="min-height:${opts.altura || 84}px" placeholder="${opts.placeholder || "Descreva quem você procura. Ex: Analista financeiro sênior em São Paulo, 5+ anos em mercado financeiro, CPA-20"}">${opts.texto || ""}</textarea>
        </div>
        <div class="sc-crit">
          ${tags}
          <span class="crit-hint">${ic.brain(12)} ${preenchido ? "5 de 5 critérios reconhecidos" : "0 de 5 critérios reconhecidos"}</span>
        </div>
        ${preview}
        <div class="sc-foot">
          <div class="seg" role="group" aria-label="Fonte da busca">
            <button class="${fonte === "local" ? "on" : ""}" data-fonte="local">${ic.db(13)} Banco</button>
            <button class="${fonte === "global" ? "on" : ""}" data-fonte="global">${ic.globe(13)} Global</button>
            <button class="${fonte === "hibrida" ? "on" : ""}" data-fonte="hibrida">Híbrida</button>
          </div>
          <button class="toggle-pill" data-toggle="email">${ic.mail(12)} Apenas com Email</button>
          <button class="toggle-pill" data-toggle="fone">${ic.phone(12)} Apenas com Telefone</button>
          <span class="spacer"></span>
          ${opts.semNota ? "" : nota}
          ${opts.semBotao ? "" : `<button class="btn btn-primary" data-buscar>${ic.search(14)} ${opts.botao || "Buscar candidatos"}</button>`}
        </div>
      </div>`;
  }

  window.Busca = { ic, TEXTO_JD, CRITERIOS, TAGS, MODOS, CARGOS_LINHA, gerar, linhas, caixa };
})();
