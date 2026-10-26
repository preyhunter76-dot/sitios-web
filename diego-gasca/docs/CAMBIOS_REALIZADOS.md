# Cambios realizados · auditoría del 26 de octubre de 2026

Partida: commit `04717ed`. Todos los cambios son localizados; no se eliminó ninguna sección, texto, integración ni recurso que funcionara.
**Estado de publicación:** guardado en Git; **no publicado en producción** (pendiente de autorización de Diego).

## Lote A · Errores evidentes y enlaces
| Archivo | Cambio | Motivo | Estado |
|---|---|---|---|
| `404.html` (nuevo) | Página de error propia con el estilo del sitio, `noindex` y botón al inicio. | Antes se mostraba la página genérica de Vercel. | CORREGIDO |
| `vercel.json` (nuevo) | `/favicon.ico` → `/img/favicon.png`. | Los navegadores pedían `/favicon.ico` y recibían 404. | CORREGIDO |

## Lote B · Accesibilidad y UX
| Archivo | Cambio | Estado |
|---|---|---|
| `index.html` | Enlace «Saltar al contenido» y `id="contenido"` en `<main>`. | CORREGIDO |
| `index.html` | Franja superior decorativa marcada `aria-hidden` (repite textos de la página). | CORREGIDO |
| `index.html` + `style.css` | Año «1998» decorativo dibujado por CSS (`::before`), fuera del árbol accesible. | CORREGIDO |
| `index.html` | Botón «Pregúntame»: nombre accesible que contiene el texto visible y `aria-controls`; panel del asistente `inert` mientras está cerrado; campo con `type="text"`. | CORREGIDO |
| `index.html` | Logo del menú sin `aria-label` que contradecía el texto visible. | CORREGIDO |
| `app.js` | Estrellas de reseñas con `role="img"`; botones «Elegir plan» con nombre único («Elegir plan Imagen», etc.). | CORREGIDO |
| `app.js` | El cajón de solicitud (archivo compartido `solicitud.js`, sin tocar) queda `inert` cuando está cerrado; el contador del botón se oculta a lectores de pantalla. | CORREGIDO |
| `app.js` | El carrusel de reseñas también se pausa al navegar con teclado. | CORREGIDO |
| `app.js` | El formulario del club muestra un aviso claro si el servidor responde 429 (muchos intentos). | CORREGIDO |
| `style.css` | Estilos del enlace de salto y foco visible en botones, enlaces del menú y campo del asistente. | CORREGIDO |

## Lote C · SEO técnico
| Archivo | Cambio | Estado |
|---|---|---|
| `index.html` | `canonical`, `og:url`, `og:type`, `og:locale`, `og:site_name`, `og:image` absoluta (JPG 1200×630 nuevo: `img/og-diego-gasca.jpg`), `twitter:card`. | CORREGIDO |
| `index.html` | JSON-LD `Person` solo con datos ya publicados en el sitio (nombre, ciudad, cargo, correo). Las reseñas **no** se marcan con schema. | CORREGIDO |
| `robots.txt` y `sitemap.xml` (nuevos) | Permite indexar el sitio, excluye `/api/`, declara el sitemap. | CORREGIDO · REQUIERE CONFIRMACIÓN (si el sitio debe indexarse en la URL de Vercel) |
| `privacidad.html` | `canonical`. | CORREGIDO |

## Lote D · Formularios, asistente y privacidad
| Archivo | Cambio | Estado |
|---|---|---|
| `privacidad.html` | Se añadió, de forma factual: qué datos guarda el club y dónde (Supabase, EE. UU.), cómo darse de baja; que el asistente del sitio no guarda conversaciones y, si se activa la IA, usa Anthropic; y jsDelivr como proveedor técnico. Fecha «Actualizada el 26 de octubre de 2026». No se tocaron bases legales ni plazos. | CORREGIDO · REQUIERE CONFIRMACIÓN (revisión legal) |
| `api/chat.js` | Solo acepta peticiones con `Origin` del sitio (403 si no) y limita 20 preguntas por IP cada 10 minutos (429). | CORREGIDO (probado con clave falsa y servidor inaccesible) |
| `supabase/club/index.ts` | v2 preparada: exige `Origin` permitido y limita 5 envíos por IP cada 10 minutos. | PREPARADO · **no desplegado** (requiere autorización) |

## Lote E · Rendimiento y seguridad
| Archivo | Cambio | Estado |
|---|---|---|
| `vercel.json` | Cabeceras `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; caché de 1 día para `/img/` y `no-store` para `/api/`. Sin CSP para no romper los CDN (ver pendientes). | CORREGIDO (se verifica al publicar) |
| `index.html` | Se dejó de cargar la fuente Bodoni Moda (ya no se usa). | CORREGIDO |
| `img/*-480.webp`, `*-800.webp`, `*-900.webp`, `*-1200.webp`, `*-1280.webp`, `img/logos/*-sm.png` (nuevos) | Versiones del tamaño en que se muestran; los originales se conservan (el retrato descargable sigue siendo el original). Los logos siguen en PNG, como pidió Diego. | CORREGIDO |
| `index.html` + `app.js` | `srcset`/`sizes`, `width`/`height` en todas las imágenes, `fetchpriority="high"` en la portada, `decoding="async"` en tarjetas. | CORREGIDO |
| `.vercelignore` | Excluye `docs/` además de `supabase/`. | CORREGIDO |

## Lote F · Opcional
No se aplicó (limpieza de CSS sin uso y analítica quedan como propuestas).

## Pruebas ejecutadas (resultados reales)
| Prueba | Antes | Después |
|---|---|---|
| axe-core 4.10.2, 1440 px y 390 px | 3 reglas con fallos | **0** |
| Lighthouse móvil · Accesibilidad | 89 (producción) | **100** (local) |
| Lighthouse escritorio · Accesibilidad | 92 (producción) | **100** (local) |
| Lighthouse · imágenes más grandes de lo mostrado | ≈942 KiB (móvil) | ≈60 KiB |
| Lighthouse · imágenes sin dimensiones | presente | 0 |
| Lighthouse · Buenas prácticas / SEO | 100 / 100 | 100 / 100 |
| Lighthouse móvil · Rendimiento | 65 (producción) | 66 (local, sin compresión del servidor local) |

Las mediciones «después» son locales: el servidor local no comprime texto ni aplica `vercel.json`, así que el rendimiento real se debe medir de nuevo en producción tras publicar.

**Pruebas funcionales (Chrome sin interfaz, 1440 px, con animaciones) — todas VERIFICADAS:**
- La carga muestra el trébol y «Diego Gasca» y luego desaparece.
- La portada no tiene WebGL.
- Hay 5 facetas y 4 empresas.
- «Elegir plan» agrega al carrito.
- Cambiar a USD muestra US$950 en Evento.
- El cajón de solicitud queda inerte cerrado y se puede usar abierto.
- El asistente se abre, responde con el precio de referencia y se cierra con Escape.
- El club valida los campos vacíos y confirma solo tras la respuesta real de Supabase. El registro de prueba se borró; queda 1 registro real de hoy, que no se tocó.

El único error de consola es `404 /api/chat`, propio del servidor local (en producción responde 503 hasta configurar la clave, y el asistente usa sus respuestas locales).

**Otras comprobaciones:**
- Celular de 390 px sin desbordamiento horizontal.
- `vercel.json` es JSON válido y `sitemap.xml` está bien formado.
- Sin secretos en el código.
- En el diff, cada línea quitada se reemplazó por su versión mejorada.

## Cómo revisar y volver atrás
- Ver los cambios: `git -C "G:\CLAUDE (CEREBRO)\sitios" show --stat HEAD` y `git diff 04717ed HEAD -- diego-gasca`.
- Volver atrás en el código: `git revert <commit de esta auditoría>` (no borra historia).
- Volver atrás en producción (si ya se publicó): en Vercel → proyecto `diego-gasca` → Deployments → el despliegue anterior → «Promote to Production» (o «Instant Rollback»).
