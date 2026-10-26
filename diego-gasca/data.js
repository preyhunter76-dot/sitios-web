// Diego Alexander Gasca Martínez · marca personal. Datos verificados del Cerebro Central (módulos 02 y 12) y textos de Diego.
// Servicios de marca con precios de referencia «desde» en COP, USD, CLP y EUR.
window.DG = {
  brand: "Diego Gasca",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  club: "https://fpxyixfjqcsbxysiluhy.supabase.co/functions/v1/club", // función de Supabase que guarda el club
  spotify: "7HWCje6tPWnHnBHxXiwrsM", // perfil oficial de artista (Cerebro, módulo de medios)
  eco: { prey: "https://prey-hunter.vercel.app", cartel: "https://cartel-music.vercel.app", salsafro: "https://salsafro.vercel.app" },

  // [valor, sufijo, texto, decimales, prefijo, sin separador de miles]
  stats: [
    [2014, "", "en la industria desde", 0, "", true],
    [2, "", "empresas propias: Cartel Music y Salsafro", 0, ""],
    [29, " M", "streams de su sello Cartel Music", 0, "+"],
    [142, "", "grabaciones con ISRC en el catálogo del sello", 0, ""],
  ],

  // Mi identidad (en el orden que él eligió): [nombre, ícono, texto, foto].
  facets: [
    ["Empresario", "brief", "Fundador del sello independiente Cartel Music y creador del género Salsafro. Dirige su operación con datos desde su propio sistema.", "img/portrait-diego.webp"],
    ["DJ", "head", "Sets de Salsafro, Afro House, House, Tech House y Deep House en clubes y festivales.", "img/facet-dj.webp"],
    ["Productor musical", "wave", "Más de una década creando música; el catálogo de su sello suma 142 grabaciones con ISRC.", "img/press-14.webp"],
    ["Compositor", "pen", "Composición y topline con 148 créditos registrados en MUSO.AI y código IPI de compositor activo.", "img/press-18.webp"],
    ["Modelo", "star", "Campañas de moda y de marca, con contrato de uso de imagen en cada sesión.", "img/press-07.webp"],
  ],

  // La persona, el artista, el sello y su propio género.
  brands: [
    { key: "persona", name: "Diego Gasca", role: "La persona · empresario", img: "img/eco-diego.webp", logo: "img/logos/trebol.png", href: "#servicios", cta: "Ver servicios" },
    { key: "prey", name: "Prey Hunter", role: "Su proyecto artístico", img: "img/eco-prey-hunter.webp", logo: "img/logos/prey-hunter.png", color: "#FF2D87", cta: "Sitio oficial" },
    { key: "cartel", name: "Cartel Music", role: "Su sello discográfico", img: "img/eco-cartel-music.webp", logo: "img/logos/cartel-music.png", color: "#00FF7B", cta: "Sitio oficial" },
    { key: "salsafro", name: "Salsafro", role: "Su propio género", img: "img/eco-salsafro.webp", logo: "img/logos/salsafro.png", color: "#FF6D29", cta: "Sitio oficial" },
  ],

  // Servicios de marca personal (26/10/2026). Precios de referencia «desde», fijados por moneda (no es una conversión en vivo).
  // Referencias: consultoría inicial US$50–150 por hora (Paperbell, Reinvention Academy); desarrollo de artista desde US$350
  // (theaandrdepartment.com); «sello en caja» con web y mentoría de 12 meses hasta £3.499 (Ditto, 2015). Diego confirma cada propuesta.
  plans: [
    { id: "dg-srv-diagnostico", name: "Diagnóstico", sub: "Sesión 1:1 de marca", unit: "sesión de 90 min",
      p: { cop: 450000, usd: 120, clp: 115000, eur: 110 },
      items: ["Revisión de tu marca en redes, plataformas y catálogo", "Análisis de distribución, metadatos y derechos", "Prioridades claras para los próximos 90 días", "Plan de acción por escrito en 72 horas", "Virtual o presencial en Cali"] },
    { id: "dg-srv-sello", name: "Crea tu sello", sub: "Sello o marca desde cero", unit: "proyecto de 6 semanas", featured: true,
      p: { cop: 4800000, usd: 1250, clp: 1190000, eur: 1150 },
      items: ["Nombre, concepto y dirección de identidad visual", "Distribución digital y códigos ISRC y UPC", "Catálogo y metadatos ordenados desde el inicio", "Ruta para registrar tus derechos de autor", "Plan de tu primer lanzamiento", "4 sesiones de acompañamiento 1:1"] },
    { id: "dg-srv-crecimiento", name: "Crecimiento", sub: "Acompañamiento mensual", unit: "por mes · mínimo 3 meses",
      p: { cop: 1900000, usd: 490, clp: 470000, eur: 450 },
      items: ["4 sesiones 1:1 al mes", "Estrategia de posicionamiento y contenido", "Calendario de lanzamientos o publicaciones", "Revisión mensual de cifras: streams, redes y ventas", "Para sellos, marcas profesionales y artistas"] },
  ],
  extras: [
    { id: "dg-fotos-marca", t: "Sesión de fotos de marca", p: { cop: 650000, usd: 170, clp: 160000, eur: 155 } },
    { id: "dg-press-kit", t: "Press kit y biografía", p: { cop: 900000, usd: 230, clp: 220000, eur: 210 } },
    { id: "dg-taller", t: "Charla o taller para tu equipo", p: { cop: 1800000, usd: 480, clp: 450000, eur: 440 } },
  ],

  // Logros de canciones (Cerebro: módulo 16 Logros y módulo 06 Catálogo). [cifra, unidad, canción, detalle]
  hits: [
    ["+17 M", "reproducciones en Spotify", "I Like It", "Felipe Vasquez Dj, Prey Hunter, Disoft · 2022"],
    ["+3 M", "reproducciones", "Vacaciones Con Pablo", "Prey Hunter · 2025"],
    ["+2,2 M", "reproducciones", "Antava", "Disoft feat. Prey Hunter · 2023"],
    ["+2,1 M", "reproducciones", "Karely", "Cartel Music · 2023"],
    ["+1,2 M", "reproducciones", "Lele", "Felipe Vasquez Dj feat. Disoft, Prey Hunter · 2023"],
  ],

  // Reseñas: comentarios reales del público en YouTube (texto original, sin emojis).
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

  // Beneficios del club (sin promesas que no existan todavía).
  perks: [
    ["Fans", "Primero en enterarte de los proyectos, lanzamientos y eventos de Diego, de Cartel Music y de Salsafro."],
    ["Eventos", "Aviso cuando haya fechas o presentaciones en tu ciudad."],
    ["Clientes", "Novedades de servicios, talleres y cupos disponibles para tu sello o tu marca."],
  ],
};
