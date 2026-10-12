import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CameraButton } from './CameraButton';
import { HERO_FALLBACK_LEFT, HERO_FALLBACK_RIGHT } from '../data/galleryData';

interface HeroProps {
  leftImage: string;
  leftAlt: string;
  rightImage: string;
  rightAlt: string;
  isFlashing: boolean;
  isFlipping: boolean;
  onManualCapture: (e?: React.MouseEvent) => void;
  onOpenLightbox: (src: string) => void;
  onScrollToGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  leftImage,
  leftAlt,
  rightImage,
  rightAlt,
  isFlashing,
  isFlipping,
  onManualCapture,
  onOpenLightbox,
  onScrollToGallery,
}) => {
  return (
    <main className="flex-1 max-w-[1520px] w-full mx-auto px-6 sm:px-12 lg:px-16 py-6 sm:py-10 flex flex-col justify-center relative">
      {/* PORTFOLIO Circular Badge (Upper Right beneath header) */}
      <div className="w-full flex justify-end pr-2 sm:pr-8 mb-4 lg:mb-2">
        <button
          onClick={onScrollToGallery}
          aria-label="View Portfolio Archive"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black border border-[#C5A059]/30 hover:border-[#C5A059] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm group"
        >
          <span className="text-[9px] sm:text-[10.5px] font-sans-modern font-bold tracking-[0.25em] sm:tracking-[0.3em] pl-[0.25em] sm:pl-[0.3em] uppercase text-white/95 group-hover:text-[#C5A059] transition-colors">
            PORTFOLIO
          </span>
        </button>
      </div>

      {/* STUDIO STROBE CAMERA FLASH (Instantaneous studio strobe burst) */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.82, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, times: [0, 0.2, 1], ease: 'easeOut' }}
            className="absolute inset-0 bg-white pointer-events-none z-50 backdrop-blur-[0.5px]"
          />
        )}
      </AnimatePresence>

      {/* MAIN ART-DIRECTED ASYMMETRICAL BROKEN GRID */}
      <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-between min-h-[540px] sm:min-h-[620px] my-auto pt-2 pb-6">
        {/* =========================================================
            LEFT PHOTO CONTAINER (Bleeds off the left edge, 3D Pageflip)
        ========================================================= */}
        <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[580px] shrink-0 -ml-6 sm:-ml-12 lg:-ml-16 xl:-ml-24 2xl:-ml-28 z-10 [perspective:1400px]">
          <div
            onClick={() => onOpenLightbox(leftImage)}
            className="w-full aspect-[3/4] sm:h-[540px] lg:h-[620px] bg-[#FAFAFA] border border-black/[0.08] hover:border-[#C5A059]/50 overflow-hidden cursor-pointer group relative shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${leftImage}`}
                initial={{ rotateY: 65, opacity: 0.15, filter: 'brightness(0.7)' }}
                animate={{ rotateY: 0, opacity: 1, filter: 'brightness(1)' }}
                exit={{ rotateY: -80, opacity: 0, filter: 'brightness(0.5)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity, filter',
                }}
                className="w-full h-full relative"
              >
                <img
                  src={leftImage}
                  alt={leftAlt}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = HERO_FALLBACK_LEFT;
                    }
                  }}
                  className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-100 group-hover:scale-102 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto"
                />

                {/* Tactile monograph spine shadow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-10 transition-opacity"
                />

                {/* Surface sheen during page flip */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0.45, x: '-100%' }}
                  animate={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Minimalist plate indicator */}
            <div className="absolute top-4 right-6 lg:left-6 lg:right-auto text-[10px] font-mono tracking-widest text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
              PLATE I
            </div>
          </div>

          {/* MOBILE VIEW ONLY: Integrated Camera Button docked inside top-left of first image */}
          <div className="lg:hidden absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
            <CameraButton
              isFlashing={isFlashing}
              isFlipping={isFlipping}
              onCapture={onManualCapture}
            />
          </div>
        </div>

        {/* =========================================================
            DESKTOP ONLY: CAMERA ICON AT OVERLAPPING SEAM
        ========================================================= */}
        <div className="hidden lg:flex z-30 lg:absolute lg:left-[46%] xl:left-[48%] lg:top-[42%] lg:-translate-x-1/2 lg:-translate-y-1/2 items-center justify-center">
          <CameraButton
            isFlashing={isFlashing}
            isFlipping={isFlipping}
            onCapture={onManualCapture}
          />
        </div>

        {/* =========================================================
            RIGHT PHOTO CONTAINER (Hidden on mobile, 3D Pageflip on desktop)
        ========================================================= */}
        <div className="hidden lg:block relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] shrink-0 lg:-ml-12 xl:-ml-16 mt-6 sm:mt-10 lg:mt-24 xl:mt-28 z-20 [perspective:1400px]">
          <div
            onClick={() => onOpenLightbox(rightImage)}
            className="w-full aspect-[3/4] sm:h-[480px] lg:h-[540px] bg-[#FAFAFA] border border-black/[0.1] hover:border-[#C5A059]/60 overflow-hidden cursor-pointer group relative shadow-[0_24px_60px_rgba(0,0,0,0.14)] transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${rightImage}`}
                initial={{ rotateY: 70, opacity: 0.15, filter: 'brightness(0.7)' }}
                animate={{ rotateY: 0, opacity: 1, filter: 'brightness(1)' }}
                exit={{ rotateY: -85, opacity: 0, filter: 'brightness(0.5)' }}
                transition={{ duration: 0.65, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity, filter',
                }}
                className="w-full h-full relative"
              >
                <img
                  src={rightImage}
                  alt={rightAlt}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = HERO_FALLBACK_RIGHT;
                    }
                  }}
                  className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-100 group-hover:scale-102 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-auto"
                />

                {/* Tactile monograph spine shadow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-10 transition-opacity"
                />

                {/* Surface sheen during page flip */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0.45, x: '-100%' }}
                  animate={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.65, delay: 0.04, ease: 'easeOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Minimalist plate indicator */}
            <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
              PLATE II
            </div>
          </div>
        </div>

        {/* =========================================================
            FAR RIGHT MARGIN: VERTICAL TYPOGRAPHY (Instagram / Whatsapp)
        ========================================================= */}
        <div className="hidden xl:flex flex-col items-center justify-center gap-10 absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[13px] font-sans-modern font-normal text-black">
          <a
            href="https://www.instagram.com/thekaalvoetphotographer/"
            target="_blank"
            rel="noopener noreferrer"
            className="[writing-mode:vertical-rl] hover:text-[#C5A059] transition-colors cursor-pointer tracking-wide"
            title="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/27618668899?text=hi%20KAALVOET%2C%20keen%20on%20doing%20a%20shoot"
            target="_blank"
            rel="noopener noreferrer"
            className="[writing-mode:vertical-rl] hover:text-[#C5A059] transition-colors cursor-pointer tracking-wide"
            title="WhatsApp"
          >
            Whatsapp
          </a>
        </div>
      </div>
    </main>
  );
};
