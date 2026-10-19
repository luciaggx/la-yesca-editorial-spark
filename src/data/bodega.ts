/* Vinos de La Bodega: se usan en la sección La Bodega (fotos y precios)
   y en la pestaña Vinos de la carta (solo nombres). */

export type WineType = "espumoso" | "blanco" | "rosado" | "tinto" | "dulce";

export interface Wine {
  name: string;
  bodega: string;
  variety: string;
  origin: string;
  type: WineType;
  glass?: string;
  bottle: string;
  /* Foto real del vino: importarla de src/assets y ponerla aquí.
     Sin foto se muestra una botella dibujada. */
  image?: string;
}

export interface WineCategory {
  title: string;
  wines: Wine[];
}

/* ── Ejemplos inventados: sustituir por los vinos reales ── */
export const bodegaData: WineCategory[] = [
  {
    title: "Espumosos",
    wines: [
      { name: "Brut Nature de la Sierra", bodega: "Cava Los Abantos", variety: "Xarel·lo, Macabeo", origin: "Penedès", type: "espumoso", glass: "6", bottle: "29" },
    ],
  },
  {
    title: "Blancos",
    wines: [
      { name: "Piedra Caballera", bodega: "Viñas del Alberche", variety: "Albillo Real", origin: "Sierra de Gredos", type: "blanco", glass: "5", bottle: "24" },
      { name: "Rías del Norte", bodega: "Pazo da Néboa", variety: "Albariño", origin: "Rías Baixas", type: "blanco", glass: "5.5", bottle: "27" },
    ],
  },
  {
    title: "Rosados",
    wines: [
      { name: "Rosa de Monte", bodega: "Bodegas Larraga", variety: "Garnacha", origin: "Navarra", type: "rosado", glass: "4.5", bottle: "21" },
    ],
  },
  {
    title: "Tintos",
    wines: [
      { name: "La Yesca", bodega: "Vino de la casa", variety: "Garnacha", origin: "Sierra de Guadarrama", type: "tinto", glass: "4", bottle: "18" },
      { name: "Pino Negro", bodega: "Bodegas Valdeolmos", variety: "Tempranillo", origin: "Ribera del Duero", type: "tinto", glass: "6", bottle: "34" },
      { name: "Cerro del Ciervo", bodega: "Finca El Raso", variety: "Syrah, Garnacha", origin: "Vinos de Madrid", type: "tinto", bottle: "42" },
    ],
  },
  {
    title: "Dulces",
    wines: [
      { name: "Miel de Otoño", bodega: "Bodegas Axarquía", variety: "Moscatel", origin: "Málaga", type: "dulce", glass: "6", bottle: "30" },
    ],
  },
];
