/* Vinos de La Bodega: se usan en la sección La Bodega (fotos y precios)
   y en la pestaña Vinos de la carta (solo nombres). */

export type WineType = "espumoso" | "blanco" | "naranja" | "rosado" | "tinto" | "generoso" | "vermut" | "dulce";

export interface Wine {
  name: string;
  bodega?: string;
  variety?: string;
  origin?: string;
  type: WineType;
  glass?: string;
  /* Sin precio no se muestra la línea de precios en la ficha. */
  bottle?: string;
  /* Foto real del vino, de src/assets/vinos.
     Sin foto se muestra una botella dibujada. */
  image?: string;
}

export interface WineCategory {
  title: string;
  wines: Wine[];
}

const fotos = import.meta.glob<string>("../assets/vinos/*.jpg", { eager: true, import: "default" });
const foto = (slug: string) => fotos[`../assets/vinos/${slug}.jpg`];

/* Datos leídos de las etiquetas de las fotos. Faltan los precios: añadir glass y bottle. */
export const bodegaData: WineCategory[] = [
  {
    title: "Espumosos",
    wines: [
      { name: "Mestres Coquet", bodega: "Mestres", origin: "Cava", type: "espumoso", image: foto("mestres-coquet") },
      { name: "Apardune Brut Nature", type: "espumoso", image: foto("apardune") },
      { name: "Voltio Pet-Nat", origin: "Ribera del Voltoya", type: "espumoso", image: foto("voltio-pet-nat") },
      { name: "Pigar Ancestral", type: "espumoso", image: foto("pigar-ancestral") },
    ],
  },
  {
    title: "Blancos",
    wines: [
      { name: "La Viña de Ayer", bodega: "Soto Manrique", variety: "Albillo Real", origin: "Sierra de Gredos", type: "blanco", image: foto("la-vina-de-ayer") },
      { name: "La del Vivo", bodega: "Raúl Pérez", origin: "Bierzo", type: "blanco", image: foto("la-del-vivo") },
      { name: "Ultreia Godello", bodega: "Raúl Pérez", variety: "Godello", type: "blanco", image: foto("ultreia-godello") },
      { name: "Trenzado", bodega: "Suertes del Marqués", origin: "Valle de la Orotava, Tenerife", type: "blanco", image: foto("trenzado") },
      { name: "Ube Miraflores", bodega: "Ramiro Ibáñez", type: "blanco", image: foto("ube-miraflores") },
      { name: "Diez Mil y Pico", variety: "Verdejo", type: "blanco", image: foto("diez-mil-y-pico") },
      { name: "Matabuey", origin: "Nava de la Asunción, Segovia", type: "blanco", image: foto("matabuey") },
      { name: "Matas Altas", bodega: "Bodega Cerrón", type: "blanco", image: foto("matas-altas") },
      { name: "Sasserra", bodega: "Vinya Celler Masia", variety: "Malvasía de Sitges", type: "blanco", image: foto("sasserra-malvasia") },
      { name: "La Reina del Mambo", type: "blanco", image: foto("la-reina-del-mambo") },
      { name: "Marko", type: "blanco", image: foto("marko") },
      { name: "Michika", type: "blanco", image: foto("michika") },
      { name: "Santy", type: "blanco", image: foto("santy") },
      { name: "El Hombre Bala Blanco", type: "blanco", image: foto("el-hombre-bala-blanco") },
    ],
  },
  {
    title: "Naranjas",
    wines: [
      { name: "Voltio Vino Naranja", origin: "Ribera del Voltoya", type: "naranja", image: foto("voltio-naranja") },
      { name: "Melopea", bodega: "Microbodega del Alumbro", origin: "Zamora", type: "naranja", image: foto("melopea") },
    ],
  },
  {
    title: "Rosados",
    wines: [
      { name: "Naranjas Azules Rosé", bodega: "Soto Manrique", variety: "Garnacha", origin: "Sierra de Gredos", type: "rosado", image: foto("naranjas-azules-rose") },
      { name: "Naranjas Azules Cebreros", bodega: "Soto Manrique", origin: "Cebreros, Sierra de Gredos", type: "rosado", image: foto("naranjas-azules-cebreros") },
      { name: "Dale Pink", variety: "Garnacha", origin: "Sierra de Gredos", type: "rosado", image: foto("dale-pink") },
      { name: "Grüne Elefant", type: "rosado", image: foto("grune-elefant") },
    ],
  },
  {
    title: "Tintos",
    wines: [
      { name: "Navaherreros", bodega: "Bernabeleva", variety: "Garnacha", origin: "Vinos de Madrid", type: "tinto", image: foto("navaherreros") },
      { name: "Sendero del Pino", origin: "Nava de la Asunción, Segovia", type: "tinto", image: foto("sendero-del-pino") },
      { name: "Voltio Vino de Pueblo", origin: "Nava de la Asunción, Segovia", type: "tinto", image: foto("voltio-vino-de-pueblo") },
      { name: "Voltio Finca Las Estacas", origin: "Ribera del Voltoya", type: "tinto", image: foto("voltio-finca-las-estacas") },
      { name: "Viña Zorzal", variety: "Garnacha", type: "tinto", image: foto("vina-zorzal") },
      { name: "El Hombre Bala", type: "tinto", image: foto("el-hombre-bala-tinto") },
      { name: "Los Arrotos del Pendón", bodega: "Raúl Pérez", variety: "Prieto Picudo", origin: "León", type: "tinto", image: foto("los-arrotos-del-pendon") },
      { name: "Roc", bodega: "Verónica Ortega", origin: "Valtuille de Abajo", type: "tinto", image: foto("roc") },
      { name: "Telúrico", bodega: "Finca Fuentegalana", type: "tinto", image: foto("telurico") },
      { name: "Xérico", bodega: "Tentenublo", origin: "Rioja", type: "tinto", image: foto("xerico") },
      { name: "Marqués de Vargas Reserva", origin: "Rioja", type: "tinto", image: foto("marques-de-vargas-reserva") },
      { name: "Matalaz", origin: "Rioja", type: "tinto", image: foto("matalaz") },
      { name: "7 Fuentes", variety: "Listán Negro", origin: "Valle de la Orotava, Tenerife", type: "tinto", image: foto("7-fuentes") },
      { name: "Beltza", bodega: "Doniene Gorrondona", variety: "Hondarrabi Beltza", origin: "Bizkaiko Txakolina", type: "tinto", image: foto("beltza") },
      { name: "Morgon Côte du Py", bodega: "Foillard", origin: "Morgon, Francia", type: "tinto", image: foto("morgon-cote-du-py") },
      { name: "Suzzane", type: "tinto", image: foto("suzzane") },
      { name: "Rot", type: "tinto", image: foto("rot") },
    ],
  },
  {
    title: "Generosos y vermut",
    wines: [
      { name: "Manzanilla Classic Dry", bodega: "Fernando de Castilla", type: "generoso", image: foto("manzanilla-fernando-de-castilla") },
      { name: "Fino Classic Dry", bodega: "Fernando de Castilla", type: "generoso", image: foto("fino-fernando-de-castilla") },
      { name: "Great Duke Palo Cortado 12 años", bodega: "Juan Piñero", origin: "Jerez", type: "generoso", image: foto("great-duke-palo-cortado") },
      { name: "Atamán Vermut", bodega: "Barbadillo", type: "vermut", image: foto("ataman-vermut") },
    ],
  },
  {
    title: "Dulces",
    wines: [
      { name: "Menade", variety: "Sauvignon Blanc", type: "dulce", image: foto("menade") },
      { name: "Pancaliente", bodega: "Soto Manrique", type: "dulce", image: foto("pancaliente") },
    ],
  },
];
