// Función «club» de Supabase: guarda los registros del club de diego-gasca.vercel.app.
// Usa la llave de servicio que Supabase inyecta en el entorno de la función (no hay claves en el sitio).
// v2 (preparada 26/10/2026, PENDIENTE DE DESPLIEGUE con autorización): exige Origin y limita por IP.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ORIGINS = ["https://diego-gasca.vercel.app", "http://localhost:5510"];
const TIPOS = ["Fan", "Cliente", "Prensa o aliado"];
// Límite simple por IP en la memoria de cada instancia (frena envíos masivos básicos).
const LIMIT = 5, WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function allowed(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now); hits.set(ip, list);
  return list.length <= LIMIT;
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
  if (!allowed(ip)) return new Response(JSON.stringify({ error: "Demasiados intentos. Intenta más tarde." }), { status: 429, headers: h });

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

  const url = Deno.env.get("SUPABASE_URL"), key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const r = await fetch(`${url}/rest/v1/club_diego_gasca?on_conflict=correo`, {
    method: "POST",
    headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal,resolution=merge-duplicates" },
    body: JSON.stringify(row),
  });
  if (!r.ok) { console.error("insert", r.status, await r.text()); return new Response(JSON.stringify({ error: "No se pudo guardar" }), { status: 503, headers: h }); }
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: h });
});
