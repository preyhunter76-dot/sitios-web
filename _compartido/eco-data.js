// Datos comunes de Prey Hunter, Cartel Music y Salsafro (se copia igual en los tres sitios).
// Cifras del Cerebro Central (módulos 03, 05, 06, 12 y 16). No se publican precios: se cotizan por WhatsApp.
(() => {
  const D = window.PH;
  const add = (k, v) => { if (D[k] == null) D[k] = v; };

  add("club", "https://fpxyixfjqcsbxysiluhy.supabase.co/functions/v1/club");
  add("privacy", "https://diego-gasca.vercel.app/privacidad.html");

  // Casos reales con cifras verificadas
  add("cases", [
    { name: "Cartel Music", tag: "Sello propio", href: "https://cartel-music.vercel.app", color: "#00FF7B",
      lead: "Sello independiente fundado por Diego Gasca en octubre de 2022, sin disquera detrás.",
      kpis: [["+29 M", "streams del sello"], ["71", "lanzamientos"], ["142", "grabaciones con ISRC"]],
      items: ["Distribución propia por ONErpm y DistroKid", "Catálogo con metadatos y códigos ISRC completos", "Colaboradores acreditados de Cali hacia Europa"] },
    { name: "Prey Hunter", tag: "Marca artística", href: "https://prey-hunter.vercel.app", color: "#FF2D87",
      lead: "El proyecto artístico de Diego: una marca construida lanzamiento a lanzamiento desde 2014.",
      kpis: [["+410 mil", "oyentes mensuales en Spotify"], ["Top 2 %", "ranking global de artistas"], ["148", "créditos de compositor"]],
      items: ["35 lanzamientos verificados entre 2021 y 2026", "Perfiles en Apple Music, Deezer, Spotify, Bandcamp y SoundCloud", "Género propio: Salsafro"] },
    { name: "Salsafro", tag: "Género propio", href: "https://salsafro.vercel.app", color: "#FF6D29",
      lead: "El género creado en Cali: guaracha, afro house, salsa y sonidos del Pacífico colombiano.",
      kpis: [["17", "lanzamientos con crédito Salsafro"], ["154 mil", "reproducciones del set SALSAFRO 2.0"], ["2", "álbumes en 2026"]],
      items: ["Marca y tienda propia en Bandcamp", "Álbumes Serenno (11 temas) y Golden Boy (17 temas)", "Una identidad propia con cuatro raíces musicales"] },
  ]);

  // Trabajemos juntos: los servicios de Diego Gasca, sin precios
  add("work", [
    ["Diagnóstico", "Sesión 1:1 de marca", ["Revisión de tu marca en redes, plataformas y catálogo", "Análisis de distribución, metadatos y derechos", "Prioridades claras para los próximos 90 días", "Plan de acción por escrito"]],
    ["Crea tu sello", "Sello o marca desde cero", ["Nombre, concepto e identidad visual", "Distribución digital y códigos ISRC y UPC", "Catálogo y metadatos ordenados desde el inicio", "Plan de tu primer lanzamiento"]],
    ["Crecimiento", "Acompañamiento mensual", ["Sesiones 1:1 cada mes", "Estrategia de posicionamiento y contenido", "Calendario de lanzamientos", "Revisión mensual de streams, redes y ventas"]],
    ["Por separado", "Servicios puntuales", ["Sesión de fotos de marca", "Press kit y biografía", "Charla o taller para tu equipo", "Booking de shows y DJ sets"]],
  ]);

  // Beneficios del club (sin promesas que no existan todavía)
  add("perks", [
    ["Fans", "Primero en enterarte de los lanzamientos, sets y eventos de Prey Hunter, Cartel Music y Salsafro."],
    ["Eventos", "Aviso cuando haya fechas o presentaciones en tu ciudad."],
    ["Artistas y clientes", "Convocatorias de demos, cupos de servicios y talleres."],
  ]);

  // Asistencia declarada por el artista en sus shows destacados
  add("shows", [["Chile", "10.000"], ["Colombia", "8.000"]]);

  // Comentarios reales del público en YouTube (canal oficial de Prey Hunter, texto original)
  add("reviews", [
    { a: "@eliotmarileo-r5x", t: "Me tele transporte a otra dimensión con esta musica uuff placer amis oídos", v: "Afro House & Salsafro · Live Set 2026", id: "2kk2d5GUxXE", c: "UgxPN9Yh33P-6dGRr5d4AaABAg", d: "sep 2026" },
    { a: "@DJ5IMER", t: "El rey del tambor el q comanda el mero viaje, un agrado conocerlo y escuchar su buena música manito puro éxito y bendiciones para usted", v: "Scarface · Visualizer", id: "YUVgJx4vkDI", c: "UgyanT1hLowvpU9KP394AaABAg", d: "may 2026" },
    { a: "@SAMUEL_CALERO_DJ_PD", t: "Salsafro lo mejor que pudieron haber hecho en esta vida", v: "Capaz · ft Felix CR", id: "0mAJgAFQ6ts", c: "UgzsIIb8T_VV3H5YBJJ4AaABAg", d: "ago 2025" },
    { a: "@pdctmas", t: "El Mejor Sin Duda Alguna.", v: "Live Set", id: "zjkkn_6GbDI", c: "UgwM2jxb1k2PwK0qMNJ4AaABAg", d: "jul 2025" },
    { a: "@TashiandAngel", t: "I heard 10 seconds of this song on a youtube commercial and was on the search for this song! Love it! It reminds me of the 80's and 90's club music. Much love from USA", v: "Relaxxx", id: "uwXf-HbBuZc", c: "UgxtcbnpsbT704Sawvt4AaABAg", d: "ago 2025" },
    { a: "@joeespinoza09", t: "Me encanta correr con esta canción", v: "Scarface · Visualizer", id: "YUVgJx4vkDI", c: "UgyYw0F9E2_a4EGG32N4AaABAg", d: "oct 2026" },
    { a: "@el_pollocl6803", t: "Temazoooo espero escucharlo en vivo", v: "Dentro De Mi", id: "lhEn-nzkxMQ", c: "UgwKNwuJk-YGnQOgz314AaABAg", d: "abr 2026" },
  ]);

  // Fotos reales de artistas: solo las verificadas en el catálogo de Prey Hunter (Deezer).
  // Las demás tarjetas muestran el monograma hasta tener una foto aprobada por el artista.
  add("artistImg", { "Prey Hunter": "prey-hunter", "Disoft": "disoft", "Felix CR": "felix-cr" });
})();
