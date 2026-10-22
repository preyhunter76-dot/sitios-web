(() => {
  const D = window.DG;
  const $ = (q) => document.querySelector(q);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de servicios" });

  const IC = {
    mic: `<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`,
    chat: `<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/></svg>`,
    chart: `<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>`,
    camera: `<svg viewBox="0 0 24 24"><path d="M4 7h4l2-3h4l2 3h4v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
    aperture: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3l3 7M21 12l-7 3M12 21l-3-7M3 12l7-3"/></svg>`,
    disc: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  };

  $("#numbers").innerHTML = D.stats.map(([v, l]) => `<div class="num"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join("");
  $("#brands").innerHTML = D.brands.map((b) => {
    const u = D.eco[b.key];
    return `<a class="brandcard" style="--c:${b.color}" ${u ? `href="${u}" target="_blank" rel="noopener"` : ""}>
      <img class="bg" src="${b.img}" alt="" loading="lazy"><img class="logo" src="${b.logo}" alt="${esc(b.name)}">
      <small>${esc(b.since)}</small><h3>${esc(b.name)}</h3><p>${esc(b.role)}</p><span class="go">${u ? "Visitar su tienda oficial →" : "Sitio oficial muy pronto"}</span></a>`;
  }).join("");
  $("#services").innerHTML = D.services.map((s) => `<button class="svc" data-req-id="${s.id}" data-req-name="${esc(s.t)}" data-req-detail="Diego Gasca">
    <span class="ic">${IC[s.icon]}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><span class="add">Agregar a la solicitud<i>+</i></span></button>`).join("");
  $("#topics").innerHTML = D.topics.map((t) => `<b>${esc(t)}</b>`).join("");
  $("#pressBtn").href = `mailto:${D.email}?subject=${encodeURIComponent("Press kit · Diego Gasca")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = `mailto:${D.email}`;
  const names = { prey: "Prey Hunter", cartel: "Cartel Music", salsafro: "Salsafro" };
  $("#feco").innerHTML = Object.entries(D.eco).filter(([, u]) => u).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${names[k]}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  const nav = $("#nav"); const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $("#links").classList.toggle("on");
  document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => $("#links").classList.remove("on")));

  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero .reveal", { y: 60, opacity: 0, duration: 1.2, stagger: .12, ease: "power4.out", delay: .1 });
  gsap.from(".card-float", { x: -40, opacity: 0, duration: 1, delay: .9, ease: "power3.out" });
  gsap.from(".num", { y: 30, opacity: 0, duration: .8, stagger: .08, scrollTrigger: { trigger: "#numbers", start: "top 90%" } });
  gsap.from(".brandcard", { y: 80, opacity: 0, duration: 1, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: "#brands", start: "top 85%" } });
  gsap.from(".svc", { y: 40, opacity: 0, duration: .8, stagger: .07, scrollTrigger: { trigger: "#services", start: "top 85%" } });
  document.querySelectorAll(".head, .story-copy, .press-card").forEach((el) => gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
  gsap.fromTo(".story-img img", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".story", scrub: true } });
})();
