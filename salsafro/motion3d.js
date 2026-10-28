// Motion y 3D comunes de los cuatro sitios (Diego Gasca, Prey Hunter, Cartel Music y Salsafro). Sin efectos glitch.
// - Portada: disco de partículas en 3D con three.js (r128, cdnjs) que gira como un vinilo y sigue al ratón.
// - Tarjetas con inclinación 3D, títulos que entran en 3D, fotos que se revelan, botones magnéticos y barra de progreso.
// Respeta «reducir movimiento» (?motion=1 lo fuerza, ?static=1 lo apaga) y se pausa cuando no se ve.
(() => {
  const reduced = (matchMedia("(prefers-reduced-motion: reduce)").matches && !/[?&]motion=1\b/.test(location.search)) || /[?&]static=1\b/.test(location.search);
  if (reduced || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const E = "expo.out";

  /* Barra de progreso de lectura */
  const bar = document.createElement("div"); bar.className = "m3d-progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: .3 } });

  /* Títulos: entran girando en 3D desde abajo (el texto no se parte, así la traducción sigue funcionando) */
  $$(".big-head:not(.m3d-done)").forEach((h) => {
    if (h.querySelector(".split")) return; // diego-gasca ya anima sus títulos por líneas
    h.classList.add("m3d-done");
    gsap.fromTo(h, { rotateX: -70, yPercent: 40, opacity: 0, transformPerspective: 900, transformOrigin: "50% 100%" },
      { rotateX: 0, yPercent: 0, opacity: 1, duration: 1.3, ease: E, scrollTrigger: { trigger: h, start: "top 90%" } });
  });

  /* Fotos que se revelan con una cortina y un leve zoom */
  $$(".ph-booking-photo, .ph-bio-art, .ph-final-art, .ph-split-art, .empresario-retrato, .story-art").forEach((box) => {
    const img = box.querySelector("img"); if (!img) return;
    gsap.fromTo(box, { clipPath: "inset(12% 12% 12% 12% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.6, ease: E, scrollTrigger: { trigger: box, start: "top 85%" } });
  });

  /* Inclinación 3D de tarjetas al pasar el ratón */
  if (fine) {
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest(".tile:not(.root), .case, .plan, .rev, .fmt, .num, .ph-show");
      if (!el || el.dataset.tilt) return; el.dataset.tilt = "1";
      const rx = gsap.quickTo(el, "rotateX", { duration: .5, ease: "power3.out" }), ry = gsap.quickTo(el, "rotateY", { duration: .5, ease: "power3.out" });
      gsap.set(el, { transformPerspective: 900 });
      const move = (ev) => { const r = el.getBoundingClientRect(); ry(((ev.clientX - r.left) / r.width - .5) * 10); rx(-((ev.clientY - r.top) / r.height - .5) * 10);
        el.style.setProperty("--mx", `${((ev.clientX - r.left) / r.width) * 100}%`); el.style.setProperty("--my", `${((ev.clientY - r.top) / r.height) * 100}%`); };
      el.addEventListener("pointermove", move); el.addEventListener("pointerleave", () => { rx(0); ry(0); });
      el.classList.add("m3d-tilt");
    });
    /* Botones magnéticos solo en la portada (uno o dos puntos focales) */
    $$("[data-3d] .btn").forEach((b) => {
      const x = gsap.quickTo(b, "x", { duration: .6, ease: "elastic.out(1,0.4)" }), y = gsap.quickTo(b, "y", { duration: .6, ease: "elastic.out(1,0.4)" });
      b.addEventListener("pointermove", (ev) => { const r = b.getBoundingClientRect(); x((ev.clientX - r.left - r.width / 2) * .3); y((ev.clientY - r.top - r.height / 2) * .3); });
      b.addEventListener("pointerleave", () => { x(0); y(0); });
    });
  }

  /* Profundidad: la foto de portada se aleja al bajar */
  $$("[data-3d] .ph-hero-photo img").forEach((img) =>
    gsap.to(img, { yPercent: 8, scale: 1.06, ease: "none", scrollTrigger: { trigger: img.closest("[data-3d]"), start: "top top", end: "bottom top", scrub: true } }));

  /* ——— Escena 3D de la portada ——— */
  const hero = document.querySelector("[data-3d]");
  if (!hero) return;
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"; s.async = true; s.onload = () => scene(hero);
  const go = () => document.head.appendChild(s);
  const start = () => (window.requestIdleCallback ? requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 300));
  // Si hay pantalla de carga (diego-gasca), la escena espera a que termine.
  if (document.body.classList.contains("is-loading")) { const mo = new MutationObserver(() => { if (!document.body.classList.contains("is-loading")) { mo.disconnect(); start(); } }); mo.observe(document.body, { attributes: true, attributeFilter: ["class"] }); }
  else start();

  function scene(host) {
    const T = window.THREE; if (!T) return;
    const canvas = document.createElement("canvas"); canvas.className = "m3d-canvas"; canvas.setAttribute("aria-hidden", "true");
    const copyEl = [...host.children].find((x) => x.matches(".hero-copy, .ph-hero-copy"));
    copyEl ? host.insertBefore(canvas, copyEl) : host.prepend(canvas);
    let renderer;
    try { renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" }); } catch { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const sc = new T.Scene(), cam = new T.PerspectiveCamera(42, 1, .1, 100); cam.position.set(0, 0, 9);
    const accent = new T.Color(host.dataset["3d"] || "#ff2d87");

    // Disco: anillos concéntricos de partículas (los surcos del vinilo)
    const N = innerWidth < 700 ? 5000 : 11000, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const white = new T.Color("#ffffff"), c = new T.Color();
    for (let i = 0; i < N; i++) {
      const groove = Math.floor(Math.random() * 46), r = 1.15 + groove * .062 + (Math.random() - .5) * .02, a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.sin(a) * r; pos[i * 3 + 2] = (Math.random() - .5) * .05;
      c.copy(accent).lerp(white, Math.pow(Math.random(), 2) * .7 + (groove % 9 === 0 ? .3 : 0)); col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new T.BufferGeometry(); g.setAttribute("position", new T.BufferAttribute(pos, 3)); g.setAttribute("color", new T.BufferAttribute(col, 3));
    const mat = new T.PointsMaterial({ size: .022, vertexColors: true, transparent: true, opacity: .6, depthWrite: false });
    const disc = new T.Points(g, mat);
    // Polvo que flota alrededor
    const M = 700, dp = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) { dp[i * 3] = (Math.random() - .5) * 16; dp[i * 3 + 1] = (Math.random() - .5) * 10; dp[i * 3 + 2] = (Math.random() - .5) * 8; }
    const dg = new T.BufferGeometry(); dg.setAttribute("position", new T.BufferAttribute(dp, 3));
    const dmat = new T.PointsMaterial({ size: .03, color: accent, transparent: true, opacity: .45, depthWrite: false });
    const dust = new T.Points(dg, dmat);
    const rig = new T.Group(); rig.add(disc); sc.add(rig, dust);
    rig.rotation.x = -1.05; rig.rotation.y = .35;

    const theme = () => { const light = document.documentElement.dataset.theme === "light" && host.dataset.blend !== "add"; const b = light ? T.NormalBlending : T.AdditiveBlending;
      mat.blending = dmat.blending = b; mat.opacity = light ? .45 : .6; mat.needsUpdate = dmat.needsUpdate = true; };
    theme(); new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const fit = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
      // El disco se coloca detrás del texto de la portada
      const copy = host.querySelector(".ph-hero-copy, .hero-copy, .hero-text") || host, r = copy.getBoundingClientRect(), hr = host.getBoundingClientRect();
      const halfH = Math.tan((cam.fov / 2) * Math.PI / 180) * cam.position.z, halfW = halfH * cam.aspect;
      const wide = w > 820, tl = host.dataset.pos === "tl";
      const cx = tl ? w * (wide ? .26 : .5) : wide ? Math.min(r.right - hr.left, w * .62) : w / 2, cy = tl ? h * .2 : wide ? h * .42 : h * .3;
      rig.position.x = (cx / w - .5) * 2 * halfW; rig.position.y = -(cy / h - .5) * 2 * halfH; };
    fit(); addEventListener("resize", fit);

    let mx = 0, my = 0, tx = 0, ty = 0, scrollT = 0, vis = true;
    addEventListener("pointermove", (e) => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, { passive: true });
    ScrollTrigger.create({ trigger: host, start: "top top", end: "bottom top", onUpdate: (st) => (scrollT = st.progress) });
    new IntersectionObserver(([e]) => (vis = e.isIntersecting)).observe(host);
    document.addEventListener("visibilitychange", () => (vis = !document.hidden && host.getBoundingClientRect().bottom > 0));

    gsap.from(rig.scale, { x: .2, y: .2, z: .2, duration: 2.4, ease: E });
    gsap.from(canvas, { opacity: 0, duration: 1.8, ease: "power2.out" });
    let last = performance.now();
    (function tick(now = performance.now()) {
      requestAnimationFrame(tick);
      const dt = Math.min(now - last, 100) / 1000; last = now;
      if (!vis) return;
      mx += (tx - mx) * .05; my += (ty - my) * .05;
      disc.rotation.z -= dt * .18;
      rig.rotation.x = -1.05 + my * .25 - scrollT * .5; rig.rotation.y = .35 + mx * .35;
      rig.position.z = scrollT * 2.5;
      dust.rotation.y += dt * .02; dust.position.y = scrollT * 1.5;
      cam.position.x = mx * .6; cam.position.y = -my * .4; cam.lookAt(0, 0, 0);
      renderer.render(sc, cam);
    })();
  }
})();
