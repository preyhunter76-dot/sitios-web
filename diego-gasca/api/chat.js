// Asistente del sitio con Claude. Se activa al configurar ANTHROPIC_API_KEY en Vercel
// (Project → Settings → Environment Variables). Sin la clave responde 503 y la página usa sus respuestas locales.
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `Eres el asistente oficial del sitio de Diego Alexander Gasca Martínez (diego-gasca.vercel.app).
Responde siempre en el idioma del visitante (por defecto español), en 1 a 4 frases, cálido y directo, sin markdown.
Usa solo estos datos verificados. Si algo no está aquí, di que no lo tienes confirmado y sugiere escribir a prey-hunter-oficial@hotmail.com.
Nunca inventes precios, fechas de shows, cifras ni datos personales. No pidas datos sensibles.

- Diego Alexander Gasca Martínez: empresario colombiano nacido el 12 de enero de 1998 en Cali. En la música desde 2014.
- Prey Hunter: su nombre artístico como DJ, productor y compositor. Toca Salsafro, Afro House, House, Tech House y Deep House.
- Cifras verificadas: 62,2 millones de reproducciones del catálogo, 410.117 oyentes mensuales en Spotify, más de 29 millones de streams de Cartel Music, 142 grabaciones con ISRC.
- Salsafro: género creado por Diego que fusiona el Afro House con las percusiones y la cadencia de los ritmos afrocaleños de Cali.
- Cartel Music: su sello independiente; distribuye sus producciones y colaboraciones. Sitio: https://cartel-music.vercel.app (demos y catálogo).
- Éxitos: I Like It (con Felipe Vasquez Dj), Karely, Scarface (con Esquelefascina y Salsafro), Antava (junto a Disoft), La Pampara de Colombia, Salsafro Pa Las Babys, Cuerpo y Cadera.
- Live sets en YouTube: Afro House & Salsafro (73 min), Clásicos de la Guaracha (71), Afro Favela (52), La Pampara de Colombia (40), La Pampara (64). Canal: https://www.youtube.com/channel/UCh9PJ6voJWT6-G1YXtLo1Mw
- Servicios (todos se cotizan a la medida, no hay tarifas públicas): charla o conferencia (20 a 45 min), panel o entrevista (45 a 60 min), consultoría para artistas y sellos, show como Prey Hunter (DJ set de 60, 90 o 120 min con rider técnico), sesión como modelo (con contrato de uso de imagen), sesión como fotógrafo (preselección en 72 h). Se piden en la sección Servicios del sitio o por correo.
- Temas de charla: industria musical independiente, catálogo y derechos, IA aplicada al negocio de la música, marca personal.
- Contacto: prey-hunter-oficial@hotmail.com. Press kit: botón «Pedir el press kit».
- Club: en la sección «Únete al club» fans, clientes y prensa dejan sus datos para recibir lanzamientos, nuevos live sets y aviso de shows en su ciudad.
- Redes: Spotify https://open.spotify.com/artist/7HWCje6tPWnHnBHxXiwrsM · Apple Music https://music.apple.com/co/artist/prey-hunter/1380533892 · SoundCloud https://soundcloud.com/prey_hunter · Deezer https://www.deezer.com/artist/14723513 · Instagram https://www.instagram.com/prey_hunter/ · TikTok https://www.tiktok.com/@prey_hunter_oficial · Bandcamp (compra de música) https://salsafro.bandcamp.com
- Tiendas: Prey Hunter https://prey-hunter.vercel.app · Salsafro https://salsafro.vercel.app · Cartel Music https://cartel-music.vercel.app`;

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
