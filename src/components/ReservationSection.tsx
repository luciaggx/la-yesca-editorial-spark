import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarIcon, Clock, Users, User, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const timeSlots = [
  "13:00", "13:30", "14:00", "14:30", "15:00",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const guestOptions = [1, 2, 3, 4, 5];

const ReservationSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !phone || !email) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, rellena todos los campos para reservar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("date", format(date, "d 'de' MMMM, yyyy", { locale: es }));
      formData.append("time", time);
      formData.append("guests", guests.toString());
      formData.append("_subject", `Nueva reserva: ${name} - ${format(date, "d/MM/yyyy")} a las ${time}`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/ajax/luciaggx4@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "¡Reserva recibida!",
          description: `Reserva para ${guests} persona${guests > 1 ? "s" : ""} el ${format(date, "d 'de' MMMM", { locale: es })} a las ${time}. Te confirmaremos por email.`,
        });
        setDate(undefined);
        setTime("");
        setGuests(2);
        setName("");
        setPhone("");
        setEmail("");
      } else {
        throw new Error("Error al enviar");
      }
    } catch {
      toast({
        title: "Error al enviar",
        description: "No se pudo enviar la reserva. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Parchment palette for this section */
  const parchment = "hsl(43,40%,88%)";
  const inkDark   = "hsl(40,18%,20%)";
  const borderClr = "hsl(35,25%,65%)";

  return (
    <section
      id="reservas"
      ref={ref}
      style={{ backgroundColor: parchment }}
      className="pt-4 pb-20 md:pb-28"
    >
      <div className="max-w-2xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="font-display text-3xl md:text-4xl tracking-wide mb-3"
            style={{ color: inkDark }}
          >
            Reservas
          </h2>
          <div className="h-px w-16 mx-auto" style={{ backgroundColor: "hsl(30,30%,45%)" }} />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 rounded-sm p-6 md:p-10"
          style={{
            backgroundColor: "hsl(40,30%,82%)",
            border: `1px solid ${borderClr}`,
          }}
        >
          {/* Date & Time row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date picker */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: inkDark }}
              >
                <CalendarIcon className="w-4 h-4" /> Fecha
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal")}
                    style={{
                      backgroundColor: parchment,
                      border: `1px solid ${borderClr}`,
                      color: date ? inkDark : "hsl(40,15%,50%)",
                    }}
                  >
                    {date ? format(date, "d 'de' MMMM, yyyy", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date() || d.getDay() === 2 || d.getDay() === 3}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time selector */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: inkDark }}
              >
                <Clock className="w-4 h-4" /> Hora
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    style={{
                      backgroundColor: parchment,
                      border: `1px solid ${borderClr}`,
                      color: time ? inkDark : "hsl(40,15%,50%)",
                    }}
                  >
                    {time || "Seleccionar hora"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="start">
                  <div className="grid grid-cols-2 gap-1">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={time === slot ? "default" : "ghost"}
                        size="sm"
                        className="text-sm"
                        onClick={() => setTime(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: inkDark }}
            >
              <Users className="w-4 h-4" /> Comensales
            </label>
            <div className="flex gap-2 flex-wrap">
              {guestOptions.map((n) => (
                <Button
                  key={n}
                  type="button"
                  size="sm"
                  className="w-10 h-10 font-body"
                  style={
                    guests === n
                      ? { backgroundColor: "hsl(30,30%,40%)", color: parchment, border: "none" }
                      : { backgroundColor: parchment, color: inkDark, border: `1px solid ${borderClr}` }
                  }
                  onClick={() => setGuests(n)}
                >
                  {n}
                </Button>
              ))}
            </div>
          </div>

          {/* Personal info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: inkDark }}
              >
                <User className="w-4 h-4" /> Nombre
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="placeholder:opacity-50"
                style={{ backgroundColor: parchment, border: `1px solid ${borderClr}`, color: inkDark }}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: inkDark }}
              >
                <Phone className="w-4 h-4" /> Teléfono
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                type="tel"
                className="placeholder:opacity-50"
                style={{ backgroundColor: parchment, border: `1px solid ${borderClr}`, color: inkDark }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: inkDark }}
            >
              <Mail className="w-4 h-4" /> Email
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              type="email"
              className="placeholder:opacity-50"
              style={{ backgroundColor: parchment, border: `1px solid ${borderClr}`, color: inkDark }}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full tracking-widest uppercase text-sm py-6 font-body"
            style={{ backgroundColor: "hsl(85,20%,32%)", color: parchment }}
          >
            {isSubmitting ? "Enviando..." : "Reservar mesa"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ReservationSection;
