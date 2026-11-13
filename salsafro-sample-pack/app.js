/* Salsafro Sample Pack · Elements Vol. 1 — interacción y movimiento */
(() => {
  "use strict";
  const D = window.SS;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  // «?motion=1» fuerza el movimiento completo para revisar la página en un equipo con animaciones reducidas.
  const reduce = !/[?&]motion=1\b/.test(location.search) && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) document.documentElement.classList.add("motion");
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const en = () => document.documentElement.lang === "en";
  const T = (es, enTxt) => (en() ? enTxt : es);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  $("#year").textContent = new Date().getFullYear();

  /* ───── Íconos ───── */
  const ICON = {
    kick: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    drum: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v9c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 10l7 3 7-3"/>',
    bass: '<path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0"/><path d="M22 12h0"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    fx: '<path d="M3 20l6-8 4 4 8-12"/><path d="M15 4h6v6"/>',
    midi: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 5v8M12 5v8M16 5v8"/>',
  };
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  /* ───── Contenido desde data.js ───── */
  function render() {
    const cur = $("#tracks button[aria-current='true']");
    const curId = cur ? cur.dataset.id : String(D.tracks[0][0]);
    $("#tracks").innerHTML = D.tracks.map(([id, slug, t, a, y]) =>
      `<li class="track"><button type="button" data-id="${id}" data-slug="${slug}" aria-current="${String(id) === curId}" aria-label="${esc(T("Escuchar", "Play"))} ${esc(t)}">
        <img src="img/${slug}.jpg" alt="" width="64" height="64" loading="lazy">
        <span><span class="t-title">${esc(t)}</span><span class="t-meta">${esc(a)} · ${y}</span></span>
        <span class="t-play">${PLAY}</span></button></li>`).join("");

    $("#cats").innerHTML = D.cats.map(([ic, es, enN, dEs, dEn]) => {
      const bars = Array.from({ length: 14 }, (_, i) => `<i style="--h:${30 + Math.round(Math.abs(Math.sin(i * 1.7 + ic.length)) * 70)}%;--dl:${(-i * 0.07).toFixed(2)}s"></i>`).join("");
      return `<article class="cat"><div class="cat-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[ic]}</svg></div>
        <h3>${esc(T(es, enN))}</h3><p>${esc(T(dEs, dEn))}</p>
        <div class="cat-foot"><div class="cat-wave" aria-hidden="true">${bars}</div><span class="tag">${esc(T("Muestras pronto", "Previews soon"))}</span></div></article>`;
    }).join("");

    $("#deliv").innerHTML = D.delivery.map(([k, kEn, v, vEn]) => `<div><dt>${esc(T(k, kEn))}</dt><dd>${esc(T(v, vEn))}</dd></div>`).join("");
    $("#perks").innerHTML = D.perks.map(([k, kEn, v, vEn], i) => `<li><span class="pk-n">0${i + 1}</span><div><b>${esc(T(k, kEn))}</b><span>${esc(T(v, vEn))}</span></div></li>`).join("");

    $("#waBtn").href = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(T(D.waText[0], D.waText[1]))}`;
    bindCats();
  }

  /* ───── Idioma ───── */
  function applyLang() {
    const isEn = en();
    $$("[data-en]").forEach((el) => { if (el.dataset.es == null) el.dataset.es = el.textContent; el.textContent = isEn ? el.dataset.en : el.dataset.es; });
    $$("[data-en-html]").forEach((el) => { if (el.dataset.esHtml == null) el.dataset.esHtml = el.innerHTML; el.innerHTML = isEn ? el.dataset.enHtml : el.dataset.esHtml; });
    const b = $("#langBtn"); b.textContent = isEn ? "ES" : "EN"; b.setAttribute("aria-label", isEn ? "Cambiar idioma a español" : "Change language to English");
    render();
  }
  $("#langBtn").addEventListener("click", () => {
    document.documentElement.lang = en() ? "es" : "en";
    try { localStorage.setItem("ss-lang", document.documentElement.lang); } catch (e) { /* sin almacenamiento */ }
    applyLang(); if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  /* ───── Reproductor (Bandcamp) ───── */
  const vinyl = $("#vinyl"), eq = $("#eq"), frame = $("#bcPlayer");
  eq.innerHTML = Array.from({ length: 22 }, (_, i) => `<i style="--h:${(0.35 + Math.abs(Math.sin(i * 2.3)) * 0.65).toFixed(2)};--d:${(0.45 + (i % 5) * 0.12).toFixed(2)}s"></i>`).join("");
  let playing = false;
  const setPlaying = (on) => { playing = on; vinyl.classList.toggle("playing", on); eq.classList.toggle("on", on); };

  function selectTrack(btn) {
    const id = btn.dataset.id, slug = btn.dataset.slug;
    const tr = D.tracks.find((t) => String(t[0]) === id); if (!tr) return;
    $$("#tracks button").forEach((b) => b.setAttribute("aria-current", String(b === btn)));
    const swap = () => {
      $("#nowCover").src = `img/${slug}.jpg`;
      $("#nowTitle").textContent = tr[2];
      $("#nowArtist").textContent = `${tr[3]} · ${tr[4]}`;
      $("#nowBuy").href = `https://salsafro.bandcamp.com/track/${slug}`;
      frame.title = `Reproductor de Bandcamp: ${tr[2]}`;
      frame.src = `https://bandcamp.com/EmbeddedPlayer/track=${id}/size=large/bgcol=111111/linkcol=ff6d29/tracklist=false/artwork=none/transparent=true/`;
      setPlaying(false);
    };
    if (window.gsap && !reduce) {
      gsap.timeline().to([".vinyl-wrap", ".now-meta"], { opacity: 0, y: 12, duration: .22, ease: "power2.in", onComplete: swap })
        .to([".vinyl-wrap", ".now-meta"], { opacity: 1, y: 0, duration: .5, ease: "expo.out", stagger: .05 });
    } else swap();
    if (matchMedia("(max-width: 900px)").matches) {
      const top = $(".deck-now").getBoundingClientRect().top + scrollY - 80;
      lenis ? lenis.scrollTo(top) : scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
  }
  $("#tracks").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) selectTrack(b); });
  // Al hacer clic dentro del reproductor de Bandcamp alternamos la animación del vinilo.
  addEventListener("blur", () => {
    setTimeout(() => { if (document.activeElement === frame) { setPlaying(!playing); setTimeout(() => window.focus(), 60); } }, 0);
  });

  /* ───── Lista de espera ───── */
  const form = $("#clubForm"), msg = $("#clubMsg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    if (fd.get("sitio_web")) return; // trampa para bots
    const g = (k) => String(fd.get(k) || "").trim();
    const data = { tipo: fd.get("tipo"), nombre: g("nombre"), correo: g("correo"), whatsapp: g("whatsapp"), ciudad: g("ciudad"), pais: g("pais"), intereses: fd.getAll("intereses"), acepto: !!fd.get("acepto") };
    $$(".fld input", form).forEach((i) => { i.classList.remove("bad"); i.removeAttribute("aria-invalid"); });
    const say = (cls, es, enTxt) => { msg.className = "form-msg " + cls; msg.textContent = T(es, enTxt); };
    const bad = [];
    if (data.nombre.length < 2) bad.push("nombre");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.correo)) bad.push("correo");
    if (bad.length) { bad.forEach((n) => { form.elements[n].classList.add("bad"); form.elements[n].setAttribute("aria-invalid", "true"); }); say("err", "Revisa tu nombre y tu correo.", "Check your name and email."); form.elements[bad[0]].focus(); return; }
    if (!data.acepto) { say("err", "Para unirte necesitas autorizar el tratamiento de datos.", "To join you need to accept the data policy."); return; }
    const btn = $("button[type=submit]", form); btn.disabled = true; say("", "Enviando…", "Sending…");
    try {
      const r = await fetch(D.club, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, idioma: en() ? "en" : "es", sitio_web: "" }) });
      if (r.ok) { form.reset(); const n = data.nombre.split(" ")[0]; say("ok", `¡Listo, ${n}! Ya estás en la lista de espera.`, `Done, ${n}! You're on the waitlist.`); btn.disabled = false; return; }
      if (r.status === 429) { say("err", "Recibimos varios intentos seguidos. Espera unos minutos e inténtalo de nuevo.", "Too many attempts. Please wait a few minutes and try again."); btn.disabled = false; return; }
      if (r.status === 400) { say("err", "Revisa los datos.", "Please check your details."); btn.disabled = false; return; }
    } catch (err) { /* sin servicio: se envía por correo */ }
    const body = `Quiero unirme a la lista de espera de ${D.brand}.\n\nComo: ${data.tipo}\nNombre: ${data.nombre}\nCorreo: ${data.correo}\nWhatsApp: ${data.whatsapp || "-"}\nCiudad: ${data.ciudad || "-"}\nPaís: ${data.pais || "-"}\nMe interesa: ${data.intereses.join(", ") || "-"}\n\nAutorizo el tratamiento de mis datos según la política de privacidad (Ley 1581 de 2012).`;
    location.href = `mailto:${D.email}?subject=${encodeURIComponent("Lista de espera " + D.brand + " · " + data.tipo)}&body=${encodeURIComponent(body)}`;
    say("ok", "Abrimos tu correo con tus datos: solo dale enviar para completar el registro.", "We opened your email with your details: just hit send to finish.");
    btn.disabled = false;
  });

  /* ───── Navegación ───── */
  const nav = $("#nav");
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle("scrolled", y > 40);
    nav.classList.toggle("hide", y > 500 && y > lastY + 4);
    if (y < lastY - 4) nav.classList.remove("hide");
    lastY = y;
  };
  const secs = $$("main section[id]");
  const io = new IntersectionObserver((ents) => ents.forEach((en2) => {
    if (!en2.isIntersecting) return;
    $$(".links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en2.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach((s) => io.observe(s));

  /* ───── Scroll suave (Lenis) ───── */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ({ scroll }) => onScroll(scroll));
    if (window.gsap) { lenis.on("scroll", () => window.ScrollTrigger && ScrollTrigger.update()); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  } else addEventListener("scroll", () => onScroll(scrollY), { passive: true });
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href"); const t = id.length > 1 && $(id); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { offset: id === "#inicio" ? 0 : -70 }); else t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    if (id !== "#inicio") history.replaceState(null, "", id);
  }));

  /* ───── Brillo del cursor y botones magnéticos ───── */
  if (fine && !reduce) {
    const glow = $("#glow");
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; glow.style.opacity = 1; }, { passive: true });
    (function loop() { gx += (tx - gx) * .12; gy += (ty - gy) * .12; glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`; requestAnimationFrame(loop); })();
    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; b.style.transform = `translate(${x * .18}px, ${y * .28}px)`; });
      b.addEventListener("pointerleave", () => { b.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)"; b.style.transform = ""; setTimeout(() => (b.style.transition = ""), 500); });
    });
  }

  /* ───── Tarjetas del pack: luz que sigue el mouse e inclinación ───── */
  function bindCats() {
    if (!fine || reduce) return;
    $$(".cat").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty("--mx", px * 100 + "%"); c.style.setProperty("--my", py * 100 + "%");
        c.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-4px)`;
      });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
      c.style.transition = "transform .5s cubic-bezier(.22,1,.36,1), border-color .4s";
    });
  }

  /* ───── Brasas flotantes ───── */
  (function embers() {
    const cv = $("#embers"); if (reduce || !cv.getContext) return;
    const ctx = cv.getContext("2d"); let W, H, dpr, parts = [];
    const N = innerWidth < 760 ? 26 : 60;
    const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
    const spawn = (init) => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 20, r: (Math.random() * 1.8 + .6) * dpr, vy: (Math.random() * .5 + .25) * dpr, vx: (Math.random() - .5) * .3 * dpr, a: Math.random() * .6 + .2, t: Math.random() * 6.28 });
    size(); addEventListener("resize", size);
    for (let i = 0; i < N; i++) parts.push(spawn(true));
    let vis = true; document.addEventListener("visibilitychange", () => { vis = !document.hidden; if (vis) requestAnimationFrame(tick); });
    function tick() {
      if (!vis) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.t += .02; p.y -= p.vy; p.x += p.vx + Math.sin(p.t) * .3 * dpr;
        if (p.y < -20) Object.assign(p, spawn(false));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,170,90,${p.a})`); g.addColorStop(1, "rgba(255,109,41,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ───── Animaciones GSAP ───── */
  function intro() {
    const loader = $("#loader");
    loader.classList.add("out");
    if (!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);
    if (reduce) {
      // Versión suave: solo fundidos de opacidad, sin desplazamientos, giros ni parallax.
      gsap.from(".hero-copy > *", { opacity: 0, duration: .8, stagger: .08, delay: .2 });
      $$(".sec-head, .show-copy, .gallery-intro, .deck, .cats, .deliv, .club-form, .final-copy, .show-media").forEach((el) =>
        gsap.from(el, { opacity: 0, duration: .9, scrollTrigger: { trigger: el, start: "top 88%" } }));
      return;
    }
    const E = "expo.out";

    // Letras del título
    $$(".hero-title .split").forEach((s) => { s.innerHTML = [...s.textContent].map((c) => `<span class="ch">${c}</span>`).join(""); });
    const tl = gsap.timeline({ delay: .25 });
    tl.from(".hero-bg img", { scale: 1.18, opacity: 0, duration: 2, ease: E }, 0)
      .from(".hero-title .ch", { yPercent: 110, rotate: 8, opacity: 0, duration: 1.1, ease: E, stagger: .045 }, .25)
      .from(".hero .reveal-up", { y: 28, opacity: 0, duration: .9, ease: E, stagger: .09 }, .55)
      .from(".nav", { y: -30, opacity: 0, duration: .8, ease: E }, .4);

    // Parallax de la portada
    gsap.to(".hero-bg", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-copy", { yPercent: -18, opacity: .2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    if (fine) {
      const bg = $(".hero-bg img");
      $(".hero").addEventListener("pointermove", (e) => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; gsap.to(bg, { x: x * -26, y: y * -16, duration: 1.2, ease: "power3.out" }); });
    }
    // Brillo que respira sobre el título
    gsap.to(".hero-title .accent", { textShadow: "0 0 90px rgba(255,109,41,.9)", duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Cabeceras de sección
    $$(".sec-head, .show-copy, .gallery-intro").forEach((h) => {
      gsap.from(h.children, { y: 40, opacity: 0, duration: 1, ease: E, stagger: .1, scrollTrigger: { trigger: h, start: "top 85%" } });
    });

    // Reproductor y lista
    gsap.from(".deck-now", { y: 60, opacity: 0, rotateX: 8, duration: 1.2, ease: E, scrollTrigger: { trigger: ".deck", start: "top 80%" } });
    ScrollTrigger.batch(".track", { start: "top 92%", onEnter: (els) => gsap.from(els, { x: 50, opacity: 0, duration: .8, ease: E, stagger: .06 }) });
    gsap.to(".phones", { y: -14, rotate: -4, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // El pack
    ScrollTrigger.batch(".cat", { start: "top 90%", onEnter: (els) => gsap.from(els, { y: 70, opacity: 0, scale: .96, duration: 1, ease: E, stagger: .08, clearProps: "transform" }) });
    gsap.from(".pack-mono", { x: 120, opacity: 0, rotate: 6, duration: 1.4, ease: E, scrollTrigger: { trigger: ".pack", start: "top 75%" } });
    gsap.to(".pack-mono", { y: -18, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Vitrina: el GIF gira en 3D con el scroll
    gsap.fromTo(".tilt", { rotateY: -18, rotateX: 8, scale: .9 }, { rotateY: 10, rotateX: -4, scale: 1, ease: "none", scrollTrigger: { trigger: ".show", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.from(".show-mono", { y: 120, opacity: 0, duration: 1.3, ease: E, scrollTrigger: { trigger: ".show", start: "top 70%" } });
    gsap.from(".genres li", { scale: .6, opacity: 0, duration: .7, ease: "back.out(2)", stagger: .1, scrollTrigger: { trigger: ".genres", start: "top 90%" } });
    gsap.from(".years", { backgroundPosition: "200% 0", letterSpacing: ".2em", opacity: 0, duration: 1.4, ease: E, scrollTrigger: { trigger: ".years", start: "top 92%" } });

    // Galería horizontal anclada (escritorio)
    ScrollTrigger.matchMedia({
      "(min-width: 761px)": () => {
        const track = $(".gallery-track");
        const dist = () => Math.max(0, track.scrollWidth - innerWidth);
        const st = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".gallery", start: "center center", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
        $$(".g-card img").forEach((img) => gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: st, start: "left right", end: "right left", scrub: true } }));
        return () => st.scrollTrigger && st.scrollTrigger.kill();
      },
    });

    // Formato y club
    ScrollTrigger.batch(".deliv > div", { start: "top 92%", onEnter: (els) => gsap.from(els, { y: 30, opacity: 0, duration: .8, ease: E, stagger: .08 }) });
    gsap.from(".club-form", { y: 70, opacity: 0, duration: 1.2, ease: E, scrollTrigger: { trigger: ".club", start: "top 75%" } });
    gsap.from(".perks li", { x: -40, opacity: 0, duration: .8, ease: E, stagger: .1, scrollTrigger: { trigger: ".perks", start: "top 90%" } });

    // Cierre
    gsap.fromTo(".final-title", { scale: .82, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".final", start: "top 85%", end: "center center", scrub: 1 } });
    gsap.fromTo(".final-bg", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom bottom", scrub: true } });

    // La cinta acelera con la velocidad del scroll
    const tick = $(".ticker-track");
    tick.style.animation = "none";
    const loopTw = gsap.to(tick, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
    ScrollTrigger.create({ onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 300, 5);
      gsap.to(loopTw, { timeScale: 1 + v, duration: .25, overwrite: true, onComplete: () => gsap.to(loopTw, { timeScale: 1, duration: 1.2, ease: "power2.out" }) });
    } });

    addEventListener("load", () => ScrollTrigger.refresh());
  }

  applyLang();
  if (document.readyState === "complete") intro();
  else { let done = false; const go = () => { if (!done) { done = true; intro(); } }; addEventListener("load", go); setTimeout(go, 2500); }
})();
