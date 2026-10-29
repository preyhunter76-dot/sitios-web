// Sincronización automática de los sitios web (la corre el Cerebro cada 10 minutos al final de scripts/sincronizar.mjs).
// 1) Guarda cada cambio en git, sin subir nada que parezca una clave.
// 2) Sube a GitHub (github.com/preyhunter76-dot/sitios-web).
// 3) Publica en Vercel solo los sitios cuya carpeta cambió desde la última publicación.
// Uso manual: node sincronizar-sitios.mjs  (o --todos para publicar todos los sitios).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const GIT = ["C:\\Program Files\\Git\\cmd\\git.exe", "git"].find((g) => g === "git" || fs.existsSync(g));
const git = (...a) => execFileSync(GIT, a, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const stamp = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
const log = (m) => console.log(`[sitios ${stamp}] ${m}`);

// Sitios que se publican (carpeta = proyecto de Vercel)
const SITIOS = ["diego-gasca", "prey-hunter", "cartel-music", "salsafro", "coffee-blue",
  "salsafro-sample-pack", "salsafro-ghost-producer", "cartel-trading", "gta-vi-lab", "tiendas-diego-gasca"];
// Cambios en estas carpetas afectan a todos los sitios generados o compartidos
const COMUNES = { "_plantilla/": ["salsafro-sample-pack", "salsafro-ghost-producer", "cartel-trading", "gta-vi-lab", "tiendas-diego-gasca"] };

const SECRET = /(AIza[0-9A-Za-z_-]{30,}|sk-(ant-)?[A-Za-z0-9_-]{20,}|gsk_[A-Za-z0-9]{30,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|xox[abp]-[0-9A-Za-z-]{20,}|shpat_[a-f0-9]{20,}|[rs]k_live_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const FORBIDDEN = /(^|\/)(\.env(\..*)?|vault\.key|integrations\.json|brain-state\.json)$/;
const STATE = path.join(root, ".ultimo-despliegue.json");
const VERCEL = [path.join(root, ".herramientas/node_modules/vercel/dist/index.js"), "C:/Users/Prey Hunter/AppData/Local/Temp/claude/G--SALSAFRO/0f1a12a6-9831-4637-ba32-503f7af79f9c/scratchpad/vc/node_modules/vercel/dist/index.js"].find((p) => fs.existsSync(p));

try {
  // 1) Guardar
  git("add", "-A");
  const staged = git("diff", "--cached", "--name-only").split("\n").filter(Boolean);
  if (staged.length) {
    const bad = staged.filter((f) => FORBIDDEN.test(f) || (() => { try { return SECRET.test(git("show", `:${f}`)); } catch { return false; } })());
    if (bad.length) { git("reset", "-q"); console.error(`[sitios ${stamp}] DETENIDO: posible clave en ${bad.join(", ")}. No se guardó nada.`); process.exit(2); }
    git("commit", "-q", "-m", `Auto · sitios · ${stamp} · ${staged.length} archivo(s)`);
    log(`guardados ${staged.length} archivo(s)`);
  }
  // 2) Subir
  if (Number(git("rev-list", "--count", "@{u}..HEAD")) > 0) { git("push", "-q", "origin", "HEAD"); log("subido a GitHub"); }

  // 3) Publicar lo que cambió
  const head = git("rev-parse", "HEAD");
  const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, "utf8")) : {};
  const todos = process.argv.includes("--todos");
  const cambiados = SITIOS.filter((s) => {
    if (todos || !state[s]) return true;
    if (state[s] === head) return false;
    const files = git("diff", "--name-only", state[s], head).split("\n");
    return files.some((f) => f.startsWith(s + "/") || Object.entries(COMUNES).some(([dir, list]) => f.startsWith(dir) && list.includes(s)));
  }).filter((s) => fs.existsSync(path.join(root, s, "index.html")));
  if (!cambiados.length) { log("sin sitios por publicar"); process.exit(0); }
  if (!VERCEL) { log(`falta la herramienta de Vercel (.herramientas): no se publicó ${cambiados.join(", ")}`); process.exit(1); }
  for (const s of cambiados) {
    try {
      const out = execFileSync(process.execPath, [VERCEL, "deploy", path.join(root, s), "--prod", "--yes"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 300000 });
      state[s] = head; fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
      log(`publicado ${s} → ${(out.match(/https:\/\/[^\s"]+\.vercel\.app/g) || []).pop() || "ok"}`);
    } catch (e) { console.error(`[sitios ${stamp}] no se pudo publicar ${s}: ${(e.stderr || e.message || "").toString().slice(0, 300)}`); }
  }
} catch (err) {
  console.error(`[sitios ${stamp}] error: ${(err.stderr || err.message || "").toString().trim().slice(0, 400)}`);
  process.exit(1);
}
