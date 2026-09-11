/**
 * BotanicalDecor — enredaderas SVG decorativas saliendo de las esquinas
 * variant="hero"    → tonos crema/blanco sobre fondo oscuro del vídeo
 * variant="section" → tonos verdes sobre fondos claros de sección
 */

interface Props {
  variant?: "hero" | "section";
  className?: string;
}

const BotanicalDecor = ({ variant = "section", className = "" }: Props) => {
  const isHero = variant === "hero";

  const stem    = isHero ? "#e8f0dc" : "#4a7235";
  const leafA   = isHero ? "#d8eccc" : "#5a8a3e";
  const leafB   = isHero ? "#c8e4b8" : "#3c6228";
  const leafC   = isHero ? "#e0f0d0" : "#6fa84a";
  const flower  = isHero ? "#f5ead0" : "#c8a050";
  const center  = isHero ? "#f0d8a0" : "#8b5e1a";
  const vein    = isHero ? "#b0d498" : "#2a4c18";
  const opacity = isHero ? 0.22 : 0.38;

  /* Macro: una hoja apuntando hacia arriba, pivote en la base */
  const Leaf = ({
    x, y, angle, w = 11, h = 30, color = leafA,
  }: { x: number; y: number; angle: number; w?: number; h?: number; color?: string }) => (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <path
        d={`M 0,0 C ${-w},${-(h * 0.32)} ${-(w * 1.18)},${-(h * 0.72)} 0,${-h} C ${w * 1.18},${-(h * 0.72)} ${w},${-(h * 0.32)} 0,0 Z`}
        fill={color}
      />
      <line x1="0" y1="0" x2="0" y2={-h} stroke={vein} strokeWidth="0.7" strokeLinecap="round" />
    </g>
  );

  /* Macro: flor silvestre de 5 pétalos */
  const Flower = ({ x, y, r = 8 }: { x: number; y: number; r?: number }) => (
    <g transform={`translate(${x},${y})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          rx={r * 0.38}
          ry={r}
          cy={-(r * 1.15)}
          fill={flower}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r={r * 0.52} fill={center} />
    </g>
  );

  /* ── Contenido izquierdo (se espeja para la derecha) ── */
  const LeftVines = () => (
    <g>
      {/* Tallo principal */}
      <path
        d="M -15,820 C 55,670 145,560 240,470 C 335,380 420,320 500,265 C 575,215 635,178 670,148"
        stroke={stem} strokeWidth="2.2" fill="none" strokeLinecap="round"
      />
      {/* Rama A — baja hacia la izquierda */}
      <path
        d="M 148,558 C 105,528 68,510 28,492"
        stroke={stem} strokeWidth="1.4" fill="none" strokeLinecap="round"
      />
      {/* Rama B — sube desde el tallo */}
      <path
        d="M 310,402 C 280,362 265,330 268,294"
        stroke={stem} strokeWidth="1.4" fill="none" strokeLinecap="round"
      />
      {/* Rama C — pequeña lateral alta */}
      <path
        d="M 490,278 C 510,248 518,220 510,188"
        stroke={stem} strokeWidth="1.2" fill="none" strokeLinecap="round"
      />
      {/* Zarcillo decorativo */}
      <path
        d="M 580,218 C 600,204 608,186 598,168 C 590,153 602,140 618,138"
        stroke={stem} strokeWidth="1" fill="none" strokeLinecap="round"
      />

      {/* Hojas a lo largo del tallo principal */}
      <Leaf x={88}  y={616} angle={-48} w={13} h={34} color={leafA} />
      <Leaf x={72}  y={608} angle={138} w={10} h={26} color={leafB} />

      <Leaf x={178} y={524} angle={-22} w={12} h={30} color={leafC} />
      <Leaf x={162} y={516} angle={160} w={9}  h={24} color={leafA} />

      <Leaf x={268} y={452} angle={-55} w={11} h={28} color={leafB} />
      <Leaf x={250} y={444} angle={125} w={10} h={26} color={leafC} />

      <Leaf x={355} y={392} angle={-30} w={10} h={25} color={leafA} />
      <Leaf x={338} y={385} angle={148} w={8}  h={20} color={leafB} />

      <Leaf x={430} y={338} angle={-60} w={9}  h={22} color={leafC} />
      <Leaf x={415} y={330} angle={118} w={8}  h={19} color={leafA} />

      <Leaf x={510} y={275} angle={-35} w={8}  h={20} color={leafB} />
      <Leaf x={498} y={268} angle={145} w={7}  h={17} color={leafC} />

      <Leaf x={575} y={228} angle={-52} w={7}  h={17} color={leafA} />
      <Leaf x={562} y={220} angle={130} w={6}  h={15} color={leafB} />

      {/* Hojas en las ramas */}
      <Leaf x={68}  y={512} angle={-120} w={9} h={22} color={leafC} />
      <Leaf x={42}  y={498} angle={-145} w={7} h={18} color={leafA} />

      <Leaf x={274} y={340} angle={-85} w={8} h={20} color={leafB} />
      <Leaf x={270} y={308} angle={-70} w={6} h={15} color={leafC} />

      <Leaf x={516} y={210} angle={-40} w={6} h={14} color={leafA} />
      <Leaf x={512} y={192} angle={-65} w={5} h={12} color={leafB} />

      {/* Flores */}
      <Flower x={195} y={490} r={9} />
      <Flower x={395} y={358} r={7} />
      <Flower x={555} y={240} r={6} />
    </g>
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 800"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity={opacity}>
          {/* Enredadera izquierda */}
          <LeftVines />

          {/* Enredadera derecha — espejo horizontal */}
          <g transform="translate(1440,0) scale(-1,1)">
            <LeftVines />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BotanicalDecor;
