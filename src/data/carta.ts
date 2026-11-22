/* La carta se edita en una hoja de Google (columnas: Hoja, Apartado, Plato, Precio, Detalle, Nota).
   Pega aquí el enlace CSV de "Archivo → Compartir → Publicar en la web".
   Si está vacío o la hoja no responde, se muestra `cartaGuardada`. */
export const CARTA_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcMiwINh-3fXqnj-aSTjuuMM_PlLECspVNZDbP_5nNhQLqVCsCCSXUsNKUl72N5vk7uIylm9Sziai8/pub?gid=1137743523&single=true&output=csv";

export interface Plato {
  nombre: string;
  precio?: string;
  detalle?: string;   /* línea pequeña debajo (p. ej. bodega de un vino) */
}

export interface Apartado {
  titulo: string;
  platos: Plato[];
  nota?: string;
}

export type Carta = Apartado[][];

/* Lee el CSV de la hoja y lo convierte en hojas → apartados → platos, en el orden de las filas */
export const leerCartaCsv = (csv: string): Carta => {
  const filas = parseCsv(csv);
  const cabecera = (filas.shift() ?? []).map((c) => c.trim().toLowerCase());
  const col = (nombre: string) => cabecera.indexOf(nombre);
  const [cHoja, cApartado, cPlato, cPrecio, cDetalle, cNota] =
    ["hoja", "apartado", "plato", "precio", "detalle", "nota"].map(col);
  if (cApartado < 0 || cPlato < 0) return [];

  const hojas = new Map<number, Apartado[]>();
  for (const fila of filas) {
    const valor = (i: number) => (i >= 0 ? (fila[i] ?? "").trim() : "");
    const titulo = valor(cApartado);
    if (!titulo) continue;

    const numero = parseInt(valor(cHoja), 10) || 1;
    const apartados = hojas.get(numero) ?? [];
    hojas.set(numero, apartados);

    let apartado = apartados.find((a) => a.titulo === titulo);
    if (!apartado) {
      apartado = { titulo, platos: [] };
      apartados.push(apartado);
    }

    const nota = valor(cNota);
    if (nota) apartado.nota = nota;

    const nombre = valor(cPlato);
    if (nombre) {
      apartado.platos.push({
        nombre,
        precio: valor(cPrecio) || undefined,
        detalle: valor(cDetalle) || undefined,
      });
    }
  }

  return [...hojas.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, apartados]) => apartados.filter((a) => a.platos.length));
};

/* CSV con comillas, comas y saltos de línea dentro de las celdas */
const parseCsv = (texto: string): string[][] => {
  const filas: string[][] = [];
  let fila: string[] = [];
  let celda = "";
  let entreComillas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreComillas) {
      if (c === '"' && texto[i + 1] === '"') { celda += '"'; i++; }
      else if (c === '"') entreComillas = false;
      else celda += c;
    } else if (c === '"') entreComillas = true;
    else if (c === ",") { fila.push(celda); celda = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(celda); filas.push(fila);
      fila = []; celda = "";
    } else celda += c;
  }
  if (celda || fila.length) { fila.push(celda); filas.push(fila); }
  return filas;
};

/* Copia de la carta dentro de la web: se usa mientras carga la hoja o si falla */
export const cartaGuardada: Carta = [
  [
    {
      titulo: "Para empezar",
      platos: [
        { nombre: "Paté de campaña (pato y faisán)", precio: "13€ / 22€" },
        { nombre: "Codorniz en escabeche", precio: "9€ / 15€" },
        { nombre: "Gilda de pato", precio: "3,80€" },
        { nombre: "Ensaladilla, perdiz, piparras", precio: "3,50€ / 8€ / 15€" },
        { nombre: "Croquetas de jamón hechas en casa", precio: "2,80€ / (6 und) 15€" },
        { nombre: "Ensalada de pimientos asados y bacalao", precio: "13€ / 24€" },
        { nombre: "Antxoa y mantequilla", precio: "4€" },
        { nombre: "Trucha, mantequilla con encurtidos", precio: "4€" },
        { nombre: "Salmorejo, tomates y queso de La Cabezuela", precio: "14€" },
      ],
    },
    {
      titulo: "Del terruño",
      platos: [
        { nombre: "Albóndigas de corzo", precio: "13€ / 25€" },
        { nombre: "Jarrete de ciervo", precio: "21€" },
        { nombre: "Lomo de venado a la brasa", precio: "27€" },
        { nombre: "Perdiz (guiso y brasa)", precio: "27€" },
        { nombre: "Chuletillas de jabalí a la brasa", precio: "24€" },
        { nombre: "Ancas de rana a la brasa", precio: "19€" },
        { nombre: "Lentejas con pato azulón", precio: "30€" },
        { nombre: "Pluma ibérica de bellota a la brasa", precio: "26€" },
      ],
    },
    {
      titulo: "Esta semana y hasta acabar existencias",
      platos: [
        { nombre: "Bacalao a la brasa con piperrada", precio: "21€" },
        { nombre: "Setas a la segoviana", precio: "16€" },
        { nombre: "Callos de La Yesca", precio: "23€" },
      ],
      nota: "Pan del obrador de Abantos con mantequilla · 2€",
    },
  ],
  [
    {
      titulo: "Para rematar",
      platos: [
        { nombre: "Flan con nata", precio: "6€" },
        { nombre: "Tarta de queso con fresas", precio: "7€" },
        { nombre: "Helado de boletus y tierra de bellota", precio: "9€" },
        { nombre: "Tabla de quesos de La Cabezuela", precio: "14€ / 26€" },
      ],
    },
    {
      titulo: "Cafés",
      platos: [
        { nombre: "Café solo / cortado", precio: "2,30€" },
        { nombre: "Café con leche de vaca / americano", precio: "2,50€" },
        { nombre: "Café doble carga", precio: "4,60€" },
      ],
    },
    {
      titulo: "Licores caseros",
      platos: [
        { nombre: "Recolectados y macerados en casa", precio: "4€" },
      ],
    },
    {
      titulo: "Vinos dulces",
      platos: [
        { nombre: "Pan Caliente", precio: "6€", detalle: "Jesús Soto · Soto Manrique · Ávila · Albillo Real" },
        { nombre: "Sauvignon Dulce Menade", precio: "6€", detalle: "Familia Sanz · Menade · Valladolid · Sauvignon Blanc" },
        { nombre: "Uretzi", precio: "7€", detalle: "Garikoitz Ríos · Itsasmendi · Vizcaya · Hondarrabi Zuri Zerratie" },
      ],
    },
    {
      titulo: "Combinados",
      platos: [
        { nombre: "Combinados", precio: "9€" },
        { nombre: "Combinados premium", precio: "12€" },
      ],
    },
  ],
];
