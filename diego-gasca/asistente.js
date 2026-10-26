// Asistente de Diego Gasca: responde a los visitantes.
// 1) Intenta /api/chat (Claude, si ANTHROPIC_API_KEY está configurada en Vercel).
// 2) Si no hay servicio, responde con la base de conocimiento local (siempre disponible).
window.Asistente = (() => {
  const D = window.DG;
  const mail = D.email;
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ@ ]/g, " ");

  // Cada tema: palabras clave y respuesta. Solo datos verificados de Diego Gasca.
  const KB = [
    { k: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "saludos", "que tal"],
      a: "¡Hola! Soy el asistente de Diego Gasca. Te ayudo con quién es Diego, sus empresas, sus servicios, el club y cómo contactarlo. ¿Qué quieres saber?" },
    { k: ["quien es", "quien eres", "biografia", "bio", "historia", "edad", "nacio", "cumpleanos", "de donde"],
      a: "Diego Alexander Gasca Martínez es un empresario colombiano nacido el 12 de enero de 1998 en Cali. Es fundador del sello Cartel Music, creador del género Salsafro, DJ, productor musical, fotógrafo y modelo. Está en la industria desde 2014." },
    { k: ["empresario", "empresas", "negocios", "emprendedor", "marca personal"],
      a: "Como empresario, Diego fundó el sello independiente Cartel Music y creó el género Salsafro. Dirige su operación con datos desde su propio sistema." },
    { k: ["salsafro", "genero", "que es salsafro", "afro house", "estilo", "sonido"],
      a: `Salsafro es el género que creó Diego: fusiona el Afro House electrónico con las percusiones y la cadencia de los ritmos afrocaleños de Cali. Sitio oficial: ${D.eco.salsafro}` },
    { k: ["cartel", "sello", "disquera", "label", "demo", "demos", "firmar"],
      a: `Cartel Music es el sello independiente que fundó Diego: gestiona y distribuye producciones y colaboraciones, con más de 29 millones de streams. Para enviar música o demos visita ${D.eco.cartel}` },
    { k: ["dj", "set", "contratar", "booking", "show", "evento", "fiesta", "presentacion", "toque", "tocar", "festival", "discoteca"],
      a: `Diego hace DJ sets de Salsafro y Afro House de 60, 90 o 120 minutos con rider técnico. Agrega «DJ set» en la sección Servicios y envía la solicitud con fecha y ciudad, o escribe a ${mail}.` },
    { k: ["precio", "precios", "tarifa", "cuanto cuesta", "cuanto cobra", "costo", "valor", "cotizar", "cotizacion"],
      a: `Cada servicio se cotiza a la medida, según la fecha, la ciudad y el formato. Envía tu solicitud desde la sección Servicios o escribe a ${mail} y te responden con la propuesta.` },
    { k: ["servicio", "servicios", "que ofrece", "que hace"],
      a: "Diego ofrece charlas o conferencias, paneles y entrevistas, consultoría para artistas y sellos, sesiones como modelo, sesiones como fotógrafo y DJ sets. Todo se cotiza desde la sección Servicios." },
    { k: ["charla", "conferencia", "panel", "entrevista", "podcast", "speaker", "ponencia"],
      a: "Da charlas de 20 a 45 minutos y paneles o entrevistas de 45 a 60 minutos sobre industria musical independiente, catálogo y derechos, IA aplicada a la música y marca personal." },
    { k: ["consultoria", "asesoria", "mentoria", "distribucion", "catalogo", "derechos"],
      a: "La consultoría para artistas y sellos cubre catálogo, distribución, marca personal y operación con datos, desde su experiencia construyendo su propio ecosistema." },
    { k: ["productor", "produccion", "musica", "canciones", "temas"],
      a: "Diego es productor musical desde hace más de una década; el catálogo de su sello Cartel Music suma 142 grabaciones con ISRC." },
    { k: ["modelo", "modelaje", "campana", "marca de ropa", "foto", "fotografo", "fotografia", "sesion de fotos"],
      a: "Hace sesiones como modelo (con contrato de uso de imagen) y como fotógrafo (preselección en 72 horas). Puedes pedirlas en la sección Servicios." },
    { k: ["contacto", "correo", "email", "mail", "escribir", "whatsapp", "telefono", "numero", "llamar", "redes", "instagram"],
      a: `El canal oficial de contacto es el correo ${mail}. También puedes enviar una solicitud desde la sección Servicios.` },
    { k: ["fan", "fans", "club", "beneficio", "beneficios", "registrarme", "suscribir", "newsletter", "noticias"],
      a: "En la sección Únete al club dejas tus datos como fan, cliente o prensa y recibes primero sus proyectos, lanzamientos y el aviso de eventos en tu ciudad." },
    { k: ["prensa", "press kit", "presskit", "medio", "periodista", "bio oficial"],
      a: `El press kit trae biografía, cifras verificadas, retrato oficial y riders. Pídelo con el botón «Pedir el press kit» o a ${mail}.` },
    { k: ["donde", "ciudad", "cali", "colombia", "vive"],
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

  return { ask, local, chips: ["¿Quién es Diego?", "Sus empresas", "¿Qué es Salsafro?", "Servicios y precios", "Contratar un DJ set", "Club", "Contacto"] };
})();
