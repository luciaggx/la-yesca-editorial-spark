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

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-foreground mb-4"
        >
          LA YESCA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-xl md:text-2xl tracking-[0.3em] text-foreground/70 uppercase"
        >
          Taberna
        </motion.p>
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
