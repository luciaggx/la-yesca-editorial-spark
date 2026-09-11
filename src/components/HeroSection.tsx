import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  /* ── Reproducción del vídeo ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startFrom3 = () => {
      video.currentTime = 3;
      video.play().then(() => setVideoReady(true)).catch(() => {});
    };

    if (video.readyState >= 1) startFrom3();
    else video.addEventListener("loadedmetadata", startFrom3, { once: true });

    const handleEnded = () => { video.currentTime = 3; video.play(); };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  /* ── Parallax del vídeo con GSAP ScrollTrigger ── */
  useEffect(() => {
    if (!videoWrapRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(videoWrapRef.current, {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Vídeo con parallax */}
      <div ref={videoWrapRef} className="absolute inset-0 z-0 will-change-transform">
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full object-cover transition-opacity duration-700"
          style={{
            height: "130%",
            top: "-15%",
            objectPosition: "center top",
            opacity: videoReady ? 1 : 0,
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay cinematográfico */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, hsl(90 40% 8% / 0.80) 0%, hsl(90 35% 10% / 0.28) 50%, hsl(90 40% 8% / 0.84) 100%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="h-px w-12 bg-amber-400/60 mb-10 origin-center"
        />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.22em] text-stone-100 mb-5"
          style={{ fontWeight: 100 }}
        >
          LA YESCA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-body text-sm md:text-base tracking-[0.45em] text-stone-100/55 uppercase"
        >
          Taberna · San Lorenzo de El Escorial
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="h-px w-12 bg-amber-400/60 mt-10 origin-center"
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-stone-100/35 mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
