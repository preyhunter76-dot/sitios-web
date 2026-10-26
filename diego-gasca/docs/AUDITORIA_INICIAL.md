# Auditoría inicial · diego-gasca.vercel.app

Fecha: 26 de octubre de 2026 · Auditor: Claude (Claude Code) · Commit de partida: `04717ed` (rama `main`, repositorio `preyhunter76-dot/sitios-web`, carpeta `diego-gasca/`).

Esta carpeta `docs/` no se publica: está excluida en `.vercelignore`.

## 1. Arquitectura detectada (comprobada)

| Aspecto | Estado real |
|---|---|
| Tecnología | Sitio **estático**: `index.html`, `style.css`, `app.js`, `data.js`, `asistente.js`, `solicitud.js/css`, `privacidad.html`. **No es Next.js**, no hay build, TypeScript, linter ni pruebas. |
| Dependencias | Ninguna en el navegador salvo CDN: GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.13 (jsDelivr), Google Fonts (Inter, Inter Tight, Bodoni Moda). |
| Servidor | Vercel. Función `api/chat.js` (SDK `@anthropic-ai/sdk` 0.133.0 fijado en `package.json`). |
| Persistencia | Club de fans/clientes → función Edge `club` de Supabase (proyecto `fpxyixfjqcsbxysiluhy`, tabla `public.club_diego_gasca` con RLS activa y sin políticas públicas). Código fuente en `supabase/club/index.ts`. |
| Carrito de solicitudes | `solicitud.js` guarda la lista en `localStorage` y la envía abriendo el correo (o WhatsApp si se configura). No toca servidores. |
| Despliegue | CLI de Vercel (`vercel deploy ./diego-gasca --prod`). El proyecto de Vercel **no** está conectado a Git: un `git push` no publica. |
| Git | Rama `main` limpia y sincronizada con `origin/main` al iniciar. |
| Variables de entorno (solo nombres) | Vercel: `ANTHROPIC_API_KEY` (no configurada: `/api/chat` responde 503 y el asistente usa su base local). Supabase (inyectadas por la plataforma): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. |

### Rutas públicas
`/` (200) · `/privacidad.html` (200) · `/api/chat` (405 a GET, 503 a POST sin clave) · `/robots.txt` (404) · `/sitemap.xml` (404) · `/favicon.ico` (404; el ícono real está en `/img/favicon.png`).

### Enlaces externos verificados (HTTP 200)
`prey-hunter.vercel.app`, `cartel-music.vercel.app`, `salsafro.vercel.app`, los 10 enlaces de reseñas de YouTube (videos existentes). La función `club` responde 405 a GET (correcto: solo POST).

## 2. Mediciones de línea base (herramientas ejecutadas)

**Lighthouse 12.2.1 sobre producción**
| | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Móvil | 65 | 89 | 100 | 100 | 5,2 s | 70 ms | 0 |
| Escritorio | 86 | 92 | 100 | 100 | 1,3 s | 0 ms | 0,016 |

Auditorías por mejorar: imágenes sin dimensiones, `aria-hidden-focus`, `aria-prohibited-attr`, contraste, `label-content-name-mismatch`, imágenes en formato no moderno (≈324 KiB), imágenes más grandes que su tamaño mostrado (≈942 KiB móvil), imágenes fuera de pantalla.

**axe-core 4.10.2 (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas), local en modo sin animación**: 3 reglas con fallos en 1440 px y 390 px: `aria-prohibited-attr` (estrellas de reseñas), `color-contrast` (año «1998» decorativo), `region` (franja superior fuera de una región).

**Otras comprobaciones**: sin errores de consola; sin desbordamiento horizontal en 390 px; un solo H1 y jerarquía H2/H3 ordenada; no hay secretos en el código público (búsqueda de patrones de claves); cabeceras de producción solo con HSTS.

## 3. Hallazgos

| ID | Prioridad | Hallazgo | Evidencia | Propuesta | Riesgo del cambio |
|---|---|---|---|---|---|
| H1 | **P1** | La política de privacidad no describe el formulario del club: no dice que nombre, correo, WhatsApp, ciudad, país, intereses y autorización se guardan en Supabase (EE. UU.); y afirma que los contactos se guardan en el Cerebro. También omite jsDelivr. | `privacidad.html` secciones «Cuando visitas este sitio» y «Dónde y cuánto tiempo se guardan»; `supabase/club/index.ts`. | Añadir una descripción **factual** del club y de jsDelivr, y marcarla para revisión legal de Diego. | Bajo (texto) · REQUIERE CONFIRMACIÓN |
| H2 | P1 | `/api/chat` no limita frecuencia ni origen: cuando se active la clave, cualquiera podría consumir la API (coste). | `api/chat.js`. | Lista de orígenes permitidos + límite simple por IP en memoria + límite de longitud ya existente. | Bajo (la función hoy no se usa) |
| H3 | P1 | La función `club` acepta peticiones sin cabecera `Origin` (scripts automatizados) y no tiene límite de frecuencia. | `supabase/club/index.ts` (prueba con `curl` sin Origin respondió 200). | Exigir `Origin` permitido; rate limit por IP. Requiere redesplegar la función (autorización). | Medio · REQUIERE CONFIRMACIÓN |
| H4 | P2 | Sin cabeceras de seguridad (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`). | `curl -I` a producción. | `vercel.json` con cabeceras seguras (sin CSP para no romper CDNs; CSP propuesta en pendientes). | Bajo |
| H5 | P2 | Sin `robots.txt` ni `sitemap.xml`; sin `canonical`, `og:url`, `twitter:card`; `og:image` relativa y en WebP. | Rutas 404; `<head>` de `index.html`. | Crear robots y sitemap; metadatos absolutos; imagen OG JPG 1200×630; JSON-LD `Person` solo con datos publicados. | Bajo |
| H6 | P2 | Accesibilidad: panel del asistente y cajón de solicitud ocultos con `aria-hidden` pero enfocables; `aria-label` del botón «Pregúntame» no contiene el texto visible; estrellas con `aria-label` en un `div`; contraste del «1998»; franja superior fuera de región; sin enlace «saltar al contenido»; botones «Elegir plan» con el mismo nombre accesible; el carrusel de reseñas solo se pausa con el mouse. | axe-core y Lighthouse. | Correcciones puntuales (`inert`, `role="img"`, `aria-label` descriptivos, pausa con foco). | Bajo |
| H7 | P2 | Imágenes más grandes que su tamaño mostrado y sin `width/height` (≈940 KiB de ahorro en móvil). | Lighthouse `uses-responsive-images`, `unsized-images`. | Variantes 640/1200 px con `srcset`; dimensiones explícitas; logos PNG a su tamaño real (se conserva PNG, como pidió Diego). | Bajo |
| H8 | P2 | LCP móvil 5,2 s: la pantalla de carga (pedida por Diego) retrasa la portada ~2–3 s. | Lighthouse. | Mantener la intro; reducir trabajo previo (fuentes no usadas, imágenes). No se elimina la intro sin autorización. | Bajo |
| H9 | P3 | Se carga Bodoni Moda (Google Fonts) aunque ya no se usa en la página. | `index.html` + `style.css` (solo en reglas sin uso). | Quitarla del enlace de fuentes. | Bajo |
| H10 | P3 | ~25 KB de CSS de secciones eliminadas (galería, canciones, en vivo, redes, visor). | `style.css`. | Documentar; limpiar en una fase posterior con pruebas visuales. | Medio (no se toca ahora) |
| H11 | P3 | Sin analítica. | Código. | Proponer Vercel Web Analytics (sin cookies) — decisión de Diego. | — |
| H12 | P3 | `/favicon.ico` 404 (los navegadores lo piden aunque exista `<link rel="icon">`). | `curl`. | Servir el mismo ícono también en la raíz. | Bajo |
| H13 | Info | Precios de los planes son referencias «desde» basadas en investigación de mercado, aprobadas por Diego para publicarse; deben confirmarse. | `data.js`. | Sin cambio; listado en pendientes. | — |

No se encontraron hallazgos P0 (exposición crítica o pérdida de datos).

## 4. Plan por lotes
- **Lote A** · Enlaces y errores evidentes: favicon en la raíz, página 404 propia.
- **Lote B** · Accesibilidad y UX: H6.
- **Lote C** · SEO técnico: H5.
- **Lote D** · Formularios e integraciones: H1 (texto factual, para revisión), H2 (código), H3 (código preparado, despliegue pendiente de autorización).
- **Lote E** · Rendimiento y seguridad: H4, H7, H9.
- **Lote F** · Opcional: no se aplica (H10, H11 quedan como propuestas).

Nada se publica en producción sin autorización explícita de Diego.
