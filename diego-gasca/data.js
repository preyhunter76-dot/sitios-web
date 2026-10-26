// Diego Alexander Gasca Martínez · marca personal. Datos verificados del Cerebro Central (módulos 02 y 12) y textos de Diego.
// Las tarifas no se publican: cada servicio se cotiza.
window.DG = {
  brand: "Diego Gasca",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  club: "https://fpxyixfjqcsbxysiluhy.supabase.co/functions/v1/club", // función de Supabase que guarda el club
  eco: { prey: "https://prey-hunter.vercel.app", cartel: "https://cartel-music.vercel.app", salsafro: "https://salsafro.vercel.app" },

  // [valor, sufijo, texto, decimales, prefijo, sin separador de miles]
  stats: [
    [2014, "", "en la industria desde", 0, "", true],
    [2, "", "empresas propias: Cartel Music y Salsafro", 0, ""],
    [29, " M", "streams de su sello Cartel Music", 0, "+"],
    [142, "", "grabaciones con ISRC en el catálogo del sello", 0, ""],
  ],

  // Facetas de Diego (en el orden que él eligió): [nombre, ícono, texto, foto].
  facets: [
    ["Empresario", "brief", "Fundador del sello independiente Cartel Music y creador del género Salsafro. Dirige su operación con datos desde su propio sistema.", "img/portrait-diego.webp"],
    ["DJ", "head", "Sets de Salsafro, Afro House, House, Tech House y Deep House en clubes y festivales.", "img/facet-dj.webp"],
    ["Productor musical", "wave", "Más de una década creando música; el catálogo de su sello suma 142 grabaciones con ISRC.", "img/press-14.webp"],
    ["Fotógrafo", "cam", "Retrato y contenido para artistas y marcas, con la mirada de quien también está frente a la cámara.", "img/press-18.webp"],
    ["Modelo", "star", "Campañas de moda y de marca, con contrato de uso de imagen en cada sesión.", "img/press-07.webp"],
  ],

  // La persona, el artista, el sello y su propio género.
  brands: [
    { key: "persona", name: "Diego Gasca", role: "La persona · empresario", img: "img/portrait-diego.webp", logo: "img/logos/trebol.png", href: "#servicios", cta: "Ver servicios" },
    { key: "prey", name: "Prey Hunter", role: "Su proyecto artístico", img: "img/portrait-prey-hunter.webp", logo: "img/logos/prey-hunter.png", color: "#FF2D87", cta: "Sitio oficial" },
    { key: "cartel", name: "Cartel Music", role: "Su sello discográfico", img: "img/portrait-cartel-music.webp", logo: "img/logos/cartel-music.png", color: "#00FF7B", cta: "Sitio oficial" },
    { key: "salsafro", name: "Salsafro", role: "Su propio género", img: "img/portrait-salsafro.webp", logo: "img/logos/salsafro.png", color: "#FF6D29", cta: "Sitio oficial" },
  ],

  // Planes de servicio. Precios de referencia «desde» (investigación de mercado en Colombia, oct 2026):
  // fotografía de retrato y book en Colombia $380.000–$1.000.000 COP por sesión de 1 h (Overline, Julián Laverde, Ineventos);
  // DJ para eventos en Cali $800.000–$2.500.000 COP y bodas/eventos grandes $2.500.000–$5.000.000 COP (bartail.com.co, djdiegosanchez.com);
  // consultoría inicial US$50–150 por hora (Paperbell, Reinvention Academy). Diego confirma cada cotización.
  plans: [
    { id: "dg-plan-imagen", name: "Imagen", sub: "Fotografía o modelaje", cop: 650000, usd: 170, unit: "por sesión",
      items: ["Sesión de 1 hora en estudio o locación", "15 fotos editadas en alta resolución", "Formatos verticales para redes", "Preselección en 72 horas", "Contrato de uso de imagen en modelaje"] },
    { id: "dg-plan-mentoria", name: "Mentoría", sub: "Consultoría 1:1", cop: 450000, usd: 120, unit: "por sesión de 90 min",
      items: ["Diagnóstico de catálogo, distribución y derechos", "Estrategia de marca personal", "Plan de acción por escrito", "Paquete mensual de 4 sesiones: $1.600.000 COP · US$420"] },
    { id: "dg-plan-evento", name: "Evento", sub: "DJ set", cop: 3500000, usd: 950, unit: "por evento", featured: true,
      items: ["Set de 60, 90 o 120 minutos", "Salsafro, Afro House, House y Tech House", "Rider técnico y prueba de sonido", "Selección musical según tu público", "Coordinación previa con el organizador"] },
    { id: "dg-plan-marca", name: "Marca", sub: "Experiencia completa", cop: 7500000, usd: 2000, unit: "por proyecto",
      items: ["Charla o panel de hasta 45 minutos", "DJ set de 90 minutos", "Sesión de contenido con 20 fotos editadas", "Una sesión de consultoría de seguimiento", "Prioridad en la agenda"] },
  ],
  extras: [
    { id: "dg-charla", t: "Charla o conferencia", cop: 1800000, usd: 480 },
    { id: "dg-panel", t: "Panel o entrevista", cop: 900000, usd: 240 },
    { id: "dg-modelo", t: "Jornada de modelaje", cop: 800000, usd: 210 },
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
    ["Clientes", "Novedades de servicios, charlas y fechas disponibles para tu evento o marca."],
  ],
};
