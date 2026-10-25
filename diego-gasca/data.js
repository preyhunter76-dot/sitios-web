// Diego Alexander Gasca Martínez · sitio oficial. Datos del Cerebro Central (módulos 02, 12 y 23) y textos de Diego.
// Las tarifas no se publican: cada servicio se cotiza.
window.DG = {
  brand: "Diego Gasca",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  youtube: "https://www.youtube.com/channel/UCh9PJ6voJWT6-G1YXtLo1Mw",
  eco: { prey: "https://prey-hunter.vercel.app", salsafro: "https://salsafro.vercel.app", cartel: "https://cartel-music.vercel.app" },

  // [valor, sufijo, texto, decimales, prefijo]
  stats: [
    [62.2, " M", "reproducciones verificadas del catálogo", 1, ""],
    [410117, "", "oyentes mensuales como Prey Hunter", 0, ""],
    [29, " M", "streams de Cartel Music", 0, "+"],
    [142, "", "grabaciones con ISRC", 0, ""],
  ],

  // La persona, el artista, el sello y su propio género.
  brands: [
    { key: "persona", name: "Diego Gasca", role: "La persona · empresario", img: "img/portrait-diego.webp", href: "#servicios", cta: "Ver servicios" },
    { key: "prey", name: "Prey Hunter", role: "El artista · DJ y productor", img: "img/portrait-prey-hunter.webp", cta: "Tienda oficial" },
    { key: "cartel", name: "Cartel Music", role: "El sello discográfico", img: "img/portrait-cartel-music.webp", cta: "Tienda oficial" },
    { key: "salsafro", name: "Salsafro", role: "Su propio género", img: "img/portrait-salsafro.webp", cta: "Tienda oficial" },
  ],

  // Éxitos (texto de Diego). Enlace: video oficial cuando existe; si no, búsqueda en YouTube.
  hits: [
    { t: "I Like It", f: "con Felipe Vasquez Dj" },
    { t: "Karely" },
    { t: "Scarface", f: "con Esquelefascina y Salsafro", yt: "YUVgJx4vkDI" },
    { t: "Antava", f: "junto a Disoft" },
    { t: "La Pampara de Colombia", f: "Live set", yt: "zjkkn_6GbDI" },
    { t: "Salsafro Pa La Babys" },
    { t: "Cuerpo y Cadera" },
  ],

  // Live sets del canal oficial de YouTube (verificados el 25/10/2026).
  sets: [
    { id: "2kk2d5GUxXE", t: "Afro House & Salsafro", y: "Live Set 2026", m: 73 },
    { id: "0bBZMJ-WWys", t: "Clásicos de la Guaracha", y: "Live DJ Set 2026", m: 71 },
    { id: "cZ-SZhajAa0", t: "Afro Favela", y: "Salsafro Live Set 2026", m: 52 },
    { id: "zjkkn_6GbDI", t: "La Pampara de Colombia", y: "Live Set", m: 40 },
    { id: "RT3oT47GBwE", t: "La Pampara", y: "Afro House · Live Set", m: 64 },
  ],

  services: [
    { id: "dg-charla", t: "Charla o conferencia", d: "20 a 45 minutos sobre industria musical independiente, catálogo, derechos e IA aplicada a la música." },
    { id: "dg-panel", t: "Panel o entrevista", d: "45 a 60 minutos en paneles, podcasts y medios. Preguntas con 5 días de anticipación." },
    { id: "dg-consultoria", t: "Consultoría para artistas y sellos", d: "Catálogo, distribución, marca personal y operación con datos, desde la experiencia de construir un ecosistema propio." },
    { id: "dg-show", t: "Show como Prey Hunter", d: "DJ set de Salsafro y Afro House de 60, 90 o 120 minutos con rider técnico." },
    { id: "dg-modelo", t: "Sesión como modelo", d: "Campañas de moda y marca. Contrato de uso de imagen firmado antes de la sesión." },
    { id: "dg-foto", t: "Sesión como fotógrafo", d: "Retrato y contenido. Galería de preselección en 72 horas, finales en alta y verticales." },
  ],

  topics: ["Industria musical independiente", "Catálogo y derechos", "IA aplicada al negocio de la música", "Marca personal"],
};
