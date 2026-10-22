(() => {
  const D = window.SF;
  const $ = (q) => document.querySelector(q);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  Solicitud.init({ brand: D.brand, email: D.email, whatsapp: D.whatsapp, label: "Solicitud de show" });

  const ICONS = [
    `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="6"/><path d="M32 10v8M32 46v8"/></svg>`,
    `<svg viewBox="0 0 64 64"><path d="M8 44h48M14 44V30h8v14M28 44V24h8v20M42 44V30h8v14"/><path d="M12 52l6-8M52 52l-6-8"/></svg>`,
    `<svg viewBox="0 0 64 64"><path d="M12 40c10-4 14-18 26-18 6 0 10 4 10 10v10"/><path d="M48 42h8M46 34h6M20 46c0 4 4 8 8 8"/><circle cx="16" cy="40" r="4"/></svg>`,
    `<svg viewBox="0 0 64 64"><ellipse cx="32" cy="16" rx="14" ry="5"/><path d="M18 16v30c0 3 6 6 14 6s14-3 14-6V16"/><path d="M18 26l28 10M18 36l28-10"/></svg>`,
  ];
  $("#roots").innerHTML = D.roots.map((r, i) => `<article class="root"><span class="n">${r.n}</span>${ICONS[i]}<h3>${esc(r.t)}</h3><p>${esc(r.d)}</p></article>`).join("");

  $("#store").innerHTML = D.store.map((s) => `
    <article class="vinyl"><a class="disc" href="${s.url}" target="_blank" rel="noopener" aria-label="Comprar ${esc(s.t)}"><span class="rec"></span><span class="sleeve"><img src="${s.img}" alt="Portada de ${esc(s.t)}" loading="lazy"></span></a>
      <div><h3>${esc(s.t)}</h3><small>${esc(s.a)} · ${s.y}</small></div>
      <div class="row"><span class="price">${s.p % 1 ? s.p.toFixed(2) : s.p}<span>USD</span></span><a href="${s.url}" target="_blank" rel="noopener">Comprar</a></div></article>`).join("");

  $("#releases").innerHTML = D.releases.map(([t, k, d]) => `<li><b>${esc(t)}</b><span>${esc(k)}<br>${esc(d)}</span></li>`).join("");
  $("#formats").innerHTML = D.booking.map((f) => `<button class="fmt" data-req-id="${f.id}" data-req-name="${esc(f.t)}" data-req-detail="Salsafro"><div><b>${esc(f.t)}</b><span>${esc(f.d)}</span></div><i><span>+</span></i></button>`).join("");

  ["#bcTop", "#bcAll", "#fbc"].forEach((q) => ($(q).href = D.bandcamp));
  $("#demo").href = `mailto:${D.email}?subject=${encodeURIComponent("Demo para Salsafro Records")}&body=${encodeURIComponent("Nombre artístico:\nCiudad:\nEnlace privado de escucha:\nRedes:\n")}`;
  $("#fmail").textContent = D.email; $("#fmail").href = `mailto:${D.email}`;
  const names = { prey: "Prey Hunter", cartel: "Cartel Music", diego: "Diego Gasca" };
  $("#feco").innerHTML = Object.entries(D.eco).filter(([, u]) => u).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${names[k]}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  const nav = $("#nav"); const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $("#links").classList.toggle("on");
  document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => $("#links").classList.remove("on")));

  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-img img", { scale: 1, duration: 3, ease: "power2.out" });
  gsap.from(".hero .reveal", { y: 50, opacity: 0, duration: 1.2, stagger: .12, ease: "power3.out", delay: .2 });
  gsap.from(".badge", { scale: .4, opacity: 0, duration: 1.4, ease: "back.out(1.6)", delay: .6 });
  gsap.from(".root", { y: 70, opacity: 0, duration: 1, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: "#roots", start: "top 85%" } });
  gsap.from(".vinyl", { y: 60, opacity: 0, duration: .9, stagger: .05, ease: "power3.out", scrollTrigger: { trigger: "#store", start: "top 85%" } });
  gsap.fromTo(".set-cover", { rotate: -8, y: 60 }, { rotate: -2, y: 0, ease: "none", scrollTrigger: { trigger: ".set", scrub: true } });
  document.querySelectorAll(".head, .set-copy, .rec-card, .book-copy").forEach((el) => gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
})();
