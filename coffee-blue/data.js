// Coffee Blue · datos de la tienda. Edita aquí precios, productos y contacto.
// Regla del Cerebro: sin precios inventados. Si price es null se muestra «Precio por confirmar».
window.SHOP = {
  brand: "Coffee Blue",
  city: "Cali, Colombia",
  currency: "COP",
  // Número de WhatsApp con indicativo, solo dígitos (ej. "573001234567"). Vacío = pedidos en vista previa.
  whatsapp: "",
  email: "",
  instagram: "",
  address: "Cali · Valle del Cauca",
  notice: "Tienda en preparación: rotulado e INVIMA pendientes. Precios por definir.",

  drinks: [
    { id: "cappuccino", name: "Cappuccino Blue", desc: "Espresso, leche texturizada y arte latte en la taza de la casa.", img: "img/cappuccino.jpg", price: null, tag: "Favorito" },
    { id: "latte", name: "Latte de la casa", desc: "Doble espresso con leche sedosa y un toque de canela.", img: "img/latte.jpg", price: null },
    { id: "iced", name: "Iced Caramel Latte", desc: "Espresso frío, caramelo y leche sobre hielo.", img: "img/iced.jpg", price: null, tag: "Nuevo" },
    { id: "mocha", name: "Mocha", desc: "Espresso con chocolate, leche y crema batida.", img: "img/mocha.jpg", price: null },
    { id: "tinto", name: "Tinto americano", desc: "El tinto de toda la vida, ahora con café de origen.", img: "img/tinto.jpg", price: null },
    { id: "espresso", name: "Espresso", desc: "Intenso y aromático, extraído al momento.", img: "img/espresso.jpg", price: null },
  ],

  origins: [
    { id: "cauca", name: "Origen Cauca", region: "Cauca", roast: "Tostión media", format: "Grano · 340 g", notes: "Notas de cata por confirmar con el tostador.", price: null },
    { id: "huila", name: "Origen Huila", region: "Huila", roast: "Tostión media-clara", format: "Grano · 340 g", notes: "Ideal para métodos filtrados.", price: null },
    { id: "narino", name: "Origen Nariño", region: "Nariño", roast: "Tostión clara", format: "Grano · 340 g", notes: "Para quienes buscan acidez brillante.", price: null },
    { id: "valle", name: "Casa Blue", region: "Valle del Cauca", roast: "Tostión media-oscura", format: "Molido · 340 g", notes: "La mezcla de la casa, para goteo o greca.", price: null },
    { id: "blend", name: "Blend Espresso", region: "Mezcla colombiana", roast: "Tostión oscura", format: "Molido fino · 340 g", notes: "Pensado para espresso y bebidas con leche.", price: null },
  ],

  kit: { id: "v60", name: "Kit de filtrado V60", desc: "Gotero, filtros y guía de preparación para sacar lo mejor de cada origen.", img: "img/v60.jpg", price: null },
};
