/* Cada sección se abre sola en su propia pantalla (/#carta, /#reservas…); "inicio" vuelve a la portada */
export const irASeccion = (id: string) => {
  window.location.hash = id;
};
