// Diego Gasca · marca personal. Contenido, navegación, planes, club, asistente y animaciones.
(() => {
  const D = window.DG;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  // Respeta «reducir movimiento» del sistema; ?motion=1 fuerza la versión animada y ?static=1 la quita (para revisar).
  const reduced = (matchMedia("(prefers-reduced-motion: reduce)").matches && !/[?&]motion=1\b/.test(location.search)) || /[?&]static=1\b/.test(location.search);
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (reduced || !hasGsap) document.documentElement.classList.add("reduced");
  if (!location.hash && "scrollRestoration" in history) { history.scrollRestoration = "manual"; scrollTo(0, 0); }

  if (window.Solicitud) Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Tu solicitud" });
  const rqCount = document.getElementById("rqCount"); if (rqCount) rqCount.setAttribute("aria-hidden", "true"); // el número ya lo anuncia el aviso
  const drawer = document.getElementById("rqDrawer");
  if (drawer) { const sync = () => (drawer.inert = drawer.getAttribute("aria-hidden") !== "false"); sync(); new MutationObserver(sync).observe(drawer, { attributes: true, attributeFilter: ["aria-hidden"] }); }

  /* ——— Contenido ——— */
  const tick = ["Construyendo desde 2014", "Empresario", "DJ", "Productor musical", "Compositor", "Modelo", "Cartel Music", "Salsafro", "Cali, Colombia"];
  const tickHTML = tick.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = tickHTML + tickHTML;

  // Íconos de línea (trazo propio, sin librerías)
  const ICON = {
    brief: '<path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16"/>',
    head: '<path d="M5 14v-2a7 7 0 0 1 14 0v2"/><rect x="3.5" y="13.5" width="4" height="6" rx="1"/><rect x="16.5" y="13.5" width="4" height="6" rx="1"/>',
    wave: '<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2M21 12h0"/>',
    cam: '<path d="M4 8h3.5L9 6h6l1.5 2H20v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    pen: '<path d="M4 20l1.2-4.6L15.8 4.8a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L8.6 18.8z"/><path d="M14 6.6l3.4 3.4M4 20h16"/>',
    star: '<path d="M12 4l2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 16.2 7 19l1.2-5.6L4 9.6 9.6 9z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
  // Ancho real de cada original (las variantes -480.webp están en img/)
  const W = { "img/portrait-diego.webp": [720, 1080], "img/eco-diego.webp": [900, 900], "img/eco-prey-hunter.webp": [900, 900], "img/eco-cartel-music.webp": [900, 900], "img/eco-salsafro.webp": [900, 900],
    "img/facet-dj.webp": [1200, 675], "img/press-14.webp": [1200, 800], "img/press-18.webp": [1200, 1803], "img/press-07.webp": [560, 841] };
  const LOGO = { "img/logos/trebol.png": [200, 255], "img/logos/prey-hunter.png": [240, 146], "img/logos/cartel-music.png": [160, 182], "img/logos/salsafro.png": [240, 80] };
  const tileImg = (src) => { const [w, h] = W[src] || [720, 1080]; const sm = src.replace(".webp", "-480.webp");
    return `<img src="${sm}" srcset="${sm} 480w, ${src} ${w}w" sizes="(max-width: 820px) 64vw, 300px" width="${w}" height="${h}" alt="" loading="lazy" decoding="async">`; };

  // Facetas en fila
  $("#facets").innerHTML = D.facets.map(([t, ic, d, img]) => `<a class="tile" href="#servicios">
      ${tileImg(img)}<span class="tile-shade"></span>
      <span class="tile-in">${svg(ic)}<b>${esc(t)}</b><em>${esc(d)}</em><u>Ver servicios</u></span></a>`).join("");

  // Empresas en fila (mismo formato)
  $("#brands").innerHTML = D.brands.map((b) => {
    const u = b.href || D.eco[b.key]; const ext = u && u.startsWith("http");
    return `<a class="tile co"${b.color ? ` style="--c:${b.color}"` : ""} href="${u}" ${ext ? 'target="_blank" rel="noopener"' : ""}>
      ${tileImg(b.img)}<span class="tile-shade"></span>
      <span class="tile-in"><img class="tile-logo" src="${b.logo.replace(".png", "-sm.png")}" width="${LOGO[b.logo][0]}" height="${LOGO[b.logo][1]}" alt="" decoding="async"><b>${esc(b.name)}</b><em>${esc(b.role)}</em><u>${esc(b.cta)}</u></span></a>`;
  }).join("");

  // Cifras
  const fmt = (v, dec) => v.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  $("#numbers").innerHTML = D.stats.map(([v, suf, l, dec, pre, raw]) =>
    `<div class="num"><b data-v="${v}" data-dec="${dec}" data-pre="${esc(pre)}" data-suf="${esc(suf)}" data-raw="${raw ? 1 : 0}">${esc(pre)}${raw ? v : fmt(v, dec)}${esc(suf)}</b><span>${esc(l)}</span></div>`).join("");

  // Planes con cambio de moneda
  const CUR = { cop: "COP", usd: "USD", clp: "CLP", eur: "EUR" };
  const money = (x, cur) => { const n = x.p[cur];
    return cur === "usd" ? `US$${n.toLocaleString("en-US")}` : cur === "eur" ? `€${n.toLocaleString("es-CO")}` : cur === "clp" ? `CLP$${n.toLocaleString("es-CL")}` : `$${n.toLocaleString("es-CO")}`; };
  let cur = "cop";
  function renderPlans() {
    $("#plans").innerHTML = D.plans.map((p) => `<article class="plan${p.featured ? " featured" : ""}">
      ${p.featured ? '<span class="tag">Recomendado</span>' : ""}
      <header><h3>${esc(p.name)}</h3><p>${esc(p.sub)}</p></header>
      <div class="price"><small>desde</small><b>${money(p, cur)}</b><span>${CUR[cur]} · ${esc(p.unit)}</span></div>
      <ul>${p.items.map((i) => `<li>${svg("check")}<span>${esc(i)}</span></li>`).join("")}</ul>
      <button class="plan-btn" type="button" aria-label="Elegir ${esc(p.name)}" data-req-id="${p.id}" data-req-name="${esc(p.name)} · ${esc(p.sub)}" data-req-detail="desde ${money(p, cur)} ${CUR[cur]}">Elegir</button>
    </article>`).join("");
    $("#extras").innerHTML = D.extras.map((x) => `<button type="button" class="extra" data-req-id="${x.id}" data-req-name="${esc(x.t)}" data-req-detail="desde ${money(x, cur)} ${CUR[cur]}"><b>${esc(x.t)}</b><span>desde ${money(x, cur)}</span><i>+</i></button>`).join("");
  }
  renderPlans();
  $$(".cur button").forEach((b) => b.addEventListener("click", () => {
    cur = b.dataset.cur; $$(".cur button").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
    renderPlans();
    if (hasGsap && !reduced) gsap.fromTo(".price b", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, stagger: .05, ease: "power3.out" });
  }));

  // Reseñas reales
  const revHTML = D.reviews.map((r) => `<article class="rev"><div><div class="stars" role="img" aria-label="Comentario del público"><i></i><i></i><i></i><i></i><i></i></div><p>${esc(r.t)}</p></div>
    <footer><b>${esc(r.a)}</b><small>${esc(r.v)} · ${esc(r.d)}</small><a href="https://www.youtube.com/watch?v=${r.id}&lc=${r.c}" target="_blank" rel="noopener">Ver en YouTube</a></footer></article>`).join("");
  $("#reviews").innerHTML = revHTML + revHTML;
  $$("#reviews .rev").forEach((el, i) => { if (i >= D.reviews.length) { el.setAttribute("aria-hidden", "true"); el.querySelector("a").tabIndex = -1; } });

  // Logros de canciones (misma fila en movimiento que Mi identidad)
  // Como en el Cerebro: la carátula de la canción y un disco dorado que gira con la carátula como etiqueta.
  $("#hits").innerHTML = D.hits.map(([n, u, t, d, c]) => { const img = `img/covers/${c}.webp`;
    return `<article class="tile hit"><div class="hit-art" aria-hidden="true"><img class="hit-sleeve" src="${img}" width="200" height="200" alt="" loading="lazy" decoding="async"><span class="hit-disc"><span class="hit-grooves"><img src="${img}" width="200" height="200" alt="" loading="lazy" decoding="async"></span><i></i></span></div>
      <div class="hit-txt"><b>${esc(n)}</b><small>${esc(u)}</small><span>${esc(t)}</span><em>${esc(d)}</em></div></article>`; }).join("");

  // Spotify: reproductor oficial del perfil de artista (se carga al acercarse)
  const sp = $("#spotify");
  if (sp) sp.innerHTML = `<iframe title="Escuchar en Spotify" src="https://open.spotify.com/embed/artist/${D.spotify}?utm_source=generator&theme=0" width="100%" height="152" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  $("#spLink").href = `https://open.spotify.com/artist/${D.spotify}`;

  $("#perks").innerHTML = D.perks.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("");
  const mail = `mailto:${D.email}`;
  $("#mailBtn").href = `${mail}?subject=${encodeURIComponent("Hablemos · Diego Gasca")}`;
  $("#pressBtn").href = `${mail}?subject=${encodeURIComponent("Press kit · Diego Gasca")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = mail;
  const names = { prey: "Prey Hunter", cartel: "Cartel Music", salsafro: "Salsafro" };
  $("#feco").innerHTML = Object.entries(D.eco).filter(([k]) => names[k]).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${names[k]}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ——— Navegación ——— */
  const nav = $("#nav"), links = $("#links"), burger = $("#burger");
  const darkSecs = $$(".hero, .rowsec.dark, .plans, .final, .footer");
  const secs = ["identidad", "historia", "ecosistema", "servicios", "club"].map((id) => document.getElementById(id)).filter(Boolean);
  function navState() {
    nav.classList.toggle("solid", scrollY > 40);
    const y = nav.getBoundingClientRect().bottom - 2;
    nav.classList.toggle("dark", darkSecs.some((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; }));
    let on = ""; secs.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top < innerHeight * .45 && r.bottom > innerHeight * .45) on = s.id; });
    $$("#links a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + on));
  }
  addEventListener("scroll", navState, { passive: true }); addEventListener("resize", navState); navState();
  setInterval(navState, 500);
  function menu(open) {
    links.classList.toggle("on", open); nav.classList.toggle("menu", open);
    burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.onclick = () => menu(!links.classList.contains("on"));

  /* ——— Desplazamiento suave ——— */
  let lenis = null;
  if (!reduced && hasGsap && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href"); const el = id.length > 1 && $(id); if (!el) return;
    e.preventDefault(); menu(false);
    const off = -nav.offsetHeight + (id === "#inicio" ? -40 : 0);
    lenis ? lenis.scrollTo(el, { offset: off, duration: 1.4 }) : scrollTo({ top: el.getBoundingClientRect().top + scrollY + off, behavior: reduced ? "auto" : "smooth" });
  }));

  /* ——— Club de fans y clientes ——— */
  const form = $("#clubForm"), msg = $("#clubMsg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    if (fd.get("sitio_web")) return; // trampa para bots
    const data = { tipo: fd.get("tipo"), nombre: (fd.get("nombre") || "").trim(), correo: (fd.get("correo") || "").trim(), whatsapp: (fd.get("whatsapp") || "").trim(),
      ciudad: (fd.get("ciudad") || "").trim(), pais: (fd.get("pais") || "").trim(), intereses: fd.getAll("intereses"), acepto: !!fd.get("acepto") };
    $$(".fld input", form).forEach((i) => i.classList.remove("bad"));
    const bad = [];
    if (data.nombre.length < 2) bad.push("nombre");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.correo)) bad.push("correo");
    if (bad.length) { bad.forEach((n) => form.elements[n].classList.add("bad")); msg.className = "form-msg err"; msg.textContent = "Revisa tu nombre y tu correo."; form.elements[bad[0]].focus(); return; }
    if (!data.acepto) { msg.className = "form-msg err"; msg.textContent = "Para unirte necesitas autorizar el tratamiento de datos."; return; }
    const btn = $("button[type=submit]", form); btn.disabled = true; msg.className = "form-msg"; msg.textContent = "Enviando…";
    try {
      const r = await fetch(D.club, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, sitio_web: "" }) });
      if (r.ok) { form.reset(); msg.className = "form-msg ok"; msg.textContent = `¡Listo, ${data.nombre.split(" ")[0]}! Ya eres parte del club.`; btn.disabled = false; return; }
      if (r.status === 429) { msg.className = "form-msg err"; msg.textContent = "Recibimos varios intentos seguidos. Espera unos minutos e inténtalo de nuevo."; btn.disabled = false; return; }
      if (r.status === 400) { const j = await r.json().catch(() => ({})); msg.className = "form-msg err"; msg.textContent = j.error || "Revisa los datos."; btn.disabled = false; return; }
    } catch { /* sin servicio: se envía por correo */ }
    const body = `Quiero unirme al club de Diego Gasca.\n\nComo: ${data.tipo}\nNombre: ${data.nombre}\nCorreo: ${data.correo}\nWhatsApp: ${data.whatsapp || "-"}\nCiudad: ${data.ciudad || "-"}\nPaís: ${data.pais || "-"}\nMe interesa: ${data.intereses.join(", ") || "-"}\n\nAutorizo el tratamiento de mis datos según la política de privacidad (Ley 1581 de 2012).`;
    location.href = `mailto:${D.email}?subject=${encodeURIComponent("Club Diego Gasca · " + data.tipo)}&body=${encodeURIComponent(body)}`;
    msg.className = "form-msg ok"; msg.textContent = "Abrimos tu correo con tus datos: solo dale enviar para completar el registro.";
    btn.disabled = false;
  });

  /* ——— Asistente ——— */
  const aiFab = $("#aiFab"), aiPanel = $("#aiPanel"), aiLog = $("#aiLog"), aiForm = $("#aiForm"), aiInput = $("#aiInput");
  const chat = []; let greeted = false, busy = false;
  const linkify = (t) => esc(t).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
  const addMsg = (who, text) => { const d = document.createElement("div"); d.className = `msg ${who}`; d.innerHTML = linkify(text); aiLog.appendChild(d); aiLog.scrollTop = aiLog.scrollHeight; return d; };
  function aiToggle(open) {
    aiPanel.classList.toggle("on", open); aiPanel.setAttribute("aria-hidden", String(!open)); aiPanel.inert = !open; aiFab.setAttribute("aria-expanded", String(open));
    if (open && !greeted) { greeted = true; addMsg("bot", "¡Hola! Soy el asistente de Diego Gasca. Pregúntame por Diego, sus empresas, los servicios y precios, el club o cómo contactarlo."); }
    if (open) setTimeout(() => aiInput.focus(), 200);
  }
  aiFab.onclick = () => aiToggle(!aiPanel.classList.contains("on"));
  $("#aiClose").onclick = () => aiToggle(false);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && aiPanel.classList.contains("on")) aiToggle(false); });
  aiLog.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
  async function send(text) {
    text = text.trim().slice(0, 500); if (!text || busy) return;
    busy = true; addMsg("me", text); chat.push({ role: "user", content: text });
    const typing = addMsg("bot typing", "Escribiendo…");
    const reply = await window.Asistente.ask(chat);
    typing.remove(); addMsg("bot", reply); chat.push({ role: "assistant", content: reply }); busy = false;
  }
  $("#aiChips").innerHTML = window.Asistente.chips.map((c) => `<button type="button">${esc(c)}</button>`).join("");
  $("#aiChips").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) send(b.textContent); });
  aiForm.addEventListener("submit", (e) => { e.preventDefault(); const v = aiInput.value; aiInput.value = ""; send(v); });

  /* ——— Filas que se mueven solas y también a mano ——— */
  // Se duplican las tarjetas (copias ocultas a lectores de pantalla) para un bucle sin cortes.
  // Avanza sola; se pausa al pasar el mouse, al enfocar con teclado o al tocar, y se puede arrastrar, deslizar o usar las flechas.
  $$(".tiles").forEach((row) => {
    const items = [...row.children]; const n = items.length;
    const step = () => { const t = row.children[1], f = row.children[0]; return t && f ? t.offsetLeft - f.offsetLeft : 300; };
    let pos = 0, hover = false, focus = false, paused = 0, drag = null, moved = false;
    $$(`[data-row="${row.id}"]`).forEach((b) => b.addEventListener("click", () => {
      const dir = b.dataset.dir === "next" ? 1 : -1;
      if (reduced) { row.scrollBy({ left: dir * step(), behavior: "auto" }); return; }
      paused = Date.now() + 4000;
      if (dir < 0 && row.scrollLeft < step()) row.scrollLeft += period(); // da la vuelta sin salto visible
      pos = row.scrollLeft + dir * step();
      row.scrollTo({ left: pos, behavior: "smooth" });
    }));
    if (reduced) return;
    row.classList.add("loop");
    // Un «periodo» es el ancho de las tarjetas originales; se agregan copias hasta poder recorrer un periodo completo.
    const period = () => n * step();
    const fill = () => { let guard = 0; while (row.scrollWidth - row.clientWidth < period() + step() && guard++ < 12)
      items.forEach((el) => { const c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); c.tabIndex = -1; $$("a,button", c).forEach((x) => (x.tabIndex = -1)); row.appendChild(c); }); };
    fill(); addEventListener("resize", fill);
    const speed = 24; // px por segundo, igual en pantallas de 60 o 120 Hz
    row.addEventListener("mouseenter", () => (hover = true)); row.addEventListener("mouseleave", () => (hover = false));
    row.addEventListener("focusin", () => (focus = true)); row.addEventListener("focusout", () => (focus = false));
    row.addEventListener("touchstart", () => (paused = Date.now() + 3000), { passive: true });
    row.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) paused = Date.now() + 2500; }, { passive: true });
    // Arrastrar con el mouse
    row.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || e.button) return; drag = { x: e.clientX, l: row.scrollLeft }; moved = false; row.classList.add("drag"); });
    addEventListener("pointermove", (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 5) moved = true; if (drag.l - dx < 0) drag.l += period(); row.scrollLeft = drag.l - dx; pos = row.scrollLeft; });
    addEventListener("pointerup", () => { if (!drag) return; drag = null; row.classList.remove("drag"); paused = Date.now() + 1500; });
    row.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    row.addEventListener("dragstart", (e) => e.preventDefault());
    let vis = true; new IntersectionObserver(([e]) => (vis = e.isIntersecting)).observe(row);
    let last = performance.now();
    (function loop(now = performance.now()) {
      const dt = Math.min(now - last, 100) / 1000; last = now;
      if (vis && !hover && !focus && !drag && Date.now() > paused) {
        if (Math.abs(row.scrollLeft - pos) > 2) pos = row.scrollLeft; // el visitante movió la fila
        pos += speed * dt; row.scrollLeft = pos;
      } else pos = row.scrollLeft;
      if (pos >= period()) { pos -= period(); row.scrollLeft = pos; }
      requestAnimationFrame(loop);
    })();
    row.addEventListener("scroll", () => { const per = period(); if (row.scrollLeft >= per) { row.scrollLeft -= per; pos = row.scrollLeft; } }, { passive: true });
  });

  /* ——— Sin animación ——— */
  const loader = $("#loader");
  const done = () => { document.body.classList.remove("is-loading"); loader && loader.remove(); if (lenis) gsap.ticker.lagSmoothing(0); };
  if (reduced || !hasGsap) { done(); return; }

  /* ——— Animación ——— */
  gsap.registerPlugin(ScrollTrigger);
  const E = "expo.out", P = "power3.out";

  $$(".hero-title .split, .mega .split").forEach((el) => {
    const txt = el.textContent; el.setAttribute("aria-label", txt);
    el.innerHTML = [...txt].map((c) => `<span class="ch" aria-hidden="true">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
  });

  // Pantalla de carga: el trébol, el conteo y al final «Diego Gasca»
  const num = $("#loaderNum"); const counter = { v: 0 };
  const heroImg = $(".hero-photo img");
  const imgReady = new Promise((r) => { if (heroImg.complete) r(); else { heroImg.onload = r; heroImg.onerror = r; } setTimeout(r, 2500); });
  const ready = Promise.all([imgReady, new Promise((r) => setTimeout(r, 1100))]); // mínimo para que se vea el conteo
  gsap.set(".hero-title .ch", { yPercent: 115 });
  gsap.set(".hero .h-in", { yPercent: 110, opacity: 0 });
  gsap.set(".hero-foot", { opacity: 0 });
  const countTw = gsap.to(counter, { v: 90, duration: 1, ease: "power2.out", onUpdate: () => (num.textContent = Math.round(counter.v)) });
  ready.then(() => {
    countTw.kill();
    gsap.timeline({ onComplete: done })
      .to(counter, { v: 100, duration: .25, onUpdate: () => (num.textContent = Math.round(counter.v)) })
      .to(num, { opacity: 0, y: -8, duration: .2 })
      .add(() => { num.textContent = "Diego Gasca"; num.classList.add("name"); })
      .fromTo(num, { opacity: 0, y: 10, letterSpacing: ".4em" }, { opacity: 1, y: 0, letterSpacing: ".16em", duration: .7, ease: P })
      .to(".loader-in", { opacity: 0, y: -20, duration: .4, ease: "power2.in" }, "+=.45")
      .to(loader, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=.05")
      .to(".hero-title .ch", { yPercent: 0, duration: 1.3, stagger: .045, ease: E }, "-=.55")
      .to(".hero .h-in", { yPercent: 0, opacity: 1, duration: 1, stagger: .1, ease: P }, "-=1.1")
      .to(".hero-foot", { opacity: .9, duration: .8 }, "-=.6");
  });
  // El texto de la portada se desvanece al bajar (la foto queda quieta)
  gsap.to(".hero-copy", { yPercent: -25, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "25% top", end: "85% top", scrub: true } });

  // Titulares y entradas suaves
  $$(".big-head, .mega").forEach((h) => {
    const chars = $$(".ch", h);
    gsap.from(chars.length ? chars : $$(".split", h), { yPercent: 115, duration: 1.2, stagger: chars.length ? .04 : .1, ease: E, scrollTrigger: { trigger: h, start: "top 85%" } });
  });
  $$(".row-head p, .plans-head p, .cur, .rev-head p, .club-lead, .story-copy p, .biz-copy p, .final-copy p, .final-copy .cta, .extras, .plan-note").forEach((el) =>
    gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: P, scrollTrigger: { trigger: el, start: "top 90%" } }));

  // Filas de tarjetas
  $$(".tiles").forEach((t) => gsap.from($$(".tile:not([aria-hidden])", t), { y: 60, opacity: 0, duration: 1.1, stagger: .08, ease: E, scrollTrigger: { trigger: t, start: "top 85%" } }));

  // Historia
  gsap.fromTo(".story-year span", { xPercent: 10 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".story-photo .clip", { clipPath: "inset(18% 14% 18% 14%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".story-photo", start: "top 90%", end: "center 55%", scrub: true } });
  $$(".num b").forEach((b) => {
    const v = +b.dataset.v, dec = +b.dataset.dec, pre = b.dataset.pre, suf = b.dataset.suf, raw = b.dataset.raw === "1", o = { v: raw ? v - 12 : 0 };
    gsap.to(o, { v, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 90%" }, onUpdate: () => (b.textContent = pre + (raw ? Math.round(o.v) : fmt(o.v, dec)) + suf) });
  });

  // Empresario, planes, reseñas, club y cierre
  gsap.fromTo(".biz-photo > img:first-child", { yPercent: -10 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".biz", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".plan", { y: 70, opacity: 0, duration: 1.1, stagger: .1, ease: E, scrollTrigger: { trigger: "#plans", start: "top 85%" } });
  const rail = $("#reviews");
  const revTw = gsap.to(rail, { x: () => -(rail.scrollWidth / 2), duration: 70, ease: "none", repeat: -1 });
  rail.addEventListener("mouseenter", () => revTw.pause()); rail.addEventListener("mouseleave", () => revTw.resume());
  rail.addEventListener("focusin", () => revTw.pause()); rail.addEventListener("focusout", () => revTw.resume());
  gsap.from(".perks li, .club-form", { y: 40, opacity: 0, duration: 1, stagger: .1, ease: P, scrollTrigger: { trigger: ".club", start: "top 80%" } });
  gsap.fromTo(".final-photo", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true } });

  // Trébol con volumen
  $$(".clover3d").forEach((c) => {
    const src = $("img", c).getAttribute("src"); const n = 10;
    c.innerHTML = `<div class="c3">${Array.from({ length: n }, (_, i) => `<img src="${src}" alt="" style="transform:translateZ(${(i - n / 2) * 0.9}px);filter:brightness(${i === n - 1 || i === 0 ? 1 : .45 + i * .03})">`).join("")}</div>`;
  });
  // Botones magnéticos
  if (fine) $$(".btn, .nav-cta, .ai-fab").forEach((b) => {
    const mx = gsap.quickTo(b, "x", { duration: .5, ease: "elastic.out(1,.5)" }), my = gsap.quickTo(b, "y", { duration: .5, ease: "elastic.out(1,.5)" });
    b.addEventListener("mousemove", (e) => { const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .28); my((e.clientY - r.top - r.height / 2) * .38); });
    b.addEventListener("mouseleave", () => { mx(0); my(0); });
  });

  addEventListener("load", () => { ScrollTrigger.refresh(); navState(); });
})();
