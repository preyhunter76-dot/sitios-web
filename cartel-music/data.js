// Cartel Music · sitio oficial del sello. Datos del Cerebro Central (módulos 05, 06 y 12) y de salsafro.bandcamp.com.
// Regla del Cerebro: solo cifras verificadas; las tarifas no se publican.
const BC = "https://salsafro.bandcamp.com/track/";
window.PH = {
  brand: "Cartel Music", key: "cm", mailSubject: "Demo",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "573163136529",
  spotify: "7HWCje6tPWnHnBHxXiwrsM",
  waText: "Hola, quiero enviar mi música a Cartel Music.", waTextEn: "Hi, I'd like to send my music to Cartel Music.",
  eco: { diego: "https://diego-gasca.vercel.app", prey: "https://prey-hunter.vercel.app", salsafro: "https://salsafro.vercel.app" },

  stats: [
    ["+29 M", "Streams del sello", "ONErpm · DistroKid"],
    ["71", "Lanzamientos", "Catálogo verificado"],
    ["142", "Grabaciones con ISRC", "Créditos completos"],
    ["Oct 2022", "En operación", "Colombia · Chile"],
  ],

  // Obras del sello en el top (fuente ONErpm y DistroKid, Cerebro módulo 06). [cifra, unidad, canción, detalle, carátula]
  top: [
    ["+3 M", "reproducciones", "Vacaciones Con Pablo", "Prey Hunter · 2025", "vacaciones-con-pablo"],
    ["+2,2 M", "reproducciones", "Antava", "Disoft feat. Prey Hunter · 2023", "antava"],
    ["+2,1 M", "reproducciones", "Karely", "Cartel Music · 2023", "karely"],
    ["+1,2 M", "reproducciones", "Lele", "Felipe Vasquez Dj feat. Disoft, Prey Hunter · 2023", "lele"],
    ["+717 mil", "reproducciones", "Hey Mambo", "Prey Hunter feat. Cartel Music · 2024", "hey-mambo"],
  ],

  artists: ["Prey Hunter", "Disoft", "Felix CR", "Richard Diaz", "Ricardo Rv", "Cristian Salazar", "Miguel Quintero", "Dani Arroyo", "Darwin Dj", "Jorber", "Jose Angel", "Jotace", "Juan Narvaez", "Kevin Muñoz", "Yitan", "Gianluca Ospino"],

  discography: [
    ["Golden Boy", "2026", "Álbum · 17 temas", "golden-boy"], ["Serenno", "2026", "Álbum · 11 temas", "serenno"], ["AFROVICHIS", "2026", "Single", "afrovichis"],
    ["La Fuga", "2026", "Single", "la-fuga"], ["Origen de los Tambores", "2025", "EP · 5 temas", "origen-de-los-tambores"], ["Vacaciones Con Pablo", "2025", "Single", "vacaciones-con-pablo"],
    ["Una Noche", "2025", "Single", "una-noche"], ["Hey Mambo", "2024", "Single", "hey-mambo"], ["Ah Che Che", "2024", "Single", "ah-che-che"],
    ["Afro Killer", "2024", "Single", "afro-killer"], ["Antava", "2023", "Single", "antava"], ["Lele", "2023", "Single", "lele"], ["Karely", "2023", "Single", "karely"], ["I Like It", "2022", "Single", "i-like-it"],
  ],

  store: [
    { id: "hey-mambo-prey-hunter-feat-cartel-music-afro-house-remix", t: "Hey Mambo (Afro House Remix)", a: "Prey Hunter feat. Cartel Music", p: 5, y: 2024 },
    { id: "ah-che-che-prey-hunter-x-exilio-x-cartel-music", t: "Ah Che Che", a: "Prey Hunter x Exilio x Cartel Music", p: 5, y: 2024 },
    { id: "cual-es-esa-afro-house-remix", t: "Cual Es Esa (Afro House Remix)", a: "Prey Hunter x Feid x Pirlo x Cartel Music", p: 5, y: 2024 },
    { id: "lele-remix", t: "Lele (Remix)", a: "Felipe Vasquez, Prey Hunter, Disoft", p: 5, y: 2023 },
    { id: "vacaciones-con-pablo", t: "Vacaciones Con Pablo", a: "Prey Hunter", p: 5, y: 2025, tag: "3 M streams" },
    { id: "salio-el-calabria-x-disoft-x-prey-hunter", t: "Salió el Calabria", a: "Disoft x Prey Hunter", p: 5, y: 2024 },
    { id: "cintura-disoft-x-felipe-vasquez-afro-edit", t: "Cintura (Afro Edit)", a: "Disoft x Felipe Vasquez", p: 5, y: 2024 },
    { id: "la-fuga", t: "La Fuga", a: "Prey Hunter x Disoft", p: 5, y: 2026 },
  ].map((s) => ({ ...s, url: BC + s.id, img: `img/bc/${s.id}.jpg` })),

  // Noches Cartel Music
  booking: [
    { id: "cm-showcase", t: "Showcase Cartel Music", d: "Noche del sello de 3 a 5 horas con 2 a 4 DJs en la misma cabina." },
    { id: "cm-prey", t: "Prey Hunter · DJ set", d: "El fundador del sello en formato 60, 90 o 120 minutos." },
    { id: "cm-roster", t: "Artista del roster", d: "Un DJ del sello para tu noche, con rider técnico incluido." },
    { id: "cm-salsafro", t: "Noche Salsafro", d: "Showcase del género con percusión del Pacífico en vivo." },
  ],

  // Servicios del sello (Cerebro, módulo 12)
  services: [
    ["Distribución digital", "Tu música en todas las plataformas vía ONErpm y DistroKid."],
    ["Catálogo y metadatos", "ISRC, UPC y créditos completos en cada lanzamiento."],
    ["Marketing y lanzamientos", "Plan de lanzamiento y pitching a playlists editoriales."],
    ["A&R y desarrollo", "Buscamos y desarrollamos artistas con sonido propio."],
    ["Booking y management", "Agenda de shows para los artistas del sello."],
  ],
  delivery: [
    ["Máster", "WAV 24 bit / 44,1 o 48 kHz, pico real bajo −1 dBTP, sin clips"],
    ["Stems", "Drums, bajo, música, voces y efectos en WAV"],
    ["Portada", "3000 × 3000 px, JPG en RGB, sin logos de plataformas"],
    ["Metadatos", "Título, versión, artistas, compositores con nombre legal y productores"],
    ["Plazo", "Todo listo 4 semanas antes del lanzamiento"],
    ["Split sheet", "Firmado por todos los autores antes de subir la canción"],
  ],

  // Universo Cartel: el sapo del sello en distintos escenarios
  chars: [
    ["img/sapo-700.webp", "El sapo de Cartel Music, personaje 3D con corona y cadena CM", "50% 35%"],
    ["img/frog-dj-640.webp", "El sapo de Cartel Music tocando en una cabina de DJ con láseres verdes", "50% 40%"],
    ["img/frog-studio-640.webp", "El sapo de Cartel Music en el estudio frente a la consola", "50% 40%"],
    ["img/frog-stage-640.webp", "El sapo de Cartel Music en un escenario frente al público", "50% 40%"],
  ],

  tour: [
    ["inicio", "Cartel Music: el sello de Diego Gasca, desde 2022.", "Cartel Music: Diego Gasca's label, since 2022."],
    ["catalogo", "Las obras del sello con más reproducciones.", "The label's most played works."],
    ["artistas", "Los artistas del sello.", "The label's artists."],
    ["lanzamientos", "Lanzamientos con sus portadas.", "Releases with their covers."],
    ["tienda", "Compra la música del sello.", "Buy the label's music."],
    ["eventos", "Noches Cartel Music para tu evento.", "Cartel Music nights for your event."],
    ["demos", "¿Tienes el próximo hit? Envíalo.", "Got the next hit? Send it."],
    ["universo", "El universo del sapo de Cartel.", "The Cartel frog universe."],
  ],
};
