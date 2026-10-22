# Sitios web de Diego Gasca · 7 sitios estáticos

Cada carpeta es un sitio independiente (HTML, CSS y JS, sin compilación) y se publica sola en Vercel.
Todos están dentro del Cerebro Central: «Páginas web» (módulos 67–70) y «Otros negocios» (módulos 64–66).

## En línea (Vercel · cuenta preyhunter76)
| Carpeta | Sitio | Módulo | En línea |
|---|---|---|---|
| `diego-gasca/` | Diego Gasca · empresario, servicios y prensa | 67 | https://diego-gasca.vercel.app |
| `prey-hunter/` | Prey Hunter · artista, música y booking | 68 | https://prey-hunter.vercel.app |
| `salsafro/` | Salsafro · marca, tienda Bandcamp y Salsafro Records | 69 | https://salsafro.vercel.app |
| `cartel-music/` | Cartel Music · sello, catálogo, demos y eventos | 70 | https://cartel-music.vercel.app |
| `coffee-blue/` | Coffee Blue · cafetería | 64 | https://coffee-blue-eosin.vercel.app |
| `jennifer-gasca/` | Jennifer Gasca · tienda de libros (10 libros reales de Amazon) | 65 | https://jennifer-gasca.vercel.app |
| `nail-studio/` | Nácar · estudio de manicure y pedicure | 66 | https://nail-studio-pied-chi.vercel.app |

**Política de privacidad** (la usan las apps de Meta de los agentes de mensajes):
https://diego-gasca.vercel.app/privacidad.html · eliminación de datos: https://diego-gasca.vercel.app/privacidad.html#eliminar

## Ver en local
```
node servidor.mjs
```
Luego abre http://localhost:5510/<carpeta>/ (por ejemplo `diego-gasca/`).

## Publicar tras editar
```
vercel deploy ./<carpeta> --prod --yes
```
Cada carpeta ya está enlazada a su proyecto de Vercel (`.vercel/`, que no se sube a GitHub).

## Qué editar (el archivo `data.js` de cada carpeta)
- **Coffee Blue**: precios (`price`, hoy `null` = «Precio por confirmar»), `whatsapp`, `email`, `instagram`.
  Con `whatsapp` lleno, el carrito envía el pedido por WhatsApp.
- **Jennifer Gasca**: catálogo real (10 libros, códigos Kindle y pasta blanda). Para un libro nuevo agrega su
  `asin` y portada en `img/libros/`. «Leer muestra» abre la muestra oficial de Amazon; `excerpt` acepta fragmentos propios.
- **Nácar**: el nombre (`brand`) es provisional. Cambia servicios, precios, `whatsapp`, dirección y horario.
  Las reseñas solo aparecen si agregas reseñas reales.
- **Sitios oficiales**: la música se compra en Bandcamp (salsafro.bandcamp.com) con precios reales en USD.
  Booking y servicios usan el carrito de solicitudes (`_compartido/solicitud.js`, copiado en cada carpeta), que abre
  el correo con lo elegido; si pones `whatsapp` en el `data.js`, la solicitud va por WhatsApp. No se guardan datos en
  ningún servidor. Si cambias `_compartido/solicitud.*`, cópialo a las cuatro carpetas oficiales antes de publicar.

## Reglas respetadas
- No se inventaron precios, reseñas, cifras ni datos de Amazon: lo que falta dice «por confirmar».
- Las fotos de Coffee Blue, Jennifer Gasca y Nácar son originales, generadas con IA (Higgsfield · Z Image).
- Coffee Blue mantiene el aviso de rotulado e INVIMA pendientes.
- Ningún sitio usa cookies propias ni analítica.

## Figma
Archivo: https://www.figma.com/design/z3XA88U253JGp4zS30tut7 (diseños a 1440 px en capas editables).
Capturas de revisión en `_capturas/` (no se suben a GitHub).
