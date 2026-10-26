// Diego Alexander Gasca Martínez · marca personal. Datos verificados del Cerebro Central (módulos 02 y 12) y textos de Diego.
// Las tarifas no se publican: cada servicio se cotiza.
window.DG = {
  brand: "Diego Gasca",
  email: "prey-hunter-oficial@hotmail.com",
  whatsapp: "",
  club: "https://fpxyixfjqcsbxysiluhy.supabase.co/functions/v1/club", // función de Supabase que guarda el club
  eco: { cartel: "https://cartel-music.vercel.app", salsafro: "https://salsafro.vercel.app" },

  // [valor, sufijo, texto, decimales, prefijo, sin separador de miles]
  stats: [
    [2014, "", "en la industria desde", 0, "", true],
    [2, "", "empresas propias: Cartel Music y Salsafro", 0, ""],
    [29, " M", "streams de su sello Cartel Music", 0, "+"],
    [142, "", "grabaciones con ISRC en el catálogo del sello", 0, ""],
  ],

  // Facetas de Diego (en el orden que él eligió).
  facets: [
    ["Empresario", "Fundador del sello independiente Cartel Music y creador del género Salsafro. Dirige su operación con datos desde su propio sistema.", "img/portrait-diego.webp"],
    ["DJ", "Sets de Salsafro, Afro House, House, Tech House y Deep House en clubes y festivales.", "img/facet-dj.webp"],
    ["Productor musical", "Más de una década creando música; el catálogo de su sello suma 142 grabaciones con ISRC.", "img/press-14.webp"],
    ["Fotógrafo", "Retrato y contenido para artistas y marcas, con la mirada de quien también está frente a la cámara.", "img/press-18.webp"],
    ["Modelo", "Campañas de moda y de marca, con contrato de uso de imagen en cada sesión.", "img/press-07.webp"],
  ],

  // La persona, el sello y su propio género.
  brands: [
    { key: "persona", name: "Diego Gasca", role: "La persona · empresario", img: "img/portrait-diego.webp", logo: "img/logos/trebol.png", href: "#servicios", cta: "Ver servicios" },
    { key: "cartel", name: "Cartel Music", role: "Su sello discográfico", img: "img/portrait-cartel-music.webp", logo: "img/logos/cartel-music.png", color: "#00FF7B", cta: "Sitio oficial" },
    { key: "salsafro", name: "Salsafro", role: "Su propio género", img: "img/portrait-salsafro.webp", logo: "img/logos/salsafro.png", color: "#FF6D29", cta: "Sitio oficial" },
  ],

  services: [
    { id: "dg-charla", t: "Charla o conferencia", d: "20 a 45 minutos sobre industria musical independiente, catálogo, derechos e IA aplicada a la música." },
    { id: "dg-panel", t: "Panel o entrevista", d: "45 a 60 minutos en paneles, podcasts y medios. Preguntas con 5 días de anticipación." },
    { id: "dg-consultoria", t: "Consultoría para artistas y sellos", d: "Catálogo, distribución, marca personal y operación con datos, desde la experiencia de construir un ecosistema propio." },
    { id: "dg-modelo", t: "Sesión como modelo", d: "Campañas de moda y marca. Contrato de uso de imagen firmado antes de la sesión." },
    { id: "dg-foto", t: "Sesión como fotógrafo", d: "Retrato y contenido. Galería de preselección en 72 horas, finales en alta y verticales." },
    { id: "dg-dj", t: "DJ set", d: "Set de Salsafro y Afro House de 60, 90 o 120 minutos con rider técnico." },
  ],

  topics: ["Industria musical independiente", "Catálogo y derechos", "IA aplicada al negocio de la música", "Marca personal"],

  // Beneficios del club (sin promesas que no existan todavía).
  perks: [
    ["Fans", "Primero en enterarte de los proyectos, lanzamientos y eventos de Diego, de Cartel Music y de Salsafro."],
    ["Eventos", "Aviso cuando haya fechas o presentaciones en tu ciudad."],
    ["Clientes", "Novedades de servicios, charlas y fechas disponibles para tu evento o marca."],
  ],
};
