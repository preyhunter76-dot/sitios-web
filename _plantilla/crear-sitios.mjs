// Generador de los sitios nuevos del ecosistema con el mismo sistema de Prey Hunter, Cartel Music y Salsafro
// (menú, modo oscuro, inglés, WhatsApp, música, recorrido, filas en movimiento y motion).
// Uso: node _plantilla/crear-sitios.mjs  → vuelve a crear cada carpeta desde sitios.mjs.
// Reglas: cifras solo del Cerebro, sin precios inventados, sin samples de terceros, sin asesoría financiera.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITIOS } from "./sitios.mjs";

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = path.join(R, "salsafro"), CEREBRO = path.resolve(R, "../cerebro/public");
const COMUNES = ["app.js", "i18n.js", "motion3d.js", "solicitud.js", "solicitud.css", "style.css", "vercel.json"];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ICON = {
  tour: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor"/></svg>',
  music: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="ic-play" d="M9 18V6l10-2v12"/><circle class="ic-play" cx="6.5" cy="18" r="2.5"/><circle class="ic-play" cx="16.5" cy="16" r="2.5"/><path class="ic-pause" d="M9 6v12M15 6v12"/></svg>',
  theme: '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="moon" d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/><g class="sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g></svg>',
};

// Textos que comparten todos los sitios
const COMUN_EN = {
  "Saltar al contenido": "Skip to content", "Preguntas": "Questions", "Detener": "Stop", "Escuchar ahora": "Listen now", "Pausar": "Pause",
  "Sitio": "Site", "Ecosistema": "Ecosystem", "Contacto": "Contact", "Escríbenos": "Message us", "Club": "Club",
  "@Secciones": "Sections", "@Recorrido por la página": "Page tour", "@Escuchar mi música": "Play the music", "@Preguntas por WhatsApp": "Questions on WhatsApp",
  "@Modo oscuro": "Dark mode", "@Modo claro": "Light mode", "@Abrir menú": "Open menu", "@Anterior": "Previous", "@Siguiente": "Next", "@Cifras": "Numbers", "@Me uno como": "Joining as",
  "Únete al club.": "Join the club.", "Fan": "Fan", "Artista o cliente": "Artist or client", "Prensa o aliado": "Press or partner", "Nombre": "Name", "Correo": "Email",
  "WhatsApp (opcional)": "WhatsApp (optional)", "Ciudad": "City", "País": "Country", "Me interesa": "I'm interested in", "Unirme": "Join", "política de privacidad": "privacy policy",
  "Autorizo el tratamiento de mis datos para recibir noticias y beneficios, según la": "I authorize the processing of my data to receive news and benefits, under the",
  "(Ley 1581 de 2012). Puedo darme de baja cuando quiera.": "(Colombian Law 1581 of 2012). I can unsubscribe anytime.",
};

function sitio(c) {
  const EN = { ...COMUN_EN };
  const L = ([es, en]) => { if (en && es !== en) EN[es.trim()] = en; return esc(es); };
  const A = ([es, en]) => { if (en) EN["@" + es] = en; return esc(es); }; // atributos (alt, aria-label)
  const dir = path.join(R, c.folder);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(path.join(dir, "img"), { recursive: true });
  for (const f of COMUNES) fs.copyFileSync(path.join(BASE, f), path.join(dir, f));
  fs.copyFileSync(path.join(R, "prey-hunter/img/clover.webp"), path.join(dir, "img/clover.webp"));
  // Archivos propios del sitio (por ejemplo, el sistema de Cartel Trading): _plantilla/<carpeta>/ se copia tal cual
  const own = path.join(R, "_plantilla", c.folder);
  if (fs.existsSync(own)) fs.cpSync(own, dir, { recursive: true });
  for (const [dest, src] of Object.entries(c.images)) {
    const from = src.startsWith("cerebro:") ? path.join(CEREBRO, src.slice(8)) : path.join(R, src);
    fs.mkdirSync(path.dirname(path.join(dir, "img", dest)), { recursive: true });
    fs.copyFileSync(from, path.join(dir, "img", dest));
  }

  // Datos de las filas: cada texto también va al diccionario inglés
  const D = { brand: c.brand, key: c.key, email: "prey-hunter-oficial@hotmail.com", whatsapp: "573163136529", spotify: c.spotify || "7HWCje6tPWnHnBHxXiwrsM",
    mailSubject: c.mailSubject || c.brand, waText: c.wa[0], waTextEn: c.wa[1],
    eco: { diego: "https://diego-gasca.vercel.app", prey: "https://prey-hunter.vercel.app", cartel: "https://cartel-music.vercel.app", salsafro: "https://salsafro.vercel.app" },
    club: "https://fpxyixfjqcsbxysiluhy.supabase.co/functions/v1/club", privacy: "https://diego-gasca.vercel.app/privacidad.html" };
  const raw = (pair) => (L(pair), pair[0]);
  if (c.stats) D.stats = c.stats.map((row) => row.map((x) => (x ? raw(x) : "")));
  for (const k of ["roots", "services", "delivery", "perks"]) if (c[k]) D[k] = c[k].map((row) => row.map((x) => (Array.isArray(x) ? raw(x) : x)));
  if (c.chars) D.chars = c.chars.map(([src, alt, pos]) => (A(alt), ["img/" + src, alt[0], pos]));
  if (c.shops) D.shops = c.shops.map((s) => ({ t: raw(s.t), d: raw(s.d), tag: raw(s.tag), url: s.url, img: "img/" + s.img }));
  D.tour = c.tour.map(([id, es, en]) => [id, es, en]);

  // Secciones
  let n = 0;
  const kick = (k) => `${String(++n).padStart(2, "0")} · ${L(k)}`;
  const kEN = (k) => { const nn = String(n).padStart(2, "0"); EN[`${nn} · ${k[0]}`] = `${nn} · ${k[1]}`; };
  const arrows = (row) => `<div class="row-arrows"><button type="button" data-row="${row}" data-dir="prev" aria-label="Anterior">←</button><button type="button" data-row="${row}" data-dir="next" aria-label="Siguiente">→</button></div>`;
  const S = {
    raw: (s) => { const k = kick(s.k); kEN(s.k); return `<section class="${s.cls || "rowsec"}" id="${s.id}">
  <div class="row-head">
    <div><p class="ph-k">${k}</p><h2 class="big-head light">${L(s.t)}</h2></div>
    ${s.p ? `<p>${L(s.p)}</p>` : ""}
  </div>
  ${s.html}
</section>`; },
    tiles: (s) => { const k = kick(s.k); kEN(s.k); return `<section class="rowsec${s.dark ? " dark" : ""}" id="${s.id}">
  <div class="row-head">
    <div><p class="ph-k">${k}</p><h2 class="big-head${s.dark ? " light" : ""}">${L(s.t)}</h2></div>
    ${s.p ? `<p>${L(s.p)}</p>` : ""}
    ${arrows(s.row)}
  </div>
  <div class="tiles" id="${s.row}" tabindex="0" role="region" aria-label="${A(s.t)}"></div>${s.list ? `
  <div class="deliv-wrap">
    <h3>${L(s.list)}</h3>
    <ul class="deliv" id="delivery"></ul>${s.cta ? `
    <div class="cta"><a class="btn btn-light wa-link" href="#" target="_blank" rel="noopener">${L(s.cta)}</a></div>` : ""}
  </div>` : ""}${s.note ? `
  <p class="ph-note">${L(s.note)}</p>` : ""}
</section>`; },
    club: (s) => { const k = kick(["Club", "Club"]); kEN(["Club", "Club"]); return `<section class="club" id="club">
  <div class="club-copy">
    <p class="ph-k">${k}</p>
    <h2 class="big-head">${L(s.t || ["Únete al club.", "Join the club."])}</h2>
    <p class="club-lead">${L(s.lead)}</p>
    <ul class="perks" id="perks"></ul>
  </div>
  <form class="club-form" id="clubForm" novalidate>
    <div class="seg" role="radiogroup" aria-label="Me uno como">
      <label><input type="radio" name="tipo" value="Fan" checked><span>Fan</span></label>
      <label><input type="radio" name="tipo" value="Cliente"><span>Artista o cliente</span></label>
      <label><input type="radio" name="tipo" value="Prensa o aliado"><span>Prensa o aliado</span></label>
    </div>
    <label class="fld">Nombre<input name="nombre" required autocomplete="name" maxlength="80"></label>
    <div class="two">
      <label class="fld">Correo<input name="correo" type="email" required autocomplete="email" maxlength="120"></label>
      <label class="fld">WhatsApp (opcional)<input name="whatsapp" type="tel" autocomplete="tel" maxlength="30"></label>
    </div>
    <div class="two">
      <label class="fld">Ciudad<input name="ciudad" autocomplete="address-level2" maxlength="60"></label>
      <label class="fld">País<input name="pais" autocomplete="country-name" maxlength="60"></label>
    </div>
    <fieldset class="chips"><legend>Me interesa</legend>
${s.chips.map((ch, i) => `      <label><input type="checkbox" name="intereses" value="${esc(ch[0])}"${i ? "" : " checked"}><span>${L(ch)}</span></label>`).join("\n")}
    </fieldset>
    <input class="hp" name="sitio_web" tabindex="-1" autocomplete="off" aria-hidden="true">
    <label class="consent"><input type="checkbox" name="acepto" required><span>Autorizo el tratamiento de mis datos para recibir noticias y beneficios, según la <a class="privacy-link" href="https://diego-gasca.vercel.app/privacidad.html" target="_blank" rel="noopener">política de privacidad</a> (Ley 1581 de 2012). Puedo darme de baja cuando quiera.</span></label>
    <button class="btn btn-dark" type="submit">Unirme</button>
    <p class="form-msg" id="clubMsg" role="status" aria-live="polite"></p>
  </form>
</section>`; },
  };
  const body = c.sections.map((s) => S[s.type](s)).join("\n\n");
  const nav = c.nav.map(([id, es, en]) => `<a href="#${id}">${L([es, en])}</a>`).join("");
  const h = c.hero, f = c.final;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title[0])}</title>
<meta name="description" content="${esc(c.desc[0])}">
<meta name="theme-color" content="#0b0b0b">
<link rel="canonical" href="https://${c.folder}.vercel.app/">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="${esc(c.brand)}">
<meta property="og:title" content="${esc(c.title[0])}">
<meta property="og:description" content="${esc(c.desc[0])}">
<meta property="og:url" content="https://${c.folder}.vercel.app/">
<meta property="og:image" content="https://${c.folder}.vercel.app/img/${h.img}">
<meta name="twitter:card" content="summary_large_image">
<script>try{document.documentElement.dataset.theme=localStorage.getItem("${c.key}-theme")==="light"?"light":"dark";if(localStorage.getItem("${c.key}-lang")==="en")document.documentElement.lang="en"}catch(e){}</script>
<link rel="icon" href="img/clover.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@600;700;800;900&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="img/${h.img}">
<link rel="stylesheet" href="solicitud.css">
<link rel="stylesheet" href="style.css">${(c.css || []).map((f) => `
<link rel="stylesheet" href="${f}">`).join("")}
<style>.ph{--pink:${c.color};--m3d:${c.color}}.ph-note{margin-top:clamp(28px,3vw,44px);max-width:70ch;font-size:13px;line-height:1.6;color:var(--steel)}.shop .prod-tag{background:var(--pink);color:#0b0b0b}.ph-brand-txt{font:900 clamp(18px,1.6vw,22px)/1 var(--display);letter-spacing:-.03em;text-transform:uppercase}.ph-brand-txt em{font-style:normal;color:var(--pink)}</style>
</head>
<body class="ph">
<a class="skip" href="#contenido">Saltar al contenido</a>

<header class="nav dark" id="nav">
  <nav class="links" id="links" aria-label="Secciones">
    ${nav}
  </nav>
  <a href="#inicio" class="brand ph-brand-txt" translate="no">${c.logo}</a>
  <div class="nav-end">
    <button type="button" class="tgl" id="tourBtn" aria-label="Recorrido por la página">${ICON.tour}</button>
    <button type="button" class="tgl" id="musicBtn" aria-label="Escuchar mi música" aria-pressed="false">${ICON.music}</button>
    <a class="tgl wa" id="waBtn" href="#" target="_blank" rel="noopener" aria-label="Preguntas por WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8.9 8.9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 12 20z" fill="currentColor" stroke="none"/></svg><span>Preguntas</span></a>
${c.noLang ? "" : `    <button type="button" class="tgl" id="langBtn" aria-label="Ver en inglés" translate="no">EN</button>
`}    <button type="button" class="tgl" id="themeBtn" aria-label="Modo claro" aria-pressed="true">${ICON.theme}</button>
    <a href="${c.navCta[0] === "wa" ? "#" : c.navCta[0]}" class="nav-cta${c.navCta[0] === "wa" ? " wa-link" : ""}"${c.navCta[0] === "wa" ? ' target="_blank" rel="noopener"' : ""}>${L(c.navCta[1])}</a>
    <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>

<main id="contenido">
<section class="ph-hero" id="inicio" data-hero>
  <div class="ph-hero-photo"><img src="img/${h.img}" width="1200" height="1200" fetchpriority="high" alt="${A(h.alt)}" style="object-position:${h.pos || "50% 30%"}"></div>
  <div class="ph-hero-copy">
    <p class="kicker">${L(h.kicker)}</p>
    <h1 class="ph-title">${esc(h.title)}</h1>
    <p class="hero-hook">${L(h.hook[0])} <em>${L(h.hook[1])}</em></p>
    <p class="hero-lead">${L(h.lead)}</p>
    <div class="cta">
      <a class="btn btn-light${h.cta1[0] === "wa" ? " wa-link" : ""}" href="${h.cta1[0] === "wa" ? "#" : h.cta1[0]}"${h.cta1[0] === "wa" ? ' target="_blank" rel="noopener"' : ""}>${L(h.cta1[1])}</a>
      <a class="btn btn-line" href="${h.cta2[0]}">${L(h.cta2[1])}</a>
    </div>
  </div>
</section>

<section class="ph-stats" id="cifras" aria-label="Cifras"><div class="num-grid" id="stats"></div></section>

${body}

<section class="oferta ph-final" id="contacto">
  <div class="oferta-frame">
    <div class="oferta-copy">
      <p class="oferta-k">${L(f.k)}</p>
      <h2 class="oferta-t"><span>${L(f.t1)}</span><em>${L(f.t2)}</em></h2>
      <span class="oferta-badge">${L(f.badge)}</span>
      <p class="oferta-div"><span>Escríbenos</span></p>
      <div class="oferta-cta"><a class="btn btn-light wa-link" href="#" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-line" id="mailBtn">${L(f.mail)}</a></div>
    </div>
    <div class="ph-final-art"><img src="img/${f.img}" width="900" height="900" alt="${A(f.alt)}" loading="lazy"></div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="f-top">
    <a href="#inicio" class="f-brand ph-brand-txt" translate="no">${c.logo}</a>
    <p class="f-tag">${L(c.tag)}</p>
  </div>
  <div class="f-cols">
    <div><p>Sitio</p>${nav}</div>
    <div><p>Ecosistema</p><a data-eco="diego">Diego Gasca</a><a data-eco="prey">Prey Hunter</a><a data-eco="cartel">Cartel Music</a><a data-eco="salsafro">Salsafro</a></div>
    <div><p>Contacto</p><a id="fmail"></a><a class="wa-link" href="#" target="_blank" rel="noopener">WhatsApp</a></div>
  </div>
  <div class="f-bottom"><span>${esc(c.brand)} · Diego Gasca</span><span>${L(c.legal)}</span><span>© <span id="year"></span></span></div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="solicitud.js"></script>
<script src="data.js"></script>
<script src="i18n-dict.js"></script>
<script src="i18n.js"></script>
<script src="app.js"></script>
<script src="motion3d.js"></script>${(c.scripts || []).map((f) => `
<script src="${f}"></script>`).join("")}
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, "index.html"), html);
  fs.writeFileSync(path.join(dir, "data.js"), `// ${c.brand} · creado con _plantilla/crear-sitios.mjs (no editar a mano: cambia _plantilla/sitios.mjs y vuelve a generar).\nwindow.PH = ${JSON.stringify(D, null, 1)};\n`);
  fs.writeFileSync(path.join(dir, "i18n-dict.js"), `// Diccionario inglés de ${c.brand} (generado).\nwindow.I18N_TITLE = ${JSON.stringify(c.title[1])};\nwindow.I18N_DESC = ${JSON.stringify(c.desc[1])};\nwindow.I18N_EN = ${JSON.stringify(EN, null, 1)};\n`);
  console.log("listo:", c.folder);
}

for (const c of SITIOS) sitio(c);
