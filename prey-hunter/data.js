// Prey Hunter · sitio oficial y tienda. Datos del Cerebro Central (módulos 03, 04, 06, 12, 15, 16) y de salsafro.bandcamp.com.
// Regla del Cerebro: solo cifras verificadas; las tarifas de booking no se publican (se cotizan por evento).
const BC = "https://salsafro.bandcamp.com/track/";
window.PH = {
  brand: "Prey Hunter", key: "ph", mailSubject: "Booking",
  waText: "Hola, quiero información de booking de Prey Hunter.", waTextEn: "Hi, I'd like booking information for Prey Hunter.",
  tour: [
    ["inicio", "Prey Hunter: DJ y productor de Salsafro, desde Cali.", "Prey Hunter: Salsafro DJ and producer, from Cali."],
    ["musica", "Lo más escuchado y mi música en Spotify.", "Most played and my music on Spotify."],
    ["tienda", "Compra mi música en Bandcamp.", "Buy my music on Bandcamp."],
    ["booking", "Lleva Prey Hunter a tu evento.", "Bring Prey Hunter to your event."],
    ["shows", "Pistas llenas en Chile y Colombia.", "Packed floors in Chile and Colombia."],
    ["bio", "De Cali para el mundo.", "From Cali to the world."],
    ["discografia", "Mis lanzamientos.", "My releases."],
    ["prensa", "Press kit con fotos oficiales.", "Press kit with official photos."],
    ["casos", "Casos reales, con cifras.", "Real cases, with numbers."],
    ["trabajemos", "Trabajemos juntos: los servicios de Diego Gasca.", "Let's work together: Diego Gasca's services."],
    ["club", "Únete al club de fans.", "Join the fan club."],
    ["contacto", "¿Hablamos? Escríbenos por WhatsApp.", "Let's talk: message us on WhatsApp."],
  ],
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "573163136529", // WhatsApp de booking y preguntas (Cerebro, módulo 12)
  spotify: "7HWCje6tPWnHnBHxXiwrsM",
  eco: { diego: "https://diego-gasca.vercel.app", salsafro: "https://salsafro.vercel.app", cartel: "https://cartel-music.vercel.app" },

  links: [
    ["Spotify", "https://open.spotify.com/artist/7HWCje6tPWnHnBHxXiwrsM"],
    ["Apple Music", "https://music.apple.com/co/artist/prey-hunter/1380533892"],
    ["YouTube", "https://www.youtube.com/channel/UCh9PJ6voJWT6-G1YXtLo1Mw"],
    ["SoundCloud", "https://soundcloud.com/prey_hunter"],
    ["Deezer", "https://www.deezer.com/artist/14723513"],
    ["Instagram", "https://www.instagram.com/prey_hunter/"],
    ["TikTok", "https://www.tiktok.com/@prey_hunter_oficial"],
    ["Bandcamp", "https://salsafro.bandcamp.com"],
  ],

  // [valor, etiqueta, fuente]
  stats: [
    ["410.117", "Oyentes mensuales en Spotify", "Viberate · oct 2026"],
    ["62,2 M", "Reproducciones verificadas", "MUSO.AI · todas las plataformas"],
    ["Top 2%", "Ranking global de artistas", "Posición 114.994"],
    ["292.921", "Shazams", "Histórico"],
  ],

  // Lo más escuchado (mismas cifras que el sitio de Diego Gasca). [cifra, unidad, canción, detalle, carátula]
  top: [
    ["+17 M", "reproducciones en Spotify", "I Like It", "Felipe Vasquez Dj, Prey Hunter, Disoft · 2022", "i-like-it"],
    ["+3 M", "reproducciones", "Vacaciones Con Pablo", "Prey Hunter · 2025", "vacaciones-con-pablo"],
    ["+2,2 M", "reproducciones", "Antava", "Disoft feat. Prey Hunter · 2023", "antava"],
    ["+2,1 M", "reproducciones", "Karely", "Cartel Music · 2023", "karely"],
    ["+1,2 M", "reproducciones", "Lele", "Felipe Vasquez Dj feat. Disoft, Prey Hunter · 2023", "lele"],
  ],

  // Tienda: canciones a la venta en Bandcamp (precio mínimo en USD, puedes pagar más)
  store: [
    { id: "domingos-con-prey", t: "Domingos Con Prey", a: "Prey Hunter", p: 8, y: 2026 },
    { id: "afrovichis", t: "AFROVICHIS", a: "Prey Hunter", p: 9, y: 2026, tag: "Top" },
    { id: "boyfriend", t: "BOYFRIEND", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "la-fuga", t: "La Fuga", a: "Prey Hunter x Disoft", p: 5, y: 2026 },
    { id: "dichavate-extended", t: "Dichavate (Extended)", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "afrosereg", t: "AFROSEREG", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "tuf-tuf-pof-pof", t: "É Tuf Tuf Pof Pof", a: "Prey Hunter", p: 5, y: 2025 },
    { id: "embaladi-a-afro-house", t: "Embaladiña (Afro House)", a: "Prey Hunter", p: 4.99, y: 2025 },
    { id: "bailalo-rocky", t: "Bailalo Rocky", a: "Prey Hunter", p: 6, y: 2025 },
    { id: "vacaciones-con-pablo", t: "Vacaciones Con Pablo", a: "Prey Hunter", p: 5, y: 2025, tag: "3 M streams" },
    { id: "ah-che-che-prey-hunter-x-exilio-x-cartel-music", t: "Ah Che Che", a: "Prey Hunter x Exilio", p: 5, y: 2024 },
    { id: "cual-es-esa-afro-house-remix", t: "Cual Es Esa (Afro House Remix)", a: "Prey Hunter x Feid x Pirlo", p: 5, y: 2024 },
    { id: "cintura-disoft-x-felipe-vasquez-afro-edit", t: "Cintura (Afro Edit)", a: "Disoft x Felipe Vasquez", p: 5, y: 2024 },
    { id: "salio-el-calabria-x-disoft-x-prey-hunter", t: "Salió el Calabria", a: "Disoft x Prey Hunter", p: 5, y: 2024 },
    { id: "hey-mambo-prey-hunter-feat-cartel-music-afro-house-remix", t: "Hey Mambo (Afro House Remix)", a: "Prey Hunter feat. Cartel Music", p: 5, y: 2024 },
    { id: "lele-remix", t: "Lele (Remix)", a: "Felipe Vasquez, Prey Hunter, Disoft", p: 5, y: 2023 },
  ].map((s) => ({ ...s, url: BC + s.id, img: `img/bc/${s.id}.jpg` })),

  booking: [
    { id: "ph-60", t: "DJ set · 60 min", d: "Salsafro para club o festival." },
    { id: "ph-90", t: "DJ set · 90 min", d: "El formato más pedido para noches de club." },
    { id: "ph-120", t: "DJ set extendido · 120 min", d: "Viaje completo, del warm-up al cierre." },
    { id: "ph-salsafro", t: "Salsafro con percusión en vivo", d: "DJ set con percusionista del Pacífico en tarima." },
  ],

  // Asistencia declarada por el artista en sus shows destacados.
  shows: [["Chile", "10.000"], ["Colombia", "8.000"]],

  // Lanzamientos con portada oficial (Deezer). [título, año, tipo, carátula]
  discography: [
    ["Golden Boy", "2026", "Álbum · 17 temas", "golden-boy"], ["Serenno", "2026", "Álbum · 11 temas", "serenno"],
    ["AFROVICHIS", "2026", "Single", "afrovichis"], ["La Fuga", "2026", "Single", "la-fuga"],
    ["Origen de los Tambores", "2025", "EP · 5 temas", "origen-de-los-tambores"], ["La Pampara de Colombia", "2025", "Álbum debut", "la-pampara-de-colombia"],
    ["Prende Ese Fili", "2025", "Single", "prende-ese-fili"], ["Una Noche", "2025", "Single", "una-noche"], ["UKI-U", "2025", "Single", "uki-u"],
    ["Vacaciones Con Pablo", "2025", "Single", "vacaciones-con-pablo"], ["Hey Mambo", "2024", "Single", "hey-mambo"], ["Ah Che Che", "2024", "Single", "ah-che-che"],
    ["Afro Killer", "2024", "Single", "afro-killer"], ["Antava", "2023", "Single", "antava"], ["Lele", "2023", "Single", "lele"],
    ["Karely", "2023", "Single", "karely"], ["I Like It", "2022", "Single", "i-like-it"], ["Show Look At Me Now", "2021", "Single", "show-look-at-me-now"],
  ],

  // Press kit: fotos oficiales (la versión de 480 px se usa en la fila; la original se descarga).
  gallery: ["press-17", "press-15", "press-04", "press-16", "live-03", "press-06", "live-05", "press-09"],

  // Comentarios reales del público en YouTube (canal oficial).
  reviews: [
    { a: "@eliotmarileo-r5x", t: "Me tele transporte a otra dimensión con esta musica uuff placer amis oídos", v: "Afro House & Salsafro · Live Set 2026", id: "2kk2d5GUxXE", c: "UgxPN9Yh33P-6dGRr5d4AaABAg", d: "sep 2026" },
    { a: "@DJ5IMER", t: "El rey del tambor el q comanda el mero viaje, un agrado conocerlo y escuchar su buena música manito puro éxito y bendiciones para usted", v: "Scarface · Visualizer", id: "YUVgJx4vkDI", c: "UgyanT1hLowvpU9KP394AaABAg", d: "may 2026" },
    { a: "@SAMUEL_CALERO_DJ_PD", t: "Salsafro lo mejor que pudieron haber hecho en esta vida", v: "Capaz · ft Felix CR", id: "0mAJgAFQ6ts", c: "UgzsIIb8T_VV3H5YBJJ4AaABAg", d: "ago 2025" },
    { a: "@pdctmas", t: "El Mejor Sin Duda Alguna.", v: "Live Set", id: "zjkkn_6GbDI", c: "UgwM2jxb1k2PwK0qMNJ4AaABAg", d: "jul 2025" },
    { a: "@TashiandAngel", t: "I heard 10 seconds of this song on a youtube commercial and was on the search for this song! Love it! It reminds me of the 80's and 90's club music. Much love from USA", v: "Relaxxx", id: "uwXf-HbBuZc", c: "UgxtcbnpsbT704Sawvt4AaABAg", d: "ago 2025" },
    { a: "@joeespinoza09", t: "Me encanta correr con esta canción", v: "Scarface · Visualizer", id: "YUVgJx4vkDI", c: "UgyYw0F9E2_a4EGG32N4AaABAg", d: "oct 2026" },
    { a: "@el_pollocl6803", t: "Temazoooo espero escucharlo en vivo", v: "Dentro De Mi", id: "lhEn-nzkxMQ", c: "UgwKNwuJk-YGnQOgz314AaABAg", d: "abr 2026" },
  ],
};
