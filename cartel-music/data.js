// Cartel Music · sitio oficial del sello y tienda. Datos del Cerebro Central (módulo 05) y de salsafro.bandcamp.com.
const BC = "https://salsafro.bandcamp.com/track/";
window.CM = {
  brand: "Cartel Music",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  eco: { prey: "https://prey-hunter.vercel.app", salsafro: "https://salsafro.vercel.app", diego: "https://diego-gasca.vercel.app" },

  stats: [["+29 M", "streams del sello"], ["Oct 2022", "en operación"], ["2", "distribuidoras: ONErpm · DistroKid"], ["LATAM → EU", "mercados"]],

  catalog: [
    ["Vacaciones Con Pablo", "Prey Hunter", 3051785],
    ["Antava", "Prey Hunter", 2260645],
    ["Karely", "Prey Hunter", 2184415],
    ["Lele", "Prey Hunter", 1235791],
    ["Hey Mambo", "Prey Hunter feat. Cartel Music", 717627],
    ["Hey Mambo (Afro House Remix)", "Prey Hunter feat. Cartel Music", 515812],
  ],

  store: [
    { id: "hey-mambo-prey-hunter-feat-cartel-music-afro-house-remix", t: "Hey Mambo (Afro House Remix)", a: "Prey Hunter feat. Cartel Music", p: 5, y: 2024 },
    { id: "ah-che-che-prey-hunter-x-exilio-x-cartel-music", t: "Ah Che Che", a: "Prey Hunter x Exilio x Cartel Music", p: 5, y: 2024 },
    { id: "cual-es-esa-afro-house-remix", t: "Cual Es Esa (Afro House Remix)", a: "Prey Hunter x Feid x Pirlo x Cartel Music", p: 5, y: 2024 },
    { id: "lele-remix", t: "Lele (Remix)", a: "Felipe Vasquez, Prey Hunter, Disoft, Cartel Music", p: 5, y: 2023 },
    { id: "vacaciones-con-pablo", t: "Vacaciones Con Pablo", a: "Prey Hunter", p: 5, y: 2025 },
    { id: "salio-el-calabria-x-disoft-x-prey-hunter", t: "Salió el Calabria", a: "Disoft x Prey Hunter", p: 5, y: 2024 },
  ].map((s) => ({ ...s, url: BC + s.id, img: `img/bc/${s.id}.jpg` })),

  collaborators: ["Disoft", "Felipe Vasquez Dj", "Esquelefascina", "Cristian Salazar", "Gianluca Ospino", "Cresspo"],

  booking: [
    { id: "cm-showcase", t: "Showcase Cartel Music", d: "Noche del sello de 3 a 5 horas con 2 a 4 DJs en la misma cabina." },
    { id: "cm-prey", t: "Prey Hunter · DJ set", d: "El fundador del sello en formato 60, 90 o 120 minutos." },
  ],

  delivery: [
    ["Máster", "WAV 24 bit / 44,1 o 48 kHz · pico real bajo −1 dBTP · sin clips"],
    ["Stems", "Drums, bajo, música, voces y efectos en WAV"],
    ["Portada", "3000 × 3000 px · JPG en RGB · sin logos de plataformas"],
    ["Metadatos", "Título, versión, artistas, compositores con nombre legal, productores, género, idioma"],
    ["Códigos", "ISRC por grabación (lo asigna el sello si no existe) y UPC del lanzamiento"],
    ["Plazo", "Todo listo 4 semanas antes para pitching en plataformas"],
    ["Split sheet", "Firmado por todos los autores antes de subir la canción"],
  ],
};
