// Función «club» de Supabase: guarda los registros del club de diego-gasca.vercel.app.
// Usa la llave de servicio que Supabase inyecta en el entorno de la función (no hay claves en el sitio).
// v3 (26/10/2026, autorizada por Diego): exige Origin y limita a 5 envíos cada 10 minutos por huella de IP.
// El límite se guarda en la tabla club_rate con un hash SHA-256 de la IP (nunca la IP) y se borra a las 24 h.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ORIGINS = ["https://diego-gasca.vercel.app", "http://localhost:5510"];
const TIPOS = ["Fan", "Cliente", "Prensa o aliado"];
const LIMIT = 5, WINDOW_MIN = 10;
const URL_ = Deno.env.get("SUPABASE_URL")!, KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
async function hashIp(ip: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("club-diego-gasca|" + ip));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
// Registra el intento y dice si sigue dentro del límite. Si la base no responde, no bloquea al visitante.
async function allowed(ip: string) {
  try {
    const h = await hashIp(ip);
    const since = new Date(Date.now() - WINDOW_MIN * 60000).toISOString();
    const old = new Date(Date.now() - 86400000).toISOString();
    await fetch(`${URL_}/rest/v1/club_rate?t=lt.${old}`, { method: "DELETE", headers: H });
    await fetch(`${URL_}/rest/v1/club_rate`, { method: "POST", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify({ h }) });
    const r = await fetch(`${URL_}/rest/v1/club_rate?select=id&h=eq.${h}&t=gte.${encodeURIComponent(since)}`, { headers: { ...H, Prefer: "count=exact", Range: "0-0" } });
    const total = Number((r.headers.get("content-range") || "*/0").split("/")[1]);
    return total <= LIMIT;
  } catch { return true; }
}

const cors = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ORIGINS.includes(origin) ? origin : ORIGINS[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
  "Vary": "Origin",
});

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const h = { ...cors(origin), "Content-Type": "application/json" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Método no permitido" }), { status: 405, headers: h });
  // Los navegadores siempre envían Origin en un POST entre dominios: sin él, no es el formulario del sitio.
  if (!origin || !ORIGINS.includes(origin)) return new Response(JSON.stringify({ error: "Origen no permitido" }), { status: 403, headers: h });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "desconocida";
  if (!(await allowed(ip))) return new Response(JSON.stringify({ error: "Demasiados intentos. Intenta más tarde." }), { status: 429, headers: h });

  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch { /* cuerpo vacío */ }
  const str = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
  if (str(b.sitio_web, 10)) return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h }); // trampa para bots

  const row = {
    tipo: TIPOS.includes(b.tipo as string) ? b.tipo : "Fan",
    nombre: str(b.nombre, 80),
    correo: str(b.correo, 120).toLowerCase(),
    whatsapp: str(b.whatsapp, 30),
    ciudad: str(b.ciudad, 60),
    pais: str(b.pais, 60),
    intereses: (Array.isArray(b.intereses) ? b.intereses : []).filter((x) => typeof x === "string").slice(0, 6).map((x) => (x as string).slice(0, 40)),
    acepto_datos: b.acepto === true,
    origen: origin ?? "desconocido",
  };
  if (row.nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(row.correo)) return new Response(JSON.stringify({ error: "Revisa tu nombre y tu correo." }), { status: 400, headers: h });
  if (!row.acepto_datos) return new Response(JSON.stringify({ error: "Necesitamos tu autorización de tratamiento de datos." }), { status: 400, headers: h });

  const r = await fetch(`${URL_}/rest/v1/club_diego_gasca?on_conflict=correo`, {
    method: "POST",
    headers: { ...H, Prefer: "return=minimal,resolution=merge-duplicates" },
    body: JSON.stringify(row),
  });
  if (!r.ok) { console.error("insert", r.status, await r.text()); return new Response(JSON.stringify({ error: "No se pudo guardar" }), { status: 503, headers: h }); }
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h });
});
