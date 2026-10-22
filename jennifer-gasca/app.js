(() => {
  const D = window.BOOKS;
  const $ = (q) => document.querySelector(q);
  const byId = Object.fromEntries(D.books.map((b) => [b.id, b]));
  const catName = (id) => D.categories.find((c) => c.id === id)?.name || "";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const preview = (b, mode) => `https://read.amazon.com/kp/embed?asin=${b.asin}&preview=${mode}&linkCode=kpe`;

  // Portada real (la imagen ya trae título y autora)
  const cover = (b) => `<div class="cover real" style="--tint:${b.tint}"><img src="${b.cover}" alt="Portada de ${esc(b.title)}"></div>`;
  const book3d = (b) => `<div class="book3d" style="--tint:${b.tint}" data-read="${b.id}" role="button" tabindex="0" aria-label="Leer muestra de ${esc(b.title)}"><div class="spine"></div><div class="pages"></div><div class="front">${cover(b)}</div></div>`;
  const buyBtn = (b, cls = "btn btn-wine") => `<a class="${cls}" href="${b.amazon}" target="_blank" rel="noopener">Comprar en Amazon</a>`;

  // Hero: el libro más reciente
  const feat = D.books.find((b) => b.featured) || D.books[0];
  $("#heroBook").innerHTML = book3d(feat);
  $("#heroLead").innerHTML = `<b class="new-tag">Nuevo</b> <em>${esc(feat.title)}</em> · ${esc(feat.order)}. ${esc(feat.blurb)}`;
  $("#heroBuy").href = feat.amazon;
  $("#heroRead").onclick = () => openReader(feat.id);

  // Series
  $("#genres").innerHTML = D.categories.map((c) => {
    const list = D.books.filter((x) => x.cat === c.id);
    const b = list[0];
    return `<div class="genre" data-filter="${c.id}" tabindex="0">${b ? `<img src="${b.cover}" alt="" loading="lazy">` : ""}<span class="gi">${c.icon}</span><h3>${c.name}</h3><p>${list.length} ${list.length === 1 ? "libro" : "libros"} · ${c.sub}</p></div>`;
  }).join("");

  // Colección + filtros
  $("#filters").innerHTML = `<button class="on" data-f="all">Todos</button>` + D.categories.map((c) => `<button data-f="${c.id}">${c.name}</button>`).join("");
  function renderBooks(f = "all") {
    const list = D.books.filter((b) => f === "all" || b.cat === f);
    $("#books").innerHTML = list.map((b) => `
      <article class="book"><div class="shelf">${b.isNew ? `<span class="ribbon">Nuevo</span>` : ""}${book3d(b)}</div>
        <span class="meta">${esc(b.order)}</span><h3>${esc(b.title)}</h3><span class="subt">${esc(b.sub)}</span><p>${esc(b.blurb)}</p>
        <div class="actions"><button class="btn btn-line" data-read="${b.id}">Leer muestra</button>${buyBtn(b)}</div></article>`).join("");
    if (window.gsap) gsap.from("#books .book", { y: 40, opacity: 0, duration: .8, stagger: .06, ease: "power3.out" });
  }
  renderBooks();
  const setFilter = (f) => { document.querySelectorAll("#filters button").forEach((x) => x.classList.toggle("on", x.dataset.f === f)); renderBooks(f); };
  $("#filters").addEventListener("click", (e) => { const b = e.target.closest("[data-f]"); if (b) setFilter(b.dataset.f); });

  // Muestra destacada
  $("#featured").innerHTML = `<span class="wax">JG</span><p class="kicker">Lee la muestra gratis</p><h3>${esc(feat.title)}</h3><p class="by">${esc(feat.sub)} · ${esc(feat.order)}</p>
    <div class="txt"><p>${esc(feat.blurb)}</p></div>
    <p class="note">Lee las primeras páginas gratis en el lector oficial de Amazon.</p>
    <div class="actions"><button class="btn btn-wine" data-read="${feat.id}">Abrir el lector</button>${buyBtn(feat, "btn btn-line")}</div>`;

  // Autora
  $("#authorPhoto").src = D.author.photo;
  $("#authorBio").innerHTML = D.author.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#authorStore").href = D.amazonStore;

  // Lector: fragmento propio (si existe) + muestra oficial de Amazon
  const reader = $("#reader");
  function openReader(id) {
    const b = byId[id]; if (!b) return;
    $("#readerCover").innerHTML = cover(b);
    $("#readerPage").innerHTML = `<p class="kicker">${esc(b.order)}</p><h3>${esc(b.title)}</h3><p class="by">${esc(b.sub)} · ${esc(D.brand)}</p>
      ${b.excerpt?.length ? b.excerpt.map((p) => `<p>${esc(p)}</p>`).join("") : `<p class="blurb">${esc(b.blurb)}</p>`}
      <a class="kindle-card" href="${preview(b, "newtab")}" target="_blank" rel="noopener">
        <span class="kc-icon"><svg viewBox="0 0 24 24"><path d="M4 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4ZM20 5h-5a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h6Z"/></svg></span>
        <span><b>Leer la muestra gratis</b><small>Las primeras páginas en el lector de Amazon · se abre en otra pestaña</small></span><span class="kc-go">→</span></a>
      <p class="end">${b.ku ? "Incluido en Kindle Unlimited. " : ""}Disponible en Kindle${b.paperbackUrl ? " y pasta blanda" : ""}.</p>
      <div class="actions">${buyBtn(b)}${b.paperbackUrl ? `<a class="btn btn-line" href="${b.paperbackUrl}" target="_blank" rel="noopener">Pasta blanda</a>` : ""}</div>`;
    $("#readerPage").scrollTop = 0;
    reader.classList.add("on"); reader.setAttribute("aria-hidden", "false");
  }
  const closeReader = () => { reader.classList.remove("on"); reader.setAttribute("aria-hidden", "true"); $("#readerPage").innerHTML = ""; };
  $("#readerClose").onclick = closeReader;
  reader.addEventListener("click", (e) => { if (e.target === reader) closeReader(); });

  // Buscador
  const search = $("#search");
  const openSearch = (on) => { search.classList.toggle("on", on); if (on) setTimeout(() => $("#searchInput").focus(), 50); };
  $("#searchBtn").onclick = () => openSearch(true);
  search.addEventListener("click", (e) => { if (e.target === search) openSearch(false); });
  $("#searchInput").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    $("#searchResults").innerHTML = !q ? "" : D.books.filter((b) => (b.title + b.sub + catName(b.cat)).toLowerCase().includes(q))
      .map((b) => `<button data-read="${b.id}"><small>${esc(b.order)}</small>${esc(b.title)}</button>`).join("") || `<p style="color:var(--muted)">Sin resultados.</p>`;
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeReader(); openSearch(false); }
    if (e.key === "Enter" && e.target.matches?.(".book3d,.genre")) e.target.click();
  });

  // Clics globales
  document.addEventListener("click", (e) => {
    const r = e.target.closest("[data-read]"), g = e.target.closest("[data-filter]");
    if (r) { openSearch(false); openReader(r.dataset.read); }
    if (g) { setFilter(g.dataset.filter); $("#coleccion").scrollIntoView({ behavior: "smooth" }); }
  });

  // Footer
  $("#year").textContent = new Date().getFullYear();
  $("#amazonStore").href = D.amazonStore;
  if (D.credit) $("#credit").textContent = D.credit; else $("#credit").remove();
  $("#newsForm").onsubmit = (e) => { e.preventDefault(); $("#newsMsg").textContent = "Gracias. Te avisaremos del próximo estreno."; e.target.reset(); };

  // Nav
  const nav = $("#nav"); const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $("#links").classList.toggle("on");
  document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => $("#links").classList.remove("on")));

  // Brasas flotando (luz de vela)
  const cv = $("#embers"), ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H; const P = [];
  const size = () => { W = cv.width = innerWidth * devicePixelRatio; H = cv.height = innerHeight * devicePixelRatio; };
  size(); addEventListener("resize", size);
  for (let i = 0; i < 34; i++) P.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .4, v: Math.random() * .0006 + .0002, o: Math.random() * .5 + .15, d: Math.random() * 6 });
  (function tick(t) {
    ctx.clearRect(0, 0, W, H);
    P.forEach((p) => {
      p.y -= p.v; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      const x = (p.x + Math.sin(t / 2000 + p.d) * .01) * W, y = p.y * H;
      ctx.beginPath(); ctx.arc(x, y, p.r * devicePixelRatio, 0, 7);
      ctx.fillStyle = `rgba(231,170,100,${p.o * (.6 + .4 * Math.sin(t / 400 + p.d))})`; ctx.shadowBlur = 8; ctx.shadowColor = "#e0a060"; ctx.fill();
    });
    if (!reduce) requestAnimationFrame(tick);
  })(0);

  if (!window.gsap || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-bg img", { scale: 1, duration: 3, ease: "power2.out" });
  gsap.to(".hero-bg img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.from(".hero .reveal", { y: 40, opacity: 0, duration: 1.4, stagger: .14, ease: "power3.out", delay: .2 });
  gsap.from(".strip > div", { y: 20, opacity: 0, duration: .9, stagger: .1, delay: .8 });
  gsap.from(".genre", { y: 60, opacity: 0, duration: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: "#genres", start: "top 85%" } });
  gsap.from(".paper", { y: 80, rotate: 3, opacity: 0, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: ".excerpt", start: "top 70%" } });
  gsap.to(".excerpt-bg img", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".excerpt", scrub: true } });
  document.querySelectorAll(".author .reveal").forEach((el) => gsap.from(el, { y: 34, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  gsap.fromTo(".author-photo img", { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ".author", start: "top 80%" } });
  gsap.from(".comm-card, .promises li", { y: 40, opacity: 0, duration: 1, stagger: .08, scrollTrigger: { trigger: ".community", start: "top 80%" } });
})();
