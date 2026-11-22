import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cartaGuardada, leerCartaCsv, type Carta } from "@/data/carta";

const celda = (v = "") => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/* La misma forma que tiene la hoja de Google: una fila por plato */
const cartaACsv = (carta: Carta) => {
  const filas = [["Hoja", "Apartado", "Plato", "Precio", "Detalle", "Nota"]];
  carta.forEach((apartados, h) =>
    apartados.forEach((a) =>
      a.platos.forEach((p, i) =>
        filas.push([String(h + 1), a.titulo, p.nombre, p.precio ?? "", p.detalle ?? "", i === 0 ? a.nota ?? "" : ""]),
      ),
    ),
  );
  return filas.map((f) => f.map(celda).join(",")).join("\r\n");
};

describe("leerCartaCsv", () => {
  it("lee la carta tal y como se exporta de la hoja", () => {
    expect(leerCartaCsv(cartaACsv(cartaGuardada))).toEqual(cartaGuardada);
  });

  it("la plantilla para Google Sheets tiene la misma carta que la web", () => {
    const plantilla = readFileSync("plantillas/carta-para-google-sheets.csv", "utf-8").replace(/^﻿/, "");
    expect(leerCartaCsv(plantilla)).toEqual(cartaGuardada);
  });

  it("ignora filas vacías, columnas en otro orden y comillas", () => {
    const csv = [
      "Precio,Plato,Apartado,Hoja",
      '"13€, 22€","Paté ""de campaña""",Para empezar,1',
      ",,,",
      "6€,Flan,Postres,2",
    ].join("\n");
    expect(leerCartaCsv(csv)).toEqual([
      [{ titulo: "Para empezar", platos: [{ nombre: 'Paté "de campaña"', precio: "13€, 22€" }] }],
      [{ titulo: "Postres", platos: [{ nombre: "Flan", precio: "6€" }] }],
    ]);
  });

  it("devuelve vacío si la hoja no tiene las columnas", () => {
    expect(leerCartaCsv("a,b\n1,2")).toEqual([]);
  });
});
