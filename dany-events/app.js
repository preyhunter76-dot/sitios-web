// Dany Events · interacciones del sitio (sin cookies, sin analítica, sin guardar datos).
(() => {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Aparición al hacer scroll (si no hay IntersectionObserver, todo queda visible).
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("is-in"));

  // Contadores
  const fmt = (n) => n.toLocaleString("es-CL");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count), pre = el.dataset.prefix || "";
    if (reduce || !("IntersectionObserver" in window)) { el.textContent = pre + fmt(end); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = pre + fmt(v);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
  });

  // Solicitud: arma el mensaje, lo copia y abre el chat de Instagram.
  const form = document.getElementById("solicitud");
  const ok = document.getElementById("ok");
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (!String(d.nombre || "").trim()) { ok.textContent = "Escribe tu nombre para armar el mensaje."; form.nombre.focus(); return; }
    const fecha = d.fecha ? new Date(d.fecha + "T12:00:00").toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" }) : "por definir";
    const msg = `Hola Dany, soy ${d.nombre.trim()}. Me interesa: ${d.servicio}.\nFecha: ${fecha}\nLugar: ${d.lugar || "por definir"}\n${d.idea ? "Idea: " + d.idea.trim() : ""}`.trim();
    let copied = false;
    try { await navigator.clipboard.writeText(msg); copied = true; } catch { /* sin permiso de portapapeles */ }
    ok.textContent = copied ? "Mensaje copiado. Pégalo en el chat de Instagram que se abrió." : "Copia este mensaje y envíalo por Instagram: " + msg;
    window.open("https://ig.me/m/dany.eventss", "_blank", "noopener");
  });
})();
