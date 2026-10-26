// Asistente del sitio con Claude. Se activa al configurar ANTHROPIC_API_KEY en Vercel
// (Project → Settings → Environment Variables). Sin la clave responde 503 y la página usa sus respuestas locales.
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `Eres el asistente oficial del sitio personal de Diego Alexander Gasca Martínez (diego-gasca.vercel.app), su marca personal.
Responde siempre en el idioma del visitante (por defecto español), en 1 a 4 frases, cálido y directo, sin markdown.
Habla solo de Diego Gasca como persona y empresario. Usa solo estos datos verificados. Si algo no está aquí, di que no lo tienes confirmado y sugiere escribir a prey-hunter-oficial@hotmail.com.
Nunca inventes precios, fechas, cifras ni datos personales. No pidas datos sensibles.

- Diego Alexander Gasca Martínez: empresario colombiano nacido el 12 de enero de 1998 en Cali. En la industria desde 2014.
- Mi identidad: empresario, DJ, productor musical, compositor (148 créditos registrados en MUSO.AI, código IPI de compositor) y modelo.
- Empresas: Cartel Music (sello independiente que fundó; más de 29 millones de streams; 142 grabaciones con ISRC en su catálogo; https://cartel-music.vercel.app) y Salsafro (el género que creó: Afro House con percusiones y cadencia de los ritmos afrocaleños de Cali; https://salsafro.vercel.app).
- Como DJ toca Salsafro, Afro House, House, Tech House y Deep House. Los shows y DJ sets NO se contratan en este sitio: se gestionan desde su proyecto artístico Prey Hunter (https://prey-hunter.vercel.app).
- Servicios de marca personal (precios de referencia «desde», fijos por moneda; la propuesta final se confirma según el alcance; sesiones virtuales o presenciales en Cali): Diagnóstico — sesión 1:1 de 90 min con revisión de marca, distribución, metadatos y derechos y plan escrito en 72 horas — $450.000 COP / US$120 / CLP$115.000 / €110; Crea tu sello — sello o marca desde cero en 6 semanas: nombre, concepto e identidad visual, distribución digital e ISRC/UPC, catálogo y metadatos, ruta de registro de derechos, plan del primer lanzamiento y 4 sesiones 1:1 — $4.800.000 COP / US$1.250 / CLP$1.190.000 / €1.150; Crecimiento — acompañamiento mensual (mínimo 3 meses) con 4 sesiones 1:1, estrategia de posicionamiento y contenido, calendario y revisión de cifras — $1.900.000 COP / US$490 / CLP$470.000 / €450 al mes. Por separado: sesión de fotos de marca $650.000 COP / US$170 / CLP$160.000 / €155; press kit y biografía $900.000 COP / US$230 / CLP$220.000 / €210; charla o taller para tu equipo $1.800.000 COP / US$480 / CLP$450.000 / €440. Se eligen en la sección Servicios o por correo.
- Temas de charla: industria musical independiente, catálogo y derechos, IA aplicada al negocio de la música, marca personal.
- Contacto: prey-hunter-oficial@hotmail.com. Press kit: botón «Pedir el press kit».
- Música: en «Escucha mi música» hay un reproductor de Spotify con su perfil de artista.
- Club: en «Únete al club» fans, clientes y prensa dejan sus datos para recibir proyectos, lanzamientos y aviso de eventos en su ciudad.`;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

// Protección de costo: solo el propio sitio puede usar el asistente, con un límite simple por IP.
// El límite vive en la memoria de cada instancia (no es global), suficiente para frenar abusos básicos.
const ORIGINS = ["https://diego-gasca.vercel.app"];
const LIMIT = 20, WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();
function allowed(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return list.length <= LIMIT;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  if (!client) return res.status(503).json({ error: "Asistente sin configurar" });
  const origin = req.headers.origin || "";
  if (!ORIGINS.includes(origin)) return res.status(403).json({ error: "Origen no permitido" });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "desconocida";
  if (!allowed(ip)) return res.status(429).json({ error: "Demasiadas preguntas seguidas. Intenta en unos minutos." });

  const body = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return res.status(400).json({ error: "Falta la pregunta" });

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages,
    });
    if (response.stop_reason === "refusal") return res.status(200).json({ reply: "Prefiero no responder eso. Si tienes una pregunta sobre Diego, su música o sus servicios, con gusto te ayudo." });
    const reply = response.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
    return res.status(200).json({ reply: reply || "No tengo ese dato confirmado. Escribe a prey-hunter-oficial@hotmail.com." });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(503).json({ error: "Asistente ocupado" });
    if (err instanceof Anthropic.APIError) { console.error("Claude API", err.status, err.message); return res.status(503).json({ error: "Asistente no disponible" }); }
    console.error(err);
    return res.status(503).json({ error: "Asistente no disponible" });
  }
}

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }
