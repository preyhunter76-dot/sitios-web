// Asistente de Dany Events: responde preguntas frecuentes en el navegador (sin servidor ni datos guardados)
// y pasa a WhatsApp cuando hace falta una respuesta de Dany. Solo dice lo que está confirmado en el sitio.
(() => {
  const $ = (id) => document.getElementById(id);
  const panel = $("bot"), toggle = $("botToggle"), log = $("botLog"), chips = $("botChips"), form = $("botForm"), input = $("botInput");
  const wa = (t) => window.waLink ? window.waLink(t) : "https://wa.me/56936205747";
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const WA_LINE = (t) => `<a href="${wa(t)}" target="_blank" rel="noopener">Escribir a Dany por WhatsApp</a>`;

  const KB = [
    { id: "servicios", chip: "¿Qué servicios ofreces?", keys: ["servicio", "que haces", "ofreces", "a que te dedicas", "trabajo", "hacen"],
      a: "Dany Events ofrece:\n• Booking de artistas (DJs y artistas para clubes, fiestas privadas y festivales)\n• Manejo de artistas\n• Gestión y producción de eventos\n• Promoción y embajada de eventos\n• Alianzas y colaboraciones entre marcas, venues y artistas." },
    { id: "precio", chip: "¿Cuánto cuesta?", keys: ["precio", "cuanto", "costo", "vale", "tarifa", "cobras", "presupuesto", "cotiza"],
      a: () => `Cada servicio se cotiza según la fecha, el lugar, el artista y el alcance del evento. Cuéntale a Dany los detalles y te envía una propuesta:\n${WA_LINE("Hola Dany, quiero una cotización para un evento.")}` },
    { id: "booking", chip: "Quiero contratar un DJ", keys: ["dj", "contratar", "booking", "artista", "line up", "lineup", "traer"],
      a: () => `Para el booking de un DJ o artista Dany necesita: fecha, ciudad y venue, tipo de evento, público esperado y el artista o estilo que buscas. Con eso revisa disponibilidad y condiciones.\n${WA_LINE("Hola Dany, quiero contratar un DJ/artista. Fecha: … Lugar: … Tipo de evento: …")}` },
    { id: "evento", chip: "Organizar mi evento", keys: ["organizar", "produccion", "fiesta", "evento", "cumple", "matrimonio", "privad", "club"],
      a: () => `Dany se encarga del line-up, la logística del día, la coordinación con el venue y la atención del artista. El proceso es: brief → propuesta → acuerdo por escrito → la noche.\n${WA_LINE("Hola Dany, quiero organizar un evento.")}` },
    { id: "promo", chip: "Promoción / marcas", keys: ["promocion", "promotora", "embajadora", "marca", "difusion", "publicidad", "colab", "alianza", "patrocin"],
      a: () => `Como promotora y embajadora, Dany difunde eventos en redes, convoca público y da presencia a marcas. También arma alianzas entre marcas, venues y artistas.\n${WA_LINE("Hola Dany, quiero proponerte una colaboración.")}` },
    { id: "manager", chip: "Soy artista, ¿me representas?", keys: ["represent", "manager", "manejo", "soy dj", "soy artista", "mi carrera"],
      a: () => `Dany hace manejo de artistas: fechas, presentaciones, imagen y relación con promotores. Envíale tu propuesta con links de tu música y redes:\n${WA_LINE("Hola Dany, soy artista y me interesa tu manejo. Mis links: …")}` },
    { id: "donde", chip: "¿Dónde trabajas?", keys: ["donde", "ciudad", "chile", "santiago", "pais", "viaja", "zona"],
      a: () => `Dany trabaja en la escena electrónica de Chile (por ejemplo, en Exótico Chile). Si tu evento es en otra ciudad o país, consúltale la disponibilidad:\n${WA_LINE("Hola Dany, mi evento es en … ¿tienes disponibilidad?")}` },
    { id: "contacto", chip: "Contacto", keys: ["contacto", "whatsapp", "numero", "telefono", "llamar", "instagram", "correo", "hablar"],
      a: () => `WhatsApp directo: +56 9 3620 5747\nInstagram: @dany.eventss\n${WA_LINE("Hola Dany, vi tu página y quiero hablar contigo.")}` },
    { id: "tiempo", chip: "¿Con cuánta anticipación?", keys: ["anticip", "cuando", "tiempo", "urgente", "esta semana", "disponib", "fecha"],
      a: () => `Mientras antes escribas, más artistas y fechas hay disponibles. Para algo urgente, escríbele directo y te dice si alcanza:\n${WA_LINE("Hola Dany, tengo un evento para la fecha … ¿estás disponible?")}` },
    { id: "comunidad", chip: "Quiero unirme a la comunidad", keys: ["comunidad", "unirme", "grupo", "novedades", "enterarme", "avisos", "lista de difusion"],
      a: () => `¡Bienvenid@! 💜 Escríbele «COMUNIDAD» a Dany por WhatsApp o por mensaje directo en Instagram y te avisa primero de las fechas, line-ups y novedades de los eventos. Sales cuando quieras escribiendo «BAJA».\n${WA_LINE("Hola Dany! Quiero unirme a la Comunidad Dany Events 💜 COMUNIDAD")}` },
    { id: "pago", chip: "¿Cómo se paga?", keys: ["pago", "pagar", "anticipo", "abono", "transferencia", "factura", "contrato"],
      a: () => `Las condiciones de pago y el contrato se acuerdan por escrito con Dany antes del evento, junto con el artista y el venue. Pregúntale los detalles:\n${WA_LINE("Hola Dany, ¿cómo son las condiciones de pago y contrato?")}` },
  ];
  const GREET = ["hola", "buenas", "hey", "saludos", "buen dia", "buenas tardes", "buenas noches"];
  const THANKS = ["gracias", "genial", "perfecto", "ok", "vale", "listo"];

  const add = (html, who) => {
    const div = document.createElement("div");
    div.className = `msg msg--${who}`;
    if (who === "bot") div.innerHTML = html; else div.textContent = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  };
  const answer = (q) => {
    const n = norm(q);
    let best = null, score = 0;
    for (const item of KB) {
      const s = item.keys.reduce((acc, k) => acc + (n.includes(k) ? k.length : 0), 0);
      if (s > score) { score = s; best = item; }
    }
    if (best) return typeof best.a === "function" ? best.a() : best.a;
    if (GREET.some((g) => n.startsWith(g))) return "¡Hola! Soy el asistente de Dany Events. Pregúntame por servicios, booking de DJs, precios, eventos o contacto.";
    if (THANKS.some((g) => n.includes(g))) return `¡Con gusto! Si quieres avanzar, Dany te responde personalmente:\n${WA_LINE("Hola Dany, vengo de tu página.")}`;
    return `No tengo esa respuesta, pero Dany sí. Te dejo tu pregunta lista para enviarla:\n${WA_LINE("Hola Dany, tengo una pregunta: " + q)}`;
  };
  const ask = (q) => {
    if (!q.trim()) return;
    add(q, "me");
    setTimeout(() => add(answer(q), "bot"), 280);
  };

  KB.filter((item) => item.id !== "pago" && item.id !== "tiempo").forEach((item) => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = item.chip;
    b.addEventListener("click", () => ask(item.chip));
    chips.appendChild(b);
  });

  let started = false;
  const open = (state) => {
    panel.hidden = !state;
    toggle.setAttribute("aria-expanded", String(state));
    if (state && !started) { started = true; add("¡Hola! 👋 Soy el asistente de Dany Events. Te ayudo con servicios, booking de DJs, precios y contacto. ¿Qué necesitas?", "bot"); }
    if (state) input.focus();
  };
  toggle.addEventListener("click", () => open(panel.hidden));
  $("botClose").addEventListener("click", () => { open(false); toggle.focus(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) open(false); });
  form.addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); input.value = ""; });
})();
