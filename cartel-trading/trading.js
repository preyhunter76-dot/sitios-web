// Cartel Trading · el sistema del módulo 36 del Cerebro, en el sitio público.
// Datos: window.INTEL (intel.js, exportado del Cerebro). Precios vivos: /api/mercado (Yahoo con retraso y Forex Factory).
// Nada aquí es una señal de compra o venta: son datos, contexto, causalidad y escenarios.
(() => {
  const I = window.INTEL, root = document.getElementById("ctApp");
  if (!I || !root) return;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const T = I.trading, THEMES = I.THEMES;
  const live = new Map();
  const fmt = (q) => q ? `${q.price >= 1000 ? q.price.toLocaleString("es-CO", { maximumFractionDigits: 0 }) : q.price.toLocaleString("es-CO", { maximumFractionDigits: q.price < 1 ? 4 : 2 })} ${q.currency || ""}` : "N/D";
  const chg = (q) => q ? `<em class="${q.changePct >= 0 ? "up" : "down"}">${q.changePct >= 0 ? "+" : ""}${q.changePct.toFixed(2)} %</em>` : "";
  const hora = (q) => q ? new Date(q.time).toLocaleString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
  const card = (title, body, cls = "") => `<section class="ct-card ${cls}"><h3>${esc(title)}</h3>${body}</section>`;
  const chips = (arr) => `<ul class="ct-chips">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const chain = (arr) => `<ol class="ct-chain">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;
  const list = (arr) => `<ul class="ct-list">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const facts = (arr) => `<div class="ct-facts">${arr.map((f) => `<div><b>${esc(f.k || f.stat)}</b><span>${esc(f.t || f.text)}</span></div>`).join("")}</div>`;

  async function quotes(symbols) {
    const need = symbols.filter((s) => s && !live.has(s));
    if (!need.length) return;
    for (let i = 0; i < need.length; i += 40) {
      try {
        const r = await fetch(`/api/mercado?s=${encodeURIComponent(need.slice(i, i + 40).join(","))}`);
        if (!r.ok) throw 0;
        (await r.json()).quotes.forEach((q) => live.set(q.symbol, q));
      } catch { need.slice(i, i + 40).forEach((s) => live.set(s, null)); }
    }
  }

  /* ——— 1 · Mesa de trading ——— */
  function desk() {
    const h = new Date().getUTCHours();
    const open = (s) => (s.open < s.close ? h >= s.open && h < s.close : h >= s.open || h < s.close);
    return `<div class="ct-grid">
      ${card("Pulso del mercado", `<div class="ct-quotes" data-q="${I.PULSE.map((p) => p.yahoo).join(",")}">${I.PULSE.map((p) => `<div class="ct-q" data-s="${esc(p.yahoo)}"><span>${esc(p.label)}</span><b>…</b><small></small></div>`).join("")}</div><p class="ct-src">Yahoo Finance · precios públicos con retraso</p>`, "wide")}
      ${card("Sesiones de mercado (hora UTC)", `<ul class="ct-sessions">${T.sessions.map((s) => `<li data-on="${open(s) ? 1 : 0}"><b>${esc(s.name)}</b><span>${String(s.open).padStart(2, "0")}:00–${String(s.close).padStart(2, "0")}:00</span><i>${open(s) ? "Abierta" : "Cerrada"}</i></li>`).join("")}</ul><p class="ct-src">Aproximadas: se mueven una hora con el horario de verano.</p>`)}
      ${card("Calendario de la semana · alto impacto", `<div id="ctCal" class="ct-cal"><p class="ct-src">Cargando Forex Factory…</p></div>`)}
      ${card("El sistema: una app por tarea", `<ul class="ct-stack">${T.stack.map((s) => `<li><a href="${esc(s.link)}" target="_blank" rel="noopener"><b>${esc(s.role)}</b><span>${esc(s.name)} · ${esc(s.how)}</span><i data-st="${esc(s.state)}">${esc(T.stackStates[s.state] || "")}</i></a></li>`).join("")}</ul>`, "wide")}
      ${card("Plataformas revisadas", `<ul class="ct-plat">${T.platforms.map((p) => `<li data-risk="${esc(p.risk)}"><b>${esc(p.name)}</b><span>${esc(p.use)}</span><p>${esc(p.note)}</p></li>`).join("")}</ul>`, "wide")}
      ${card("Lo que hay que saber", facts(T.facts) + `<p class="ct-src">${T.sourcesUrl.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join(" · ")}</p>`)}
      ${card("Mercados de interés", chips(T.interests))}
      ${card("Reglas personales (por definir)", list(T.rules) + `<p class="ct-src">Estado: ${esc(T.status)}.</p>`)}
    </div>`;
  }

  /* ——— 2 · Tesis temática ——— */
  function thesis() {
    const inv = I.IEA.investment.map((x) => `<li><span>${esc(x.label)}</span><i style="--w:${Math.min(Math.abs(x.v) * 2, 100)}%" data-neg="${x.v < 0 ? 1 : 0}"></i><b>${x.v > 0 ? "+" : ""}${x.v} %</b></li>`).join("");
    const ds = I.IEA.downstream.map((x) => `<li><span>${esc(x.stage)}</span><i style="--w:${x.kt * 2}%"></i><b>${x.kt} kt</b></li>`).join("");
    return `<div class="ct-grid">
      ${card("Cuatro cadenas", I.CHAINS.map((c) => `<div class="ct-chainbox"><h4>${esc(c.name)}</h4>${chain(c.links)}</div>`).join(""), "wide")}
      ${card("La cadena maestra", chain(I.MASTER_CHAIN), "wide")}
      ${card("Al final todo conecta con", chips(I.FINAL_CHAIN))}
      ${card("IEA · minerales críticos", facts(I.IEA.facts) + `<p class="ct-src">${esc(I.IEA.source)}</p>`, "wide")}
      ${card("Inversión (variación)", `<ul class="ct-bars">${inv}</ul>`)}
      ${card("Cadena downstream de tierras raras (2035)", `<ul class="ct-bars">${ds}</ul><p class="ct-note">${esc(I.IEA.downstreamNote)}</p>`)}
      ${card("Minerales más vulnerables", chips(I.IEA.vulnerable))}
      ${card("China y las tierras raras", facts(I.CHINA_REE))}
      ${card("Ante una restricción de exportación, revisar", list(I.EXPORT_CHECKLIST))}
      ${card("Minerales que seguimos", `<h4>Tierras raras</h4>${chips(I.MINERALS.ree)}<h4>Metales</h4>${chips(I.MINERALS.metals)}<h4>Downstream</h4>${chips(I.MINERALS.downstream)}`, "wide")}
      ${card("Geopolítica", `<p>${esc(I.GEOPOLITICS.un)}</p><p class="ct-note">${esc(I.GEOPOLITICS.unRule)}</p><h4>${esc(I.GEOPOLITICS.correction.title)}</h4><p>${esc(I.GEOPOLITICS.correction.fact)}</p><p class="ct-note">${esc(I.GEOPOLITICS.correction.niron)}</p>`, "wide")}
      ${card("De qué depende la energía de la IA", chips(I.ENERGY_DEPENDS))}
    </div>`;
  }

  /* ——— 3 · Universo y 4 · Cripto ——— */
  const assetCard = (a) => `<article class="ct-asset" data-theme="${esc(a.theme)}" style="--c:${THEMES[a.theme]?.color || "#888"}">
      <header><b>${esc(a.ticker)}</b><span>${esc(a.name)}</span><small>${esc(a.kind)} · ${esc(THEMES[a.theme]?.label || "")}</small></header>
      <div class="ct-live" data-s="${esc(a.yahoo || "")}">${a.yahoo ? `<b>…</b><small>precio vivo</small>` : `<b>N/D</b><small>sin cotización pública</small>`}</div>
      ${a.snap.length ? `<dl>${a.snap.map((s) => `<div><dt>${esc(s.label)}${s.tag ? ` <i>${esc(s.tag)}</i>` : ""}</dt><dd>${esc(s.value)}</dd></div>`).join("")}</dl><p class="ct-src">Snapshot ${esc(I.SNAPSHOT_DATE)}</p>` : `<p class="ct-src">Sin snapshot en el documento.</p>`}
      ${a.thesis ? `<p><b>Tesis:</b> ${esc(a.thesis)}</p>` : ""}${a.track ? `<p><b>Seguir:</b> ${esc(a.track.join(", "))}</p>` : ""}${a.rule ? `<p class="ct-note">${esc(a.rule)}</p>` : ""}
    </article>`;
  function universe(family) {
    const themes = Object.entries(THEMES).filter(([, t]) => t.family === family);
    const assets = I.ASSETS.filter((a) => THEMES[a.theme]?.family === family);
    return `<div class="ct-filter" role="group" aria-label="Filtrar por tema"><button data-f="all" data-on="">Todos (${assets.length})</button>${themes.map(([id, t]) => `<button data-f="${id}" style="--c:${t.color}">${esc(t.label)}</button>`).join("")}</div>
      <div class="ct-assets">${assets.map(assetCard).join("")}</div>`;
  }
  function crypto() {
    const max = Math.max(...I.STABLECOINS.map((s) => s.capB));
    const ev = I.CIRCLE_EVENT;
    return universe("Cripto") + `<div class="ct-grid">
      ${card("Stablecoins por market cap", `<ul class="ct-stable">${I.STABLECOINS.map((s) => `<li><b>${esc(s.t)}</b><i style="--w:${(s.capB / max) * 100}%"></i><span>${esc(s.cap)}</span><small>${esc(s.type)} · ${esc(s.issuer)}${s.note ? ` · ${esc(s.note)}` : ""}</small></li>`).join("")}</ul><p class="ct-src">${esc(I.STABLE_NOTE)}</p>`, "wide")}
      ${card(`${ev.date} · ${ev.title}`, list(ev.facts) + `<h4>Cadena de impacto</h4>${chain(ev.chain)}<p class="ct-src">${esc(ev.sources)}</p>`, "wide")}
    </div>`;
  }

  /* ——— 5 · Carteras modelo ——— */
  function portfolios() {
    const bar = (rows, key) => `<div class="ct-stack-bar">${rows.map((r) => `<i style="--w:${r.w}%;--c:${r.color || "var(--pink)"}" title="${esc(r[key])} ${r.w} %"></i>`).join("")}</div>`;
    const sc = I.SCENARIOS_THEMATIC;
    return `<p class="ct-warn"><b>Modelo hipotético.</b> Estas carteras vienen de los documentos de trabajo de Diego (${esc(I.SNAPSHOT_DATE)}) y sirven para estudiar la exposición por tema. No son una recomendación de inversión ni una invitación a comprar ningún activo.</p>
    <div class="ct-grid">
      ${card("Cartera temática (pesos)", bar(I.THEMATIC_PORTFOLIO, "theme") + `<ul class="ct-weights">${I.THEMATIC_PORTFOLIO.map((r) => `<li style="--c:${r.color}"><b>${r.w} %</b><span>${esc(r.theme)}</span><small>${r.inner.map(([t, w]) => `${esc(t)} ${w} %`).join(" · ")}</small></li>`).join("")}</ul>`, "wide")}
      ${card("Cartera cripto (pesos)", bar(I.CRYPTO_PORTFOLIO.map((r, i) => ({ ...r, color: ["#C9A96E", "#3987e5", "#9085e9", "#199e70", "#d95926", "#c98500", "#d55181", "#e66767", "#8C8F99", "#5bb", "#777"][i] })), "t") + chips(I.CRYPTO_PORTFOLIO.map((r) => `${r.t} ${r.w} %`)))}
      ${card("Activos que se mueven juntos", `<ul class="ct-list">${I.CORRELATED.map((c) => `<li><b>${esc(c.group)}:</b> ${esc(c.items.join(", "))}</li>`).join("")}</ul>`)}
      ${card("Escenarios temáticos 2027–2030", `<table class="ct-table"><thead><tr><th>Tema</th><th>Débil</th><th>Base</th><th>Fuerte</th></tr></thead><tbody>${sc.rows.map((r) => `<tr><td>${esc(r.theme)}</td><td>${esc(r.weak)}</td><td>${esc(r.base)}</td><td>${esc(r.strong)}</td></tr>`).join("")}</tbody></table>
        <div class="ct-cols">${["weak", "base", "strong"].map((k) => `<div><h4>${{ weak: "Débil", base: "Base", strong: "Fuerte" }[k]}</h4>${list(sc.conditions[k])}</div>`).join("")}</div><p class="ct-note">${esc(sc.note)}</p>`, "wide")}
      ${card("Escenarios cripto", `<table class="ct-table"><thead><tr><th>Activo</th><th>Qué seguir</th><th>Largo plazo</th></tr></thead><tbody>${I.SCENARIOS_CRYPTO.map((r) => `<tr><td>${esc(r.asset)}</td><td>${esc(r.track || [r.weak && "Débil: " + r.weak, r.base && "Base: " + r.base, r.strong && "Fuerte: " + r.strong].filter(Boolean).join(" "))}</td><td>${esc(r.long)}</td></tr>`).join("")}</tbody></table>`, "wide")}
    </div>`;
  }

  /* ——— 6 · Alertas y método ——— */
  function method() {
    return `<div class="ct-grid">
      ${card("Umbrales de movimiento diario", `<ul class="ct-alerts">${I.MOVE_ALERTS.map((a) => `<li data-s="${esc(a.yahoo)}" data-pct="${a.pct}"><b>${esc(a.t)}</b><span>Avisa si se mueve más de ${a.pct} %</span><i>…</i></li>`).join("")}<li><b>Acciones</b><span>Avisa si se mueven más de ${I.STOCK_MOVE_PCT} %</span></li><li><b>Stablecoins</b><span>Pérdida de paridad de ${I.PEG_LIMITS.depeg1} % y ${I.PEG_LIMITS.depeg2} %</span></li></ul><p class="ct-src">Umbrales de seguimiento, no señales de compra o venta.</p>`, "wide")}
      ${I.EVENT_ALERTS.map((g) => card(`Alertas · ${g.group}`, list(g.items))).join("")}
      ${card("Tipos de dato", `<ul class="ct-list">${I.FACT_TYPES.map((f) => `<li><b>${esc(f.k)}:</b> ${esc(f.t)}</li>`).join("")}</ul>${chips(I.DATA_STATUS)}`)}
      ${card("Fuentes por nivel", I.SOURCE_LEVELS.map((s) => `<h4>${esc(s.level)} · ${esc(s.use)}</h4>${chips(s.items)}`).join(""), "wide")}
      ${card("Causalidad temática", chain(I.CAUSALITY.thematic.steps) + `<h4>Ejemplo</h4>${chain(I.CAUSALITY.thematic.example)}`, "wide")}
      ${card("Causalidad cripto", chain(I.CAUSALITY.crypto.steps) + `<h4>Ejemplo</h4>${chain(I.CAUSALITY.crypto.example)}`, "wide")}
      ${card("Reglas del sistema", `<ol class="ct-list">${I.BRAIN_RULES.map((r) => `<li>${esc(r)}</li>`).join("")}</ol>`)}
      ${card("Preguntas maestras", chips(I.MASTER_QUESTIONS))}
      ${card("Cada cuánto se actualiza", `<ul class="ct-cad">${I.CADENCE.map((c) => `<li data-ok="${c.ok ? 1 : 0}"><b>${esc(c.when)}</b><span>${esc(c.what)}</span><small>${esc(c.real)}</small></li>`).join("")}</ul>`, "wide")}
      ${I.METRIC_SETS.map((m) => card(`Métricas · ${m.name}`, list(m.items))).join("")}
    </div>`;
  }

  /* ——— 7 · Registro ——— */
  function log() {
    return `<div class="ct-grid">
      ${card("Journal de operaciones", `<p class="ct-empty">Sin operaciones registradas todavía.</p><p>Cada operación se anota en el journal con fecha, activo, setup, entrada, stop, objetivo, resultado y aprendizaje. Los resultados se publican aquí solo cuando estén verificados en Myfxbook.</p>`, "wide")}
      ${card("Reglas que faltan antes de operar", list(T.rules))}
      ${card("Bot de trading · en diseño", `<p>El siguiente paso es automatizar el método: leer datos, aplicar las reglas y avisar cuando se cumplan las condiciones. Primero se prueban las reglas en FX Replay; sin reglas probadas, no hay bot.</p><p class="ct-note">El bot será una herramienta de estudio y alertas. Ofrecer gestión de dinero o recomendaciones a terceros en Colombia requiere autorización de la Superintendencia Financiera.</p>`)}
    </div>`;
  }

  /* ——— Pestañas ——— */
  const TABS = [["desk", "Mesa de trading", desk], ["thesis", "Tesis temática", thesis], ["universe", "Universo de activos", () => universe("Temática")], ["crypto", "Cripto y dinero digital", crypto], ["portfolios", "Carteras modelo", portfolios], ["method", "Alertas y método", method], ["log", "Registro", log]];
  let current = (() => { try { return localStorage.getItem("ct-tab") || "desk"; } catch { return "desk"; } })();
  if (!TABS.some((t) => t[0] === current)) current = "desk";
  root.innerHTML = `<nav class="ct-tabs" role="tablist" aria-label="Secciones del sistema">${TABS.map(([id, label]) => `<button role="tab" data-tab="${id}" aria-selected="false">${label}</button>`).join("")}</nav><div class="ct-panel" role="tabpanel"></div>
    <p class="ct-disclaimer">${esc(I.INTEL_DISCLAIMER.replace("el Cerebro da", "Cartel Trading da"))} Datos exportados del Cerebro el ${new Date(I.exportedAt).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}.</p>`;
  const panel = root.querySelector(".ct-panel");

  async function paintLive() {
    const syms = [...panel.querySelectorAll("[data-s]")].map((el) => el.dataset.s).filter(Boolean);
    await quotes([...new Set(syms)]);
    panel.querySelectorAll(".ct-q[data-s], .ct-live[data-s]").forEach((el) => { const q = live.get(el.dataset.s); if (!el.dataset.s) return;
      el.querySelector("b").textContent = fmt(q); el.querySelector("small").innerHTML = q ? `${chg(q)} · ${hora(q)}` : "Precio vivo no disponible"; });
    panel.querySelectorAll(".ct-alerts li[data-s]").forEach((el) => { const q = live.get(el.dataset.s), i = el.querySelector("i"); if (!q) { i.textContent = "N/D"; return; }
      const hit = Math.abs(q.changePct) >= Number(el.dataset.pct); el.dataset.hit = hit ? 1 : 0; i.innerHTML = `${chg(q)} ${hit ? "· supera el umbral" : "· dentro del rango"}`; });
  }
  async function paintCal() {
    const box = panel.querySelector("#ctCal"); if (!box) return;
    try {
      const r = await fetch("/api/mercado?cal=1"); const rows = (await r.json()).calendar.filter((e) => e.impact === "High");
      box.innerHTML = rows.length ? `<ul class="ct-events">${rows.slice(0, 14).map((e) => `<li><time>${new Date(e.date).toLocaleString("es-CO", { weekday: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</time><b>${esc(e.country)}</b><span>${esc(e.title)}</span><small>${e.forecast ? "Pronóstico " + esc(e.forecast) : ""}${e.previous ? " · anterior " + esc(e.previous) : ""}</small></li>`).join("")}</ul><p class="ct-src">Forex Factory · no operar 30 min antes y después</p>` : `<p class="ct-src">Sin eventos de alto impacto esta semana.</p>`;
    } catch { box.innerHTML = `<p class="ct-src">Calendario no disponible en este momento.</p>`; }
  }
  function show(id) {
    current = id; try { localStorage.setItem("ct-tab", id); } catch {}
    root.querySelectorAll(".ct-tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === id)));
    panel.innerHTML = TABS.find((t) => t[0] === id)[2]();
    panel.querySelectorAll(".ct-filter button").forEach((b) => b.addEventListener("click", () => {
      panel.querySelectorAll(".ct-filter button").forEach((x) => x.toggleAttribute("data-on", x === b));
      panel.querySelectorAll(".ct-asset").forEach((a) => (a.hidden = b.dataset.f !== "all" && a.dataset.theme !== b.dataset.f));
    }));
    paintLive(); paintCal();
  }
  root.querySelector(".ct-tabs").addEventListener("click", (e) => { const b = e.target.closest("button[data-tab]"); if (b) show(b.dataset.tab); });
  document.querySelectorAll("[data-ct-tab]").forEach((a) => a.addEventListener("click", () => show(a.dataset.ctTab)));
  show(current);
})();
