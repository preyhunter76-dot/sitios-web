(() => {
  const D = window.DG;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  // Respeta «reducir movimiento» del sistema; ?motion=1 fuerza la versión animada (para revisar).
  // ?static=1 muestra la versión sin animación (para capturas).
  const reduced = (matchMedia("(prefers-reduced-motion: reduce)").matches && !/[?&]motion=1\b/.test(location.search)) || /[?&]static=1\b/.test(location.search);
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (reduced || !hasGsap) document.documentElement.classList.add("reduced");
  if (!location.hash && "scrollRestoration" in history) { history.scrollRestoration = "manual"; scrollTo(0, 0); }

  if (window.Solicitud) Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de servicios" });

  /* ——— Contenido ——— */
  const tick = ["Construyendo desde 2014", "Empresario", "Cali, Colombia", "Cartel Music", "Salsafro", "Fotografía", "Modelaje", "Conferencias"];
  const tickHTML = tick.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = tickHTML + tickHTML;

  $("#brands").innerHTML = D.brands.map((b) => {
    const u = b.href || D.eco[b.key];
    const ext = u && u.startsWith("http");
    return `<a class="brandcard"${b.color ? ` style="--c:${b.color}"` : ""} href="${u || "#"}" ${ext ? 'target="_blank" rel="noopener"' : ""}>
      <img class="bg" src="${b.img}" alt="" loading="lazy"><img class="logo" src="${b.logo}" alt=""><small>${esc(b.role)}</small><h3>${esc(b.name)}</h3>
      <span class="go">${esc(b.cta)}<i></i></span></a>`;
  }).join("");

  const fmt = (v, dec) => v.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  $("#numbers").innerHTML = D.stats.map(([v, suf, l, dec, pre, raw]) =>
    `<div class="num"><b data-v="${v}" data-dec="${dec}" data-pre="${esc(pre)}" data-suf="${esc(suf)}" data-raw="${raw ? 1 : 0}">${esc(pre)}${raw ? v : fmt(v, dec)}${esc(suf)}</b><span>${esc(l)}</span></div>`).join("");

  const genres = ["Empresario", "Conferencista", "Fotógrafo", "Modelo", "Salsafro"];
  const gHTML = genres.map((g) => `<span>${esc(g)}<img src="img/logos/trebol.png" alt=""></span>`).join("");
  $("#genres").innerHTML = gHTML + gHTML + gHTML;

  const arrow = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  $("#hits").innerHTML = D.hits.map((h, i) => {
    const url = h.yt ? `https://www.youtube.com/watch?v=${h.yt}` : `https://www.youtube.com/results?search_query=${encodeURIComponent("Prey Hunter " + h.t)}`;
    return `<li><a class="hit" href="${url}" target="_blank" rel="noopener" data-cover="img/covers/${h.cover}.webp">
      <img class="cv" src="img/covers/${h.cover}.webp" alt="Portada de ${esc(h.t)}" loading="lazy"><h3>${esc(h.t)}</h3><small>${esc(h.f || "Prey Hunter")}</small><span class="arr">${arrow}</span></a></li>`;
  }).join("");

  $("#services").innerHTML = D.services.map((s) => `<button class="svc" data-req-id="${s.id}" data-req-name="${esc(s.t)}" data-req-detail="Diego Gasca">
    <h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><span class="add">Agregar a la solicitud<i>+</i></span></button>`).join("");
  $("#topics").innerHTML = D.topics.map((t) => `<b>${esc(t)}</b>`).join("");

  const mail = `mailto:${D.email}`;
  $("#mailBtn").href = `${mail}?subject=${encodeURIComponent("Hablemos · Diego Gasca")}`;
  $("#pressBtn").href = `${mail}?subject=${encodeURIComponent("Press kit · Diego Gasca")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = mail;
  $("#phLink").href = D.eco.prey;

  // Facetas: la foto de la izquierda cambia según la faceta
  const fcFrame = $("#fcFrame");
  fcFrame.innerHTML = D.facets.map(([t, , img], i) => `<img src="${img}" alt="${esc(t)}" loading="lazy" class="${i ? "" : "on"}">`).join("");
  $("#facets").innerHTML = D.facets.map(([t, d], i) => `<li class="fc${i ? "" : " on"}" data-i="${i}" tabindex="0"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("");
  const setFacet = (i) => { $$(".fc").forEach((el) => el.classList.toggle("on", +el.dataset.i === i)); $$("img", fcFrame).forEach((im, j) => im.classList.toggle("on", j === i)); };
  $$(".fc").forEach((el) => { const i = +el.dataset.i; el.addEventListener("mouseenter", () => setFacet(i)); el.addEventListener("focus", () => setFacet(i)); el.addEventListener("click", () => setFacet(i)); });
  const icon = (i) => `<i class="ico" style="--i:url(img/icons/${i}.svg)" aria-hidden="true"></i>`;
  $("#ficons").innerHTML = D.links.map((l) => `<a href="${l.u}" target="_blank" rel="noopener" aria-label="${esc(l.n)}">${icon(l.i)}</a>`).join("");

  // Galería editorial: ritmo de revista (una portada, luego bloques anchos y verticales, con citas).
  const quotes = [["Construyendo desde 2014.", "Diego Gasca"], ["Un artista, un sello y un género propio.", "El editorial"]];
  let gi = 0;
  $("#gallery").innerHTML = D.gallery.map(([f, cap, o], i) => {
    const cls = o === "w" ? "w" : "";
    let html = `<figure class="ed-item ${cls}" data-i="${i}"><div class="ph"><img src="img/galeria/${f}.webp" alt="${esc(cap)} · Prey Hunter" loading="${i < 2 ? "eager" : "lazy"}"></div><figcaption><em>${esc(cap)}</em><span>${String(i + 1).padStart(2, "0")}</span></figcaption></figure>`;
    if (false && quotes[gi]) { const [q, a] = quotes[gi++]; html += `<div class="ed-quote"><p>${esc(q)}</p><small>${esc(a)}</small></div>`; }
    return html;
  }).join("");

  // Reseñas reales (YouTube)
  const revHTML = D.reviews.map((r) => `<article class="rev"><div><div class="stars" aria-label="Comentario de fan"><i></i><i></i><i></i><i></i><i></i></div><p>${esc(r.t)}</p></div>
    <footer><b>${esc(r.a)}</b><small>${esc(r.v)} · ${esc(r.d)}</small><a href="https://www.youtube.com/watch?v=${r.id}&lc=${r.c}" target="_blank" rel="noopener">Ver en YouTube</a></footer></article>`).join("");
  $("#reviews").innerHTML = revHTML + revHTML;
  $("#reviews").querySelectorAll(".rev").forEach((el, i) => { if (i >= D.reviews.length) { el.setAttribute("aria-hidden", "true"); el.querySelector("a").tabIndex = -1; } });

  $("#perks").innerHTML = D.perks.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("");
  const names = { prey: "Prey Hunter", cartel: "Cartel Music", salsafro: "Salsafro" };
  $("#feco").innerHTML = Object.entries(D.eco).filter(([, u]) => u).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${names[k]}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ——— Live sets ——— */
  const feature = $("#liveFeature"), bg = $("#liveBg"), poster = $("#livePoster");
  const yt = (id, sound) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1` +
    (sound ? "" : `&mute=1&controls=0&loop=1&playlist=${id}&start=90&disablekb=1&iv_load_policy=3`);
  let current = D.sets[0], featureVisible = false, modalOpen = false;
  const allowBg = !(navigator.connection && navigator.connection.saveData);

  $("#liveRail").innerHTML = D.sets.map((s, i) => `<button class="set${i ? "" : " on"}" role="listitem" data-id="${s.id}">
    <span class="th"><img src="https://i.ytimg.com/vi/${s.id}/hqdefault.jpg" alt=""></span>
    <b>${esc(s.t)}</b><small>${esc(s.y)}${s.m ? ` · ${s.m} min` : ""}</small></button>`).join("");

  function loadBg() {
    bg.classList.remove("on"); feature.classList.remove("playing");
    bg.innerHTML = "";
    if (!allowBg || !featureVisible || modalOpen) return;
    const f = document.createElement("iframe");
    f.src = yt(current.id, false) + "&enablejsapi=1&origin=" + encodeURIComponent(location.origin); f.title = ""; f.tabIndex = -1;
    f.setAttribute("allow", "autoplay; encrypted-media"); f.setAttribute("aria-hidden", "true");
    // Pide a YouTube su estado: el video solo se muestra cuando de verdad está reproduciendo.
    const send = (o) => f.contentWindow && f.contentWindow.postMessage(JSON.stringify(o), "*");
    f.onload = () => {
      const ping = () => { send({ event: "listening", id: 1, channel: "widget" }); send({ event: "command", func: "mute", args: [] }); send({ event: "command", func: "playVideo", args: [] }); };
      ping(); setTimeout(ping, 900); setTimeout(ping, 2500);
    };
    bg.appendChild(f);
  }
  addEventListener("message", (e) => {
    let host = ""; try { host = new URL(e.origin).hostname; } catch { return; }
    if (!/youtube(-nocookie)?\.com$/.test(host)) return;
    const f = $("iframe", bg); if (!f || e.source !== f.contentWindow) return;
    let d; try { d = typeof e.data === "string" ? JSON.parse(e.data) : e.data; } catch { return; }
    const st = d && d.info && d.info.playerState;
    if (st === 1) setTimeout(() => { if (bg.contains(f)) { bg.classList.add("on"); feature.classList.add("playing"); } }, 900);
  });
  function setFeature(s) {
    current = s;
    poster.onerror = () => { poster.onerror = null; poster.src = `https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`; };
    poster.src = `https://i.ytimg.com/vi/${s.id}/maxresdefault.jpg`;
    poster.alt = `${s.t} · Prey Hunter`;
    $("#liveTitle").textContent = s.t; $("#liveYear").textContent = `Prey Hunter · ${s.y}${s.m ? ` · ${s.m} min` : ""}`;
    $$(".set").forEach((b) => b.classList.toggle("on", b.dataset.id === s.id));
    loadBg();
  }
  setFeature(current);
  $("#liveRail").addEventListener("click", (e) => {
    const b = e.target.closest(".set"); if (!b) return;
    const s = D.sets.find((x) => x.id === b.dataset.id);
    if (s && s !== current) {
      setFeature(s);
      if (hasGsap && !reduced) gsap.fromTo(".live-info > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .06, ease: "power3.out" });
    }
  });
  new IntersectionObserver(([en]) => {
    const v = en.isIntersecting;
    if (v !== featureVisible) { featureVisible = v; v ? loadBg() : (bg.innerHTML = "", bg.classList.remove("on"), feature.classList.remove("playing")); }
  }, { threshold: .25 }).observe(feature);

  const modal = $("#modal"), frame = $("#modalFrame");
  function openModal() {
    modalOpen = true; bg.innerHTML = ""; feature.classList.remove("playing");
    frame.innerHTML = `<iframe src="${yt(current.id, true)}" title="${esc(current.t)} · Prey Hunter" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    modal.classList.add("on"); modal.setAttribute("aria-hidden", "false"); lenis && lenis.stop();
    $("#modalX").focus();
  }
  function closeModal() {
    modalOpen = false; modal.classList.remove("on"); modal.setAttribute("aria-hidden", "true");
    setTimeout(() => { frame.innerHTML = ""; loadBg(); }, 400); lenis && lenis.start();
  }
  feature.addEventListener("click", openModal);
  $("#modalX").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && modalOpen) closeModal(); });

  /* ——— Navegación ——— */
  const nav = $("#nav"), links = $("#links"), burger = $("#burger");
  const darkSecs = $$(".hero, .eco, .genres, .salsafro, .live, .services, .final, .footer");
  function navState() {
    nav.classList.toggle("solid", scrollY > 40);
    const y = nav.getBoundingClientRect().bottom - 2;
    nav.classList.toggle("dark", darkSecs.some((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; }));
    const secs = ["facetas", "historia", "empresario", "editorial", "servicios", "club"];
    let on = ""; secs.forEach((id) => { const r = document.getElementById(id).getBoundingClientRect(); if (r.top < innerHeight * .45 && r.bottom > innerHeight * .45) on = id; });
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

  /* ——— Disco con la portada en Éxitos ——— */
  const vinyl = $("#vinyl"), vSleeve = $(".vinyl-sleeve img", vinyl), vLabel = $(".vinyl-label img", vinyl);
  if (fine) {
    let fx = innerWidth / 2, fy = innerHeight / 2, tx = fx, ty = fy, on = false;
    $$(".hit").forEach((h) => {
      h.addEventListener("mouseenter", () => { vSleeve.src = vLabel.src = h.dataset.cover; vinyl.classList.add("on"); on = true; });
      h.addEventListener("mouseleave", () => { vinyl.classList.remove("on"); on = false; });
    });
    addEventListener("mousemove", (e) => { tx = e.clientX + 150; ty = e.clientY; }, { passive: true });
    (function loop() { if (on || vinyl.classList.contains("on")) { fx += (tx - fx) * .14; fy += (ty - fy) * .14; vinyl.style.left = fx + "px"; vinyl.style.top = fy + "px"; } requestAnimationFrame(loop); })();
  }

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
      const r = await fetch(D.club, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, sitio_web: fd.get("sitio_web") || "" }) });
      if (r.ok) { form.reset(); msg.className = "form-msg ok"; msg.textContent = `¡Listo, ${data.nombre.split(" ")[0]}! Ya eres parte del club.`; btn.disabled = false; return; }
      if (r.status === 400) { const j = await r.json().catch(() => ({})); msg.className = "form-msg err"; msg.textContent = j.error || "Revisa los datos."; btn.disabled = false; return; }
    } catch { /* sin servicio: se envía por correo */ }
    // Respaldo: abre el correo del visitante con los datos, para que no se pierda el registro.
    const body = `Quiero unirme al club de Diego Gasca.\n\nComo: ${data.tipo}\nNombre: ${data.nombre}\nCorreo: ${data.correo}\nWhatsApp: ${data.whatsapp || "-"}\nCiudad: ${data.ciudad || "-"}\nPaís: ${data.pais || "-"}\nMe interesa: ${data.intereses.join(", ") || "-"}\n\nAutorizo el tratamiento de mis datos según la política de privacidad (Ley 1581 de 2012).`;
    location.href = `mailto:${D.email}?subject=${encodeURIComponent("Club Diego Gasca · " + data.tipo)}&body=${encodeURIComponent(body)}`;
    msg.className = "form-msg ok"; msg.textContent = "Abrimos tu correo con tus datos: solo dale enviar para completar el registro.";
    btn.disabled = false;
  });

  /* ——— Visor de fotos ——— */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let lbi = 0, lbOpen = false;
  const showPhoto = (i) => { lbi = (i + D.gallery.length) % D.gallery.length; const [f, cap] = D.gallery[lbi]; lbImg.src = `img/galeria/${f}.webp`; lbImg.alt = cap; lbCap.textContent = `${cap} · ${lbi + 1}/${D.gallery.length}`; };
  const openLb = (i) => { showPhoto(i); lb.classList.add("on"); lb.setAttribute("aria-hidden", "false"); lbOpen = true; lenis && lenis.stop(); $("#lbX").focus(); };
  const closeLb = () => { lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true"); lbOpen = false; lenis && lenis.start(); };
  $("#gallery").addEventListener("click", (e) => { const f = e.target.closest(".ed-item"); if (f) openLb(+f.dataset.i); });
  $("#lbX").onclick = closeLb; $("#lbPrev").onclick = () => showPhoto(lbi - 1); $("#lbNext").onclick = () => showPhoto(lbi + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => { if (!lbOpen) return; if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") showPhoto(lbi - 1); if (e.key === "ArrowRight") showPhoto(lbi + 1); });

  /* ——— Asistente ——— */
  const aiFab = $("#aiFab"), aiPanel = $("#aiPanel"), aiLog = $("#aiLog"), aiForm = $("#aiForm"), aiInput = $("#aiInput");
  const chat = []; let greeted = false, busy = false;
  const linkify = (t) => esc(t).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
  const addMsg = (who, text) => { const d = document.createElement("div"); d.className = `msg ${who}`; d.innerHTML = linkify(text); aiLog.appendChild(d); aiLog.scrollTop = aiLog.scrollHeight; return d; };
  function aiToggle(open) {
    aiPanel.classList.toggle("on", open); aiPanel.setAttribute("aria-hidden", String(!open)); aiFab.setAttribute("aria-expanded", String(open));
    if (open && !greeted) { greeted = true; addMsg("bot", "¡Hola! Soy el asistente de Diego Gasca. Pregúntame por su música, live sets, shows, servicios, el club de fans o cómo contactarlo."); }
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

  // Partir titulares de portada en letras
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
  const hgl = window.HeroGL ? HeroGL.start({ host: $(".hero-photo"), img: heroImg, reduced }) : null;
  gsap.set(".hero-foot", { opacity: 0 });
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
    const stage = $("#heroStage");
    const layers = $$("[data-depth]", stage).map((el) => ({ el, d: +el.dataset.depth, x: gsap.quickTo(el, "x", { duration: 1.2, ease: P }), y: gsap.quickTo(el, "y", { duration: 1.2, ease: P }) }));
    const rx = gsap.quickTo(".hero-copy", "rotationY", { duration: 1.2, ease: P }), ry = gsap.quickTo(".hero-copy", "rotationX", { duration: 1.2, ease: P });
    $(".hero").addEventListener("mousemove", (e) => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      layers.forEach((l) => { l.x(nx * l.d * 2); l.y(ny * l.d * 1.4); });
      rx(nx * 6); ry(-ny * 5);
    });
  }
  // Portada al hacer scroll: la foto se acerca y el texto sube
  gsap.to(".hero-photo img", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true,
    onUpdate: (self) => hgl && hgl.setScroll(self.progress, lenis ? lenis.velocity : self.getVelocity() / 60) } });
  gsap.to(".hero-copy", { yPercent: -35, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "20% top", end: "85% top", scrub: true } });

  // Titulares por líneas
  $$(".big-head, .mega").forEach((h) => {
    const parts = $$(".split", h);
    const chars = $$(".ch", h);
    gsap.from(chars.length ? chars : parts, { yPercent: 115, duration: 1.2, stagger: chars.length ? .04 : .1, ease: E, scrollTrigger: { trigger: h, start: "top 85%" } });
  });
  // Entradas suaves de bloques
  $$(".eco-head p, .hits-head p, .live-head p, .svc-head p, .soc-head p, .rev-head p, .club-lead, .story-copy p, .biz-copy p, .final-copy p, .final-copy .cta, .num-note, .sf-logo, .topics").forEach((el) =>
    gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: P, scrollTrigger: { trigger: el, start: "top 90%" } }));

  // Ecosistema: tarjetas que suben + inclinación 3D
  gsap.from(".brandcard", { yPercent: 18, opacity: 0, duration: 1.2, stagger: .1, ease: E, scrollTrigger: { trigger: "#brands", start: "top 85%" } });
  if (fine) $$(".brandcard").forEach((c) => {
    gsap.set(c, { transformPerspective: 900 });
    const rX = gsap.quickTo(c, "rotationX", { duration: .8, ease: P }), rY = gsap.quickTo(c, "rotationY", { duration: .8, ease: P });
    c.addEventListener("mousemove", (e) => { const r = c.getBoundingClientRect(); rY(((e.clientX - r.left) / r.width - .5) * 8); rX(-((e.clientY - r.top) / r.height - .5) * 8); });
    c.addEventListener("mouseleave", () => { rX(0); rY(0); });
  });

  // Cifras que cuentan
  $$(".num b").forEach((b) => {
    const v = +b.dataset.v, dec = +b.dataset.dec, pre = b.dataset.pre, suf = b.dataset.suf, raw = b.dataset.raw === "1", o = { v: raw ? v - 12 : 0 };
    gsap.to(o, { v, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 88%" }, onUpdate: () => (b.textContent = pre + (raw ? Math.round(o.v) : fmt(o.v, dec)) + suf) });
  });
  gsap.from(".num", { y: 50, opacity: 0, duration: 1, stagger: .1, ease: P, scrollTrigger: { trigger: "#numbers", start: "top 88%" } });

  // Historia: año gigante que se desliza y foto que se abre
  gsap.fromTo(".story-year span", { xPercent: 10 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".story-photo .clip", { clipPath: "inset(18% 14% 18% 14%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".story-photo", start: "top 90%", end: "center 55%", scrub: true } });
  gsap.fromTo(".story-photo img", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".story-photo", start: "top bottom", end: "bottom top", scrub: true } });

  // Marquesina de géneros que reacciona a la velocidad del scroll
  const track = $("#genres"); let gx = 0, dir = -1, vel = 0;
  if (lenis) lenis.on("scroll", (l) => { vel = l.velocity; if (Math.abs(vel) > .5) dir = vel > 0 ? -1 : 1; });
  gsap.ticker.add(() => {
    const w = track.scrollWidth / 3; gx += dir * (1.1 + Math.min(Math.abs(vel) * .35, 14));
    if (gx <= -w) gx += w; if (gx > 0) gx -= w; track.style.transform = `translate3d(${gx}px,0,0)`; vel *= .92;
  });

  // Salsafro
  gsap.from(".sf-mix > *", { y: 30, opacity: 0, duration: .8, stagger: .12, ease: P, scrollTrigger: { trigger: ".sf-mix", start: "top 90%" } });
  // Éxitos
  gsap.from(".hit-list li", { y: 50, opacity: 0, duration: 1, stagger: .07, ease: P, scrollTrigger: { trigger: "#hits", start: "top 85%" } });
  // Live
  gsap.fromTo(".live-feature", { clipPath: "inset(8% 6% 8% 6%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".live-feature", start: "top 95%", end: "top 35%", scrub: true } });
  gsap.from(".set", { y: 40, opacity: 0, duration: .9, stagger: .08, ease: P, scrollTrigger: { trigger: "#liveRail", start: "top 92%" } });
  // Empresario
  gsap.fromTo(".biz-photo img", { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".biz", start: "top bottom", end: "bottom top", scrub: true } });
  // Servicios
  gsap.from(".svc", { y: 60, opacity: 0, duration: 1, stagger: .08, ease: P, scrollTrigger: { trigger: "#services", start: "top 85%" } });
  // Redes
  gsap.from(".fc", { y: 40, opacity: 0, duration: .9, stagger: .08, ease: P, scrollTrigger: { trigger: "#facets", start: "top 85%" } });
  gsap.fromTo(".fc-frame", { clipPath: "inset(14% 10% 14% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".facets", start: "top 85%", end: "top 25%", scrub: true } });
  // Editorial: cada foto se revela como una página
  gsap.from(".ed-mast > *", { y: 40, opacity: 0, duration: 1.1, stagger: .12, ease: P, scrollTrigger: { trigger: ".ed-mast", start: "top 85%" } });
  $$(".ed-item .ph").forEach((ph) => {
    gsap.fromTo(ph, { clipPath: "inset(12% 0% 12% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ph, start: "top 95%", end: "top 55%", scrub: true } });
    gsap.fromTo($("img", ph), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ph, start: "top bottom", end: "bottom top", scrub: true } });
  });
  gsap.from(".ed-quote", { y: 40, opacity: 0, duration: 1.1, ease: P, stagger: .2, scrollTrigger: { trigger: ".ed-quote", start: "top 88%" } });
  // Reseñas: carrusel continuo que se detiene al pasar el mouse
  const rail = $("#reviews");
  const revTw = gsap.to(rail, { x: () => -(rail.scrollWidth / 2), duration: 70, ease: "none", repeat: -1 });
  rail.addEventListener("mouseenter", () => revTw.pause()); rail.addEventListener("mouseleave", () => revTw.resume());
  // Club
  gsap.from(".perks li, .club-form", { y: 40, opacity: 0, duration: 1, stagger: .1, ease: P, scrollTrigger: { trigger: ".club", start: "top 80%" } });
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
  // Live: el video se inclina en 3D con el mouse
  if (fine) {
    gsap.set(feature, { transformPerspective: 1400 });
    const fx = gsap.quickTo(feature, "rotationY", { duration: .9, ease: P }), fy = gsap.quickTo(feature, "rotationX", { duration: .9, ease: P });
    feature.addEventListener("mousemove", (e) => { const r = feature.getBoundingClientRect(); fx(((e.clientX - r.left) / r.width - .5) * 5); fy(-((e.clientY - r.top) / r.height - .5) * 4); });
    feature.addEventListener("mouseleave", () => { fx(0); fy(0); });
  }
  // Sesgo según la velocidad del scroll (fotos de la revista y titulares grandes)
  if (lenis) {
    const skewEls = $$(".ed-item .ph, .rev");
    const setters = skewEls.map((el) => gsap.quickTo(el, "skewY", { duration: .6, ease: P }));
    lenis.on("scroll", (l) => { const k = Math.max(-4, Math.min(4, l.velocity * .12)); setters.forEach((s) => s(k)); });
  }
  // Cierre
  gsap.fromTo(".final-photo", { yPercent: -8, scale: 1.12 }, { yPercent: 6, scale: 1, ease: "none", scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true } });

  addEventListener("load", () => { ScrollTrigger.refresh(); navState(); });
})();
