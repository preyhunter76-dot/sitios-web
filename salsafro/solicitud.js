// Carrito de solicitudes (booking, servicios, showcases). No guarda datos en ningún servidor:
// arma un correo (o un WhatsApp, si se configura) con lo elegido y lo abre en el dispositivo de quien pide.
// Uso: Solicitud.init({ brand, email, whatsapp, label }); botones con data-req-id, data-req-name, data-req-detail.
(() => {
  const S = {};
  let cfg = {}, items = [];
  const KEY = () => `solicitud-${cfg.brand}`;
  const $ = (q) => document.querySelector(q);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const save = () => { try { localStorage.setItem(KEY(), JSON.stringify(items)); } catch {} };

  function mount() {
    const el = document.createElement("div");
    el.innerHTML = `
      <button class="rq-fab" id="rqFab" aria-label="Ver tu solicitud"><svg viewBox="0 0 24 24"><path d="M5 4h14v16l-7-4-7 4z"/></svg><span id="rqCount">0</span></button>
      <div class="rq-overlay" id="rqOverlay"></div>
      <aside class="rq-drawer" id="rqDrawer" aria-hidden="true" aria-label="${esc(cfg.label)}">
        <header><div><small>${esc(cfg.brand)}</small><h3>${esc(cfg.label)}</h3></div><button id="rqClose" aria-label="Cerrar">×</button></header>
        <div class="rq-list" id="rqList"></div>
        <form class="rq-form" id="rqForm">
          <label>Tu nombre<input name="nombre" required autocomplete="name"></label>
          <div class="rq-two"><label>Ciudad / país<input name="ciudad" required></label><label>Fecha tentativa<input name="fecha" type="date"></label></div>
          <label>Detalles (evento, aforo, idea)<textarea name="detalle" rows="3"></textarea></label>
          <button class="rq-send" type="submit">Enviar solicitud</button>
          <p class="rq-fine">Se abre tu correo${cfg.whatsapp ? " o WhatsApp" : ""} con la solicitud lista. Las tarifas se cotizan por evento y no se publican.</p>
        </form>
      </aside>
      <div class="rq-toast" id="rqToast"></div>`;
    document.body.appendChild(el);
    $("#rqFab").onclick = () => open(true);
    $("#rqClose").onclick = $("#rqOverlay").onclick = () => open(false);
    $("#rqForm").onsubmit = send;
    $("#rqList").addEventListener("click", (e) => { const b = e.target.closest("[data-rm]"); if (b) { items = items.filter((i) => i.id !== b.dataset.rm); render(); } });
  }
  function open(on) { $("#rqDrawer").classList.toggle("on", on); $("#rqOverlay").classList.toggle("on", on); $("#rqDrawer").setAttribute("aria-hidden", String(!on)); }
  function toast(t) { const el = $("#rqToast"); el.textContent = t; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("on"), 2400); }
  function render() {
    $("#rqCount").textContent = items.length;
    $("#rqFab").classList.toggle("has", items.length > 0);
    $("#rqList").innerHTML = items.length
      ? items.map((i) => `<div class="rq-item"><div><b>${esc(i.name)}</b><small>${esc(i.detail || "")}</small></div><button data-rm="${esc(i.id)}" aria-label="Quitar">×</button></div>`).join("")
      : `<p class="rq-empty">Aún no elegiste nada. Agrega un formato o servicio para pedir cotización.</p>`;
    document.querySelectorAll("[data-req-id]").forEach((b) => b.classList.toggle("in", items.some((i) => i.id === b.dataset.reqId)));
    save();
  }
  function send(e) {
    e.preventDefault();
    if (!items.length) return toast("Agrega al menos un formato o servicio");
    const f = new FormData(e.target);
    const body = [`Hola ${cfg.brand}, quiero cotizar:`, ...items.map((i) => `• ${i.name}${i.detail ? ` (${i.detail})` : ""}`), "",
      `Nombre: ${f.get("nombre")}`, `Ciudad / país: ${f.get("ciudad")}`, f.get("fecha") ? `Fecha tentativa: ${f.get("fecha")}` : "", f.get("detalle") ? `Detalles: ${f.get("detalle")}` : ""].filter(Boolean).join("\n");
    if (cfg.whatsapp) window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    else location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(`Solicitud · ${cfg.brand}`)}&body=${encodeURIComponent(body)}`;
  }
  S.init = (c) => {
    cfg = { label: "Tu solicitud", ...c };
    try { items = JSON.parse(localStorage.getItem(KEY()) || "[]"); } catch { items = []; }
    mount(); render();
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-req-id]"); if (!b) return;
      const id = b.dataset.reqId;
      if (items.some((i) => i.id === id)) { open(true); return; }
      items.push({ id, name: b.dataset.reqName, detail: b.dataset.reqDetail || "" });
      render(); toast(`${b.dataset.reqName} agregado a tu solicitud`);
    });
  };
  S.open = () => open(true);
  window.Solicitud = S;
})();
