import { useEffect, useState } from "react";
import { CARTA_CSV_URL, cartaGuardada, leerCartaCsv, type Carta } from "@/data/carta";

const CLAVE = "la-yesca-carta";

/* Última carta leída de la hoja en este navegador, para no enseñar una antigua mientras carga */
const leerUltima = (): Carta | null => {
  try {
    const guardada = localStorage.getItem(CLAVE);
    return guardada ? JSON.parse(guardada) : null;
  } catch {
    return null;
  }
};

/* La carta de la hoja de Google; si no hay enlace o falla, la copia de la web */
export const useCarta = (): Carta => {
  const [carta, setCarta] = useState<Carta>(() => (CARTA_CSV_URL && leerUltima()) || cartaGuardada);

  useEffect(() => {
    if (!CARTA_CSV_URL) return;
    let activo = true;

    fetch(CARTA_CSV_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((csv) => {
        const nueva = leerCartaCsv(csv).filter((hoja) => hoja.length);
        if (!activo || !nueva.length) return;
        setCarta(nueva);
        try { localStorage.setItem(CLAVE, JSON.stringify(nueva)); } catch { /* sin almacenamiento */ }
      })
      .catch(() => { /* se queda la carta que ya se ve */ });

    return () => { activo = false; };
  }, []);

  return carta;
};
