import patioDeLosReyes from "@/assets/mundo/patio-de-los-reyes.jpg";
import Reveal from "./Reveal";

const eventos = [
  {
    titulo: "Celebraciones y cumpleaños",
    descripcion:
      "Celebra lo que merece ser celebrado. Te diseñamos un menú a medida para que el día sea único, con los sabores del monte y la brasa como protagonistas.",
  },
  {
    titulo: "Cenas privadas",
    descripcion:
      "El espacio solo para vosotros. Una experiencia íntima con menú cerrado, selección de vinos y atención exclusiva para grupos de hasta 30 personas.",
  },
  {
    titulo: "Eventos de empresa",
    descripcion:
      "Comidas de trabajo, presentaciones o team buildings con el carácter de La Yesca. Gastronomía que genera conversación y crea vínculos.",
  },
];

const EventosSection = () => (
  <section id="eventos" className="seccion bg-tono">
    <div className="marco">
      <Reveal>
        <h2 className="texto-titulo md:pl-[3vw] mb-4">Eventos La Yesca</h2>
        <p className="texto-lead md:pl-[3vw]">Momentos que merecen algo más que una comida</p>
      </Reveal>

      <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-x-6 gap-y-12 md:items-end">
        <Reveal delay={0.1} className="order-2 md:order-1 md:col-span-4 w-3/5 ml-auto md:w-auto md:ml-0">
          <img
            src={patioDeLosReyes}
            alt="Grabado antiguo del Patio de los Reyes del monasterio de San Lorenzo de El Escorial"
            loading="lazy"
            className="w-full aspect-[4/5] object-cover"
          />
        </Reveal>

        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7 space-y-10">
          {eventos.map((ev, i) => (
            <Reveal key={ev.titulo} delay={0.1 + i * 0.08}>
              <h3 className="texto-subtitulo mb-2">{ev.titulo}</h3>
              <p className="texto-cuerpo">{ev.descripcion}</p>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <a href="mailto:layescataberna@gmail.com" className="boton">
              Consultar disponibilidad
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default EventosSection;
