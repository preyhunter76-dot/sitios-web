(() => {
  const D = window.CM;
  const $ = (q) => document.querySelector(q);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const nf = (n) => n.toLocaleString("es-CO");
  Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de evento" });

  // Lectura tipo consola
  const lines = ["> sello ......... CARTEL MUSIC", "> desde ......... OCT 2022", "> streams ....... +29 M", "> distribución .. ONErpm · DistroKid", "> ruta .......... LATAM → EUROPA"];
  const ro = $("#readout");
  let li = 0, ci = 0;
  (function type() {
    if (li >= lines.length) return;
    ro.textContent = lines.slice(0, li).join("\n") + (li ? "\n" : "") + lines[li].slice(0, ++ci);
    if (ci >= lines[li].length) { li++; ci = 0; setTimeout(type, 260); } else setTimeout(type, 22);
  })();

  $("#stats").innerHTML = D.stats.map(([v, l]) => `<div class="st"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("");
  const max = D.catalog[0][2];
  $("#catalog").innerHTML = D.catalog.map(([t, a, p], i) => `<div class="tr" role="row"><span class="n">${String(i + 1).padStart(2, "0")}</span><b>${esc(t)}</b><span class="a">${esc(a)}</span><span class="p">${nf(p)}<i style="--w:${(p / max) * 100}%"></i></span></div>`).join("");
  $("#store").innerHTML = D.store.map((s) => `<article class="rel"><a href="${s.url}" target="_blank" rel="noopener"><img src="${s.img}" alt="Portada de ${esc(s.t)}" loading="lazy"></a>
    <div><h3>${esc(s.t)}</h3><small>${esc(s.a)} · ${s.y}</small><div class="row"><span class="price">${s.p}<span>USD</span></span><a href="${s.url}" target="_blank" rel="noopener">Comprar</a></div></div></article>`).join("");
  $("#collab").innerHTML = D.collaborators.map((c) => `<li>${esc(c)}<small>Colaborador acreditado</small></li>`).join("");
  $("#spec").innerHTML = D.delivery.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  $("#formats").innerHTML = D.booking.map((f) => `<button class="fmt" data-req-id="${f.id}" data-req-name="${esc(f.t)}" data-req-detail="Cartel Music"><b>${esc(f.t)}</b><span>${esc(f.d)}</span><em>Agregar a la solicitud</em></button>`).join("");
  $("#demoBtn").href = `mailto:${D.email}?subject=${encodeURIComponent("Demo para Cartel Music")}&body=${encodeURIComponent("Nombre artístico:\nCiudad:\nEnlace privado de escucha:\nRedes:\n")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = `mailto:${D.email}`;
  const names = { prey: "Prey Hunter", salsafro: "Salsafro", diego: "Diego Gasca" };
  const eco = Object.entries(D.eco).filter(([, u]) => u);
  if (eco.length) $("#feco").innerHTML = eco.map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${names[k]}</a>`).join("");
  document.querySelectorAll("[data-eco]").forEach((a) => { const u = D.eco[a.dataset.eco]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } });
  $("#year").textContent = new Date().getFullYear();

  const nav = $("#nav"); const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $("#links").classList.toggle("on");
  document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => $("#links").classList.remove("on")));

  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero .reveal", { y: 50, opacity: 0, duration: 1.1, stagger: .12, ease: "power3.out", delay: .1 });
  gsap.from(".st", { y: 30, opacity: 0, duration: .8, stagger: .08, scrollTrigger: { trigger: "#stats", start: "top 90%" } });
  gsap.from("#catalog .tr", { x: -40, opacity: 0, duration: .7, stagger: .07, scrollTrigger: { trigger: "#catalog", start: "top 85%" } });
  gsap.from(".rel, .collab li", { y: 40, opacity: 0, duration: .7, stagger: .05, scrollTrigger: { trigger: "#store", start: "top 85%" } });
  document.querySelectorAll(".head, .demo-copy, .spec, .ev-copy").forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
})();
