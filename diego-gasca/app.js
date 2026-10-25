(() => {
  const D = window.DG;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  // Respeta «reducir movimiento» del sistema; ?motion=1 fuerza la versión animada (para revisar).
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches && !/[?&]motion=1\b/.test(location.search);
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (reduced || !hasGsap) document.documentElement.classList.add("reduced");
  if (!location.hash && "scrollRestoration" in history) { history.scrollRestoration = "manual"; scrollTo(0, 0); }

  if (window.Solicitud) Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de servicios" });

  /* ——— Contenido ——— */
  const tick = ["Construyendo desde 2014", "Salsafro", "Afro House", "House", "Tech House", "Deep House", "Cartel Music", "Prey Hunter", "Cali, Colombia"];
  const tickHTML = tick.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = tickHTML + tickHTML;

  $("#brands").innerHTML = D.brands.map((b) => {
    const u = b.href || D.eco[b.key];
    const ext = u && u.startsWith("http");
    return `<a class="brandcard"${b.color ? ` style="--c:${b.color}"` : ""} href="${u || "#"}" ${ext ? 'target="_blank" rel="noopener"' : ""}>
      <img src="${b.img}" alt="" loading="lazy"><small>${esc(b.role)}</small><h3>${esc(b.name)}</h3>
      <span class="go">${esc(b.cta)}<i></i></span></a>`;
  }).join("");

  const fmt = (v, dec) => v.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  $("#numbers").innerHTML = D.stats.map(([v, suf, l, dec, pre]) =>
    `<div class="num"><b data-v="${v}" data-dec="${dec}" data-pre="${esc(pre)}" data-suf="${esc(suf)}">${esc(pre)}${fmt(v, dec)}${esc(suf)}</b><span>${esc(l)}</span></div>`).join("");

  const genres = ["Salsafro", "Afro House", "House", "Tech House", "Deep House"];
  const gHTML = genres.map((g) => `<span>${esc(g)}<img src="img/clover.webp" alt=""></span>`).join("");
  $("#genres").innerHTML = gHTML + gHTML + gHTML;

  const hitImgs = ["img/press-14.webp", "img/press-05.webp", "img/portrait-prey-hunter.webp", "img/press-18.webp", "img/live-02.webp", "img/portrait-salsafro.webp", "img/press-07.webp"];
  const arrow = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  $("#hits").innerHTML = D.hits.map((h, i) => {
    const url = h.yt ? `https://www.youtube.com/watch?v=${h.yt}` : `https://www.youtube.com/results?search_query=${encodeURIComponent("Prey Hunter " + h.t)}`;
    return `<li><a class="hit" href="${url}" target="_blank" rel="noopener" data-img="${hitImgs[i % hitImgs.length]}">
      <h3>${esc(h.t)}</h3><small>${esc(h.f || "Prey Hunter")}</small><span class="arr">${arrow}</span></a></li>`;
  }).join("");

  $("#services").innerHTML = D.services.map((s) => `<button class="svc" data-req-id="${s.id}" data-req-name="${esc(s.t)}" data-req-detail="Diego Gasca">
    <h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><span class="add">Agregar a la solicitud<i>+</i></span></button>`).join("");
  $("#topics").innerHTML = D.topics.map((t) => `<b>${esc(t)}</b>`).join("");

  const mail = `mailto:${D.email}`;
  $("#mailBtn").href = `${mail}?subject=${encodeURIComponent("Hablemos · Diego Gasca")}`;
  $("#pressBtn").href = `${mail}?subject=${encodeURIComponent("Press kit · Diego Gasca")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = mail;
  $("#fyt").href = D.youtube; $("#ytLink").href = D.youtube;
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
    <span class="th"><img src="https://i.ytimg.com/vi/${s.id}/hqdefault.jpg" alt="" loading="lazy"></span>
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
    const secs = ["historia", "exitos", "live", "ecosistema", "servicios"];
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

  /* ——— Imagen flotante de Éxitos ——— */
  const float = $("#hitFloat"), fImg = $("img", float);
  if (fine) {
    let fx = 0, fy = 0, tx = 0, ty = 0;
    $$(".hit").forEach((h) => {
      h.addEventListener("mouseenter", () => { fImg.src = h.dataset.img; float.classList.add("on"); });
      h.addEventListener("mouseleave", () => float.classList.remove("on"));
    });
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() { fx += (tx - fx) * .14; fy += (ty - fy) * .14; float.style.left = fx + "px"; float.style.top = fy + "px"; requestAnimationFrame(loop); })();
  }

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
  gsap.set(".hero-foot", { opacity: 0 });
  const countTw = gsap.to(counter, { v: 90, duration: 1, ease: "power2.out", onUpdate: () => (num.textContent = Math.round(counter.v)) });
  ready.then(() => {
    countTw.kill();
    gsap.timeline({ onComplete: done })
      .to(counter, { v: 100, duration: .3, onUpdate: () => (num.textContent = Math.round(counter.v)) })
      .to(".loader-in", { opacity: 0, y: -20, duration: .35, ease: "power2.in" })
      .to(loader, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=.05")
      .to(".hero-photo img", { scale: 1, duration: 2.2, ease: E }, "-=.75")
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
  gsap.to(".hero-photo img", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-copy", { yPercent: -35, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "20% top", end: "85% top", scrub: true } });

  // Titulares por líneas
  $$(".big-head, .mega").forEach((h) => {
    const parts = $$(".split", h);
    const chars = $$(".ch", h);
    gsap.from(chars.length ? chars : parts, { yPercent: 115, duration: 1.2, stagger: chars.length ? .04 : .1, ease: E, scrollTrigger: { trigger: h, start: "top 85%" } });
  });
  // Entradas suaves de bloques
  $$(".eco-head p, .hits-head p, .live-head p, .svc-head p, .story-copy p, .biz-copy p, .final-copy p, .final-copy .cta, .num-note, .sf-logo, .topics").forEach((el) =>
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
    const v = +b.dataset.v, dec = +b.dataset.dec, pre = b.dataset.pre, suf = b.dataset.suf, o = { v: 0 };
    gsap.to(o, { v, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 88%" }, onUpdate: () => (b.textContent = pre + fmt(o.v, dec) + suf) });
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
  // Cierre
  gsap.fromTo(".final-photo", { yPercent: -8, scale: 1.12 }, { yPercent: 6, scale: 1, ease: "none", scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true } });

  addEventListener("load", () => { ScrollTrigger.refresh(); navState(); });
})();
