(() => {
  const D = window.PH;
  const $ = (q) => document.querySelector(q);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const nf = (n) => n.toLocaleString("es-CO");

  Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de booking" });

  // Lanzamiento
  $("#heroRelease").innerHTML = `<p class="mono">Nuevo · ${esc(D.latest.date)}</p><h3>${esc(D.latest.title)}</h3><p>${esc(D.latest.type)} · ${esc(D.latest.note)}</p>
    <a class="btn btn-pink" href="${D.links[0][1]}" target="_blank" rel="noopener">Escuchar en Spotify</a>`;

  // Cifras
  $("#stats").innerHTML = D.stats.map(([v, l, s]) => `<div class="stat"><b data-count="${esc(v)}">${esc(v)}</b><span>${esc(l)}</span><small>${esc(s)}</small></div>`).join("");

  // Top 5
  const max = D.top[0][1];
  $("#top5").innerHTML = D.top.map(([t, p]) => `<li><div><h3>${esc(t)}</h3><div class="bar"><i style="--w:${Math.max(4, (p / max) * 100)}%"></i></div></div><span class="plays">${nf(p)}<br>reproducciones</span></li>`).join("");
  $("#platforms").innerHTML = D.links.slice(0, 5).map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("");
  $("#playlistBtn").href = D.playlist;

  // Tienda
  const years = [...new Set(D.store.map((s) => s.y))];
  $("#filters").innerHTML = `<button class="on" data-y="all">Todo</button>` + years.map((y) => `<button data-y="${y}">${y}</button>`).join("");
  const renderStore = (y = "all") => {
    $("#store").innerHTML = D.store.filter((s) => y === "all" || String(s.y) === y).map((s) => `
      <article class="prod"><a class="cover" href="${s.url}" target="_blank" rel="noopener"><img src="${s.img}" alt="Portada de ${esc(s.t)}" loading="lazy">${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ""}</a>
        <div class="meta"><h3>${esc(s.t)}</h3><small>${esc(s.a)} · ${s.y}</small>
          <div class="buy"><span class="price">${s.p % 1 ? s.p.toFixed(2) : s.p}<em>USD</em></span><a href="${s.url}" target="_blank" rel="noopener">Comprar</a></div></div></article>`).join("");
    if (window.gsap) gsap.from("#store .prod", { y: 30, opacity: 0, duration: .6, stagger: .04, ease: "power3.out" });
  };
  renderStore();
  $("#filters").addEventListener("click", (e) => { const b = e.target.closest("[data-y]"); if (!b) return; document.querySelectorAll("#filters button").forEach((x) => x.classList.toggle("on", x === b)); renderStore(b.dataset.y); });

  // Booking
  $("#formats").innerHTML = D.booking.map((f) => `<button class="fmt" data-req-id="${f.id}" data-req-name="${esc(f.t)}" data-req-detail="Prey Hunter"><b>${esc(f.t)}</b><span>${esc(f.d)}</span><em>Agregar a la solicitud</em></button>`).join("");

  // Shows, discografía, galería
  $("#shows").innerHTML = D.shows.map(([c, n]) => `<div class="show"><b>${nf(n)}</b><span>${esc(c)}</span></div>`).join("");
  $("#disco").innerHTML = D.discography.map(([t, y, k]) => `<li><b>${esc(t)}</b><span>${esc(k)} · ${y}</span></li>`).join("");
  $("#gallery").innerHTML = D.gallery.map((g) => `<figure><img src="${g}" alt="Foto oficial de Prey Hunter" loading="lazy"></figure>`).join("");
  $("#pressMail").href = `mailto:${D.email}?subject=${encodeURIComponent("Press kit · Prey Hunter")}`;

  // Footer y ecosistema
  $("#flinks").innerHTML = D.links.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("");
  $("#fmail").textContent = D.email; $("#fmail").href = `mailto:${D.email}`;
  const ecoNames = { diego: "Diego Gasca", salsafro: "Salsafro", cartel: "Cartel Music" };
  $("#feco").innerHTML = Object.entries(D.eco).filter(([, u]) => u).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${ecoNames[k]}</a>`).join("") || "Cartel Music · Salsafro · Diego Gasca";
  document.querySelectorAll("[data-eco]").forEach((a) => { const u = D.eco[a.dataset.eco]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } });
  $("#year").textContent = new Date().getFullYear();

  // Navegación
  const nav = $("#nav"); const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $("#links").classList.toggle("on");
  document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => $("#links").classList.remove("on")));

  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-media img", { scale: 1, duration: 2.8, ease: "power2.out" });
  gsap.to(".hero-media img", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.from(".hero .reveal", { y: 60, opacity: 0, duration: 1.2, stagger: .12, ease: "power4.out", delay: .15 });
  gsap.from(".stat", { y: 40, opacity: 0, duration: .9, stagger: .1, scrollTrigger: { trigger: "#stats", start: "top 85%" } });
  gsap.from(".top .bar i", { scaleX: 0, duration: 1.4, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: "#top5", start: "top 80%" } });
  document.querySelectorAll(".sec-head, .booking-copy, .bio-copy").forEach((el) => gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
  gsap.from(".show", { y: 40, opacity: 0, duration: .8, stagger: .08, scrollTrigger: { trigger: "#shows", start: "top 85%" } });
  gsap.from(".gallery figure", { y: 60, opacity: 0, duration: .9, stagger: .06, scrollTrigger: { trigger: "#gallery", start: "top 85%" } });
  gsap.fromTo(".bio-art img", { y: 80, rotate: -4 }, { y: -20, rotate: 0, ease: "none", scrollTrigger: { trigger: ".bio", scrub: true } });
})();
