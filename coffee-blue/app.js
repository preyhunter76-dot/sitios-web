(() => {
  const S = window.SHOP;
  const $ = (q, el = document) => el.querySelector(q);
  const fmt = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: S.currency, maximumFractionDigits: 0 }).format(n);
  const priceHTML = (p) => (p == null ? `<span class="price tbd">Precio por confirmar</span>` : `<span class="price">${fmt(p)}</span>`);
  const bagIcon = `<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/><path d="M12 11v5M9.5 13.5h5"/></svg>`;

  // Catálogo único para el carrito
  const CATALOG = {};
  S.drinks.forEach((d) => (CATALOG[d.id] = d));
  S.origins.forEach((o) => (CATALOG[o.id] = { ...o, img: "img/bag.jpg", desc: `${o.roast} · ${o.format}` }));
  CATALOG[S.kit.id] = S.kit;

  // Bebidas
  $("#drinks").innerHTML = S.drinks.map((d) => `
    <article class="drink">
      <div class="drink-img"><img src="${d.img}" alt="${d.name}" loading="lazy">${d.tag ? `<span class="tag">${d.tag}</span>` : ""}</div>
      <div class="drink-body"><h3>${d.name}</h3><p>${d.desc}</p>
        <div class="row">${priceHTML(d.price)}<button class="add" data-add="${d.id}" aria-label="Agregar ${d.name}">${bagIcon}</button></div>
      </div>
    </article>`).join("");

  // Orígenes
  $("#origins").innerHTML = S.origins.map((o) => `
    <article class="origin">
      <div class="bag"><img src="img/bag.jpg" alt="Bolsa de café ${o.name}" loading="lazy">
        <div class="label"><small>Coffee Blue</small><strong>${o.name.replace("Origen ", "")}</strong><small>${o.format}</small></div></div>
      <span class="region">${o.region}</span><h3>${o.name}</h3><span class="meta">${o.roast} · ${o.format}</span>
      <p>${o.notes}</p>
      <div class="row">${priceHTML(o.price)}<button class="add" data-add="${o.id}" aria-label="Agregar ${o.name}">${bagIcon}</button></div>
    </article>`).join("");

  // Kit
  const k = S.kit;
  $("#kit").innerHTML = `<div class="grow"><h4>${k.name}</h4><p>${k.desc}</p></div>${priceHTML(k.price)}<button class="add" data-add="${k.id}" aria-label="Agregar ${k.name}">${bagIcon}</button>`;

  // Carrusel
  const track = $("#drinks");
  document.querySelectorAll(".car-arrow").forEach((b) => b.addEventListener("click", () => {
    const card = track.firstElementChild; const step = card ? card.getBoundingClientRect().width + 24 : 300;
    track.scrollBy({ left: b.classList.contains("next") ? step : -step, behavior: "smooth" });
  }));

  // Carrito (se guarda en este navegador)
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("cb-cart") || "{}"); } catch {}
  const save = () => { try { localStorage.setItem("cb-cart", JSON.stringify(cart)); } catch {} };
  const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("on"), 2200); };

  function render() {
    const ids = Object.keys(cart).filter((id) => CATALOG[id]);
    const count = ids.reduce((a, id) => a + cart[id], 0);
    $("#cartCount").textContent = count;
    $("#cartItems").innerHTML = ids.length ? ids.map((id) => { const p = CATALOG[id]; return `
      <div class="line"><img src="${p.img}" alt=""><div class="grow"><h4>${p.name}</h4><small>${p.price == null ? "Precio por confirmar" : fmt(p.price)}</small></div>
      <div class="qty"><button data-dec="${id}">−</button><span>${cart[id]}</span><button data-inc="${id}">+</button></div></div>`; }).join("")
      : `<p class="empty">Tu pedido está vacío.<br>Agrega un café para empezar.</p>`;
    const allPriced = ids.every((id) => CATALOG[id].price != null);
    $("#cartTotal").textContent = !ids.length ? "—" : allPriced ? fmt(ids.reduce((a, id) => a + CATALOG[id].price * cart[id], 0)) : "Por confirmar";
    $("#checkoutNote").textContent = S.whatsapp ? "Te llevamos a WhatsApp con tu pedido listo para enviar." : "Vista previa: los pedidos se activan al conectar el WhatsApp de la tienda.";
    save();
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-add]"), i = e.target.closest("[data-inc]"), d = e.target.closest("[data-dec]");
    if (a) { const id = a.dataset.add; cart[id] = (cart[id] || 0) + 1; render(); toast(`${CATALOG[id].name} agregado`); bump(); }
    if (i) { cart[i.dataset.inc]++; render(); }
    if (d) { const id = d.dataset.dec; cart[id]--; if (cart[id] <= 0) delete cart[id]; render(); }
  });
  const bump = () => window.gsap && gsap.fromTo("#cartCount", { scale: 1.6 }, { scale: 1, duration: .5, ease: "back.out(3)" });
  const open = (on) => { $("#drawer").classList.toggle("on", on); $("#overlay").classList.toggle("on", on); $("#drawer").setAttribute("aria-hidden", !on); };
  $("#cartOpen").onclick = () => open(true);
  $("#cartClose").onclick = $("#overlay").onclick = () => open(false);
  $("#checkout").onclick = () => {
    const ids = Object.keys(cart);
    if (!ids.length) return toast("Agrega algo primero");
    const msg = `Hola ${S.brand}, quiero pedir:\n` + ids.map((id) => `• ${cart[id]} × ${CATALOG[id].name}`).join("\n");
    if (S.whatsapp) window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    else toast("Tienda en vista previa: pedido no enviado");
  };
  render();

  // Footer
  $("#year").textContent = new Date().getFullYear();
  $("#notice").textContent = S.notice;
  $("#contactInfo").innerHTML = [S.address, S.email, S.instagram && `@${S.instagram}`].filter(Boolean).join("<br>");
  $("#newsForm").onsubmit = (e) => { e.preventDefault(); $("#newsMsg").textContent = "¡Gracias! Te avisaremos cuando abramos."; e.target.reset(); };

  // Navegación
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#burger").onclick = () => $(".nav-links").classList.toggle("on");
  document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => $(".nav-links").classList.remove("on")));

  // Animaciones cinematográficas
  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero-bg img", { scale: 1, duration: 2.6, ease: "power2.out" });
  gsap.from(".hero .reveal", { y: 40, opacity: 0, duration: 1.2, stagger: .12, ease: "power3.out", delay: .2 });
  gsap.to(".hero-bg img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  document.querySelectorAll("section:not(.hero) .reveal").forEach((el) =>
    gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  document.querySelectorAll(".reveal-img").forEach((el) => {
    gsap.fromTo(el, { clipPath: "inset(12% 12% 12% 12% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } });
    gsap.fromTo(el.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } });
  });
  ["#drinks", "#origins"].forEach((g) => gsap.from(`${g} > *`, { y: 60, opacity: 0, duration: 1, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: g, start: "top 85%" } }));
  gsap.to(".origins-bg img", { yPercent: -15, ease: "none", scrollTrigger: { trigger: ".origins", scrub: true } });
})();
