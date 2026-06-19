import React, { useEffect, useRef, useState } from 'react';

const ScrollVideo = ({ src, scrollHeight = 500, children }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  // Cargar el video y esperar que esté listo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      durationRef.current = video.duration;
      video.currentTime = 0;
      setLoaded(true);
    };

    video.addEventListener('loadedmetadata', onReady);
    return () => video.removeEventListener('loadedmetadata', onReady);
  }, []);

  // rAF loop con lerp — corre siempre, mueve currentTime suavemente hacia el target
  useEffect(() => {
    const LERP = 0.12; // 0.12 = fluido pero responsivo, similar a Apple
    const video = videoRef.current;

    const tick = () => {
      if (video && durationRef.current > 0) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.001) {
          currentTimeRef.current += diff * LERP;
          video.currentTime = Math.max(0, Math.min(currentTimeRef.current, durationRef.current));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Scroll → mapear progreso al tiempo del video
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || durationRef.current === 0) return;

      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, Math.min(window.scrollY - containerTop, scrollable));
      targetTimeRef.current = (scrolled / scrollable) * durationRef.current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}vh` }} className="relative w-full">
      {/* Sticky: se queda fijo en pantalla mientras el usuario scrollea dentro del contenedor */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">

        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', willChange: 'contents' }}
          aria-hidden="true"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 100%)' }}
        />

        {/* Fade de carga */}
        <div
          className="absolute inset-0 bg-black z-20 transition-opacity duration-1000 pointer-events-none"
          style={{ opacity: loaded ? 0 : 1 }}
        />

        {/* Contenido (título, botones) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollVideo;
