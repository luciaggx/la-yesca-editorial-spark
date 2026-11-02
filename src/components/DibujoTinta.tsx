import { useEffect, useRef } from "react";

type Orden = "trazo" | "barrido";

const FUNDIDO = 0.12;
const P_FINAL = 1.2;

/* Value noise de celda 24px y semilla fija: el dibujo crece siempre igual */
const crearRuido = (W: number, H: number) => {
  const g = 24;
  const gw = Math.ceil(W / g) + 2;
  const gh = Math.ceil(H / g) + 2;
  const rnd = new Float32Array(gw * gh);
  let s = 7;
  for (let i = 0; i < rnd.length; i++) {
    s = (s * 16807) % 2147483647;
    rnd[i] = s / 2147483647;
  }

  return (x: number, y: number) => {
    const fx = x / g, fy = y / g;
    const ix = fx | 0, iy = fy | 0;
    const u = fx - ix, v = fy - iy;
    const a = rnd[iy * gw + ix];
    const b = rnd[iy * gw + ix + 1];
    const c = rnd[(iy + 1) * gw + ix];
    const e = rnd[(iy + 1) * gw + ix + 1];
    const su = u * u * (3 - 2 * u);
    const sv = v * v * (3 - 2 * v);
    return a + (b - a) * su + (c - a) * sv + (a - b - c + e) * su * sv;
  };
};

/* Momento de aparición de cada píxel, de 0 a 1. En "trazo" crece de abajo arriba,
   desde el centro hacia fuera y con los trazos oscuros antes que el sombreado */
const calcularTiempos = (A: Float32Array, W: number, H: number, orden: Orden) => {
  const T = new Float32Array(W * H);
  const ruido = crearRuido(W, H);
  const cx = W / 2;
  let min = Infinity, max = -Infinity;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const subida = 1 - y / H;
      const lateral = Math.abs(x - cx) / cx;
      const v = orden === "barrido"
        ? subida * 0.8 + lateral * 0.08 + ruido(x, y) * 0.12
        : subida * 0.45 + lateral * 0.1 + (1 - A[i]) * 0.35 + ruido(x, y) * 0.18;
      T[i] = v;
      if (A[i] > 0.02) {
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
  }

  for (let i = 0; i < T.length; i++) T[i] = (T[i] - min) / (max - min);
  return T;
};

interface DibujoTintaProps {
  /* Imagen con la tinta en el canal alfa */
  src: string;
  ancho: number;
  alto: number;
  descripcion: string;
  tinta?: string;
  /* Espera a que el dibujo entre en pantalla para empezar */
  alVerse?: boolean;
  /* Segundos que tarda en dibujarse */
  duracion?: number;
  orden?: Orden;
  className?: string;
}

/* Un grabado que se va dibujando sobre el fondo; clic en el dibujo para repetirlo */
const DibujoTinta = ({
  src, ancho, alto, descripcion, tinta = "#1E2618", alVerse = false, duracion = 6, orden = "trazo", className,
}: DibujoTintaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dibujarRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    const img = new Image();
    const color = [1, 3, 5].map((k) => parseInt(tinta.slice(k, k + 2), 16));

    img.onload = () => {
      const W = img.naturalWidth, H = img.naturalHeight;
      canvas.width = W;
      canvas.height = H;

      const lectura = document.createElement("canvas");
      lectura.width = W;
      lectura.height = H;
      const lecturaCtx = lectura.getContext("2d");
      if (!lecturaCtx) return;
      lecturaCtx.drawImage(img, 0, 0);
      const origen = lecturaCtx.getImageData(0, 0, W, H).data;

      const A = new Float32Array(W * H);
      for (let i = 0; i < A.length; i++) A[i] = origen[i * 4 + 3] / 255;

      const T = calcularTiempos(A, W, H, orden);
      const salida = ctx.createImageData(W, H);

      const pintar = (p: number) => {
        const o = salida.data;
        for (let i = 0; i < A.length; i++) {
          const j = i * 4;
          if (A[i] < 0.01) {
            o[j + 3] = 0;
            continue;
          }
          let k = (p - T[i]) / FUNDIDO;
          k = k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k);
          o[j] = color[0];
          o[j + 1] = color[1];
          o[j + 2] = color[2];
          o[j + 3] = A[i] * k * 255;
        }
        ctx.putImageData(salida, 0, 0);
      };

      const dibujar = () => {
        cancelAnimationFrame(raf);
        const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const p = sinMovimiento
            ? P_FINAL
            : Math.min(P_FINAL, ((ahora - inicio) / (duracion * 1000)) * P_FINAL);
          pintar(p);
          if (p < P_FINAL) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      };

      dibujarRef.current = dibujar;
      dibujar();
    };

    let observador: IntersectionObserver | undefined;
    if (alVerse) {
      observador = new IntersectionObserver(([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador?.disconnect();
        img.src = src;
      }, { threshold: 0.25 });
      observador.observe(canvas);
    } else {
      img.src = src;
    }

    return () => {
      observador?.disconnect();
      img.onload = null;
      cancelAnimationFrame(raf);
      dibujarRef.current = () => {};
    };
  }, [src, tinta, alVerse, duracion, orden]);

  return (
    <canvas
      ref={canvasRef}
      width={ancho}
      height={alto}
      role="img"
      aria-label={descripcion}
      title="Volver a dibujar"
      onClick={() => dibujarRef.current()}
      className={className}
    />
  );
};

export default DibujoTinta;
