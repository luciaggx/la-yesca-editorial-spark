import arbolSeta from "@/assets/arbol-seta.png";
import DibujoTinta from "@/components/DibujoTinta";
import { irASeccion } from "@/lib/scroll";

const HeroSection = () => (
  <section className="marco-hero hero-texto flex flex-col md:min-h-svh pt-16">
    {/* En móvil: título arriba, párrafo y dibujo en paralelo, botones debajo */}
    <div className="flex-1 grid grid-cols-[minmax(0,1fr)_46%] md:grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] content-center md:content-normal items-center gap-x-3 md:gap-x-[clamp(24px,5vw,80px)] gap-y-5 md:gap-y-6 py-5 md:py-0">
      <div className="contents md:flex md:flex-col md:gap-9 md:max-w-[620px] md:py-6">
        <h1 className="hero-titulo col-span-2">
          La Yesca,<br />taberna de caza
        </h1>

        <p className="hero-lead col-start-1 row-start-2">
          Cocina de fuego y tradición en un rincón de San Lorenzo de El Escorial.
        </p>

        <div className="col-span-2 row-start-3 flex flex-wrap items-center gap-x-8 gap-y-4 md:pt-2">
          {/* Sin href="#...": #carta abre la vista "solo carta" del QR */}
          <button type="button" onClick={() => irASeccion("reservas")} className="hero-boton">
            Reservar mesa
          </button>
          <button type="button" onClick={() => irASeccion("carta")} className="hero-enlace">
            Ver la carta
          </button>
        </div>
      </div>

      <div className="col-start-2 row-start-2 md:col-start-auto md:row-start-auto flex justify-center items-end md:self-stretch md:pt-2">
        <DibujoTinta
          src={arbolSeta}
          ancho={600}
          alto={748}
          descripcion="Ilustración de un árbol con el hongo yesca creciendo en el tronco"
          className="block w-full h-auto max-w-[600px] max-h-[76vh] object-contain cursor-pointer"
        />
      </div>
    </div>

    <div className="hero-pie flex flex-wrap justify-between gap-x-8 gap-y-3 pt-5 pb-5 md:pt-7 md:pb-8">
      <span>Calle San Quintín 4 · San Lorenzo de El Escorial</span>
      <span>Taberna o viceversa</span>
    </div>
  </section>
);

export default HeroSection;
