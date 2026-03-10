'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_FRAMES = 192;

const FRAME_PATH =
  process.env.NODE_ENV === "production"
    ? "/Antigravity-digital_marketing/frames"
    : "/frames";

export default function HeroCanvasAnimation() {

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // PRELOAD IMAGES
  useEffect(() => {

    let loaded = 0;

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {

      return new Promise<HTMLImageElement>((resolve) => {

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `${FRAME_PATH}/frame_${i}.jpg`;

        img.onload = () => {

          loaded++;

          setLoadProgress((loaded / TOTAL_FRAMES) * 100);

          resolve(img);
        };

        img.onerror = () => {

          loaded++;

          setLoadProgress((loaded / TOTAL_FRAMES) * 100);

          resolve(img);
        };

      });

    });

    Promise.all(promises).then((imgs) => {

      imagesRef.current = imgs;

      setImagesLoaded(true);

    });

  }, []);

  // SCROLL + CANVAS RENDER
  useEffect(() => {

    if (!imagesLoaded) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (frame: number) => {

      const img = imagesRef.current[frame];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scaleX = displayWidth / img.naturalWidth;
      const scaleY = displayHeight / img.naturalHeight;

      const scale = Math.max(scaleX, scaleY);

      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;

      const x = (displayWidth - w) / 2;
      const y = (displayHeight - h) / 2;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      ctx.drawImage(img, x, y, w, h);

    };

    const handleScroll = () => {

      const rect = container.getBoundingClientRect();

      const scrollableHeight = container.offsetHeight - window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, -rect.top / scrollableHeight)
      );

      const frame = Math.round(progress * (TOTAL_FRAMES - 1));

      setScrollPercent(progress);

      if (frame !== currentFrameRef.current) {

        currentFrameRef.current = frame;

        drawFrame(frame);

      }

    };

    drawFrame(0);

    let ticking = false;

    const onScroll = () => {

      if (!ticking) {

        ticking = true;

        rafRef.current = requestAnimationFrame(() => {

          handleScroll();

          ticking = false;

        });

      }

    };

    window.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", () =>
      drawFrame(currentFrameRef.current)
    );

    handleScroll();

    return () => {

      window.removeEventListener("scroll", onScroll);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

    };

  }, [imagesLoaded]);

  const getOpacity = (start:number, fadeIn:number, fadeOut:number, end:number) => {

    if (scrollPercent < start || scrollPercent > end) return 0;

    if (scrollPercent < fadeIn)
      return (scrollPercent - start) / (fadeIn - start);

    if (scrollPercent > fadeOut)
      return 1 - (scrollPercent - fadeOut) / (end - fadeOut);

    return 1;

  };

  const section1 = getOpacity(0,0.08,0.18,0.25);
  const section2 = getOpacity(0.3,0.35,0.48,0.55);
  const section3 = getOpacity(0.6,0.65,0.78,0.85);
  const section4 = getOpacity(0.9,0.92,0.97,1);

  const scrollIndicator = scrollPercent < 0.1 ? 1 - scrollPercent / 0.1 : 0;

  if (!imagesLoaded) {

    return (

      <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50">

        <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">

          <motion.div
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#4F9C8F]"
            initial={{ width: "0%" }}
            animate={{ width: `${loadProgress}%` }}
            transition={{ duration: 0.3 }}
          />

        </div>

        <p className="text-amber-100/70 text-lg">
          Loading Experience... {Math.round(loadProgress)}%
        </p>

      </div>

    );

  }

  return (

    <div ref={containerRef} className="relative h-[500vh]">

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        <div className="absolute inset-0 pointer-events-none">

          <div
            className="absolute inset-0 flex items-center justify-center text-center px-4"
            style={{ opacity: section1 }}
          >

            <div>

              <h1 className="text-7xl md:text-9xl font-bold text-amber-50 mb-4">
                Experience Coffee
              </h1>

              <p className="text-xl md:text-2xl text-amber-100/80">
                Where every sip defies gravity
              </p>

            </div>

          </div>

          <div
            className="absolute inset-0 flex items-center px-8 md:px-16"
            style={{ opacity: section2 }}
          >

            <div className="max-w-2xl">

              <h2 className="text-5xl md:text-7xl font-semibold text-amber-50 mb-3">
                Crafted to Perfection
              </h2>

              <p className="text-lg md:text-xl text-amber-100/70">
                From bean to cup, excellence floats in every drop
              </p>

            </div>

          </div>

          <div
            className="absolute inset-0 flex items-center justify-end px-8 md:px-16"
            style={{ opacity: section3 }}
          >

            <div className="max-w-2xl text-right">

              <h2 className="text-5xl md:text-7xl font-semibold text-amber-50 mb-3">
                Anti-Gravity Flavor
              </h2>

              <p className="text-lg md:text-xl text-amber-100/70">
                Defying expectations, elevating taste beyond limits
              </p>

            </div>

          </div>

          <div
            className="absolute inset-0 flex items-center justify-center text-center px-4"
            style={{ opacity: section4 }}
          >

            <div>

              <h2 className="text-6xl md:text-8xl font-bold text-amber-50 mb-6">
                Discover Your Blend
              </h2>

              <motion.button
                whileHover={{ scale:1.05 }}
                whileTap={{ scale:0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#4F9C8F] to-[#3D8B7F] text-white rounded-full text-lg font-semibold shadow-2xl pointer-events-auto"
              >

                Explore Collection ↓

              </motion.button>

            </div>

          </div>

        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicator }}
        >

          <p className="text-amber-100/60 text-sm uppercase">
            Scroll to Explore
          </p>

          <motion.div
            animate={{ y:[0,8,0] }}
            transition={{ repeat:Infinity,duration:1.5 }}
            className="w-6 h-10 border-2 border-amber-100/40 rounded-full flex items-start justify-center p-2"
          >

            <div className="w-1 h-3 bg-amber-100/60 rounded-full" />

          </motion.div>

        </div>

      </div>

    </div>

  );

}
