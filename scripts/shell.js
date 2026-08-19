/* =============================================================
   Shell — réplica fiel da sidebar do produto (plataforma-lia)
   Fonte: src/components/sidebar.tsx (estrutura, itens, badges).

   USO (primeiro elemento do <body> da tela):
     <div id="shell" data-nav="Vagas"></div>
   data-nav = label do item de menu que fica ativo nesta tela.
   Conteúdo da tela em <div id="tela"> (o shell move para o miolo).

   Navegação: labels mapeados em window.NAV_MAP (screens.js) viram
   link para a tela; os demais vão para telas/_em-construcao.html
   (mantém TODOS os links navegáveis). "Conversar" abre a LIA.
   ============================================================= */
(function () {
  "use strict";

  const script = document.querySelector('script[src*="shell.js"]');
  const ROOT = script ? script.getAttribute("src").replace(/scripts\/shell\.js.*$/, "") : "./";

  /* ---------- Ícones (lucide, 16px stroke-2) ---------- */
  const I = (paths, size) => `<svg width="${size || 16}" height="${size || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ico = {
    messageCircle: (s) => I('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>', s),
    brain: (s) => I('<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>', s),
    barChart: (s) => I('<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>', s),
    lineChart: (s) => I('<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>', s),
    gitBranch: (s) => I('<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>', s),
    briefcase: (s) => I('<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>', s),
    users: (s) => I('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', s),
    bot: (s) => I('<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>', s),
    pkg: (s) => I('<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>', s),
    folder: (s) => I('<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>', s),
    search: (s) => I('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', s),
    bell: (s) => I('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>', s),
    chevL: (s) => I('<path d="m15 18-6-6 6-6"/>', s),
    chevD: (s) => I('<path d="m6 9 6 6 6-6"/>', s),
    gear: (s) => I('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>', s),
    globe: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', s),
    help: (s) => I('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', s),
    db: (s) => I('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>', s),
    trash: (s) => I('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>', s),
  };

  /* ---------- Estrutura do menu (fiel ao BASE_MENU_SECTIONS) ---------- */
  const MENU = [
    { items: [
      { icon: "messageCircle", label: "Conversar", lia: true },
      { icon: "brain", label: "Conversas", cyanIcon: true },
    ]},
    { items: [
      { icon: "barChart", label: "Decidir", subs: [
        { icon: "lineChart", label: "Indicadores", draft: true },
      ]},
      { icon: "gitBranch", label: "Recrutar", subs: [
        { icon: "briefcase", label: "Vagas" },
        { icon: "users", label: "Funil de Talentos", subsDyn: [
          { icon: "db", label: "Devs Full Stack SP" },
          { icon: "db", label: "Executivos de Vendas" },
        ], seeAll: "Ver todos os bancos (5)" },
      ]},
      { icon: "bot", label: "Agentes", beta: true, subs: [
        { icon: "pkg", label: "Marketplace" },
      ], subsDyn: [
        { icon: "bot", label: "Sourcing Tech Brasil" },
      ], seeAll: "Ver todos os agentes (3)" },
      { icon: "folder", label: "Projetos", draft: true },
    ]},
  ];

  const RECENTES = [
    { icon: "briefcase", label: "Desenvolvedor(a) Full Stack Sênior" },
    { icon: "users", label: "Ana Beatriz Souza" },
    { icon: "brain", label: "Buscar candidatos para QA" },
  ];

  function hrefFor(label) {
    const map = window.NAV_MAP || {};
    if (map[label]) {
      for (const grp of (window.SCREENS || [])) {
        const s = grp.items.find((x) => x.id === map[label]);
        if (s) return ROOT + s.arquivo;
      }
    }
    return ROOT + "telas/_em-construcao.html?titulo=" + encodeURIComponent(label);
  }

  function item(it, activeNav) {
    const active = it.label === activeNav;
    const badges = (it.beta ? '<span class="sb-badge sb-badge-beta">BETA</span>' : "") +
      (it.draft ? '<span class="sb-badge">DRAFT</span>' : "");
    const liaAttr = it.lia ? ' data-lia="1"' : "";
    const subs = [...(it.subs || []), ...(it.subsDyn || [])];
    const chev = subs.length ? `<span class="sb-chev">${ico.chevD(14)}</span>` : "";
    let html = `<a class="sb-item ${active ? "active" : ""}" href="${hrefFor(it.label)}"${liaAttr}>
      <span class="sb-ico ${it.cyanIcon ? "cyan" : ""}">${ico[it.icon](16)}</span>
      <span class="sb-lbl">${it.label}</span>${badges}${chev}</a>`;
    if (subs.length) {
      html += `<div class="sb-subs">` + subs.map((sub) => {
        const subActive = sub.label === activeNav;
        return `<a class="sb-sub ${subActive ? "active" : ""} ${sub.draft ? "" : ""}" href="${hrefFor(sub.label)}">
          <span class="sb-ico">${ico[sub.icon](14)}</span><span class="sb-lbl">${sub.label}</span>
          ${sub.draft ? '<span class="sb-badge">DRAFT</span>' : ""}</a>`;
      }).join("") +
      (it.seeAll ? `<a class="sb-seeall" href="${hrefFor(it.label)}">${it.seeAll}</a>` : "") +
      `</div>`;
    }
    return html;
  }

  function build() {
    const mount = document.getElementById("shell");
    if (!mount) return;
    const activeNav = mount.dataset.nav || "";

    const sections = MENU.map((sec, i) =>
      `<div class="sb-section">${sec.items.map((it) => item(it, activeNav)).join("")}</div>` +
      (i === 0 ? "" : "")
    ).join("");

    const recentes = `<div class="sb-recentes">
      <h3>Recentes</h3>
      ${RECENTES.map((r) => `<a class="sb-recent" href="${hrefFor(r.label)}">
        <span class="sb-ico">${ico[r.icon](14)}</span><span class="sb-lbl">${r.label}</span></a>`).join("")}
      <button class="sb-clear">${ico.trash(12)}Limpar recentes</button>
    </div>`;

    const sidebar = `<nav class="sb" aria-label="Menu principal">
      <div class="sb-head">
        <a href="${ROOT}index.html" title="Galeria do protótipo"><img src="${ROOT}assets/logos/wedo-logo.png" alt="WeDo Talent" width="120"></a>
        <button class="sb-collapse" title="Recolher menu">${ico.chevL(14)}</button>
      </div>
      <div class="sb-search-row">
        <button class="sb-search">${ico.search(12)}<span>Pesquisar...</span><kbd>⌘K</kbd></button>
        <button class="sb-bell" title="Notificações">${ico.bell(14)}</button>
      </div>
      <div class="sb-menu">${sections}${recentes}</div>
      <div class="sb-foot">
        <button class="sb-avatar" title="Paulo Moraes">PM</button>
        <button class="sb-tool" title="Configurações" onclick="location.href='${hrefFor("Configurações")}'">${ico.gear(12)}</button>
        <button class="sb-tool" title="Idioma">${ico.globe(12)}</button>
        <button class="sb-tool" title="Ajuda e dicas" onclick="location.href='${hrefFor("Ajuda")}'">${ico.help(12)}</button>
        <span class="sb-progress" title="Setup da conta: 80%"><svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="none" stroke="var(--border-subtle)" stroke-width="2.5"/><circle cx="10" cy="10" r="8" fill="none" stroke="var(--wedo-cyan)" stroke-width="2.5" stroke-dasharray="40.2 50.3" stroke-linecap="round" transform="rotate(-90 10 10)"/></svg></span>
      </div>
    </nav>`;

    const tela = document.getElementById("tela");
    mount.insertAdjacentHTML("beforebegin", sidebar);
    const main = document.createElement("main");
    main.className = "main";
    main.innerHTML = '<div class="content"></div>';
    mount.replaceWith(main);
    if (tela) main.querySelector(".content").appendChild(tela);
    document.body.classList.add("app");

    // Conversar abre a LIA (quando lia.js presente) em vez de navegar
    document.querySelectorAll('.sb-item[data-lia="1"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        if (window.Lia) { e.preventDefault(); window.Lia.open(); }
      });
    });
    // Colapso simples (visual)
    document.querySelector(".sb-collapse").addEventListener("click", () => {
      document.body.classList.toggle("sb-collapsed");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
