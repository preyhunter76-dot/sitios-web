// Servidor local mínimo para ver los sitios: node servidor.mjs  →  http://localhost:5510
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5510;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

createServer(async (req, res) => {
  // Solo para revisión local: guarda una instantánea HTML en _revision/ (la usa la exportación a Figma)
  if (req.method === "POST" && req.url.startsWith("/__save/")) {
    const name = req.url.slice(8).replace(/[^a-z0-9-]/gi, "");
    let body = ""; req.on("data", (c) => (body += c));
    req.on("end", async () => { const { writeFile, mkdir } = await import("node:fs/promises"); await mkdir(join(ROOT, "_revision"), { recursive: true }); await writeFile(join(ROOT, "_revision", name + ".html"), body); res.end("ok"); });
    return;
  }
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
    if (p.includes("..")) throw 0;
    let f = join(ROOT, p);
    if ((await stat(f).catch(() => null))?.isDirectory()) f = join(f, "index.html");
    const body = await readFile(f);
    res.writeHead(200, { "Content-Type": TYPES[extname(f).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); res.end("No encontrado");
  }
}).listen(PORT, () => console.log(`Sitios en http://localhost:${PORT}`));
