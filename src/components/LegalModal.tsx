import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
  type: "privacidad" | "cookies" | null;
}

const privacidadContent = (
  <>
    <h2 className="font-display text-2xl mb-6">Política de Privacidad</h2>

    <p className="mb-4">En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD), le informamos de cómo tratamos los datos personales que nos facilita a través de esta página web.</p>

    <h3 className="font-semibold text-base mb-2 mt-6">1. Responsable del tratamiento</h3>
    <p className="mb-4">
      <strong>La Yesca Taberna o Viceversa, S.L.</strong><br />
      Calle San Quintín, 4 — 28200 San Lorenzo de El Escorial, Madrid<br />
      Email: info@layesca.com
    </p>

    <h3 className="font-semibold text-base mb-2 mt-6">2. Finalidad del tratamiento</h3>
    <p className="mb-2">Los datos que nos facilite se utilizarán únicamente para:</p>
    <ul className="list-disc pl-5 mb-4 space-y-1">
      <li>Gestionar sus reservas de mesa y atender su solicitud.</li>
      <li>Responder a consultas enviadas a través del formulario de contacto o por correo electrónico.</li>
      <li>Gestionar la compra de bonos regalo ("Regala La Yesca"), cuando aplique.</li>
    </ul>

    <h3 className="font-semibold text-base mb-2 mt-6">3. Legitimación</h3>
    <p className="mb-4">La base legal para el tratamiento es la ejecución de una relación precontractual o contractual (gestión de reservas y bonos) y el consentimiento expreso del interesado en el caso de comunicaciones.</p>

    <h3 className="font-semibold text-base mb-2 mt-6">4. Conservación de datos</h3>
    <p className="mb-4">Sus datos se conservarán durante el tiempo necesario para la finalidad para la que fueron recogidos y, en todo caso, durante los plazos legalmente establecidos.</p>

    <h3 className="font-semibold text-base mb-2 mt-6">5. Destinatarios</h3>
    <p className="mb-4">No cedemos sus datos a terceros salvo obligación legal. El proveedor de alojamiento web puede tener acceso a los datos de navegación con fines técnicos, estando sujeto a las garantías del RGPD.</p>

    <h3 className="font-semibold text-base mb-2 mt-6">6. Derechos del interesado</h3>
    <p className="mb-2">Puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento escribiendo a:</p>
    <p className="mb-4"><strong>info@layesca.com</strong></p>
    <p className="mb-4">Si considera que el tratamiento no es conforme a la normativa, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
  </>
);

const cookiesContent = (
  <>
    <h2 className="font-display text-2xl mb-6">Política de Cookies</h2>

    <p className="mb-4">Esta página web utiliza cookies y tecnologías similares. Le explicamos qué son, cuáles usamos y cómo puede gestionarlas.</p>

    <h3 className="font-semibold text-base mb-2 mt-6">¿Qué son las cookies?</h3>
    <p className="mb-4">Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten recordar sus preferencias y mejorar su experiencia de navegación.</p>

    <h3 className="font-semibold text-base mb-2 mt-6">Cookies que utilizamos</h3>

    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-foreground/20">
            <th className="text-left py-2 pr-4 font-semibold">Tipo</th>
            <th className="text-left py-2 pr-4 font-semibold">Finalidad</th>
            <th className="text-left py-2 font-semibold">Duración</th>
          </tr>
        </thead>
        <tbody className="text-foreground/70">
          <tr className="border-b border-foreground/10">
            <td className="py-2 pr-4 font-medium text-foreground">Técnicas / esenciales</td>
            <td className="py-2 pr-4">Necesarias para el funcionamiento básico del sitio. No requieren consentimiento.</td>
            <td className="py-2">Sesión</td>
          </tr>
          <tr className="border-b border-foreground/10">
            <td className="py-2 pr-4 font-medium text-foreground">Preferencias</td>
            <td className="py-2 pr-4">Guardan sus preferencias de cookies para no volver a mostrar el aviso.</td>
            <td className="py-2">1 año</td>
          </tr>
          <tr className="border-b border-foreground/10">
            <td className="py-2 pr-4 font-medium text-foreground">Google Maps</td>
            <td className="py-2 pr-4">El mapa integrado puede generar cookies de terceros (Google LLC) para funcionar correctamente.</td>
            <td className="py-2">Variable</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="font-semibold text-base mb-2 mt-6">¿Cómo gestionar las cookies?</h3>
    <p className="mb-4">Puede retirar su consentimiento en cualquier momento eliminando las cookies desde la configuración de su navegador. Tenga en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del sitio.</p>

    <ul className="list-disc pl-5 mb-4 space-y-1 text-sm text-foreground/70">
      <li><strong className="text-foreground">Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
      <li><strong className="text-foreground">Firefox:</strong> Opciones → Privacidad y seguridad</li>
      <li><strong className="text-foreground">Safari:</strong> Preferencias → Privacidad</li>
    </ul>

    <h3 className="font-semibold text-base mb-2 mt-6">Más información</h3>
    <p className="mb-4">Para cualquier consulta sobre el uso de cookies puede contactarnos en <strong>info@layesca.com</strong>. Esta política puede actualizarse; le recomendamos revisarla periódicamente.</p>
  </>
);

const LegalModal = ({ open, onClose, type }: LegalModalProps) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-0 top-16 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-[91] bg-background border border-foreground/10 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10 flex-shrink-0">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50">
                {type === "privacidad" ? "Política de Privacidad" : "Política de Cookies"}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-sm text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-6 py-6 text-sm text-foreground/80 leading-relaxed">
              {type === "privacidad" ? privacidadContent : cookiesContent}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
