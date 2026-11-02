import arbolSeta from "@/assets/arbol-seta.png";
import { irASeccion } from "@/lib/scroll";
import Reveal from "./Reveal";

interface FooterSectionProps {
  onOpenLegal: (type: "privacidad" | "cookies") => void;
}

const menu = [
  { label: "La Carta", id: "carta" },
  { label: "La Bodega", id: "bodega" },
  { label: "Regala La Yesca", id: "regala" },
  { label: "Eventos", id: "eventos" },
  { label: "Reservas", id: "reservas" },
];

const FooterSection = ({ onOpenLegal }: FooterSectionProps) => (
  <footer id="contacto">
    <div className="seccion bg-tono">
      <div className="marco grid md:grid-cols-12 gap-x-6 gap-y-12 md:items-start">
        <Reveal className="md:col-span-5">
          <h2 className="texto-titulo mb-8">¿Dónde estamos?</h2>
          <p className="texto-cuerpo mb-8">
            La Yesca está en pleno corazón de San Lorenzo de El Escorial, escondida en un
            pequeño callejón de granito, justo detrás del mercado municipal. Un rincón con
            encanto, rodeado de historia y con ese carácter tan especial de nuestro pueblo,
            donde tradición y vida cotidiana se encuentran.
          </p>
          <p className="texto-lead">Calle San Quintín, 4</p>
          <p className="texto-cuerpo mb-6">28200 San Lorenzo de El Escorial, Madrid</p>
          <a href="mailto:layescataberna@gmail.com" className="enlace texto-cuerpo">
            layescataberna@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <iframe
            title="Ubicación La Yesca"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.8!2d-4.1478!3d40.5894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4000000000000%3A0x0!2sC.+San+Quint%C3%ADn%2C+4%2C+28200+San+Lorenzo+de+El+Escorial%2C+Madrid!5e0!3m2!1ses!2ses!4v1700000000000"
            width="100%"
            height="460"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[320px] md:h-[460px]"
          />
        </Reveal>
      </div>
    </div>

    {/* Cierre: la página acaba como empieza, con el verde y la seta del inicio */}
    <div className="marco-hero hero-texto bg-background">
      <div className="pt-[clamp(56px,7vw,112px)] pb-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
        <Reveal>
          <p className="text-[clamp(44px,5.3vw,84px)] leading-none tracking-[-0.015em] mb-5">Taberna o viceversa</p>
          <p className="hero-lead mb-9">Cocina de fuego y tradición</p>
          <button type="button" onClick={() => irASeccion("reservas")} className="hero-boton">
            Reservar mesa
          </button>
        </Reveal>
        <Reveal delay={0.1} className="w-[190px] md:w-[250px] shrink-0">
          <img src={arbolSeta} alt="" width={600} height={748} loading="lazy" className="w-full h-auto" />
        </Reveal>
      </div>

      <div className="hero-pie flex flex-wrap justify-between gap-x-10 gap-y-4 py-7">
        <nav aria-label="Secciones" className="flex flex-wrap gap-x-8 gap-y-3">
          {menu.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => irASeccion(item.id)}
              className="uppercase tracking-[inherit] transition-colors hover:text-[#4A5530]"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <a href="mailto:layescataberna@gmail.com" className="transition-colors hover:text-[#4A5530]">Contacto</a>
          <a href="#" className="transition-colors hover:text-[#4A5530]">Instagram</a>
        </div>
      </div>

      <div className="border-t border-[#1A1D15]/20 pt-6 pb-8 texto-small flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <p>© {new Date().getFullYear()} La Yesca</p>
          <button type="button" onClick={() => onOpenLegal("privacidad")} className="enlace">
            Política de Privacidad
          </button>
          <button type="button" onClick={() => onOpenLegal("cookies")} className="enlace">
            Política de Cookies
          </button>
        </div>
        <p className="opacity-75">
          Grabados de dominio público de la Library of Congress, vía Wikimedia Commons:{" "}
          <a className="enlace" href="https://commons.wikimedia.org/wiki/File:The_Stag,_or_Red_Deer_LCCN2007681452.jpg" target="_blank" rel="noopener noreferrer">The Stag, or Red Deer</a>
          {" y "}
          <a className="enlace" href="https://commons.wikimedia.org/wiki/File:Vista_del_patio_de_los_reyes_en_el_real_monasterio_de_San_Lorenzo_del_escorial_mirado_desde_el_portico_LCCN2003673045.tif" target="_blank" rel="noopener noreferrer">Vista del patio de los reyes</a>.
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
