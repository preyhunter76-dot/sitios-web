// Versión en inglés del sitio de Prey Hunter (mismo sistema que diego-gasca). El español es el original; con «EN» se traducen los textos visibles y las etiquetas accesibles.
// La preferencia se guarda en el navegador (ph-lang). Las reseñas reales y el asistente local no se traducen.
(() => {
  const EN = {
    "Saltar al contenido": "Skip to content", "Música": "Music", "Tienda": "Store", "Discografía": "Discography", "Prensa": "Press", "Preguntas": "Questions", "Detener": "Stop",
    "Prey Hunter · Cali, Colombia · Desde 2014": "Prey Hunter · Cali, Colombia · Since 2014", "DJ y productor de": "DJ and producer of",
    "Afro House con salsa y percusión del Pacífico, hecho en Cali. Más de 410 mil oyentes cada mes en Spotify.": "Afro House with salsa and Pacific percussion, made in Cali. Over 410K monthly listeners on Spotify.",
    "Escuchar ahora": "Listen now", "Pausar": "Pause", "Oyentes mensuales en Spotify": "Monthly listeners on Spotify", "Reproducciones verificadas": "Verified streams", "MUSO.AI · todas las plataformas": "MUSO.AI · all platforms",
    "Ranking global de artistas": "Global artist ranking", "Posición 114.994": "Position 114,994", "Histórico": "All time",
    "01 · Música": "01 · Music", "Lo más escuchado.": "Most played.", "reproducciones en Spotify": "streams on Spotify", "reproducciones": "streams", "Escucha mi música": "Listen to my music", "Abrir en Spotify ↗": "Open in Spotify ↗",
    "02 · Tienda oficial": "02 · Official store", "Compra la música.": "Buy the music.", "Descargas en alta calidad en Bandcamp. Precio mínimo en dólares: puedes pagar más si quieres apoyar.": "High-quality downloads on Bandcamp. Minimum price in US dollars: pay more if you want to support.",
    "03 · Booking": "03 · Booking", "Lleva Prey Hunter a tu evento.": "Bring Prey Hunter to your event.",
    "Elige el formato y agrégalo a tu solicitud, o escríbenos por WhatsApp con fecha y ciudad. La tarifa se cotiza por evento; el rider técnico y de catering va con el contrato.": "Pick a format and add it to your request, or message us on WhatsApp with the date and city. Fees are quoted per event; the tech and catering rider comes with the contract.",
    "Salsafro para club o festival.": "Salsafro for club or festival.", "El formato más pedido para noches de club.": "The most requested format for club nights.", "DJ set extendido · 120 min": "Extended DJ set · 120 min",
    "Viaje completo, del warm-up al cierre.": "A full journey, from warm-up to closing.", "Salsafro con percusión en vivo": "Salsafro with live percussion", "DJ set con percusionista del Pacífico en tarima.": "DJ set with a Pacific percussionist on stage.",
    "Cabina": "Booth", "Prueba de sonido": "Soundcheck", "Mínimo 30 min": "30 min minimum", "Anticipo": "Deposit", "50 % al firmar": "50% on signing", "Booking por WhatsApp": "Booking on WhatsApp",
    "04 · En vivo": "04 · Live", "Pistas llenas.": "Packed floors.", "Asistencia declarada por el artista en sus shows destacados.": "Attendance reported by the artist at his featured shows.", "personas": "people",
    "05 · Bio": "05 · Bio", "De Cali para el mundo.": "From Cali to the world.", "Nacido y formado en Cali, Prey Hunter construyó su sonido en Colombia desde 2014.": "Born and raised in Cali, Prey Hunter has built his sound in Colombia since 2014.",
    "Hoy suma 142 grabaciones publicadas en 71 lanzamientos y es el fundador del sello": "Today he has 142 published recordings across 71 releases and founded the label",
    "y de": "and", ", la fusión de Afro House con salsa y percusión del Pacífico.": ", the fusion of Afro House with salsa and Pacific percussion.", "· el empresario detrás del artista ↗": "· the entrepreneur behind the artist ↗",
    "Lo que dicen.": "What people say.", "Comentarios reales del público en YouTube.": "Real comments from the audience on YouTube.", "Ver en YouTube": "See on YouTube",
    "06 · Discografía": "06 · Discography", "Lanzamientos.": "Releases.", "Una selección de los 71 lanzamientos del catálogo.": "A selection from the 71 releases in the catalog.",
    "Álbum debut": "Debut album", "temas": "tracks", "Álbum": "Album", "07 · Prensa": "07 · Press", "Press kit.": "Press kit.", "Fotos oficiales en alta resolución. Toca una para descargarla.": "Official high-resolution photos. Tap one to download it.",
    "Descargar": "Download", "Pedir el press kit completo": "Request the full press kit", "Booking · Prensa · Alianzas": "Booking · Press · Partnerships", "Llévalo": "Bring him", "a tu evento": "to your event",
    "Fechas 2026 abiertas": "2026 dates open", "Escríbenos": "Message us", "Correo de booking": "Booking email", "DJ y productor de Salsafro · Cali, Colombia": "Salsafro DJ and producer · Cali, Colombia",
    "Sitio": "Site", "Escúchalo": "Listen", "Ecosistema": "Ecosystem", "Contacto": "Contact", "Las compras de música se procesan en Bandcamp.": "Music purchases are processed on Bandcamp.", "Comprar": "Buy", "Tu solicitud de booking": "Your booking request",
    "@Secciones": "Sections", "@Recorrido por la página": "Page tour", "@Escuchar mi música": "Play my music", "@Preguntas por WhatsApp": "Questions on WhatsApp", "@Modo oscuro": "Dark mode", "@Modo claro": "Light mode",
    "@Abrir menú": "Open menu", "@Anterior": "Previous", "@Siguiente": "Next", "@Lo más escuchado": "Most played", "@Comentario del público": "Audience comment", "@Marcas": "Brands", "@Cifras": "Numbers", "@Lanzamientos": "Releases",
    "@Prey Hunter con sudadera negra y gafas, sobre fondo negro": "Prey Hunter in a black hoodie and sunglasses, on a black background", "@Prey Hunter en cabina frente al público, con fuegos artificiales": "Prey Hunter in the booth facing the crowd, with fireworks",
    "@Personaje 3D de Prey Hunter con abrigo blanco y gafas": "3D character of Prey Hunter in a white coat and sunglasses", "@Prey Hunter con chaqueta Chile": "Prey Hunter in a Chile jacket",
  };
  // Textos con partes variables
  const RX = [
    [/^desde (.+)$/, "from $1"], [/^Elegir (.+)$/, (m, n) => "Choose " + (EN[n] || n)],
    [/^¡Listo, (.+)! Ya eres parte del club\.$/, "Done, $1! You're now part of the club."],
  ];
  const lang = (() => { try { return localStorage.getItem("ph-lang") === "en" ? "en" : "es"; } catch { return "es"; } })();
  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.textContent = lang === "en" ? "ES" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "Ver en español" : "View in English");
    btn.addEventListener("click", () => { try { localStorage.setItem("ph-lang", lang === "en" ? "es" : "en"); } catch {} location.reload(); });
  }
  window.I18N = { lang };
  if (lang !== "en") return;

  document.documentElement.lang = "en";
  const tr = (t) => {
    if (EN[t]) return EN[t];
    for (const [re, to] of RX) if (re.test(t)) return t.replace(re, to);
    if (t.includes(" · ")) { const parts = t.split(" · "); if (parts.some((p) => EN[p])) return parts.map((p) => EN[p] || p).join(" · "); }
    return null;
  };
  const skip = (el) => !el || el.closest("script,style,.rev p,#aiLog,#aiChips,[translate=no]");
  const textNode = (n) => { const raw = n.nodeValue, t = raw.trim(); if (!t || skip(n.parentElement)) return; const v = tr(t); if (v) n.nodeValue = raw.replace(t, v); };
  const attrs = (el) => { for (const a of ["aria-label", "alt", "placeholder"]) { const v = el.getAttribute && el.getAttribute(a); if (v && EN["@" + v]) el.setAttribute(a, EN["@" + v]); } };
  const walk = (root) => {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 || skip(root)) return;
    attrs(root); root.querySelectorAll("[aria-label],[alt],[placeholder]").forEach(attrs);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); while (w.nextNode()) textNode(w.currentNode);
  };
  document.title = "Prey Hunter · Salsafro DJ and producer · Cali, Colombia";
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = "Prey Hunter, Salsafro DJ and producer from Cali, Colombia. Music, official store, show booking and press kit.";
  walk(document.body);
  // El contenido que app.js crea después (servicios, mensajes, cambios de moneda) también se traduce.
  new MutationObserver((ms) => ms.forEach((m) => {
    if (m.type === "attributes") return attrs(m.target);
    m.addedNodes.forEach(walk);
  })).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-label"] });
})();
