// Sistema común de los sitios Prey Hunter, Cartel Music y Salsafro (mismo diseño que diego-gasca.vercel.app).
// Cada sección se dibuja solo si existe en la página; los datos vienen de window.PH (data.js de cada sitio).
(() => {
  const D = window.PH, KEY = D.key || "ph";
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const T = (es, en) => (document.documentElement.lang === "en" ? en : es);
  const reduced = (matchMedia("(prefers-reduced-motion: reduce)").matches && !/[?&]motion=1\b/.test(location.search)) || /[?&]static=1\b/.test(location.search);
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (reduced || !hasGsap) document.documentElement.classList.add("reduced");

  if (window.Solicitud) Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Tu solicitud de booking" });
  const drawer = document.getElementById("rqDrawer");
  if (drawer) { const sync = () => (drawer.inert = drawer.getAttribute("aria-hidden") !== "false"); sync(); new MutationObserver(sync).observe(drawer, { attributes: true, attributeFilter: ["aria-hidden"] }); }

  /* ——— Contenido ——— */
  const fill = (id, html) => { const el = document.getElementById(id); if (el && html != null) el.innerHTML = html; return el; };
  fill("stats", (D.stats || []).map(([v, l, s]) => `<div class="num"><b>${esc(v)}</b><span>${esc(l)}</span>${s ? `<small>${esc(s)}</small>` : ""}</div>`).join(""));
  // Lo más escuchado: carátula y disco dorado girando
  fill("top", D.top && D.top.map(([n, u, t, d, c]) => { const img = `img/covers/${c}.webp`;
    return `<article class="tile ach"><div class="hit-art" aria-hidden="true"><img class="hit-sleeve" src="${img}" width="360" height="360" alt="" loading="lazy" decoding="async"><span class="hit-disc"><span class="hit-grooves"><img src="${img}" width="360" height="360" alt="" loading="lazy" decoding="async"></span><i></i></span></div>
      <div class="hit-txt"><b>${esc(n)}</b><small>${esc(u)}</small><span>${esc(t)}</span><em>${esc(d)}</em></div></article>`; }).join(""));
  fill("platforms", D.links && D.links.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join(""));
  fill("flinks", D.links && D.links.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(n)}</a>`).join(""));
  // Tienda (Bandcamp)
  fill("store", D.store && D.store.map((s) => `<a class="tile prod" href="${s.url}" target="_blank" rel="noopener">
    <img src="${s.img}" width="350" height="350" alt="" loading="lazy" decoding="async">${s.tag ? `<span class="prod-tag">${esc(s.tag)}</span>` : ""}
    <span class="prod-in"><b>${esc(s.t)}</b><em>${esc(s.a)} · ${s.y}</em><u>${T("Comprar", "Buy")} · US$${s.p}</u></span></a>`).join(""));
  // Booking: formatos que se agregan a la solicitud
  fill("formats", D.booking && D.booking.map((f) => `<button type="button" class="fmt" data-req-id="${f.id}" data-req-name="${esc(f.t)}" data-req-detail="${esc(f.d)}"><b>${esc(f.t)}</b><span>${esc(f.d)}</span><i>+</i></button>`).join(""));
  fill("showsGrid", D.shows && D.shows.map(([p, n]) => `<div class="ph-show"><b>${esc(n)}</b><span>${esc(p)}</span><small>${T("personas", "people")}</small></div>`).join(""));
  // Discografía con portadas
  fill("disco", D.discography && D.discography.map(([t, y, k, c]) => `<article class="tile rel"><img src="img/covers/${c}.webp" width="360" height="360" alt="" loading="lazy" decoding="async"><span class="rel-in"><b>${esc(t)}</b><em>${esc(k)} · ${y}</em></span></article>`).join(""));
  // Press kit
  fill("gallery", D.gallery && D.gallery.map((g, i) => `<a class="tile shot" href="img/${g}.webp" download="prey-hunter-${g}.webp" aria-label="${T("Descargar foto", "Download photo")} ${i + 1}"><img src="img/${g}-480.webp" width="480" height="720" alt="" loading="lazy" decoding="async"><u>${T("Descargar", "Download")}</u></a>`).join(""));
  // Artistas del sello (tarjeta con monograma 3D; se reemplaza por foto cuando exista D.artistImg)
  fill("artists", D.artists && D.artists.map((n, i) => { const ini = n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return `<article class="tile artist"><span class="artist-av" style="--h:${(i * 37) % 360}" aria-hidden="true"><i>${esc(ini)}</i></span><b>${esc(n)}</b><em>${esc(D.artistRole || T("Artista del sello", "Label artist"))}</em></article>`; }).join(""));
  // Raíces, servicios y galería del personaje
  fill("roots", D.roots && D.roots.map(([n, t, d]) => `<article class="tile root"><span>${esc(n)}</span><b>${esc(t)}</b><p>${esc(d)}</p></article>`).join(""));
  fill("services", D.services && D.services.map(([t, d]) => `<article class="tile svc-c"><b>${esc(t)}</b><p>${esc(d)}</p></article>`).join(""));
  fill("delivery", D.delivery && D.delivery.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join(""));
  fill("chars", D.chars && D.chars.map(([src, alt, pos]) => `<figure class="tile char"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" style="object-position:${pos || "50% 30%"}"></figure>`).join(""));
  // Reseñas reales
  const revHTML = (D.reviews || []).map((r) => `<article class="rev"><div><div class="stars" role="img" aria-label="Comentario del público"><i></i><i></i><i></i><i></i><i></i></div><p>${esc(r.t)}</p></div>
    <footer><b>${esc(r.a)}</b><small>${esc(r.v)} · ${esc(r.d)}</small><a href="https://www.youtube.com/watch?v=${r.id}&lc=${r.c}" target="_blank" rel="noopener">Ver en YouTube</a></footer></article>`).join("");
  if (fill("reviews", revHTML + revHTML) && !revHTML) document.getElementById("resenas")?.remove();
  $$("#reviews .rev").forEach((el, i) => { if (i >= D.reviews.length) { el.setAttribute("aria-hidden", "true"); el.querySelector("a").tabIndex = -1; } });
  // Enlaces del ecosistema, correo y WhatsApp
  $$("[data-eco]").forEach((a) => { a.href = D.eco[a.dataset.eco]; a.target = "_blank"; a.rel = "noopener"; });
  const mail = `mailto:${D.email}`;
  $("#fmail").textContent = D.email; $("#fmail").href = mail;
  if ($("#mailBtn")) $("#mailBtn").href = `${mail}?subject=${encodeURIComponent((D.mailSubject || "Booking") + " · " + D.brand)}`;
  if ($("#pressMail")) $("#pressMail").href = `${mail}?subject=${encodeURIComponent("Press kit · " + D.brand)}`;
  const wa = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(T(D.waText || "Hola, quiero información.", D.waTextEn || "Hi, I'd like some information."))}`;
  $$("#waBtn, .wa-link").forEach((a) => (a.href = wa));
  $("#year").textContent = new Date().getFullYear();

  /* ——— Navegación ——— */
  const nav = $("#nav"), links = $("#links"), burger = $("#burger");
  const lightSecs = $$(".rowsec:not(.dark), .ph-booking, .ph-bio, .reviews, .ph-split");
  const secs = [...$$("#links a")].map((a) => a.getAttribute("href").slice(1)).map((id) => document.getElementById(id)).filter(Boolean);
  function navState() {
    nav.classList.toggle("solid", scrollY > 40);
    const y = nav.getBoundingClientRect().bottom - 2, light = document.documentElement.dataset.theme === "light";
    nav.classList.toggle("dark", !(light && lightSecs.some((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; })));
    let on = ""; secs.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top < innerHeight * .45 && r.bottom > innerHeight * .45) on = s.id; });
    $$("#links a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + on));
  }
  addEventListener("scroll", navState, { passive: true }); addEventListener("resize", navState); navState();
  function menu(open) {
    links.classList.toggle("on", open); nav.classList.toggle("menu", open);
    burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? T("Cerrar menú", "Close menu") : T("Abrir menú", "Open menu"));
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.onclick = () => menu(!links.classList.contains("on"));

  let lenis = null;
  if (!reduced && hasGsap && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  }
  const goTo = (id, dur = 1.4) => { const el = document.getElementById(id); if (!el) return; const off = -nav.offsetHeight;
    lenis ? lenis.scrollTo(el, { offset: off, duration: dur }) : scrollTo({ top: el.getBoundingClientRect().top + scrollY + off, behavior: reduced ? "auto" : "smooth" }); };
  document.addEventListener("click", (e) => { const a = e.target.closest('a[href^="#"]'); if (!a) return; const id = a.getAttribute("href").slice(1); if (!id || !document.getElementById(id)) return; e.preventDefault(); menu(false); goTo(id); });

  /* ——— Filas que se mueven solas y también a mano (igual que en diego-gasca) ——— */
  $$(".tiles").forEach((row) => {
    const items = [...row.children]; const n = items.length;
    const step = () => { const t = row.children[1], f = row.children[0]; return t && f ? t.offsetLeft - f.offsetLeft : 300; };
    let pos = 0, hover = false, focus = false, paused = 0, drag = null, moved = false;
    $$(`[data-row="${row.id}"]`).forEach((b) => b.addEventListener("click", () => {
      const dir = b.dataset.dir === "next" ? 1 : -1;
      if (reduced) { row.scrollBy({ left: dir * step(), behavior: "auto" }); return; }
      paused = Date.now() + 4000;
      if (dir < 0 && row.scrollLeft < step()) row.scrollLeft += period();
      pos = row.scrollLeft + dir * step(); row.scrollTo({ left: pos, behavior: "smooth" });
    }));
    const period = () => n * step();
    if (reduced) return;
    row.classList.add("loop");
    const fill = () => { let g = 0; while (row.scrollWidth - row.clientWidth < period() + step() && g++ < 12)
      items.forEach((el) => { const c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); c.tabIndex = -1; $$("a,button", c).forEach((x) => (x.tabIndex = -1)); row.appendChild(c); }); };
    fill(); addEventListener("resize", fill);
    const speed = 24;
    row.addEventListener("mouseenter", () => (hover = true)); row.addEventListener("mouseleave", () => (hover = false));
    row.addEventListener("focusin", () => (focus = true)); row.addEventListener("focusout", () => (focus = false));
    row.addEventListener("touchstart", () => (paused = Date.now() + 3000), { passive: true });
    row.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) paused = Date.now() + 2500; }, { passive: true });
    row.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || e.button) return; drag = { x: e.clientX, l: row.scrollLeft }; moved = false; row.classList.add("drag"); });
    addEventListener("pointermove", (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 5) moved = true; if (drag.l - dx < 0) drag.l += period(); row.scrollLeft = drag.l - dx; pos = row.scrollLeft; });
    addEventListener("pointerup", () => { if (!drag) return; drag = null; row.classList.remove("drag"); paused = Date.now() + 1500; });
    row.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    row.addEventListener("dragstart", (e) => e.preventDefault());
    let vis = true; new IntersectionObserver(([e]) => (vis = e.isIntersecting)).observe(row);
    let last = performance.now();
    (function loop(now = performance.now()) {
      const dt = Math.min(now - last, 100) / 1000; last = now;
      if (vis && !hover && !focus && !drag && Date.now() > paused) { if (Math.abs(row.scrollLeft - pos) > 2) pos = row.scrollLeft; pos += speed * dt; row.scrollLeft = pos; }
      else pos = row.scrollLeft;
      if (pos >= period()) { pos -= period(); row.scrollLeft = pos; }
      requestAnimationFrame(loop);
    })();
    row.addEventListener("scroll", () => { const per = period(); if (row.scrollLeft >= per) { row.scrollLeft -= per; pos = row.scrollLeft; } }, { passive: true });
  });

  /* ——— Música: reproductor oficial de Spotify con play y pausa ——— */
  const sp = $("#spotify") || Object.assign(document.createElement("div"), { className: "listen-player sp-hidden" }), musicBtn = $("#musicBtn");
  if (!sp.isConnected) document.body.appendChild(sp);
  let spCtl = null, spLoading = false, wantPlay = false;
  const setMusic = (on) => { musicBtn.classList.toggle("on", on); musicBtn.setAttribute("aria-pressed", String(on)); musicBtn.setAttribute("aria-label", on ? T("Pausar mi música", "Pause my music") : T("Escuchar mi música", "Play my music"));
    if ($("#heroPlay")) $("#heroPlay").textContent = on ? T("Pausar", "Pause") : T("Escuchar ahora", "Listen now"); };
  function loadSpotify() {
    if (spCtl || spLoading) return; spLoading = true;
    const holder = document.createElement("div"); sp.appendChild(holder);
    window.onSpotifyIframeApiReady = (API) => API.createController(holder, { uri: D.spotifyUri || `spotify:artist:${D.spotify}`, width: "100%", height: 152 }, (c) => {
      spCtl = c; const f = sp.querySelector("iframe"); if (f) f.title = T("Escuchar en Spotify", "Listen on Spotify");
      c.addListener("playback_update", (e) => setMusic(!e.data.isPaused));
      c.addListener("ready", () => { if (wantPlay) { wantPlay = false; c.play(); } });
    });
    const s = document.createElement("script"); s.src = "https://open.spotify.com/embed/iframe-api/v1"; s.async = true;
    s.onerror = () => { sp.innerHTML = `<a class="sp-fallback" href="https://open.spotify.com/artist/${D.spotify}" target="_blank" rel="noopener">${T("Escuchar en Spotify ↗", "Listen on Spotify ↗")}</a>`; };
    document.head.appendChild(s);
  }
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { loadSpotify(); o.disconnect(); } }, { rootMargin: "800px" }).observe(sp);
  const toggleMusic = () => { if (spCtl) { spCtl.togglePlay(); return; } wantPlay = true; loadSpotify(); };
  musicBtn.addEventListener("click", toggleMusic); $("#heroPlay")?.addEventListener("click", toggleMusic);

  /* ——— Recorrido automático ——— */
  const tourBtn = $("#tourBtn");
  const STOPS = (D.tour || []).filter(([id]) => document.getElementById(id)).map(([id, es, en]) => [id, T(es, en)]);
  let tour = null;
  const cap = document.createElement("div"); cap.className = "tour-cap"; cap.setAttribute("role", "status"); cap.setAttribute("aria-live", "polite"); cap.hidden = true;
  cap.innerHTML = `<span class="tour-n"></span><p></p><button type="button">${T("Detener", "Stop")}</button>`; document.body.appendChild(cap);
  function stopTour() { if (!tour) return; clearTimeout(tour.t); tour = null; cap.hidden = true; tourBtn.classList.remove("on"); }
  function step(i) { if (!tour) return; if (i >= STOPS.length) return stopTour();
    const [id, txt] = STOPS[i]; goTo(id, 1.6); cap.querySelector(".tour-n").textContent = `${i + 1}/${STOPS.length}`; cap.querySelector("p").textContent = txt; tour.t = setTimeout(() => step(i + 1), 5200); }
  tourBtn.addEventListener("click", () => { if (tour) return stopTour(); tour = { t: 0 }; cap.hidden = false; tourBtn.classList.add("on"); step(0); });
  cap.querySelector("button").addEventListener("click", stopTour);
  ["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, (e) => { if (tour && !(ev === "keydown" && e.target.closest(".tour-cap"))) stopTour(); }, { passive: true }));

  /* ——— Tema (oscuro por defecto) ——— */
  const themeBtn = $("#themeBtn");
  const setTheme = (dark) => { document.documentElement.dataset.theme = dark ? "dark" : "light"; themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? T("Modo claro", "Light mode") : T("Modo oscuro", "Dark mode")); try { localStorage.setItem(KEY + "-theme", dark ? "dark" : "light"); } catch {} navState(); };
  setTheme(document.documentElement.dataset.theme !== "light");
  themeBtn.addEventListener("click", () => setTheme(document.documentElement.dataset.theme !== "dark"));

  // Vercel Web Analytics (sin cookies): solo en el sitio publicado.
  if (/\.vercel\.app$/.test(location.hostname)) { const s = document.createElement("script"); s.defer = true; s.src = "/_vercel/insights/script.js"; document.head.appendChild(s); }

  /* ——— Animación ——— */
  if (reduced || !hasGsap) return;
  gsap.registerPlugin(ScrollTrigger);
  const E = "expo.out", P = "power3.out";
  if ($(".ph-hero-photo img")) gsap.from(".ph-hero-photo img", { scale: 1.08, opacity: 0, duration: 1.6, ease: E });
  gsap.from(".ph-hero-copy > *", { y: 40, opacity: 0, duration: 1.1, stagger: .09, ease: E, delay: .15 });
  $$(".big-head, .ph-k").forEach((h) => gsap.from(h, { y: 40, opacity: 0, duration: 1.1, ease: E, scrollTrigger: { trigger: h, start: "top 88%" } }));
  $$(".tiles").forEach((t) => gsap.from($$(".tile:not([aria-hidden])", t), { y: 50, opacity: 0, duration: 1, stagger: .06, ease: E, scrollTrigger: { trigger: t, start: "top 88%" } }));
  $$(".num, .ph-show, .fmt, .ph-logos img, .deliv li").forEach((el) => gsap.from(el, { y: 30, opacity: 0, duration: .9, ease: P, scrollTrigger: { trigger: el, start: "top 92%" } }));
  if ($(".ph-bio-art img")) gsap.fromTo(".ph-bio-art img", { y: 40, rotate: -3 }, { y: -20, rotate: 2, ease: "none", scrollTrigger: { trigger: ".ph-bio", start: "top bottom", end: "bottom top", scrub: true } });
  if ($(".ph-booking-photo img")) gsap.fromTo(".ph-booking-photo img", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".ph-booking", start: "top bottom", end: "bottom top", scrub: true } });
  const rail = $("#reviews");
  if (rail) { const revTw = gsap.to(rail, { x: () => -(rail.scrollWidth / 2), duration: 60, ease: "none", repeat: -1 });
  rail.addEventListener("mouseenter", () => revTw.pause()); rail.addEventListener("mouseleave", () => revTw.resume());
  rail.addEventListener("focusin", () => revTw.pause()); rail.addEventListener("focusout", () => revTw.resume()); }
  addEventListener("load", () => { ScrollTrigger.refresh(); navState(); });
})();
