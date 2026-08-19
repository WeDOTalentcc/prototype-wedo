/* =============================================================
   Proto — motor de estados + barra flutuante do protótipo
   Toda tela registra seus estados; a barra deixa quem avalia
   alternar entre eles (vazio, poucos, muitos, carregando, erro...).

   USO (no fim do <body> da tela):

     Proto.states([
       { id: "padrao",     label: "Padrão",        render: () => renderTabela(m.lista(8, m.vaga)) },
       { id: "vazio",      label: "0 registros",   render: renderVazio },
       { id: "muitos",     label: "Muitos + paginação", render: () => renderTabela(m.lista(87, m.vaga)) },
       { id: "carregando", label: "Carregando",    render: renderSkeleton },
       { id: "erro",       label: "Erro",          render: renderErro },
     ]);

   - O primeiro estado é o inicial (ou o de ?estado=<id> na URL).
   - Atalhos de teclado: 1..9 trocam de estado.
   - O link com ?estado= é compartilhável (deep link para revisão).
   ============================================================= */
(function () {
  "use strict";

  let registered = [];
  let activeId = null;
  let bar = null;

  function apply(id) {
    const st = registered.find((s) => s.id === id) || registered[0];
    if (!st) return;
    activeId = st.id;
    try {
      st.render();
    } catch (err) {
      console.error("[proto] estado '" + st.id + "' falhou:", err);
    }
    if (bar) {
      bar.querySelectorAll("button[data-state]").forEach((b) => {
        b.classList.toggle("active", b.dataset.state === activeId);
      });
    }
    const url = new URL(location.href);
    url.searchParams.set("estado", activeId);
    history.replaceState(null, "", url);
    document.dispatchEvent(new CustomEvent("proto:state", { detail: { id: activeId } }));
  }

  function buildBar() {
    bar = document.createElement("div");
    bar.className = "proto-bar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Estados do protótipo");

    const label = document.createElement("span");
    label.className = "pb-label";
    label.textContent = "✦ Estados";
    bar.appendChild(label);

    registered.forEach((st, i) => {
      const b = document.createElement("button");
      b.dataset.state = st.id;
      b.textContent = (i < 9 ? (i + 1) + " · " : "") + st.label;
      b.title = "Atalho: tecla " + (i + 1);
      b.addEventListener("click", () => apply(st.id));
      bar.appendChild(b);
    });

    const sep = document.createElement("span");
    sep.className = "pb-sep";
    bar.appendChild(sep);

    const toggle = document.createElement("button");
    toggle.className = "pb-toggle";
    toggle.textContent = "–";
    toggle.title = "Recolher/expandir a barra (tecla 0)";
    toggle.addEventListener("click", () => {
      bar.classList.toggle("collapsed");
      toggle.textContent = bar.classList.contains("collapsed") ? "✦" : "–";
    });
    bar.appendChild(toggle);

    document.body.appendChild(bar);

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea, select")) return;
      if (e.key === "0") { toggle.click(); return; }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= registered.length) apply(registered[n - 1].id);
    });
  }

  window.Proto = {
    /** Registra os estados da tela e ativa o inicial (ou o da URL ?estado=). */
    states(list) {
      if (!Array.isArray(list) || !list.length) {
        console.warn("[proto] Proto.states([]) vazio — a tela precisa registrar estados.");
        return;
      }
      registered = list;
      buildBar();
      const fromUrl = new URL(location.href).searchParams.get("estado");
      apply(fromUrl || list[0].id);
    },
    /** Estado ativo no momento. */
    get active() { return activeId; },
    apply,
  };
})();
