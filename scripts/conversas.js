/* =============================================================
   Conversas — réplica do IASidebar (histórico de conversas da LIA)
   Fonte: plataforma-lia/src/components/ia-sidebar/IASidebar.tsx +
   copy exata de messages/pt-BR.json (iaSidebar.*).

   Painel Apollo-style que abre COLADO à sidebar em qualquer tela
   logada. O shell intercepta o clique em "Conversas" e chama
   Conversas.toggle(). Clicar numa conversa abre o Conversar com o
   título dela. Ações por conversa (menu ⋯): Fixar (P), Renomear (R),
   Nota (N), Arquivar (A), Excluir (Del) — todas funcionais no mock.
   ============================================================= */
(function () {
  "use strict";

  const script = document.querySelector('script[src*="conversas.js"]');
  const ROOT = script ? script.getAttribute("src").replace(/scripts\/conversas\.js.*$/, "") : "./";
  const CONVERSAR = ROOT + "telas/conversar/conversar.html";

  const I = (p, s) => `<svg width="${s || 14}" height="${s || 14}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const P = {
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>',
    chevsL: '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
    archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
    msg: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
    pen: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    note: '<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  };

  const TAG_CLASS = {
    "Vagas": "ct-blue", "Candidatos": "ct-purple", "Relatórios": "ct-amber",
    "Configurações": "ct-slate", "Geral": "ct-gray",
  };

  let convs = [
    { id: 1, titulo: "Planejamento de vagas do Q4", tag: "Vagas", quando: "hoje", hora: "09:12", pin: true },
    { id: 2, titulo: "Criar vaga Backend Ruby", tag: "Vagas", quando: "hoje", hora: "11:40", unread: 2 },
    { id: 3, titulo: "Buscar candidatos para QA", tag: "Candidatos", quando: "hoje", hora: "08:05" },
    { id: 4, titulo: "Comparar finalistas Product Manager", tag: "Candidatos", quando: "ontem", nota: "Aguardando parecer do gestor" },
    { id: 5, titulo: "Relatório semanal de recrutamento", tag: "Relatórios", quando: "ontem" },
    { id: 6, titulo: "Configurar automações de triagem", tag: "Configurações", quando: "antes" },
    { id: 7, titulo: "Briefing diário", tag: "Geral", quando: "antes" },
    { id: 8, titulo: "Short list Devs Full Stack SP", tag: "Candidatos", quando: "antes" },
  ];
  let arquivadas = [
    { id: 9, titulo: "Onboarding da conta", tag: "Geral", quando: "antes", arch: true },
  ];

  let open = false, busca = "", verArquivadas = false, groupBy = "date";
  let panel = null;

  function toast(msg) {
    let box = document.getElementById("toasts");
    if (!box) {
      box = document.createElement("div");
      box.id = "toasts"; box.className = "toast-box";
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  function rowHtml(c) {
    const tagChip = `<span class="ct-chip ${TAG_CLASS[c.tag] || "ct-gray"}">${c.tag}</span>`;
    return `<div class="cv-row" data-id="${c.id}">
      <a class="cv-row-btn" href="${CONVERSAR}?estado=conversa&titulo=${encodeURIComponent(c.titulo)}">
        <span class="cv-title">
          <span class="tt">${c.titulo}</span>
          ${c.unread ? `<span class="cv-unread">${c.unread}</span>` : ""}
          ${c.pin ? `<span class="cv-pin">${I(P.pin, 10)}</span>` : ""}
        </span>
        <span class="cv-meta">${tagChip}${c.hora ? `<span class="cv-time">${c.hora}</span>` : ""}</span>
      </a>
      ${c.nota ? `<button class="cv-note" data-note="${c.id}">${I(P.note, 12)}<span>${c.nota}</span></button>` : ""}
      <button class="cv-more" data-menu="${c.id}" aria-label="Opções da conversa">${I(P.more, 12)}</button>
    </div>`;
  }

  function section(label, items) {
    if (!items.length) return "";
    return `<div class="cv-section">${label}</div>` + items.map(rowHtml).join("");
  }

  function listHtml() {
    const base = verArquivadas ? arquivadas : convs;
    const vis = base.filter((c) => c.titulo.toLowerCase().includes(busca.toLowerCase()));
    if (!vis.length) {
      return `<div class="cv-empty">
        <div class="circ">${I(P.msg, 24)}</div>
        <p class="t1">${busca ? "Nenhuma conversa encontrada" : "Comece uma conversa com a LIA"}</p>
        ${busca ? "" : `<p class="t2">Clique em "Nova conversa" para começar</p>`}</div>`;
    }
    if (verArquivadas) return section("Arquivadas", vis);
    if (groupBy === "none") return vis.map(rowHtml).join("");
    return section("Fixadas", vis.filter((c) => c.pin)) +
      section("Hoje", vis.filter((c) => !c.pin && c.quando === "hoje")) +
      section("Ontem", vis.filter((c) => !c.pin && c.quando === "ontem")) +
      section("Anteriores", vis.filter((c) => !c.pin && c.quando === "antes"));
  }

  function render() {
    if (!panel) return;
    panel.querySelector(".cv-list").innerHTML = listHtml();
    panel.querySelector(".cv-arch").classList.toggle("on", verArquivadas);
  }

  function build() {
    panel = document.createElement("aside");
    panel.className = "cv-panel";
    panel.setAttribute("aria-label", "Histórico de conversas com a LIA");
    panel.innerHTML = `
      <div class="cv-head">
        <span class="cv-head-l">${I(P.brain, 16)}<b>Conversas</b></span>
        <button class="cv-collapse" title="Retrair painel">${I(P.chevsL, 15)}</button>
      </div>
      <div class="cv-new"><a href="${CONVERSAR}">${I(P.plus, 15)}Nova conversa</a></div>
      <div class="cv-tools">
        <div class="cv-search">${I(P.search, 12)}<input placeholder="Buscar conversas..."><button class="cv-clear" hidden>${I(P.x, 12)}</button></div>
        <button class="cv-filter" title="Filtros">${I(P.sliders, 13)}</button>
        <button class="cv-arch" title="Arquivadas">${I(P.archive, 13)}</button>
      </div>
      <div class="cv-list"></div>`;
    document.body.appendChild(panel);

    panel.querySelector(".cv-collapse").addEventListener("click", toggle);
    const inp = panel.querySelector(".cv-search input");
    const clear = panel.querySelector(".cv-clear");
    inp.addEventListener("input", () => { busca = inp.value; clear.hidden = !busca; render(); });
    clear.addEventListener("click", () => { inp.value = ""; busca = ""; clear.hidden = true; render(); });
    panel.querySelector(".cv-arch").addEventListener("click", () => { verArquivadas = !verArquivadas; render(); });
    panel.querySelector(".cv-filter").addEventListener("click", (e) => {
      e.stopPropagation(); closeCtx();
      const m = document.createElement("div");
      m.className = "cv-ctx cv-filtermenu";
      m.innerHTML = `<div class="cv-ctx-label">Agrupar por</div>
        <button data-g="date">${groupBy === "date" ? "●" : "○"} Data</button>
        <button data-g="none">${groupBy === "none" ? "●" : "○"} Nenhum</button>
        <div class="cv-ctx-sep"></div><button data-g="clear">Limpar filtros</button>`;
      panel.querySelector(".cv-tools").appendChild(m);
      m.addEventListener("click", (ev) => {
        const g = ev.target.closest("button")?.dataset.g;
        if (g === "clear") { groupBy = "date"; busca = ""; inp.value = ""; }
        else if (g) groupBy = g;
        closeCtx(); render();
      });
      setTimeout(() => document.addEventListener("click", closeCtx, { once: true }));
    });

    panel.querySelector(".cv-list").addEventListener("click", (e) => {
      const menuBtn = e.target.closest("[data-menu]");
      const noteBtn = e.target.closest("[data-note]");
      if (menuBtn) { e.preventDefault(); e.stopPropagation(); ctxMenu(menuBtn); }
      else if (noteBtn) { e.preventDefault(); editNote(+noteBtn.dataset.note); }
    });
  }

  function closeCtx() { document.querySelectorAll(".cv-ctx").forEach((x) => x.remove()); }

  function findConv(id) { return convs.find((c) => c.id === id) || arquivadas.find((c) => c.id === id); }

  function ctxMenu(anchor) {
    closeCtx();
    const id = +anchor.dataset.menu;
    const c = findConv(id);
    const m = document.createElement("div");
    m.className = "cv-ctx";
    m.innerHTML = `
      <button data-a="pin">${I(P.pin)} ${c.pin ? "Desafixar" : "Fixar"}<kbd>P</kbd></button>
      <button data-a="rename">${I(P.pen)} Renomear<kbd>R</kbd></button>
      <button data-a="note">${I(P.note)} Nota<kbd>N</kbd></button>
      <div class="cv-ctx-sep"></div>
      <button data-a="arch">${I(P.archive)} Arquivar<kbd>A</kbd></button>
      <button data-a="del" class="danger">${I(P.trash)} Excluir<kbd>Del</kbd></button>`;
    anchor.closest(".cv-row").appendChild(m);
    m.addEventListener("click", (e) => {
      const a = e.target.closest("button")?.dataset.a;
      closeCtx();
      if (a === "pin") { c.pin = !c.pin; toast(c.pin ? "Conversa fixada" : "Conversa desafixada"); }
      if (a === "rename") return startRename(id);
      if (a === "note") return editNote(id);
      if (a === "arch") {
        convs = convs.filter((x) => x.id !== id); arquivadas.unshift({ ...c, pin: false });
        toast("Conversa arquivada");
      }
      if (a === "del") {
        convs = convs.filter((x) => x.id !== id); arquivadas = arquivadas.filter((x) => x.id !== id);
        toast("Conversa excluída");
      }
      render();
    });
    setTimeout(() => document.addEventListener("click", closeCtx, { once: true }));
  }

  function startRename(id) {
    const c = findConv(id);
    const row = panel.querySelector(`.cv-row[data-id="${id}"] .tt`);
    row.innerHTML = `<input class="cv-rename" value="${c.titulo}">`;
    const inp = row.querySelector("input");
    inp.focus(); inp.select();
    const done = (save) => { if (save && inp.value.trim()) { c.titulo = inp.value.trim(); toast("Conversa renomeada"); } render(); };
    inp.addEventListener("click", (e) => e.preventDefault());
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") done(true); if (e.key === "Escape") done(false); });
    inp.addEventListener("blur", () => done(true));
  }

  function editNote(id) {
    const c = findConv(id);
    const row = panel.querySelector(`.cv-row[data-id="${id}"]`);
    closeCtx();
    const ed = document.createElement("div");
    ed.className = "cv-noteedit";
    ed.innerHTML = `<textarea placeholder="Adicionar nota...">${c.nota || ""}</textarea>
      <div class="r"><button class="c">Cancelar</button><button class="s">Salvar (⌘↵)</button></div>`;
    row.appendChild(ed);
    const ta = ed.querySelector("textarea"); ta.focus();
    ed.querySelector(".c").addEventListener("click", render);
    ed.querySelector(".s").addEventListener("click", () => { c.nota = ta.value.trim(); render(); toast("Nota salva"); });
  }

  function toggle() {
    open = !open;
    if (open && !panel) build();
    if (panel) panel.classList.toggle("open", open);
    document.querySelector('.sb-item[data-conversas="1"]')?.classList.toggle("active", open);
    if (open) render();
  }

  window.Conversas = { toggle, get open() { return open; } };

  // Deep link de revisão: ?conversas=1 abre o painel já carregado
  if (new URL(location.href).searchParams.get("conversas") === "1") {
    const init = () => setTimeout(toggle, 50);
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})();
