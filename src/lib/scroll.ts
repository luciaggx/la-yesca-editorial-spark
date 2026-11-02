/* Baja hasta una sección sin tocar el hash: #carta abre la vista "solo carta" del QR */
export const irASeccion = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
