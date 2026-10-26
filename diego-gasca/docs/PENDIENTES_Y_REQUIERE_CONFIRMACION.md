# Pendientes y decisiones que requieren confirmación

Actualizado: 26 de octubre de 2026.

## Requieren autorización de Diego
1. ~~Publicar en producción~~ — HECHO el 26/10/2026 con autorización de Diego y verificado.
2. ~~Desplegar la función `club` en Supabase~~ — HECHO el 26/10/2026 (v3): exige `Origin` y limita a 5 envíos cada 10 minutos por huella cifrada de IP (tabla `club_rate`, se borra a las 24 h). Verificado: sin Origin 403, otro sitio 403, 5 envíos 200 y el sexto 429.
3. **Indexación en buscadores**: hoy `robots.txt` permite indexar `diego-gasca.vercel.app`. Si se va a usar un dominio propio, conviene publicarlo primero y cambiar `canonical`, `og:url`, `sitemap.xml` y el JSON-LD a ese dominio. Estado: REQUIERE CONFIRMACIÓN.

## Contenido y negocio (REQUIERE CONFIRMACIÓN)
- **Precios de los servicios de marca (26/10/2026)**: Diagnóstico, Crea tu sello y Crecimiento, más 3 extras, en COP, USD, CLP y EUR. No hay tarifas publicadas de consultoría de marca en Colombia para comparar; se armaron con referencias internacionales (ver `data.js`). Diego debe confirmarlos o ajustarlos.
- **Compositor**: «148 créditos registrados en MUSO.AI y código IPI de compositor» viene del Cerebro (módulo 12, corte manual de MUSO del 17/09/2026).
- **Cifras**: «2 empresas propias», «+29 M streams de Cartel Music» y «142 grabaciones con ISRC» vienen del Cerebro Central; confirmar que siguen vigentes.
- **Pie de foto** «Cali, 1999. Su primer año.»: inferido de la vela de 1 año.
- **Reseñas**: son comentarios públicos reales de YouTube (con enlace a la fuente). Confirmar que Diego está de acuerdo con mostrarlos con el usuario de cada persona.
- **Correo de contacto**: es `prey-hunter-oficial@hotmail.com`; para la marca personal se recomienda un correo propio de Diego Gasca.

## Legal (revisión humana)
- **Política de privacidad**: se añadieron descripciones factuales (club en Supabase, asistente, jsDelivr). Diego o su asesor deben revisar que la redacción, la finalidad, el plazo de conservación del club y el canal de baja sean los que quiere usar. No se afirma cumplimiento legal garantizado.
- La política sigue nombrando a Prey Hunter porque cubre todas las marcas; decidir si el sitio personal debe tener una política propia.

## Credenciales y servicios que faltan (solo nombres)
| Variable | Dónde | Para qué | Estado |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel, proyecto `diego-gasca` | Activar las respuestas con IA del asistente | REQUIERE CONFIGURACIÓN |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Supabase (las inyecta la plataforma en la función) | Guardar el club | VERIFICADO (funcionando) |

## Mejoras propuestas, no aplicadas
- **Política de seguridad de contenido (CSP)**: proponer `Content-Security-Policy-Report-Only` con `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `fonts.googleapis.com`, `fonts.gstatic.com`, `i.ytimg.com` y la URL de Supabase; observar una semana antes de aplicarla. Riesgo de romper scripts si se aplica directamente.
- **Analítica sin cookies**: activar Vercel Web Analytics desde el panel de Vercel (decisión de Diego; la política de privacidad debería mencionarlo). Eventos útiles: clic en «Elegir plan», envío exitoso del club, clic en «Pedir el press kit», clic hacia sitios oficiales. Sin datos personales.
- **Limpieza de CSS sin uso** (~25 KB de secciones eliminadas): hacerla con pruebas visuales antes y después.
- **Rendimiento en móvil**: la intro de carga retrasa la portada ~2 s (LCP). Se mantiene porque Diego la pidió; si se quiere mejorar la métrica, se puede acortar la duración mínima (`1100 ms` en `app.js`).
- **CRM / Cerebro Central**: conectar `club_diego_gasca` al Cerebro como fuente de lectura (sin exponer datos), con el flujo visitante → validación → almacenamiento (ya existe) → clasificación → notificación → seguimiento.
- **Seguridad del proyecto Supabase**: las 52 tablas antiguas del CRM en `public` tienen RLS desactivada (aviso crítico del asesor de Supabase). No se tocaron. Decidir si se activa RLS o se elimina ese esquema si no se usa.
- **Pausa del plan gratuito de Supabase**: si el proyecto pasa unos 7 días sin actividad, se pausa y el club pasa al plan B por correo hasta reactivarlo.

## No se pudo comprobar
- Lectores de pantalla reales (NVDA/VoiceOver) y Safari en iOS: no disponibles en este entorno.
- Envío real por correo del carrito y del plan B del club (abre el cliente de correo del visitante; no se envió nada).

## Pasos que solo Diego puede hacer (26/10/2026, noche)
Por seguridad, el asistente no crea cuentas, no escribe claves ni configura cobros. Todo lo demás quedó listo y publicado.
1. **Asistente con IA:** crear una clave en console.anthropic.com → Vercel, proyecto `diego-gasca` → Settings → Environment Variables → `ANTHROPIC_API_KEY` (Production) → volver a publicar. Sin la clave, el asistente usa sus respuestas locales.
2. **Pagos en la agenda:** crear un enlace de pago por servicio (Wompi, Mercado Pago o Stripe) y pegarlo en `data.js` → `pagos`. Con el enlace puesto, el botón «Pagar ahora» aparece al agendar. Sin él, Diego envía los datos de pago al confirmar.
3. **Correos automáticos (bienvenida del club y avisos de la agenda):** crear cuenta en resend.com con un dominio propio verificado y poner en Supabase → Edge Functions → Secrets: `RESEND_API_KEY`, `CORREO_REMITENTE` (p. ej. `Diego Gasca <hola@tudominio.com>`) y opcional `CORREO_DIEGO`. El código ya está desplegado (club v4 y agenda v1) y se activa solo.
4. **Boletín mensual:** el de octubre quedó como borrador en Gmail (preyhunter76@gmail.com). Antes de enviarlo, poner en CCO los correos del club (tabla `club_diego_gasca` en Supabase).
5. **Citas:** llegan a la tabla `agenda_diego_gasca` en Supabase (estado `pendiente`). Un mismo día y hora no se puede reservar dos veces.
6. **Prensa:** el Cerebro no registra notas de medios; la sección muestra solo presencia verificada. Cuando haya una nota real, se agrega en `data.js` → `press`.
