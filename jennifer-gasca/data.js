// Tienda de Jennifer Gasca · catálogo real tomado de su página de autora en Amazon (oct. 2026).
// Las sinopsis cortas son resúmenes propios (no copiadas de Amazon). La muestra se lee con el
// lector oficial de Amazon (Kindle Instant Preview) usando el código Kindle (asin).
// Sin precios: cambian por país; el botón lleva a Amazon, que muestra el precio local.
// excerpt: [] → si la autora quiere, pega aquí un fragmento propio y se mostrará en el lector.
const AMZ = (asin) => `https://www.amazon.com/dp/${asin}`;

window.BOOKS = {
  brand: "Jennifer Gasca",
  tagline: "Romance de época",
  sample: false,
  amazonStore: "https://www.amazon.com/stores/Jennifer-Gasca/author/B09TFXTWMW",
  instagram: "",
  credit: "", // texto opcional al pie, p. ej. «Tienda diseñada por Cartel Books»

  author: {
    photo: "img/autora.jpg",
    // Bio breve redactada a partir de su página de autora. Cámbiala por la versión que ella prefiera.
    bio: [
      "Jennifer Gasca nació en Cali, Colombia, y escribe romance de época desde 2015.",
      "Sus historias están llenas de duques, lores y damas que no se dejan: amores imposibles, secretos de familia y corazones que se rompen para volver a latir.",
    ],
  },

  categories: [
    { id: "prohibido", name: "Serie Prohibido", sub: "Cuatro libros · amor prohibido", icon: "♛" },
    { id: "stewart", name: "Trilogía Stewart", sub: "Los hermanos Stewart", icon: "⚜" },
    { id: "amorreal", name: "Bilogía Amor Real", sub: "Matrimonios por decreto", icon: "♥" },
    { id: "inadecuados", name: "Serie Inadecuados", sub: "Héroes con sombras", icon: "✦" },
    { id: "independiente", name: "Independientes", sub: "Historias únicas", icon: "❦" },
  ],

  books: [
    { id: "sueno", title: "Sueño (im)posible", sub: "El matasanos & la moribunda", cat: "stewart", order: "Trilogía Stewart · Libro 2",
      cover: "img/libros/sueno.jpg", tint: "#3b1420", asin: "B0FS7ZTSD4", paperback: "B0GJ53TDZ5", featured: true, isNew: true,
      blurb: "Lord Alistair Stewart estudió leyes… y medicina en secreto. Un viaje a América lo pone frente a la paciente que podría cambiarlo todo.", excerpt: [] },
    { id: "lincoln", title: "Lincoln", sub: "Una batalla contra el corazón", cat: "independiente", order: "Novela independiente",
      cover: "img/libros/lincoln.jpg", tint: "#2a1d10", asin: "B0F8KV7PCD", paperback: "B0F9XZS543",
      blurb: "El libertino más encantador de Europa recibe un ultimátum del Rey: un año para casarse. Él solo aceptará hacerlo por amor.", excerpt: [] },
    { id: "actuando", title: "Actuando con el corazón", sub: "El escocés y la americana", cat: "stewart", order: "Trilogía Stewart · Libro 1",
      cover: "img/libros/actuando.jpg", tint: "#122a3a", asin: "B0BY3RMH1N", paperback: "B0C91TZ91M",
      blurb: "El futuro Duque de Montrose ya no cree en el amor… hasta que un brindis desastroso con una americana lo deja empapado y sin defensas.", excerpt: [] },
    { id: "oportunidad", title: "Una oportunidad para amar", sub: "Lady esperpento · Amor real I", cat: "amorreal", order: "Bilogía Amor Real · Libro 1",
      cover: "img/libros/oportunidad.jpg", tint: "#3a1030", asin: "B09TFVPNN1", paperback: "B09WQ5PFLH",
      blurb: "Él buscaba una duquesa perfecta; el Rey le impone a la española que nadie quería. Una lista de requisitos y mil razones para odiarse.", excerpt: [] },
    { id: "protegiendo", title: "Protegiendo el corazón", sub: "Lady sinvergüenza · Amor real II", cat: "amorreal", order: "Bilogía Amor Real · Libro 2",
      cover: "img/libros/protegiendo.jpg", tint: "#40122a", asin: "B0BC5169LD", paperback: "B0C91ZWN7W",
      blurb: "Lady Freya Allard juró no volver a sangrar por amor. Entonces regresa un viejo amor y llega un lord dispuesto a salvar su libertad.", excerpt: [] },
    { id: "lobo", title: "El lobo de Albemarle", sub: "Serie Inadecuados I", cat: "inadecuados", order: "Serie Inadecuados · Libro 1",
      cover: "img/libros/lobo.jpg", tint: "#1c1414", asin: "B0DQQ9HMXH",
      blurb: "Temido en la guerra e implacable en los salones: el Conde de Albemarle esconde al niño que juró venganza y nunca creyó merecer amor.", excerpt: [] },
    { id: "condena", title: "Condena de amor", sub: "Alexandre & Luisa · Prohibido I", cat: "prohibido", order: "Serie Prohibido · Libro 1",
      cover: "img/libros/condena.jpg", tint: "#2b0d14", asin: "B0C6MYYJY4", paperback: "B0C7J7LHJG",
      blurb: "Encuentros furtivos, una maldición familiar y dos corazones que el destino cruza aunque todo les prohíbe amarse.", excerpt: [] },
    { id: "ofrenda", title: "Ofrenda de amor", sub: "Lady frivolidad · Prohibido II", cat: "prohibido", order: "Serie Prohibido · Libro 2",
      cover: "img/libros/ofrenda.jpg", tint: "#33101c", asin: "B0CYS4B9K1",
      blurb: "Alexandre se marcha para olvidarla. Para Luisa, el adiós no es el final: aún queda un pasado que ajustar y un amor que defender.", excerpt: [] },
    { id: "contienda", title: "Contienda de amor", sub: "Lord vengativo · Prohibido III", cat: "prohibido", order: "Serie Prohibido · Libro 3",
      cover: "img/libros/contienda.jpg", tint: "#2a0f12", asin: "B0D26JLSNF",
      blurb: "Luisa desaparece tras descubrir los secretos de su familia. Entre odios heredados, ¿podrán ella y Alexandre ser la familia que soñaron?", excerpt: [] },
    { id: "sentencia", title: "Sentencia de amor", sub: "Allard de Borja · Prohibido IV", cat: "prohibido", order: "Serie Prohibido · Libro 4",
      cover: "img/libros/sentencia.jpg", tint: "#24101a", asin: "B0D4JZ2BF3",
      blurb: "Años después, los Allard de Borja ya son una familia ante el mundo. El cierre de la saga, con sus mellizos en el centro de la historia.", excerpt: [] },
  ].map((b) => ({ ...b, amazon: AMZ(b.asin), paperbackUrl: b.paperback ? AMZ(b.paperback) : "", ku: true })),
};
