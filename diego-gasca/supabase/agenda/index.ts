// Función «agenda» de Supabase: guarda las citas pedidas desde diego-gasca.vercel.app (26/10/2026, pedida por Diego).
// Misma protección que el club: exige Origin y limita 5 envíos cada 10 minutos por huella cifrada de IP (tabla club_rate).
// Correos (opcionales): si existen los secretos RESEND_API_KEY y CORREO_REMITENTE, avisa a Diego y confirma al cliente.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ORIGINS = ["https://diego-gasca.vercel.app", "http://localhost:5510"];
const SERVICIOS = ["Diagnóstico", "Crea tu sello", "Crecimiento", "Sesión de fotos de marca", "Press kit y biografía", "Charla o taller para tu equipo"];
const HORAS = ["10:00", "11:30", "15:00", "16:30"];
const LIMIT = 5, WINDOW_MIN = 10;
const URL_ = Deno.env.get("SUPABASE_URL")!, KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND = Deno.env.get("RESEND_API_KEY"), FROM = Deno.env.get("CORREO_REMITENTE"), DIEGO = Deno.env.get("CORREO_DIEGO") || "prey-hunter-oficial@hotmail.com";
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

async function hashIp(ip: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("club-diego-gasca|" + ip));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
async function allowed(ip: string) {
  try {
    const h = await hashIp(ip);
    const since = new Date(Date.now() - WINDOW_MIN * 60000).toISOString();
    await fetch(`${URL_}/rest/v1/club_rate`, { method: "POST", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify({ h }) });
    const r = await fetch(`${URL_}/rest/v1/club_rate?select=id&h=eq.${h}&t=gte.${encodeURIComponent(since)}`, { headers: { ...H, Prefer: "count=exact", Range: "0-0" } });
    return Number((r.headers.get("content-range") || "*/0").split("/")[1]) <= LIMIT;
  } catch { return true; }
}
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
async function correo(to: string, subject: string, html: string) {
  if (!RESEND || !FROM) return;
  try {
    await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${RESEND}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: FROM, to, subject, html }) });
  } catch { /* la cita ya quedó guardada */ }
}
const cors = (origin: string | null) => ({ "Access-Control-Allow-Origin": origin && ORIGINS.includes(origin) ? origin : ORIGINS[0], "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type", "Vary": "Origin" });

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const h = { ...cors(origin), "Content-Type": "application/json" };
  const out = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: h });
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
  if (req.method !== "POST") return out(405, { error: "Método no permitido" });
  if (!origin || !ORIGINS.includes(origin)) return out(403, { error: "Origen no permitido" });
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "desconocida";
  if (!(await allowed(ip))) return out(429, { error: "Demasiados intentos. Intenta más tarde." });

  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch { /* cuerpo vacío */ }
  const str = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
  if (str(b.sitio_web, 10)) return out(200, { ok: true }); // trampa para bots
  const en = b.idioma === "en";
  const row = {
    servicio: str(b.servicio, 60), fecha: str(b.fecha, 10), hora: str(b.hora, 5),
    modalidad: b.modalidad === "Presencial en Cali" ? "Presencial en Cali" : "Virtual",
    nombre: str(b.nombre, 80), correo: str(b.correo, 120).toLowerCase(), whatsapp: str(b.whatsapp, 30), mensaje: str(b.mensaje, 600),
    idioma: en ? "en" : "es", acepto_datos: b.acepto === true, origen: origin,
  };
  const f = new Date(row.fecha + "T12:00:00Z"), hoy = new Date(); hoy.setUTCHours(0, 0, 0, 0);
  const dia = f.getUTCDay(), max = new Date(hoy.getTime() + 120 * 86400000);
  if (!SERVICIOS.includes(row.servicio) || !HORAS.includes(row.hora) || isNaN(+f) || f <= hoy || f > max || dia === 0 || dia === 6)
    return out(400, { error: en ? "Choose a service, a weekday and an available time." : "Elige un servicio, un día hábil y una hora disponible." });
  if (row.nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(row.correo)) return out(400, { error: en ? "Check your name and email." : "Revisa tu nombre y tu correo." });
  if (!row.acepto_datos) return out(400, { error: en ? "We need your consent to process your data." : "Necesitamos tu autorización de tratamiento de datos." });
  // Un mismo horario no se reserva dos veces (salvo citas canceladas).
  const dup = await fetch(`${URL_}/rest/v1/agenda_diego_gasca?select=id&fecha=eq.${row.fecha}&hora=eq.${encodeURIComponent(row.hora)}&estado=neq.cancelada`, { headers: H });
  if (dup.ok && (await dup.json()).length) return out(409, { error: en ? "That time is already taken. Please choose another." : "Ese horario ya está reservado. Elige otro." });

  const r = await fetch(`${URL_}/rest/v1/agenda_diego_gasca`, { method: "POST", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify(row) });
  if (!r.ok) { console.error("insert", r.status, await r.text()); return out(503, { error: "No se pudo guardar" }); }

  const resumen = `${esc(row.servicio)} · ${esc(row.fecha)} · ${esc(row.hora)} (hora Colombia) · ${esc(row.modalidad)}`;
  const nombre = esc(row.nombre.split(" ")[0]);
  await correo(DIEGO, `Nueva cita: ${row.servicio} · ${row.fecha} ${row.hora}`,
    `<p><b>${esc(row.nombre)}</b> (${esc(row.correo)}${row.whatsapp ? " · " + esc(row.whatsapp) : ""}) pidió una cita.</p><p>${resumen}</p><p>${esc(row.mensaje)}</p>`);
  await correo(row.correo, en ? "We received your booking · Diego Gasca" : "Recibimos tu cita · Diego Gasca", en
    ? `<p>Hi ${nombre},</p><p>We received your request: ${resumen}.</p><p>Diego will confirm it by email within 24 business hours, together with the payment details.</p><p>Diego Gasca</p>`
    : `<p>Hola ${nombre},</p><p>Recibimos tu solicitud: ${resumen}.</p><p>Diego te la confirma por correo en menos de 24 horas hábiles, junto con los datos de pago.</p><p>Diego Gasca</p>`);
  return out(200, { ok: true });
});
