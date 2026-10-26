# Guía de lanzamiento · diego-gasca.vercel.app

## Qué es el proyecto
Sitio estático (HTML, CSS y JS sin compilación) en la carpeta `sitios/diego-gasca` del repositorio `preyhunter76-dot/sitios-web`, con:
- Función `api/chat.js` en Vercel (asistente con IA; opcional).
- Función `club` en Supabase (proyecto `fpxyixfjqcsbxysiluhy`) para el club de fans y clientes.

El proyecto de Vercel **no está conectado a Git**: publicar requiere el comando de abajo.

## Variables de entorno (solo nombres y propósito)
| Variable | Dónde | Propósito | ¿Obligatoria? |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel → proyecto `diego-gasca` → Settings → Environment Variables (Production) | Respuestas con IA del asistente. Sin ella, el asistente responde con su base local. | No |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Las inyecta Supabase en la función `club` | Guardar registros del club | Ya configuradas |

## Probar en local
1. `node "G:\CLAUDE (CEREBRO)\sitios\servidor.mjs"` y abrir `http://localhost:5510/diego-gasca/`.
2. `?motion=1` fuerza las animaciones; `?static=1` las quita (útil para capturas).
3. En local `/api/chat` da 404 (normal: el servidor local no ejecuta funciones).

## Checklist antes de publicar
- [ ] Revisar `docs/CAMBIOS_REALIZADOS.md`.
- [ ] Confirmar precios, cifras y texto de privacidad (`docs/PENDIENTES_Y_REQUIERE_CONFIRMACION.md`).
- [ ] Abrir el sitio en local en computador y celular; probar «Elegir plan», el asistente y el formulario del club con un correo de prueba (y borrarlo después en Supabase).
- [ ] Sin errores en la consola del navegador (salvo `/api/chat` en local).

## Publicar
```bash
node "<ruta del CLI de Vercel>/vercel/dist/index.js" deploy "G:\CLAUDE (CEREBRO)\sitios\diego-gasca" --prod --yes
```
Función del club (solo si se autoriza la v2): desplegar `supabase/club/index.ts` como función `club` con verificación JWT desactivada (la función valida origen y datos por sí misma).

## Verificar después de publicar
- `curl -sI https://diego-gasca.vercel.app/` → deben aparecer `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- `https://diego-gasca.vercel.app/robots.txt`, `/sitemap.xml`, `/favicon.ico` y una ruta inexistente (debe mostrar la página 404 propia).
- Compartir el enlace en WhatsApp o en el depurador de Facebook para ver la imagen OG.
- Lighthouse en producción (móvil y escritorio) y comparar con `docs/AUDITORIA_INICIAL.md`.
- Registro de prueba en el club, revisar en Supabase y borrarlo.
- Opcional: dar de alta el sitio en Google Search Console y Bing Webmaster Tools y enviar el sitemap.

## Volver atrás
- **Producción:** Vercel → proyecto `diego-gasca` → Deployments → despliegue anterior → «Instant Rollback» / «Promote to Production».
- **Código:** `git revert <commit>` en `sitios/` (conserva la historia).
- **Función del club:** volver a desplegar la versión anterior de `supabase/club/index.ts` (en el historial de Git).
