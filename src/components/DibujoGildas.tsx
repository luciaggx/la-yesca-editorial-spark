/* Dos gildas de pato a línea, con el trazo de los dibujos de Eventos */
const ACEITUNA = "#7E9A45";
const PIPARRA = "#B5BE5A";
const PATO = "#C27A80";
const GRASA = "#E6BDB8";

const Aceituna = ({ y }: { y: number }) => (
  <ellipse cx={0} cy={y} rx={6} ry={7.5} fill={ACEITUNA} />
);

const Gilda = ({ transform }: { transform: string }) => (
  <g transform={transform}>
    <path d="M0 0 L0.4 100" />
    <Aceituna y={14} />
    <path d="M-3 22 C6 24 9.5 35 5.5 48 C3.5 52 0 50.5 1 46 C4 38 2 30 -3 26.5 Z" fill={PIPARRA} />
    {/* Loncha de pato doblada en ola: la grasa como una línea clara en el centro */}
    <path d="M-9 56 C-4 50.5 4 50.5 9 56 C4 61.5 -4 61.5 -9 67 C-4 72.5 4 72.5 9.5 67" stroke={PATO} strokeWidth={6} />
    <path d="M-9 56 C-4 50.5 4 50.5 9 56 C4 61.5 -4 61.5 -9 67 C-4 72.5 4 72.5 9.5 67" stroke={GRASA} strokeWidth={1.4} />
    <Aceituna y={83} />
  </g>
);

const DibujoGildas = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 124"
    className={className}
    fill="none"
    stroke="#1A1D15"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Dibujo de dos gildas de pato"
  >
    <Gilda transform="translate(50 8) rotate(16)" />
    <Gilda transform="translate(96 10) rotate(16)" />
  </svg>
);

export default DibujoGildas;
