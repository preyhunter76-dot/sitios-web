// Prey Hunter · sitio oficial y tienda. Datos del Cerebro Central (módulos 03, 06, 15) y de salsafro.bandcamp.com.
// Regla del Cerebro: solo cifras verificadas; las tarifas de booking no se publican (se cotizan por evento).
const BC = "https://salsafro.bandcamp.com/track/";
window.PH = {
  brand: "Prey Hunter",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "", // solo dígitos con indicativo; vacío = las solicitudes se envían por correo
  eco: { diego: "https://diego-gasca.vercel.app", salsafro: "https://salsafro.vercel.app", cartel: "https://cartel-music.vercel.app" }, // enlaces a los otros sitios del ecosistema (se llenan al publicar)

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
  playlist: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO4z6IAt",

  stats: [
    ["410.117", "Oyentes mensuales en Spotify", "Viberate · oct 2026"],
    ["62,2 M", "Reproducciones verificadas", "MUSO.AI · todas las plataformas"],
    ["Top 2%", "Ranking global de artistas", "Posición 114.994"],
    ["292.921", "Shazams", "Histórico"],
  ],

  latest: { title: "Modelo de Gym", date: "16 oct 2026", type: "Single", note: "El lanzamiento más reciente de Prey Hunter." },

  top: [
    ["I Like It", 49436256], ["Vacaciones Con Pablo", 3051785], ["Antava", 2260645], ["Karely", 2184415], ["Lele", 1235791],
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
    { id: "ph-60", t: "DJ set · 60 min", d: "Afro House, House y Tech House para club o festival." },
    { id: "ph-90", t: "DJ set · 90 min", d: "El formato más pedido para noches de club." },
    { id: "ph-120", t: "DJ set extendido · 120 min", d: "Viaje completo de warm-up a cierre." },
    { id: "ph-pampara", t: "Set temático «La Pampara»", d: "La firma de Prey Hunter: energía de club con raíz colombiana." },
  ],

  shows: [["Chile", 10000], ["Colombia", 5000], ["Cali", 3000], ["Legendary", 1000], ["Pradera", 300], ["Rozo", 200]],

  discography: [
    ["Modelo de Gym", "2026", "Single"], ["Mamaxxxita", "2026", "Single"], ["No la Bese", "2026", "Single"], ["Las P", "2026", "Single"],
    ["Miedo", "2026", "Single"], ["Mañana", "2026", "Single"], ["Afrochavate", "2026", "Single"], ["Golden Boy", "2026", "Álbum · 17 temas"],
    ["Serenno", "2026", "Álbum · 11 temas"], ["Gózalo", "2026", "Single"], ["Pájaro Amarillo", "2026", "Single"], ["Origen de los Tambores", "2025", "EP · 5 temas"],
    ["La Pampara de Colombia", "2025", "Álbum"], ["Vacaciones Con Pablo", "2025", "Single"], ["ASHO BABY", "2024", "Single"], ["Hey Mambo", "2024", "Single"],
    ["Antava", "2023", "Single"], ["Lele", "2023", "Single"], ["Karely", "2023", "Single"], ["I Like It", "2022", "Single"],
  ],

  gallery: ["img/press-15.webp", "img/press-06.webp", "img/live-03.webp", "img/press-16.webp", "img/press-09.webp", "img/live-05.webp", "img/press-17.webp", "img/press-04.webp"],
};
