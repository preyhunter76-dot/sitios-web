// Cartel Trading · Plan de riesgo personalizable (pestaña del sistema).
// Plantilla inicial para una cuenta de US$100 con reglas de gestión de riesgo de uso profesional (1 % por operación,
// límites diarios y semanales, relación beneficio/riesgo mínima). Es educación general: cada persona ajusta sus valores.
// Los valores se guardan solo en este navegador (localStorage).
window.CT_RIESGO = (() => {
  const KEY = "ct-plan-riesgo";
  const DEF = { capital: 100, riesgo: 1, diaria: 3, semanal: 6, maxdd: 15, ops: 3, rr: 2, mercado: "forex", entrada: 0, stop: 0,
    horario: "Londres y Nueva York (7:00–16:00 hora Colombia)", setups: "Solo los probados en FX Replay con al menos 50 operaciones",
    noticias: true, pausa: true };
  const load = () => { try { return { ...DEF, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return { ...DEF }; } };
  const save = (p) => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} };
  const usd = (n) => `US$${(Math.round(n * 100) / 100).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  // Valor por punto del lote mínimo (0,01). Forex con cotización en USD: 0,01 lote = US$0,10 por pip. Oro: 0,01 lote = 1 onza = US$1 por cada US$1.
  const MARKETS = {
    forex: { label: "Forex (EUR/USD, GBP/USD…)", unit: "pips", per: 0.10, min: 0.01, step: 0.01, lote: "lotes" },
    oro: { label: "Oro (XAU/USD)", unit: "US$ de movimiento", per: 1, min: 0.01, step: 0.01, lote: "lotes" },
    indice: { label: "Índice (US500 en CFD)", unit: "puntos", per: 0.01, min: 0.01, step: 0.01, lote: "lotes" },
    cripto: { label: "Cripto al contado (BTC, ETH…)", unit: "precio", per: 1, min: 0, step: 0, lote: "unidades" },
  };

  function html() {
    const p = load();
    const field = (k, label, attrs = "", hint = "") => `<label class="rk-f"><span>${label}</span><input name="${k}" value="${p[k]}" ${attrs}>${hint ? `<small>${hint}</small>` : ""}</label>`;
    return `<p class="ct-warn"><b>Plantilla educativa para una cuenta de US$100.</b> Son reglas de gestión de riesgo de uso común entre traders profesionales, no una recomendación de inversión. Cambia cualquier valor: el plan se recalcula y se guarda solo en este navegador.</p>
    <div class="ct-grid rk">
      <section class="ct-card wide"><h3>Tus reglas</h3>
        <form class="rk-form" id="rkForm">
          ${field("capital", "Capital de la cuenta (US$)", 'type="number" min="10" step="1"', "Dinero que puedes perder sin afectar tu vida.")}
          ${field("riesgo", "Riesgo por operación (%)", 'type="number" min="0.1" max="5" step="0.1"', "Profesional: 0,5 % a 1 %. Nunca más de 2 %.")}
          ${field("diaria", "Pérdida máxima diaria (%)", 'type="number" min="0.5" max="20" step="0.5"', "Al llegar, se apaga la plataforma hasta mañana.")}
          ${field("semanal", "Pérdida máxima semanal (%)", 'type="number" min="1" max="30" step="0.5"', "Al llegar, se para hasta el lunes y se revisa el journal.")}
          ${field("maxdd", "Caída máxima de la cuenta (%)", 'type="number" min="5" max="50" step="1"', "Al llegar, se vuelve a cuenta demo y FX Replay.")}
          ${field("ops", "Operaciones máximas por día", 'type="number" min="1" max="10" step="1"')}
          ${field("rr", "Beneficio mínimo por cada 1 de riesgo (R)", 'type="number" min="1" max="5" step="0.5"', "Con 1:2 basta acertar más del 34 % para no perder.")}
          ${field("horario", "Horario en que sí operas", 'type="text" maxlength="90"')}
          ${field("setups", "Setups permitidos", 'type="text" maxlength="120"')}
          <label class="rk-c"><input type="checkbox" name="noticias" ${p.noticias ? "checked" : ""}><span>No operar 30 min antes y después de noticias de alto impacto</span></label>
          <label class="rk-c"><input type="checkbox" name="pausa" ${p.pausa ? "checked" : ""}><span>Después de 2 pérdidas seguidas, pausa de 1 hora</span></label>
          <div class="rk-actions"><button type="button" class="btn btn-line" id="rkReset">Volver a la plantilla de US$100</button><button type="button" class="btn btn-light" id="rkCopy">Copiar mi plan</button></div>
        </form>
      </section>
      <section class="ct-card"><h3>Tu plan en dólares</h3><div id="rkOut" class="rk-out"></div></section>
      <section class="ct-card wide"><h3>Calculadora de tamaño de posición</h3>
        <div class="rk-form rk-calc">
          <label class="rk-f"><span>Mercado</span><select name="mercado" form="rkForm">${Object.entries(MARKETS).map(([k, m]) => `<option value="${k}"${p.mercado === k ? " selected" : ""}>${m.label}</option>`).join("")}</select></label>
          <label class="rk-f"><span id="rkStopLbl">Distancia del stop</span><input name="stop" form="rkForm" type="number" min="0" step="any" value="${p.stop || ""}" placeholder="Ej.: 15"></label>
          <label class="rk-f rk-entry"><span>Precio de entrada (solo cripto)</span><input name="entrada" form="rkForm" type="number" min="0" step="any" value="${p.entrada || ""}" placeholder="Ej.: 79000"></label>
        </div>
        <div id="rkSize" class="rk-size"></div><p class="ct-src">Valores típicos del lote mínimo (0,01): forex US$0,10 por pip, oro US$1 por cada dólar de movimiento, US500 US$0,01 por punto. Confirma el valor exacto en tu bróker.</p>
      </section>
      <section class="ct-card"><h3>Si pierdes varias seguidas</h3><div id="rkStreak"></div></section>
      <section class="ct-card wide"><h3>Por qué estas reglas</h3><ul class="ct-list">
        <li>Arriesgar el 1 % permite sobrevivir a 10 pérdidas seguidas y conservar cerca del 90 % de la cuenta.</li>
        <li>Con US$100, el 1 % es US$1: en forex eso obliga a usar el lote mínimo (0,01) y stops cortos. Es normal: la meta es aprender el proceso, no ganar rápido.</li>
        <li>Para recuperar una caída del 50 % hay que ganar el 100 %. Por eso los límites diarios y semanales cortan las rachas malas antes de que crezcan.</li>
        <li>Entre el 74 % y el 89 % de las cuentas minoristas de CFD pierden dinero (ESMA). Sin apalancamiento alto y con stop en cada operación, el riesgo baja.</li>
        <li>Cada operación va al journal: fecha, activo, setup, entrada, stop, objetivo, resultado y aprendizaje.</li>
      </ul></section>
    </div>`;
  }

  function bind(root) {
    const form = root.querySelector("#rkForm"); if (!form) return;
    const num = (n) => Number(String(form.elements[n].value).replace(",", ".")) || 0;
    function calc() {
      const p = { capital: num("capital"), riesgo: num("riesgo"), diaria: num("diaria"), semanal: num("semanal"), maxdd: num("maxdd"), ops: num("ops"), rr: num("rr"),
        horario: form.elements.horario.value, setups: form.elements.setups.value, noticias: form.elements.noticias.checked, pausa: form.elements.pausa.checked,
        mercado: form.elements.mercado.value, stop: num("stop"), entrada: num("entrada") };
      save(p);
      const r1 = (p.capital * p.riesgo) / 100, day = (p.capital * p.diaria) / 100, week = (p.capital * p.semanal) / 100, dd = (p.capital * p.maxdd) / 100;
      const perDay = r1 > 0 ? Math.max(1, Math.floor(day / r1 + 1e-9)) : 0;
      const be = 100 / (1 + p.rr);
      const warn = [];
      if (p.riesgo > 2) warn.push("Arriesgas más del 2 % por operación: con pocas pérdidas seguidas la cuenta cae mucho.");
      if (p.diaria < p.riesgo) warn.push("La pérdida diaria es menor que el riesgo de una operación: no podrías operar.");
      if (p.semanal < p.diaria) warn.push("La pérdida semanal debería ser mayor o igual a la diaria.");
      if (p.rr < 1.5) warn.push("Con menos de 1,5 R de beneficio necesitas acertar muchas operaciones para no perder.");
      root.querySelector("#rkOut").innerHTML = `<dl class="rk-kv">
        <div><dt>Riesgo por operación</dt><dd>${usd(r1)}</dd></div><div><dt>Objetivo mínimo por operación</dt><dd>${usd(r1 * p.rr)}</dd></div>
        <div><dt>Pérdida máxima diaria</dt><dd>${usd(day)} · ${perDay} pérdida(s)</dd></div><div><dt>Pérdida máxima semanal</dt><dd>${usd(week)}</dd></div>
        <div><dt>Caída máxima de la cuenta</dt><dd>${usd(dd)} → la cuenta queda en ${usd(p.capital - dd)}</dd></div>
        <div><dt>Acierto mínimo para no perder</dt><dd>${be.toFixed(0)} % de las operaciones</dd></div>
        <div><dt>Operaciones por día</dt><dd>Máximo ${p.ops}</dd></div></dl>
        ${warn.length ? `<ul class="rk-warn">${warn.map((w) => `<li>${w}</li>`).join("")}</ul>` : `<p class="rk-ok">Reglas coherentes.</p>`}`;
      // Tamaño de posición
      const m = MARKETS[p.mercado];
      root.querySelector("#rkStopLbl").textContent = p.mercado === "cripto" ? "Precio del stop" : `Distancia del stop (${m.unit})`;
      root.querySelector(".rk-entry").hidden = p.mercado !== "cripto";
      let size = "";
      if (p.mercado === "cripto") {
        const dist = Math.abs(p.entrada - p.stop);
        size = p.entrada && p.stop && dist ? (() => { const u = r1 / dist; return `<b>${u.toPrecision(3)} unidades</b><span>Valor de la posición: ${usd(u * p.entrada)}${u * p.entrada > p.capital ? " · más que tu capital: necesitarías apalancamiento, mejor amplía el stop o no operes" : ""}</span>`; })() : `<span>Escribe el precio de entrada y el del stop.</span>`;
      } else if (p.stop > 0) {
        const lots = r1 / (p.stop * (m.per / m.min));
        const ok = Math.floor(lots / m.step + 1e-9) * m.step;
        size = ok >= m.min ? `<b>${ok.toFixed(2)} ${m.lote}</b><span>Con ese tamaño, el stop cuesta ${usd(ok * (m.per / m.min) * p.stop)}.</span>`
          : `<b>No alcanza</b><span>Con ${usd(r1)} de riesgo, el lote mínimo (${m.min}) con este stop costaría ${usd(m.per * p.stop)}. Acorta el stop a ${(r1 / m.per).toFixed(1)} ${m.unit} o no tomes la operación.</span>`;
      } else size = `<span>Escribe la distancia del stop.</span>`;
      root.querySelector("#rkSize").innerHTML = size;
      // Racha de pérdidas
      const rows = [3, 5, 10, 15, 20].map((n) => { const left = p.capital * Math.pow(1 - p.riesgo / 100, n); return `<li><b>${n} pérdidas</b><span>${usd(left)}</span><i style="--w:${(left / p.capital) * 100}%"></i></li>`; }).join("");
      root.querySelector("#rkStreak").innerHTML = `<ul class="rk-streak">${rows}</ul><p class="ct-src">Arriesgando ${p.riesgo} % de lo que queda en cada operación.</p>`;
      return p;
    }
    form.addEventListener("input", calc);
    root.querySelector("#rkReset").addEventListener("click", () => { save(DEF); root.dispatchEvent(new CustomEvent("rk-reset", { bubbles: true })); });
    root.querySelector("#rkCopy").addEventListener("click", async (e) => {
      const p = calc(), r1 = (p.capital * p.riesgo) / 100;
      const txt = `Plan de riesgo · Cartel Trading\nCapital: ${usd(p.capital)}\nRiesgo por operación: ${p.riesgo} % (${usd(r1)})\nPérdida máxima diaria: ${p.diaria} % (${usd(p.capital * p.diaria / 100)})\nPérdida máxima semanal: ${p.semanal} % (${usd(p.capital * p.semanal / 100)})\nCaída máxima de la cuenta: ${p.maxdd} %\nOperaciones por día: ${p.ops}\nBeneficio mínimo: 1:${p.rr}\nHorario: ${p.horario}\nSetups: ${p.setups}\n${p.noticias ? "No operar 30 min antes y después de noticias de alto impacto\n" : ""}${p.pausa ? "Pausa de 1 hora después de 2 pérdidas seguidas\n" : ""}`;
      try { await navigator.clipboard.writeText(txt); e.target.textContent = "¡Copiado!"; } catch { e.target.textContent = "No se pudo copiar"; }
      setTimeout(() => (e.target.textContent = "Copiar mi plan"), 2000);
    });
    calc();
  }
  return { html, bind };
})();
