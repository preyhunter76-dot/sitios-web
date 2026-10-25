// Asistente de Diego Gasca: responde a los visitantes.
// 1) Intenta /api/chat (Claude, si ANTHROPIC_API_KEY está configurada en Vercel).
// 2) Si no hay servicio, responde con la base de conocimiento local (siempre disponible).
window.Asistente = (() => {
  const D = window.DG;
  const mail = D.email;
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ@ ]/g, " ");
  const link = (name) => (D.links.find((l) => l.n === name) || {}).u;

  // Cada tema: palabras clave y respuesta. Solo datos verificados del Cerebro.
  const KB = [
    { k: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos", "que tal"],
      a: "¡Hola! Soy el asistente de Diego Gasca. Te ayudo con su música, live sets, shows, servicios, el club de fans y cómo contactarlo. ¿Qué quieres saber?" },
    { k: ["quien es", "quien eres", "biografia", "bio", "historia", "edad", "nacio", "cumpleanos", "de donde"],
      a: "Diego Alexander Gasca Martínez es un empresario colombiano nacido el 12 de enero de 1998 en Cali. Como Prey Hunter es DJ y productor desde 2014, creó el género Salsafro y fundó el sello Cartel Music." },
    { k: ["salsafro", "genero", "que es salsafro", "afro house", "estilo", "sonido"],
      a: "Salsafro es el género que creó Diego: fusiona el Afro House electrónico con las percusiones y la cadencia de los ritmos afrocaleños de Cali. Como Prey Hunter también toca Afro House, House, Tech House y Deep House." },
    { k: ["prey hunter", "artista", "dj", "productor"],
      a: "Prey Hunter es el nombre artístico de Diego: DJ, productor y compositor. Tiene 62,2 millones de reproducciones verificadas y 410.117 oyentes mensuales en Spotify." },
    { k: ["contratar", "booking", "show", "evento", "fiesta", "presentacion", "toque", "tocar", "festival", "discoteca", "club nocturno"],
      a: `Para contratar un show de Prey Hunter (DJ set de 60, 90 o 120 minutos, con rider técnico), agrega «Show como Prey Hunter» en la sección Servicios y envía la solicitud con fecha y ciudad, o escribe a ${mail}.` },
    { k: ["precio", "precios", "tarifa", "cuanto cuesta", "cuanto cobra", "costo", "valor", "cotizar", "cotizacion"],
      a: `Cada servicio se cotiza a la medida, según la fecha, la ciudad y el formato. Envía tu solicitud desde la sección Servicios o escribe a ${mail} y te responden con la propuesta.` },
    { k: ["servicio", "servicios", "que ofrece", "que hace"],
      a: "Diego ofrece: charlas o conferencias, paneles y entrevistas, consultoría para artistas y sellos, shows como Prey Hunter, sesiones como modelo y sesiones como fotógrafo. Todo se cotiza desde la sección Servicios." },
    { k: ["charla", "conferencia", "panel", "entrevista", "podcast", "speaker", "ponencia"],
      a: "Da charlas de 20 a 45 minutos y paneles o entrevistas de 45 a 60 minutos sobre industria musical independiente, catálogo y derechos, IA aplicada a la música y marca personal." },
    { k: ["consultoria", "asesoria", "mentoria", "distribucion", "catalogo", "derechos"],
      a: "La consultoría para artistas y sellos cubre catálogo, distribución, marca personal y operación con datos, desde su experiencia construyendo su propio ecosistema." },
    { k: ["modelo", "modelaje", "campana", "marca de ropa", "foto", "fotografo", "fotografia", "sesion de fotos"],
      a: "Hace sesiones como modelo (con contrato de uso de imagen) y como fotógrafo (preselección en 72 horas). Puedes pedirlas en la sección Servicios." },
    { k: ["cancion", "canciones", "musica", "exitos", "temas", "hits", "escuchar", "spotify", "album", "lanzamiento"],
      a: `Sus éxitos incluyen I Like It, Karely, Scarface, Antava, La Pampara de Colombia, Salsafro Pa Las Babys y Cuerpo y Cadera. Escúchalo en Spotify: ${link("Spotify")}` },
    { k: ["live", "set", "sets", "video", "videos", "youtube", "mix", "guaracha", "pampara"],
      a: `En la sección Live sets puedes ver sus sets completos: Afro House & Salsafro, Clásicos de la Guaracha, Afro Favela, La Pampara de Colombia y La Pampara. Canal oficial: ${D.youtube}` },
    { k: ["redes", "instagram", "tiktok", "seguir", "soundcloud", "deezer", "apple", "plataformas"],
      a: `Instagram: ${link("Instagram")}\nTikTok: ${link("TikTok")}\nSpotify: ${link("Spotify")}\nYouTube: ${D.youtube}\nTodas sus plataformas están en la sección Escúchalo y síguelo.` },
    { k: ["comprar", "descargar", "bandcamp", "tienda", "merch", "ropa"],
      a: `Su música exclusiva se compra en Bandcamp: ${link("Bandcamp")}. Cada marca (Prey Hunter, Cartel Music y Salsafro) tiene su tienda oficial en la sección del ecosistema.` },
    { k: ["cartel", "sello", "disquera", "label", "demo", "demos", "firmar"],
      a: `Cartel Music es el sello independiente que fundó Diego: distribuye sus producciones y colaboraciones. Para enviar música o demos visita ${D.eco.cartel}` },
    { k: ["contacto", "correo", "email", "mail", "escribir", "whatsapp", "telefono", "numero", "llamar"],
      a: `El canal oficial de contacto es el correo ${mail}. También puedes enviar una solicitud desde la sección Servicios.` },
    { k: ["fan", "fans", "club", "beneficio", "beneficios", "registrarme", "suscribir", "newsletter", "noticias"],
      a: "En la sección Únete al club dejas tus datos como fan, cliente o prensa y recibes primero los lanzamientos, los nuevos live sets y el aviso de shows en tu ciudad." },
    { k: ["prensa", "press kit", "presskit", "medio", "periodista", "bio oficial"],
      a: `El press kit trae biografía, cifras verificadas, retrato oficial y riders. Pídelo con el botón «Pedir el press kit» o a ${mail}.` },
    { k: ["donde", "ciudad", "cali", "colombia", "chile", "vive"],
      a: "Diego es de Cali, Colombia, y se ha presentado en festivales y clubes de varios países." },
    { k: ["gracias", "chao", "adios", "listo", "perfecto", "genial"],
      a: "¡Con gusto! Si necesitas algo más, aquí estoy." },
  ];

  function local(q) {
    const n = " " + norm(q) + " ";
    let best = null, score = 0;
    for (const item of KB) {
      let s = 0;
      for (const k of item.k) if (n.includes(" " + k + " ") || (k.length > 4 && n.includes(k))) s += k.split(" ").length + 1;
      if (s > score) { score = s; best = item; }
    }
    return best ? best.a : `No tengo ese dato confirmado. Escribe a ${mail} y el equipo de Diego te responde.`;
  }

  let remote = null; // null = sin probar, true = disponible, false = no disponible
  async function ask(history) {
    const q = history[history.length - 1].content;
    if (remote !== false) {
      try {
        const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 20000);
        const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-10) }), signal: ctrl.signal });
        clearTimeout(t);
        if (r.ok) { const j = await r.json(); if (j.reply) { remote = true; return j.reply; } }
        if (r.status === 404 || r.status === 503) remote = false;
      } catch { /* sin conexión: respuesta local */ }
    }
    return local(q);
  }

  return { ask, local, chips: ["¿Quién es Diego?", "¿Qué es Salsafro?", "Contratar un show", "Servicios y precios", "Live sets", "Redes sociales", "Club de fans"] };
})();
