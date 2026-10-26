// Diego Gasca · marca personal. Contenido, navegación, club, asistente y animaciones.
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

  if (window.Solicitud) Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de servicios" });

  /* ——— Contenido ——— */
  const tick = ["Construyendo desde 2014", "Empresario", "DJ", "Productor musical", "Fotógrafo", "Modelo", "Cartel Music", "Salsafro", "Cali, Colombia"];
  const tickHTML = tick.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = tickHTML + tickHTML;

  // Facetas: la foto cambia según la faceta
  const fcFrame = $("#fcFrame");
  fcFrame.innerHTML = D.facets.map(([t, , img], i) => `<img src="${img}" alt="${esc(t)}" loading="lazy" class="${i ? "" : "on"}">`).join("");
  $("#facets").innerHTML = D.facets.map(([t, d], i) => `<li class="fc${i ? "" : " on"}" data-i="${i}" tabindex="0"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("");
  const setFacet = (i) => { $$(".fc").forEach((el) => el.classList.toggle("on", +el.dataset.i === i)); $$("img", fcFrame).forEach((im, j) => im.classList.toggle("on", j === i)); };
  $$(".fc").forEach((el) => { const i = +el.dataset.i; ["mouseenter", "focus", "click"].forEach((ev) => el.addEventListener(ev, () => setFacet(i))); });

  const fmt = (v, dec) => v.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  $("#numbers").innerHTML = D.stats.map(([v, suf, l, dec, pre, raw]) =>
    `<div class="num"><b data-v="${v}" data-dec="${dec}" data-pre="${esc(pre)}" data-suf="${esc(suf)}" data-raw="${raw ? 1 : 0}">${esc(pre)}${raw ? v : fmt(v, dec)}${esc(suf)}</b><span>${esc(l)}</span></div>`).join("");

  $("#brands").innerHTML = D.brands.map((b) => {
    const u = b.href || D.eco[b.key];
    const ext = u && u.startsWith("http");
    return `<a class="brandcard"${b.color ? ` style="--c:${b.color}"` : ""} href="${u || "#"}" ${ext ? 'target="_blank" rel="noopener"' : ""}>
      <img class="bg" src="${b.img}" alt="" loading="lazy"><img class="logo" src="${b.logo}" alt=""><small>${esc(b.role)}</small><h3>${esc(b.name)}</h3>
      <span class="go">${esc(b.cta)}<i></i></span></a>`;
  }).join("");

  const words = ["Empresario", "DJ", "Productor musical", "Fotógrafo", "Modelo"];
  const wHTML = words.map((g) => `<span>${esc(g)}<img src="img/logos/trebol.png" alt=""></span>`).join("");
  $("#genres").innerHTML = wHTML + wHTML + wHTML;

  $("#services").innerHTML = D.services.map((s) => `<button class="svc" data-req-id="${s.id}" data-req-name="${esc(s.t)}" data-req-detail="Diego Gasca">
    <h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><span class="add">Agregar a la solicitud<i>+</i></span></button>`).join("");
  $("#topics").innerHTML = D.topics.map((t) => `<b>${esc(t)}</b>`).join("");
  $("#perks").innerHTML = D.perks.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("");

  const mail = `mailto:${D.email}`;
  $("#mailBtn").href = `${mail}?subject=${encodeURIComponent("Hablemos · Diego Gasca")}`;
  $("#pressBtn").href = `${mail}?subject=${encodeURIComponent("Press kit · Diego Gasca")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = mail;
  const names = { cartel: "Cartel Music", salsafro: "Salsafro" };
  $("#feco").innerHTML = Object.entries(D.eco).filter(([k]) => names[k]).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${names[k]}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ——— Navegación ——— */
  const nav = $("#nav"), links = $("#links"), burger = $("#burger");
  const darkSecs = $$(".hero, .eco, .genres, .salsafro, .services, .final, .footer");
  const secs = ["facetas", "historia", "empresario", "servicios", "club"].map((id) => document.getElementById(id)).filter(Boolean);
  function navState() {
    nav.classList.toggle("solid", scrollY > 40);
    const y = nav.getBoundingClientRect().bottom - 2;
    nav.classList.toggle("dark", darkSecs.some((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; }));
    let on = ""; secs.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top < innerHeight * .45 && r.bottom > innerHeight * .45) on = s.id; });
    $$("#links a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + on));
  }
  addEventListener("scroll", navState, { passive: true }); addEventListener("resize", navState); navState();
  setInterval(navState, 500); // por si el navegador restaura la posición sin evento de scroll
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
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
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
      if (r.status === 400) { const j = await r.json().catch(() => ({})); msg.className = "form-msg err"; msg.textContent = j.error || "Revisa los datos."; btn.disabled = false; return; }
    } catch { /* sin servicio: se envía por correo */ }
    // Respaldo: abre el correo del visitante con los datos, para que no se pierda el registro.
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
    aiPanel.classList.toggle("on", open); aiPanel.setAttribute("aria-hidden", String(!open)); aiFab.setAttribute("aria-expanded", String(open));
    if (open && !greeted) { greeted = true; addMsg("bot", "¡Hola! Soy el asistente de Diego Gasca. Pregúntame por Diego, sus empresas, sus servicios, el club o cómo contactarlo."); }
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

  /* ——— Sin animación ——— */
  const loader = $("#loader");
  const done = () => { document.body.classList.remove("is-loading"); loader && loader.remove(); };
  if (reduced || !hasGsap) { done(); return; }

  /* ——— Animación ——— */
  gsap.registerPlugin(ScrollTrigger);
  const E = "expo.out", P = "power3.out";

  // Titulares de portada y cierre partidos en letras
  $$(".hero-title .split, .mega .split").forEach((el) => {
    const txt = el.textContent; el.setAttribute("aria-label", txt);
    el.innerHTML = [...txt].map((c) => `<span class="ch" aria-hidden="true">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
  });
  // Palabras que se encienden con el scroll
  $$(".reveal-words").forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
    gsap.fromTo($$(".w", el), { opacity: .14 }, { opacity: 1, stagger: .08, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: true } });
  });

  // Pantalla de carga → intro de portada
  const num = $("#loaderNum"); const counter = { v: 0 };
  const heroImg = $(".hero-photo img");
  const ready = new Promise((r) => { if (heroImg.complete) r(); else { heroImg.onload = r; heroImg.onerror = r; } setTimeout(r, 2500); });
  gsap.set(".hero-title .ch", { yPercent: 115 });
  gsap.set(".hero .h-in", { yPercent: 110, opacity: 0 });
  gsap.set(".hero-photo img", { scale: 1.28 });
  gsap.set(".hero-foot", { opacity: 0 });
  const hgl = window.HeroGL ? HeroGL.start({ host: $(".hero-photo"), img: heroImg, reduced }) : null;
  const countTw = gsap.to(counter, { v: 90, duration: 1, ease: "power2.out", onUpdate: () => (num.textContent = Math.round(counter.v)) });
  ready.then(() => {
    countTw.kill();
    gsap.timeline({ onComplete: done })
      .to(counter, { v: 100, duration: .3, onUpdate: () => (num.textContent = Math.round(counter.v)) })
      .to(".loader-in", { opacity: 0, y: -20, duration: .35, ease: "power2.in" })
      .to(loader, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=.05")
      .add(() => hgl && hgl.play(), "-=.75")
      .to(".hero-photo img", { scale: 1, duration: 2.2, ease: E }, "<")
      .to(".hero-title .ch", { yPercent: 0, duration: 1.3, stagger: .045, ease: E }, "-=2")
      .to(".hero .h-in", { yPercent: 0, opacity: 1, duration: 1, stagger: .1, ease: P }, "-=1.3")
      .to(".hero-foot", { opacity: .9, duration: .8 }, "-=.6");
  });

  // Parallax 3D con el mouse en la portada
  if (fine) {
    const layers = $$("[data-depth]", $("#heroStage")).map((el) => ({ d: +el.dataset.depth, x: gsap.quickTo(el, "x", { duration: 1.2, ease: P }), y: gsap.quickTo(el, "y", { duration: 1.2, ease: P }) }));
    const rx = gsap.quickTo(".hero-copy", "rotationY", { duration: 1.2, ease: P }), ry = gsap.quickTo(".hero-copy", "rotationX", { duration: 1.2, ease: P });
    $(".hero").addEventListener("mousemove", (e) => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      layers.forEach((l) => { l.x(nx * l.d * 2); l.y(ny * l.d * 1.4); });
      rx(nx * 6); ry(-ny * 5);
    });
  }
  // Portada al hacer scroll
  gsap.to(".hero-photo img", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true,
    onUpdate: (self) => hgl && hgl.setScroll(self.progress, lenis ? lenis.velocity : self.getVelocity() / 60) } });
  gsap.to(".hero-copy", { yPercent: -35, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "20% top", end: "85% top", scrub: true } });

  // Titulares por líneas y entradas suaves
  $$(".big-head, .mega").forEach((h) => {
    const chars = $$(".ch", h);
    gsap.from(chars.length ? chars : $$(".split", h), { yPercent: 115, duration: 1.2, stagger: chars.length ? .04 : .1, ease: E, scrollTrigger: { trigger: h, start: "top 85%" } });
  });
  $$(".fc-lead, .eco-head p, .svc-head p, .club-lead, .story-copy p, .biz-copy p, .final-copy p, .final-copy .cta, .num-note, .sf-logo, .topics").forEach((el) =>
    gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: P, scrollTrigger: { trigger: el, start: "top 90%" } }));

  // Facetas
  gsap.from(".fc", { y: 40, opacity: 0, duration: .9, stagger: .08, ease: P, scrollTrigger: { trigger: "#facets", start: "top 85%" } });
  gsap.fromTo(".fc-frame", { clipPath: "inset(14% 10% 14% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".facets", start: "top 85%", end: "top 25%", scrub: true } });

  // Historia: año gigante que se desliza y foto que se abre
  gsap.fromTo(".story-year span", { xPercent: 10 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".story-photo .clip", { clipPath: "inset(18% 14% 18% 14%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".story-photo", start: "top 90%", end: "center 55%", scrub: true } });
  gsap.fromTo(".story-photo img", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".story-photo", start: "top bottom", end: "bottom top", scrub: true } });

  // Cifras que cuentan
  $$(".num b").forEach((b) => {
    const v = +b.dataset.v, dec = +b.dataset.dec, pre = b.dataset.pre, suf = b.dataset.suf, raw = b.dataset.raw === "1", o = { v: raw ? v - 12 : 0 };
    gsap.to(o, { v, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 88%" }, onUpdate: () => (b.textContent = pre + (raw ? Math.round(o.v) : fmt(o.v, dec)) + suf) });
  });
  gsap.from(".num", { y: 50, opacity: 0, duration: 1, stagger: .1, ease: P, scrollTrigger: { trigger: "#numbers", start: "top 88%" } });

  // Empresas: tarjetas que suben + inclinación 3D
  gsap.from(".brandcard", { yPercent: 18, opacity: 0, duration: 1.2, stagger: .1, ease: E, scrollTrigger: { trigger: "#brands", start: "top 85%" } });
  if (fine) $$(".brandcard").forEach((c) => {
    gsap.set(c, { transformPerspective: 900 });
    const rX = gsap.quickTo(c, "rotationX", { duration: .8, ease: P }), rY = gsap.quickTo(c, "rotationY", { duration: .8, ease: P });
    c.addEventListener("mousemove", (e) => { const r = c.getBoundingClientRect(); rY(((e.clientX - r.left) / r.width - .5) * 8); rX(-((e.clientY - r.top) / r.height - .5) * 8); });
    c.addEventListener("mouseleave", () => { rX(0); rY(0); });
  });

  // Marquesina de facetas que reacciona a la velocidad del scroll
  const track = $("#genres"); let gx = 0, dir = -1, vel = 0;
  if (lenis) lenis.on("scroll", (l) => { vel = l.velocity; if (Math.abs(vel) > .5) dir = vel > 0 ? -1 : 1; });
  gsap.ticker.add(() => {
    const w = track.scrollWidth / 3; gx += dir * (1.1 + Math.min(Math.abs(vel) * .35, 14));
    if (gx <= -w) gx += w; if (gx > 0) gx -= w; track.style.transform = `translate3d(${gx}px,0,0)`; vel *= .92;
  });

  gsap.from(".sf-mix > *", { y: 30, opacity: 0, duration: .8, stagger: .12, ease: P, scrollTrigger: { trigger: ".sf-mix", start: "top 90%" } });
  gsap.fromTo(".biz-photo > img:first-child", { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".biz", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".svc", { y: 60, opacity: 0, duration: 1, stagger: .08, ease: P, scrollTrigger: { trigger: "#services", start: "top 85%" } });
  gsap.from(".perks li, .club-form", { y: 40, opacity: 0, duration: 1, stagger: .1, ease: P, scrollTrigger: { trigger: ".club", start: "top 80%" } });
  gsap.fromTo(".final-photo", { yPercent: -8, scale: 1.12 }, { yPercent: 6, scale: 1, ease: "none", scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true } });

  // Trébol con volumen: capas apiladas en profundidad que giran juntas
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
