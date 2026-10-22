// Salsafro · sitio oficial y tienda. Datos del Cerebro Central (módulo 04) y de salsafro.bandcamp.com.
const BC = "https://salsafro.bandcamp.com/track/";
window.SF = {
  brand: "Salsafro",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  bandcamp: "https://salsafro.bandcamp.com",
  eco: { prey: "https://prey-hunter.vercel.app", cartel: "https://cartel-music.vercel.app", diego: "https://diego-gasca.vercel.app" },

  roots: [
    { n: "01", t: "Afro House", d: "La base de club: bombo firme y bajos cálidos." },
    { n: "02", t: "Ritmos afrocolombianos", d: "Currulao, marimba y cantos del Pacífico como identidad." },
    { n: "03", t: "Salsa", d: "Metales, piano montuno y la clave de Cali dentro del beat." },
    { n: "04", t: "Percusión del Pacífico", d: "Cununos, bombos y guasás que empujan cada drop." },
  ],

  store: [
    { id: "afrovichis", t: "Afrovichis", a: "Prey Hunter", p: 9, y: 2026 },
    { id: "domingos-con-prey", t: "Domingos Con Prey", a: "Prey Hunter", p: 8, y: 2026 },
    { id: "boyfriend", t: "Boyfriend", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "la-fuga", t: "La Fuga", a: "Prey Hunter x Disoft", p: 5, y: 2026 },
    { id: "dichavate-extended", t: "Dichavate (Extended)", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "afrosereg", t: "Afrosereg", a: "Prey Hunter", p: 4, y: 2026 },
    { id: "tuf-tuf-pof-pof", t: "É Tuf Tuf Pof Pof", a: "Prey Hunter", p: 5, y: 2025 },
    { id: "embaladi-a-afro-house", t: "Embaladiña", a: "Prey Hunter", p: 4.99, y: 2025 },
    { id: "bailalo-rocky", t: "Bailalo Rocky", a: "Prey Hunter", p: 6, y: 2025 },
    { id: "vacaciones-con-pablo", t: "Vacaciones Con Pablo", a: "Prey Hunter", p: 5, y: 2025 },
    { id: "ah-che-che-prey-hunter-x-exilio-x-cartel-music", t: "Ah Che Che", a: "Prey Hunter x Exilio", p: 5, y: 2024 },
    { id: "cual-es-esa-afro-house-remix", t: "Cual Es Esa (Afro House Remix)", a: "Prey Hunter x Feid x Pirlo", p: 5, y: 2024 },
    { id: "cintura-disoft-x-felipe-vasquez-afro-edit", t: "Cintura (Afro Edit)", a: "Disoft x Felipe Vasquez", p: 5, y: 2024 },
    { id: "salio-el-calabria-x-disoft-x-prey-hunter", t: "Salió el Calabria", a: "Disoft x Prey Hunter", p: 5, y: 2024 },
    { id: "hey-mambo-prey-hunter-feat-cartel-music-afro-house-remix", t: "Hey Mambo (Afro House Remix)", a: "Prey Hunter feat. Cartel Music", p: 5, y: 2024 },
    { id: "lele-remix", t: "Lele (Remix)", a: "Felipe Vasquez, Prey Hunter, Disoft", p: 5, y: 2023 },
  ].map((s) => ({ ...s, url: BC + s.id, img: `img/bc/${s.id}.jpg` })),

  booking: [
    { id: "sf-60", t: "DJ set Salsafro · 60 min", d: "La fusión completa en formato club." },
    { id: "sf-90", t: "DJ set Salsafro · 90 min", d: "Más tiempo para el viaje del Pacífico al drop." },
    { id: "sf-perc", t: "Salsafro con percusión en vivo", d: "DJ set con percusionista: cununos y bombo en tarima." },
  ],

  releases: [
    ["Mamaxxxita", "Single", "3 oct 2026"], ["No la Bese", "Single", "1 oct 2026"], ["Las P", "Single", "30 sep 2026"], ["Miedo", "Single", "25 sep 2026"],
    ["Mañana", "Single", "25 sep 2026"], ["Afrochavate", "Single", "27 ago 2026"], ["Golden Boy", "Álbum · 17 temas", "19 jun 2026"], ["Serenno", "Álbum · 11 temas", "24 abr 2026"],
    ["Pájaro Amarillo", "Single", "31 ene 2026"], ["Origen de los Tambores", "EP · 5 temas", "18 dic 2025"], ["La Pampara de Colombia", "Álbum", "1 dic 2025"], ["Afrokume", "Track de álbum", "1 dic 2025"],
    ["Prende Ese Fili", "Track de álbum", "2025"], ["Saxxx", "Track de álbum", "15 nov 2025"], ["Recoja Compa", "Track de álbum", "2025"], ["El Juramento", "Single", "2025"], ["Una Noche", "Single", "2025"],
  ],
};
