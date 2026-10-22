(() => {
  const S = window.STUDIO;
  const $ = (q) => document.querySelector(q);
  const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: S.currency, maximumFractionDigits: 0 }).format(n);
  const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("on"), 2600); };

  document.title = `${S.brand} · ${S.tagline}`;
  document.querySelectorAll("[data-brand]").forEach((e) => (e.textContent = S.brand));
  document.querySelectorAll("[data-tagline]").forEach((e) => (e.textContent = S.tagline));
  if (S.gift?.on) { $("[data-gift-title]").textContent = S.gift.title; $("[data-gift-sub]").textContent = S.gift.sub; } else $("#gift").remove();

  // Servicios
  $("#services").innerHTML = S.services.map((s) => `
    <article class="svc" data-pick="${s.id}" tabindex="0">
      <img src="${s.img}" alt="${s.name}" loading="lazy">
      <div class="svc-body"><div><h3>${s.name}</h3><p>${s.sub}</p><small>${s.price == null ? "Precio: consultar" : fmt(s.price)}</small></div><span class="go">→</span></div>
    </article>`).join("");

  // Galería y reseñas
  $("#gallery").innerHTML = S.gallery.map((g) => `<figure><img src="${g}" alt="Trabajo de uñas" loading="lazy"></figure>`).join("");
  if (S.reviews.length) {
    $("#resenas").hidden = false;
    $("#reviews").innerHTML = S.reviews.map((r) => `<blockquote class="rev"><p>“${r.text}”</p><b>${r.name}</b></blockquote>`).join("");
  }

  // Reserva
  const sel = $("#svcSelect");
  sel.innerHTML = S.services.map((s) => `<option value="${s.id}">${s.name}</option>`).join("");
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $("#date").min = today.toISOString().slice(0, 10);
  let time = "";
  $("#times").innerHTML = S.times.map((t) => `<button type="button" data-time="${t}">${t}</button>`).join("");
  $("#times").addEventListener("click", (e) => {
    const b = e.target.closest("[data-time]"); if (!b) return;
    document.querySelectorAll("#times button").forEach((x) => x.classList.toggle("on", x === b)); time = b.dataset.time;
  });
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-pick]"); if (!c) return;
    sel.value = c.dataset.pick; $("#reservar").scrollIntoView({ behavior: "smooth" });
  });
  $("#bookNote").textContent = S.whatsapp ? "Abriremos WhatsApp con tu solicitud lista." : "Vista previa: la reserva se activa al conectar el WhatsApp del estudio.";
  $("#bookForm").onsubmit = (e) => {
    e.preventDefault();
    if (!time) return toast("Elige una hora");
    const f = new FormData(e.target), svc = S.services.find((s) => s.id === f.get("service"));
    const msg = `Hola ${S.brand}, soy ${f.get("name")}. Quiero reservar ${svc.name} el ${f.get("date")} a las ${time}.${f.get("note") ? " Nota: " + f.get("note") : ""}`;
    if (S.whatsapp) window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    else toast("Reserva en vista previa: no se envió");
  };

  $("#year").textContent = new Date().getFullYear();
  $("#info").innerHTML = [S.address, S.hours, S.instagram && `@${S.instagram}`].filter(Boolean).join("<br>");

  const nav = $("#nav"); const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $("#links").classList.toggle("on");
  document.querySelectorAll("#links a").forEach((a) => a.addEventListener("click", () => $("#links").classList.remove("on")));

  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-img img", { scale: 1, duration: 2.8, ease: "power2.out" });
  gsap.from(".hero .reveal", { y: 30, opacity: 0, duration: 1.3, stagger: .1, ease: "power3.out", delay: .2 });
  gsap.from(".tile", { y: 30, opacity: 0, duration: 1, stagger: .08, ease: "power3.out", delay: .6 });
  document.querySelectorAll("main > :not(.hero) .reveal, main > .reveal").forEach((el) =>
    gsap.from(el, { y: 34, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  ["#services", "#gallery"].forEach((g) => gsap.from(`${g} > *`, { y: 50, opacity: 0, duration: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: g, start: "top 85%" } }));
  document.querySelectorAll(".reveal-img").forEach((el) =>
    gsap.fromTo(el.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } }));
})();
