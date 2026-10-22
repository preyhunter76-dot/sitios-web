// Publicación en Vercel: copia la página a dist/ y descarga, recorta y comprime las fotos listadas en images.json.
import sharp from "sharp";
import fs from "node:fs/promises";
const imgs = JSON.parse(await fs.readFile("images.json", "utf8"));
await fs.rm("dist", { recursive: true, force: true });
await fs.mkdir("dist/img/libros", { recursive: true });
for (const f of ["index.html", "style.css", "app.js", "data.js"]) await fs.copyFile(f, "dist/" + f);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await Promise.all(imgs.map(async ({ out, url, crop, w = 1800 }) => {
  for (let i = 0; i < 5; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) throw new Error("HTTP " + r.status);
      let s = sharp(Buffer.from(await r.arrayBuffer()));
      if (crop) {
        const m = await s.metadata();
        s = s.extract({ left: Math.round(crop[0] * m.width), top: Math.round(crop[1] * m.height), width: Math.round(crop[2] * m.width), height: Math.round(crop[3] * m.height) });
      }
      await s.resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile("dist/" + out);
      console.log("ok", out);
      return;
    } catch (e) { console.log("reintento", out, e.message); await wait(1500 * (i + 1)); }
  }
  throw new Error("No se pudo descargar " + url);
}));
