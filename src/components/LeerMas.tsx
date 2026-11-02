interface LeerMasProps {
  abierto: boolean;
  onToggle: () => void;
}

/* Solo en móvil: despliega el texto que allí queda plegado para no alargar la página */
const LeerMas = ({ abierto, onToggle }: LeerMasProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-expanded={abierto}
    className="md:hidden enlace texto-cuerpo text-left"
  >
    {abierto ? "Leer menos" : "Leer más"}
  </button>
);

export default LeerMas;
