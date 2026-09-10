import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startFrom3 = () => {
      video.currentTime = 3;
      video.play().then(() => {
        setVideoReady(true);
      });
    };

    // If metadata already loaded (cached), jump immediately
    if (video.readyState >= 1) {
      startFrom3();
    } else {
      video.addEventListener("loadedmetadata", startFrom3, { once: true });
    }

    // Each time the video ends, restart from second 3
    const handleEnded = () => {
      video.currentTime = 3;
      video.play();
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("loadedmetadata", startFrom3);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background video — overflow-hidden + scale crop to hide watermark at bottom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full object-cover transition-opacity duration-700"
          style={{
            height: "115%",
            top: "-5%",
            objectPosition: "center top",
            opacity: videoReady ? 1 : 0,
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay — degradado cinematográfico */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to bottom, hsl(155 22% 7% / 0.80) 0%, hsl(155 22% 7% / 0.38) 45%, hsl(155 22% 7% / 0.82) 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="h-px w-12 bg-amber-400/60 mb-10 origin-center"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.22em] text-foreground mb-5"
          style={{ fontWeight: 100 }}
        >
          LA YESCA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-sm md:text-base tracking-[0.45em] text-foreground/50 uppercase"
        >
          Taberna · San Lorenzo de El Escorial
        </motion.p>

        {/* Línea decorativa inferior */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="h-px w-12 bg-amber-400/60 mt-10 origin-center"
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-foreground/40 mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
