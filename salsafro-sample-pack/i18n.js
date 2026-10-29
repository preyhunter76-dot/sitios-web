// Versión en inglés: motor común de los sitios del ecosistema. El diccionario está en i18n-dict.js de cada sitio. El español es el original; con «EN» se traducen los textos visibles y las etiquetas accesibles.
// La preferencia se guarda en el navegador (ph-lang). Las reseñas reales y el asistente local no se traducen.
(() => {
  const EN = Object.assign({}, window.I18N_EN || {});
  // Textos con partes variables
  const RX = [
    [/^desde (.+)$/, "from $1"], [/^Elegir (.+)$/, (m, n) => "Choose " + (EN[n] || n)],
    [/^¡Listo, (.+)! Ya eres parte del club\.$/, "Done, $1! You're now part of the club."],
  ];
  const lang = (() => { try { return localStorage.getItem((((window.PH && PH.key) || "ph") + "-lang")) === "en" ? "en" : "es"; } catch { return "es"; } })();
  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.textContent = lang === "en" ? "ES" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "Ver en español" : "View in English");
    btn.addEventListener("click", () => { try { localStorage.setItem((((window.PH && PH.key) || "ph") + "-lang"), lang === "en" ? "es" : "en"); } catch {} location.reload(); });
  }
  window.I18N = { lang };
  if (lang !== "en") return;

  document.documentElement.lang = "en";
  const tr = (t) => {
    if (EN[t]) return EN[t];
    for (const [re, to] of RX) if (re.test(t)) return t.replace(re, to);
    if (t.includes(" · ")) { const parts = t.split(" · "); if (parts.some((p) => EN[p])) return parts.map((p) => EN[p] || p).join(" · "); }
    return null;
  };
  const skip = (el) => !el || el.closest("script,style,.rev p,#aiLog,#aiChips,[translate=no]");
  const textNode = (n) => { const raw = n.nodeValue, t = raw.trim(); if (!t || skip(n.parentElement)) return; const v = tr(t); if (v) n.nodeValue = raw.replace(t, v); };
  const attrs = (el) => { for (const a of ["aria-label", "alt", "placeholder"]) { const v = el.getAttribute && el.getAttribute(a); if (v && EN["@" + v]) el.setAttribute(a, EN["@" + v]); } };
  const walk = (root) => {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 || skip(root)) return;
    attrs(root); root.querySelectorAll("[aria-label],[alt],[placeholder]").forEach(attrs);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); while (w.nextNode()) textNode(w.currentNode);
  };
  if (window.I18N_TITLE) document.title = window.I18N_TITLE;
  const md = document.querySelector('meta[name="description"]');
  if (md && window.I18N_DESC) md.content = window.I18N_DESC;
  walk(document.body);
  // El contenido que app.js crea después (servicios, mensajes, cambios de moneda) también se traduce.
  new MutationObserver((ms) => ms.forEach((m) => {
    if (m.type === "attributes") return attrs(m.target);
    m.addedNodes.forEach(walk);
  })).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-label"] });
})();
