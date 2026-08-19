/* =============================================================
   Lia — bolha + painel de chat da LIA com simulação de conversa
   Réplica do UnifiedChatBubble (bolha ciano c/ cérebro, status
   verde, 3 pontinhos) + painel flutuante com typing indicator.

   USO (no fim do <body>, depois de shell.js):
     Lia.mount({
       roteiro: [
         { de: "user", texto: "Busque candidatos para a vaga de QA" },
         { de: "lia",  texto: "Claro! Buscando candidatos compatíveis...", digitando: 1400 },
         { de: "lia",  texto: "Encontrei 12 candidatos. Quer que eu dispare as triagens?" },
       ],
     });

   - Clique na bolha (ou Lia.open()) abre o painel e toca o roteiro:
     mensagens do usuário entram como enviadas; as da LIA mostram o
     indicador "digitando" e o texto aparece em streaming.
   - Lia.replay() re-executa. O input é decorativo (protótipo), mas
     Enter envia a mensagem digitada e a LIA responde genericamente.
   ============================================================= */
(function () {
  "use strict";

  const BRAIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>';
  const SEND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
  const X = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  let roteiro = [];
  let timers = [];
  let opened = false;
  let played = false;

  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function el(id) { return document.getElementById(id); }

  function mountDom() {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <button class="lia-bubble" id="lia-bubble" title="Conversar com a LIA" aria-label="Abrir chat da LIA">
        <span class="lia-brain">${BRAIN}</span>
        <span class="lia-dots"><i></i><i></i><i></i></span>
        <span class="lia-status"></span>
      </button>
      <div class="lia-panel" id="lia-panel" hidden>
        <header>
          <span class="lia-panel-brain">${BRAIN}</span>
          <div class="lia-panel-title"><b>LIA</b><span>Assistente de recrutamento</span></div>
          <button class="lia-close" id="lia-close" aria-label="Fechar">${X}</button>
        </header>
        <div class="lia-msgs" id="lia-msgs"></div>
        <div class="lia-input-row">
          <input class="lia-input" id="lia-input" placeholder="Pergunte qualquer coisa para a LIA...">
          <button class="lia-send" id="lia-send" aria-label="Enviar">${SEND}</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    el("lia-bubble").addEventListener("click", open);
    el("lia-close").addEventListener("click", close);
    el("lia-send").addEventListener("click", sendFromInput);
    el("lia-input").addEventListener("keydown", (e) => { if (e.key === "Enter") sendFromInput(); });
  }

  function msgUser(texto) {
    el("lia-msgs").insertAdjacentHTML("beforeend", `<div class="lia-msg user">${texto}</div>`);
    scroll();
  }

  function typing(on) {
    const cur = el("lia-typing");
    if (cur) cur.remove();
    if (on) {
      el("lia-msgs").insertAdjacentHTML("beforeend",
        `<div class="lia-msg lia" id="lia-typing"><span class="lia-typing"><i></i><i></i><i></i></span></div>`);
      scroll();
    }
  }

  function msgLiaStream(texto, done) {
    typing(false);
    const id = "m" + Math.floor(performance.now());
    el("lia-msgs").insertAdjacentHTML("beforeend", `<div class="lia-msg lia" id="${id}"></div>`);
    let i = 0;
    const iv = setInterval(() => {
      i += 2;
      el(id).textContent = texto.slice(0, i);
      scroll();
      if (i >= texto.length) { clearInterval(iv); if (done) done(); }
    }, 18);
    timers.push(iv);
  }

  function scroll() {
    const m = el("lia-msgs");
    m.scrollTop = m.scrollHeight;
  }

  function play(steps, i) {
    if (i >= steps.length) return;
    const s = steps[i];
    if (s.de === "user") {
      later(() => { msgUser(s.texto); play(steps, i + 1); }, s.delay ?? 600);
    } else {
      later(() => {
        typing(true);
        later(() => msgLiaStream(s.texto, () => play(steps, i + 1)), s.digitando ?? 1200);
      }, s.delay ?? 400);
    }
  }

  function open() {
    opened = true;
    el("lia-bubble").hidden = true;
    el("lia-panel").hidden = false;
    if (!played) { played = true; play(roteiro, 0); }
    document.dispatchEvent(new CustomEvent("lia:open"));
  }

  function close() {
    opened = false;
    el("lia-panel").hidden = true;
    el("lia-bubble").hidden = false;
  }

  function replay() {
    clearTimers();
    el("lia-msgs").innerHTML = "";
    played = true;
    if (!opened) open();
    play(roteiro, 0);
  }

  function sendFromInput() {
    const input = el("lia-input");
    const v = input.value.trim();
    if (!v) return;
    input.value = "";
    msgUser(v);
    typing(true);
    later(() => msgLiaStream("Entendi! No produto real eu executaria isso agora. Aqui no protótipo, esta conversa é uma simulação de design."), 1200);
  }

  window.Lia = {
    mount(opts) {
      roteiro = (opts && opts.roteiro) || [
        { de: "lia", texto: "Olá! Sou a LIA, sua assistente de recrutamento. Posso buscar candidatos, criar vagas e disparar triagens. Como posso ajudar?", digitando: 1000 },
      ];
      mountDom();
    },
    open, close, replay,
    get opened() { return opened; },
  };
})();
