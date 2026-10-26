// Asistente del sitio con Claude. Se activa al configurar ANTHROPIC_API_KEY en Vercel
// (Project → Settings → Environment Variables). Sin la clave responde 503 y la página usa sus respuestas locales.
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `Eres el asistente oficial del sitio personal de Diego Alexander Gasca Martínez (diego-gasca.vercel.app), su marca personal.
Responde siempre en el idioma del visitante (por defecto español), en 1 a 4 frases, cálido y directo, sin markdown.
Habla solo de Diego Gasca como persona y empresario. Usa solo estos datos verificados. Si algo no está aquí, di que no lo tienes confirmado y sugiere escribir a prey-hunter-oficial@hotmail.com.
Nunca inventes precios, fechas, cifras ni datos personales. No pidas datos sensibles.

- Diego Alexander Gasca Martínez: empresario colombiano nacido el 12 de enero de 1998 en Cali. En la industria desde 2014.
- Facetas: empresario, DJ, productor musical, fotógrafo y modelo.
- Empresas: Cartel Music (sello independiente que fundó; más de 29 millones de streams; 142 grabaciones con ISRC en su catálogo; https://cartel-music.vercel.app) y Salsafro (el género que creó: Afro House con percusiones y cadencia de los ritmos afrocaleños de Cali; https://salsafro.vercel.app).
- Como DJ toca Salsafro, Afro House, House, Tech House y Deep House en clubes y festivales.
- Planes (precios de referencia «desde», se confirman según fecha, ciudad y alcance; viajes, viáticos y producción técnica aparte): Imagen — fotografía o modelaje, sesión de 1 h con 15 fotos editadas — $650.000 COP / US$170; Mentoría — consultoría 1:1 de 90 min — $450.000 COP / US$120 (4 sesiones al mes: $1.600.000 COP / US$420); Evento — DJ set de 60, 90 o 120 min con rider técnico — $3.500.000 COP / US$950; Marca — charla o panel, DJ set de 90 min, 20 fotos editadas y una consultoría — $7.500.000 COP / US$2.000. Por separado: charla o conferencia $1.800.000 COP / US$480, panel o entrevista $900.000 COP / US$240, jornada de modelaje $800.000 COP / US$210. Se eligen en la sección Planes o por correo.
- Temas de charla: industria musical independiente, catálogo y derechos, IA aplicada al negocio de la música, marca personal.
- Contacto: prey-hunter-oficial@hotmail.com. Press kit: botón «Pedir el press kit».
- Club: en «Únete al club» fans, clientes y prensa dejan sus datos para recibir proyectos, lanzamientos y aviso de eventos en su ciudad.`;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  if (!client) return res.status(503).json({ error: "Asistente sin configurar" });

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
