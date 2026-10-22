// Estudio de manicure y pedicure · datos. Cambia nombre, servicios, precios y contacto aquí.
// Sin precios ni reseñas inventadas: price null = «Consultar»; reviews vacío = la sección se oculta.
window.STUDIO = {
  brand: "Nácar",            // nombre del estudio (cámbialo cuando Diego lo defina)
  tagline: "Nail Studio",
  city: "Cali, Colombia",
  whatsapp: "",               // solo dígitos con indicativo, ej. "573001234567"
  instagram: "",
  address: "Dirección por confirmar",
  hours: "Horario por confirmar",
  currency: "COP",
  gift: { on: true, title: "Recibe un detalle", sub: "en tu primera visita" },

  services: [
    { id: "clasico", name: "Manicure clásico", sub: "Precisión en cada detalle", img: "img/classic.jpg", price: null, time: "Duración por confirmar" },
    { id: "frances", name: "Francés", sub: "Un clásico que siempre está de moda", img: "img/french.jpg", price: null, time: "Duración por confirmar" },
    { id: "diseno", name: "Diseño", sub: "Tu estilo sin límites", img: "img/art.jpg", price: null, time: "Duración por confirmar" },
    { id: "fortalecimiento", name: "Fortalecimiento", sub: "Uñas sanas y hermosas", img: "img/gel.jpg", price: null, time: "Duración por confirmar" },
    { id: "pedicure", name: "Pedicure", sub: "Cuidado en cada paso", img: "img/pedicure.jpg", price: null, time: "Duración por confirmar" },
    { id: "spa", name: "Cuidado spa", sub: "Cosmética premium para tus manos", img: "img/spa.jpg", price: null, time: "Duración por confirmar" },
  ],

  // Agrega fotos reales de trabajos del estudio en img/ y lístalas aquí.
  gallery: ["img/classic.jpg", "img/french.jpg", "img/art.jpg", "img/pedicure.jpg", "img/gel.jpg", "img/spa.jpg"],

  // Reseñas reales de clientas: { name: "Laura", text: "…" }. Vacío = no se muestra la sección.
  reviews: [],

  times: ["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
};
