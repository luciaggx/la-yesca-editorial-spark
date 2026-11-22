import arbolSeta from "@/assets/arbol-seta.png";
import DibujoTinta from "@/components/DibujoTinta";
import { irASeccion } from "@/lib/scroll";

const HeroSection = () => (
  <section className="marco-hero hero-texto flex flex-col md:min-h-svh pt-16">
    {/* Portada sencilla: el nombre y el dibujo de la yesca */}
    <div className="flex-1 grid md:grid-cols-2 items-center gap-x-[clamp(24px,5vw,80px)] gap-y-6 py-6 md:py-0">
      <div className="flex flex-col gap-7 md:gap-10">
        {/* Misma letra que el logo de la barra de arriba */}
        <h1 className="wordmark uppercase whitespace-nowrap text-[clamp(40px,5.2vw,88px)] leading-none">La Yesca</h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Sin href="#...": #carta abre la vista "solo carta" del QR */}
          <button type="button" onClick={() => irASeccion("reservas")} className="hero-boton">
            Reservar mesa
          </button>
          <button type="button" onClick={() => irASeccion("carta")} className="hero-enlace">
            Ver la carta
          </button>
        </div>
      </div>

      <div className="flex justify-center items-end md:self-stretch md:pt-2">
        <DibujoTinta
          src={arbolSeta}
          ancho={600}
          alto={748}
          descripcion="Ilustración de un árbol con el hongo yesca creciendo en el tronco"
          className="block w-full h-auto max-w-[260px] md:max-w-[600px] max-h-[76vh] object-contain cursor-pointer"
        />
      </div>
    </div>

    <div className="hero-pie flex flex-wrap justify-between gap-x-8 gap-y-3 pt-5 pb-5 md:pt-7 md:pb-8">
      <span>Calle San Quintín 4 · San Lorenzo de El Escorial</span>
    </div>
  </section>
);

export default HeroSection;
