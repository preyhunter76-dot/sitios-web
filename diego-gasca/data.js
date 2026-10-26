// Diego Alexander Gasca Martínez · sitio oficial. Datos del Cerebro Central (módulos 02, 12 y 23) y textos de Diego.
// Las tarifas no se publican: cada servicio se cotiza.
window.DG = {
  brand: "Diego Gasca",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  club: "https://fpxyixfjqcsbxysiluhy.supabase.co/functions/v1/club", // función de Supabase que guarda el club
  youtube: "https://www.youtube.com/channel/UCh9PJ6voJWT6-G1YXtLo1Mw",
  eco: { prey: "https://prey-hunter.vercel.app", salsafro: "https://salsafro.vercel.app", cartel: "https://cartel-music.vercel.app" },

  // [valor, sufijo, texto, decimales, prefijo, sin separador de miles]
  stats: [
    [2014, "", "en la industria desde", 0, "", true],
    [3, "", "marcas fundadas: Prey Hunter, Cartel Music y Salsafro", 0, ""],
    [29, " M", "streams de su sello Cartel Music", 0, "+"],
    [142, "", "grabaciones con ISRC en su catálogo", 0, ""],
  ],

  // Facetas personales de Diego (biografía oficial del Cerebro).
  facets: [
    ["Empresario", "Fundador del sello independiente Cartel Music y creador del género Salsafro. Dirige su operación con datos desde su propio sistema.", "img/portrait-diego.webp"],
    ["Conferencista", "Charlas y paneles sobre industria musical independiente, catálogo y derechos, IA aplicada a la música y marca personal.", "img/press-14.webp"],
    ["Fotógrafo", "Retrato y contenido para artistas y marcas, con mirada de quien también está frente a la cámara.", "img/press-18.webp"],
    ["Modelo", "Campañas de moda y de marca, con contrato de uso de imagen en cada sesión.", "img/press-07.webp"],
    ["Productor musical", "Más de una década en la música con su proyecto artístico, Prey Hunter, que tiene su propio sitio.", "img/live-02.webp"],
  ],

  // La persona, el artista, el sello y su propio género.
  brands: [
    { key: "persona", name: "Diego Gasca", role: "La persona · empresario", img: "img/portrait-diego.webp", logo: "img/logos/trebol.png", href: "#servicios", cta: "Ver servicios" },
    { key: "prey", name: "Prey Hunter", role: "El artista · DJ y productor", img: "img/portrait-prey-hunter.webp", logo: "img/logos/prey-hunter.png", color: "#FF2D87", cta: "Tienda oficial" },
    { key: "cartel", name: "Cartel Music", role: "El sello discográfico", img: "img/portrait-cartel-music.webp", logo: "img/logos/cartel-music.png", color: "#00FF7B", cta: "Tienda oficial" },
    { key: "salsafro", name: "Salsafro", role: "Su propio género", img: "img/portrait-salsafro.webp", logo: "img/logos/salsafro.png", color: "#FF6D29", cta: "Tienda oficial" },
  ],

  // Éxitos (texto de Diego) con su portada. Enlace: video oficial cuando existe; si no, búsqueda en YouTube.
  hits: [
    { t: "I Like It", f: "con Felipe Vasquez Dj", cover: "i-like-it" },
    { t: "Karely", f: "con Felipe Vasquez Dj y Disoft", cover: "karely" },
    { t: "Scarface", f: "con Esquelefascina y Salsafro", cover: "scarface", yt: "YUVgJx4vkDI" },
    { t: "Antava", f: "junto a Disoft", cover: "antava" },
    { t: "La Pampara de Colombia", f: "Live set", cover: "la-pampara-de-colombia", yt: "zjkkn_6GbDI" },
    { t: "Salsafro Pa Las Babys", f: "Prey Hunter", cover: "salsafro-pa-la-babys" },
    { t: "Cuerpo y Cadera", f: "Prey Hunter", cover: "cuerpo-y-cadera", yt: "dHW4e4JpT50" },
  ],

  // Redes y plataformas oficiales (Cerebro, módulo 14 y sitio de Prey Hunter).
  links: [
    { n: "Spotify", i: "spotify", u: "https://open.spotify.com/artist/7HWCje6tPWnHnBHxXiwrsM", k: "Escuchar" },
    { n: "Apple Music", i: "applemusic", u: "https://music.apple.com/co/artist/prey-hunter/1380533892", k: "Escuchar" },
    { n: "YouTube", i: "youtube", u: "https://www.youtube.com/channel/UCh9PJ6voJWT6-G1YXtLo1Mw", k: "Ver" },
    { n: "SoundCloud", i: "soundcloud", u: "https://soundcloud.com/prey_hunter", k: "Escuchar" },
    { n: "Deezer", i: "deezer", u: "https://www.deezer.com/artist/14723513", k: "Escuchar" },
    { n: "Bandcamp", i: "bandcamp", u: "https://salsafro.bandcamp.com", k: "Comprar música" },
    { n: "Instagram", i: "instagram", u: "https://www.instagram.com/prey_hunter/", k: "Seguir" },
    { n: "TikTok", i: "tiktok", u: "https://www.tiktok.com/@prey_hunter_oficial", k: "Seguir" },
  ],

  // Muestra de live sets del canal oficial (la música completa vive en el sitio de Prey Hunter).
  sets: [
    { id: "2kk2d5GUxXE", t: "Afro House & Salsafro", y: "Live Set 2026", m: 73 },
    { id: "cZ-SZhajAa0", t: "Afro Favela", y: "Salsafro Live Set 2026", m: 52 },
    { id: "zjkkn_6GbDI", t: "La Pampara de Colombia", y: "Live Set", m: 40 },
  ],

  // Galería editorial: tres retratos de Diego.
  gallery: [
    ["05-negro-diamantes", "Negro y diamantes", "t"],
    ["04-rosa-sesion", "Sesión en rosa", "t"],
    ["12-denim-negro", "Denim", "t"],
  ],

  // Reseñas: comentarios reales de fans en el canal oficial de YouTube (texto original, sin emojis).
  reviews: [
    { a: "@eliotmarileo-r5x", t: "Me tele transporte a otra dimensión con esta musica uuff placer amis oídos", v: "Afro House & Salsafro · Live Set 2026", id: "2kk2d5GUxXE", c: "UgxPN9Yh33P-6dGRr5d4AaABAg", d: "sep 2026" },
    { a: "@DJ5IMER", t: "El rey del tambor el q comanda el mero viaje, un agrado conocerlo y escuchar su buena música manito puro éxito y bendiciones para usted", v: "Scarface · Visualizer", id: "YUVgJx4vkDI", c: "UgyanT1hLowvpU9KP394AaABAg", d: "may 2026" },
    { a: "@SAMUEL_CALERO_DJ_PD", t: "Salsafro lo mejor que pudieron haber hecho en esta vida", v: "Capaz · ft Felix CR", id: "0mAJgAFQ6ts", c: "UgzsIIb8T_VV3H5YBJJ4AaABAg", d: "ago 2025" },
    { a: "@pdctmas", t: "El Mejor Sin Duda Alguna.", v: "La Pampara de Colombia · Live Set", id: "zjkkn_6GbDI", c: "UgwM2jxb1k2PwK0qMNJ4AaABAg", d: "jul 2025" },
    { a: "@TashiandAngel", t: "I heard 10 seconds of this song on a youtube commercial and was on the search for this song! Love it! It reminds me of the 80's and 90's club music. Much love from USA", v: "Relaxxx", id: "uwXf-HbBuZc", c: "UgxtcbnpsbT704Sawvt4AaABAg", d: "ago 2025" },
    { a: "@KeshiaNicoleSaavedraTorres", t: "QUE ESPECTÁCULO, crackkkkk", v: "La Pampara de Colombia · Live Set", id: "zjkkn_6GbDI", c: "UgyIqxNct9I293XKtIJ4AaABAg", d: "jun 2025" },
    { a: "@joeespinoza09", t: "Me encanta correr con esta canción", v: "Scarface · Visualizer", id: "YUVgJx4vkDI", c: "UgyYw0F9E2_a4EGG32N4AaABAg", d: "oct 2026" },
    { a: "@Nasadj333", t: "sos un crack mostruo las mejores energias siempre bro", v: "La Pampara · Live Set", id: "RT3oT47GBwE", c: "UgyRE-Ucl1ZvfNKkk0J4AaABAg", d: "jun 2025" },
    { a: "@el_pollocl6803", t: "Temazoooo espero escucharlo en vivo", v: "Dentro De Mi", id: "lhEn-nzkxMQ", c: "UgwKNwuJk-YGnQOgz314AaABAg", d: "abr 2026" },
    { a: "@juliancarrillo9709", t: "Nunca falla la pampara", v: "La Pampara de Colombia · Live Set", id: "zjkkn_6GbDI", c: "Ugz-1MQdqWbrcPj9zx94AaABAg", d: "jul 2025" },
  ],

  services: [
    { id: "dg-charla", t: "Charla o conferencia", d: "20 a 45 minutos sobre industria musical independiente, catálogo, derechos e IA aplicada a la música." },
    { id: "dg-panel", t: "Panel o entrevista", d: "45 a 60 minutos en paneles, podcasts y medios. Preguntas con 5 días de anticipación." },
    { id: "dg-consultoria", t: "Consultoría para artistas y sellos", d: "Catálogo, distribución, marca personal y operación con datos, desde la experiencia de construir un ecosistema propio." },
    { id: "dg-modelo", t: "Sesión como modelo", d: "Campañas de moda y marca. Contrato de uso de imagen firmado antes de la sesión." },
    { id: "dg-foto", t: "Sesión como fotógrafo", d: "Retrato y contenido. Galería de preselección en 72 horas, finales en alta y verticales." },
    { id: "dg-show", t: "Show como Prey Hunter", d: "DJ set de Salsafro y Afro House de 60, 90 o 120 minutos con rider técnico." },
  ],

  topics: ["Industria musical independiente", "Catálogo y derechos", "IA aplicada al negocio de la música", "Marca personal"],

  // Beneficios del club (sin promesas que no existan todavía).
  perks: [
    ["Fans", "Primero en enterarte de los proyectos, lanzamientos y eventos de Diego, de Cartel Music y de Salsafro."],
    ["Shows", "Aviso cuando haya fechas o eventos en tu ciudad."],
    ["Clientes", "Novedades de servicios, charlas y fechas disponibles para tu evento o marca."],
  ],
};
