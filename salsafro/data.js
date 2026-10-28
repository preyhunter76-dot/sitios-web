// Salsafro · sitio oficial y tienda. Datos del Cerebro Central (módulo 04) y de salsafro.bandcamp.com.
const BC = "https://salsafro.bandcamp.com/track/";
window.PH = {
  brand: "Salsafro", key: "sf", mailSubject: "Booking",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "573163136529",
  spotify: "7HWCje6tPWnHnBHxXiwrsM",
  bandcamp: "https://salsafro.bandcamp.com",
  waText: "Hola, quiero información de Salsafro.", waTextEn: "Hi, I'd like information about Salsafro.",
  eco: { diego: "https://diego-gasca.vercel.app", prey: "https://prey-hunter.vercel.app", cartel: "https://cartel-music.vercel.app" },

  stats: [
    ["17", "Lanzamientos con crédito Salsafro", "Catálogo verificado"],
    ["154 mil", "Reproducciones del set SALSAFRO 2.0", "Set insignia"],
    ["2", "Álbumes en 2026", "Serenno · Golden Boy"],
    ["Abr 2026", "Desde", "Sello y marca propia"],
  ],

  // Las raíces del sonido (palabras de Prey Hunter)
  roots: [
    ["01", "La guaracha", "El golpe de fiesta que pone a bailar a Colombia."],
    ["02", "Afro House", "La base de club: bombo firme y bajos cálidos."],
    ["03", "Salsa", "Metales, piano montuno y la clave de Cali dentro del beat."],
    ["04", "Pacífico colombiano", "Currulao, marimba, cununos y guasás que empujan cada drop."],
  ],

  store: [
    { id: "afrovichis", t: "Afrovichis", a: "Prey Hunter", p: 9, y: 2026, tag: "Top" },
    { id: "domingos-con-prey", t: "Domingos Con Prey", a: "Prey Hunter", p: 8, y: 2026 },
    { id: "boyfriend", t: "Boyfriend", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "la-fuga", t: "La Fuga", a: "Prey Hunter x Disoft", p: 5, y: 2026 },
    { id: "dichavate-extended", t: "Dichavate (Extended)", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "afrosereg", t: "Afrosereg", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "tuf-tuf-pof-pof", t: "É Tuf Tuf Pof Pof", a: "Prey Hunter", p: 5, y: 2025 },
    { id: "embaladi-a-afro-house", t: "Embaladiña", a: "Prey Hunter", p: 4.99, y: 2025 },
    { id: "bailalo-rocky", t: "Bailalo Rocky", a: "Prey Hunter", p: 6, y: 2025 },
    { id: "vacaciones-con-pablo", t: "Vacaciones Con Pablo", a: "Prey Hunter", p: 5, y: 2025, tag: "3 M streams" },
    { id: "ah-che-che-prey-hunter-x-exilio-x-cartel-music", t: "Ah Che Che", a: "Prey Hunter x Exilio", p: 5, y: 2024 },
    { id: "cual-es-esa-afro-house-remix", t: "Cual Es Esa (Afro House Remix)", a: "Prey Hunter x Feid x Pirlo", p: 5, y: 2024 },
    { id: "cintura-disoft-x-felipe-vasquez-afro-edit", t: "Cintura (Afro Edit)", a: "Disoft x Felipe Vasquez", p: 5, y: 2024 },
    { id: "salio-el-calabria-x-disoft-x-prey-hunter", t: "Salió el Calabria", a: "Disoft x Prey Hunter", p: 5, y: 2024 },
    { id: "hey-mambo-prey-hunter-feat-cartel-music-afro-house-remix", t: "Hey Mambo (Afro House Remix)", a: "Prey Hunter feat. Cartel Music", p: 5, y: 2024 },
    { id: "lele-remix", t: "Lele (Remix)", a: "Felipe Vasquez, Prey Hunter, Disoft", p: 5, y: 2023 },
  ].map((s) => ({ ...s, url: BC + s.id, img: `img/bc/${s.id}.jpg` })),

  // Lanzamientos con crédito Salsafro y portada oficial
  discography: [
    ["Golden Boy", "2026", "Álbum · 17 temas", "golden-boy"], ["Serenno", "2026", "Álbum · 11 temas", "serenno"],
    ["Origen de los Tambores", "2025", "EP · 5 temas", "origen-de-los-tambores"], ["La Pampara de Colombia", "2025", "Álbum", "la-pampara-de-colombia"],
    ["Prende Ese Fili", "2025", "Track de álbum", "prende-ese-fili"], ["Una Noche", "2025", "Single", "una-noche"],
  ],

  artists: ["Prey Hunter", "Disoft", "Felix CR", "Richard Diaz", "Ricardo Rv", "Cristian Salazar", "Miguel Quintero", "Dani Arroyo", "Darwin Dj", "Jorber", "Jose Angel", "Jotace", "Juan Narvaez", "Kevin Muñoz", "Yitan", "Gianluca Ospino"],
  artistRole: "Artista Salsafro",

  booking: [
    { id: "sf-60", t: "DJ set Salsafro · 60 min", d: "La fusión completa en formato club." },
    { id: "sf-90", t: "DJ set Salsafro · 90 min", d: "Más tiempo para el viaje de la guaracha al drop." },
    { id: "sf-perc", t: "Salsafro con percusión en vivo", d: "DJ set con percusionista: cununos y bombo en tarima." },
    { id: "sf-showcase", t: "Noche Salsafro", d: "Showcase con varios artistas del género." },
  ],

  // El personaje de Salsafro
  chars: [
    ["img/mono-700.webp", "El mono de Salsafro, personaje 3D con antifaz negro y cadena dorada", "50% 40%"],
    ["img/mono-cara.webp", "Primer plano del mono de Salsafro", "50% 30%"],
    ["img/mono-outfit.webp", "El mono de Salsafro con sudadera negra y tenis", "50% 50%"],
  ],

  tour: [
    ["inicio", "Salsafro: el género #1 de la electrónica.", "Salsafro: electronic music's #1 genre."],
    ["raices", "Las cuatro raíces del sonido.", "The four roots of the sound."],
    ["tienda", "Música para tocar en tus shows.", "Music to play at your shows."],
    ["lanzamientos", "Lanzamientos con crédito Salsafro.", "Releases credited to Salsafro."],
    ["artistas", "Los artistas del género.", "The genre's artists."],
    ["booking", "Salsafro en vivo para tu evento.", "Salsafro live at your event."],
    ["universo", "El mono de Salsafro.", "The Salsafro monkey."],
  ],
};
