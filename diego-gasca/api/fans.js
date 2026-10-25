// Registro del club de fans y clientes.
// Guarda en Supabase cuando están configuradas SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel
// (tabla «club_diego_gasca»; ver LEEME en el Cerebro). Sin ellas responde 503 y la página envía los datos por correo.
const TABLE = "club_diego_gasca";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const b = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
  const str = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
  const row = {
    tipo: ["Fan", "Cliente", "Prensa o aliado"].includes(b.tipo) ? b.tipo : "Fan",
    nombre: str(b.nombre, 80),
    correo: str(b.correo, 120).toLowerCase(),
    whatsapp: str(b.whatsapp, 30),
    ciudad: str(b.ciudad, 60),
    pais: str(b.pais, 60),
    intereses: (Array.isArray(b.intereses) ? b.intereses : []).filter((x) => typeof x === "string").slice(0, 6).map((x) => x.slice(0, 40)),
    acepto_datos: b.acepto === true,
    origen: "diego-gasca.vercel.app",
  };
  if (row.nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(row.correo)) return res.status(400).json({ error: "Revisa tu nombre y tu correo." });
  if (!row.acepto_datos) return res.status(400).json({ error: "Necesitamos tu autorización de tratamiento de datos." });

  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: "Registro sin configurar" });

  try {
    const r = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${TABLE}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal,resolution=ignore-duplicates" },
      body: JSON.stringify(row),
    });
    if (r.ok || r.status === 409) return res.status(200).json({ ok: true });
    console.error("Supabase", r.status, await r.text());
    return res.status(503).json({ error: "No se pudo guardar" });
  } catch (err) {
    console.error(err);
    return res.status(503).json({ error: "No se pudo guardar" });
  }
}

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }
