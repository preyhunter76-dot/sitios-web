// Crea un sitio por tienda de «Otros negocios» con la misma tienda del Cerebro (ShopSite).
// 1) npx vite build --config vite.tiendas.config.ts   (en la carpeta cerebro → sitios/_tiendas-app)
// 2) node _plantilla/crear-tiendas.mjs                  (copia el bundle a cada carpeta con su tienda)
// La publicación en Vercel y GitHub la hace sincronizar-sitios.mjs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP = path.join(R, "_tiendas-app"), CEREBRO = path.resolve(R, "../cerebro/public");

// [carpeta = proyecto de Vercel, vista del Cerebro, título, descripción]
export const TIENDAS = [
  ["la-pampara-shop", "shop-la-pampara", "La Pampara Shop · Gorras en Chile", "Gorras de La Pampara en Chile: 94 modelos, despacho Starken, Chilexpress y Blue Express."],
  ["volta-tienda", "shop-volta", "VOLTA · Tecnología que se nota", "Tecnología y electrónica: cámaras, teclados, audífonos y accesorios inteligentes."],
  ["lume-tienda", "shop-lume", "LUMÉ · Skincare y belleza", "Skincare y belleza de rutina: face roller, máscara LED y herramientas de belleza."],
  ["norte-tienda", "shop-norte", "NORTE · Moda urbana esencial", "Moda urbana esencial: jeans, blazers, hoodies y sneakers."],
  ["casa-ambar-tienda", "shop-ambar", "CASA ÁMBAR · Hogar cálido", "Hogar cálido y ordenado: lámparas, cuadros, alfombras y organización."],
  ["pulso-tienda", "shop-pulso", "PULSO · Entrena en cualquier lugar", "Fitness: anillo inteligente, shaker, mochila deportiva y equipos."],
  ["huella-tienda", "shop-huella", "HUELLA · Todo para tu mascota", "Juguetes, comederos inteligentes y accesorios para mascotas."],
  ["ruta-tienda", "shop-ruta", "RUTA · Accesorios para tu auto", "Dashcam, soportes, aspiradora y luces para tu auto."],
  ["sarten-co-tienda", "shop-sarten", "SARTÉN & CO. · Cocina práctica", "Cocina práctica y bonita: sartenes, blender, cubiertos y utensilios."],
  ["cerebro-apps", "shop-cerebro-apps", "Cerebro Apps · Software de IA", "Software de IA por suscripción: copywriter, chatbot, asistente de ventas y más."],
  ["cerebro-labs", "shop-cerebro-labs", "Cerebro Labs · IA para tu negocio", "Implementamos IA en tu negocio: automatización, agentes de atención y chatbots."],
  ["academia-cerebro", "shop-academia", "Academia Cerebro · Aprende lo que paga", "Cursos de IA aplicada, ecommerce y programación, y comunidad."],
  ["plantillas-pro-tienda", "shop-plantillas", "Plantillas Pro · Productos digitales", "Plantillas profesionales, planificador financiero, calendario de contenido y kits."],
  ["casa-gm-tienda", "shop-casa-gm", "Casa GM · Ecommerce de marca propia", "Ecommerce de marca propia: belleza, mascotas y bienestar."],
  ["visor-gafas", "shop-visor", "VISOR · Gafas de sol y monturas", "Gafas VISOR: 1111, Cali Noche, Pampara Gold, Aviador Salsa y más."],
];

const VERCEL = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  rewrites: [{ source: "/favicon.ico", destination: "/clover.webp" }],
  headers: [
    { source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self' http://localhost:5173 http://localhost:5180 http://localhost:5190 http://localhost:5195 https://cerebro-central-4hu3.vercel.app" },
    ] },
    { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  ],
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

if (!fs.existsSync(path.join(APP, "tiendas.html"))) { console.error("Falta el bundle: corre primero «npx vite build --config vite.tiendas.config.ts» en cerebro."); process.exit(1); }
const base = fs.readFileSync(path.join(APP, "tiendas.html"), "utf8");
for (const [folder, view, title, desc] of TIENDAS) {
  const dir = path.join(R, folder);
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f !== ".vercel") fs.rmSync(path.join(dir, f), { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  fs.cpSync(path.join(APP, "assets"), path.join(dir, "assets"), { recursive: true });
  fs.copyFileSync(path.join(R, "prey-hunter/img/clover.webp"), path.join(dir, "clover.webp"));
  if (view === "shop-la-pampara") fs.cpSync(path.join(CEREBRO, "stores/simon-rendon"), path.join(dir, "stores/simon-rendon"), { recursive: true });
  const url = `https://${folder}.vercel.app/`;
  const html = base
    .replace("<title>Tienda</title>", `<title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="#0b0b0b">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website"><meta property="og:locale" content="es_CO">
  <meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
  <link rel="icon" href="clover.webp">
  <script>window.SHOP_VIEW = ${JSON.stringify(view)}; window.SHOP_ORDER_WA = "573163136529";</script>`)
    .replace("</body>", `  <script>if (/\\.vercel\\.app$/.test(location.hostname)) { var s = document.createElement("script"); s.defer = true; s.src = "/_vercel/insights/script.js"; document.head.appendChild(s); }</script>
</body>`);
  fs.writeFileSync(path.join(dir, "index.html"), html);
  fs.writeFileSync(path.join(dir, "vercel.json"), JSON.stringify(VERCEL, null, 2) + "\n");
  console.log("listo:", folder);
}
