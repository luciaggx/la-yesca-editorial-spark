import arbolSeta from "@/assets/arbol-seta.png";
import DibujoTinta from "@/components/DibujoTinta";
import { irASeccion } from "@/lib/scroll";

/* Portada: ocupa justo una pantalla, sin scroll. Desde aquí se reserva o se ve la carta;
   el resto de secciones se eligen en el menú lateral */
const HeroSection = () => (
  <section className="marco-hero hero-texto h-svh flex flex-col pt-16 overflow-hidden">
    <div className="flex-1 min-h-0 flex flex-col md:grid md:grid-cols-2 md:items-center gap-x-[clamp(24px,5vw,80px)] gap-y-5 pt-6 md:py-6">
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Misma letra que el logo de la barra de arriba */}
        <h1 className="wordmark uppercase whitespace-nowrap text-[clamp(40px,5.2vw,88px)] leading-none">La Yesca</h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <button type="button" onClick={() => irASeccion("reservas")} className="hero-boton">
            Reservar mesa
          </button>
          <button type="button" onClick={() => irASeccion("carta")} className="hero-enlace">
            Ver la carta
          </button>
        </div>
      </div>

      {/* El dibujo se encoge para que todo quepa en la pantalla */}
      <div className="flex-1 min-h-0 md:h-full flex justify-center items-end">
        <DibujoTinta
          src={arbolSeta}
          ancho={600}
          alto={748}
          descripcion="Ilustración de un árbol con el hongo yesca creciendo en el tronco"
          className="block max-w-full max-h-full w-auto h-full md:h-auto md:max-h-[76svh] object-contain cursor-pointer"
        />
      </div>
    </div>

    <div className="hero-pie flex flex-wrap justify-between gap-x-8 gap-y-3 pt-4 pb-5 md:pt-7 md:pb-8">
      <span>Calle San Quintín 4 · San Lorenzo de El Escorial</span>
    </div>
  </section>
);

export default HeroSection;
