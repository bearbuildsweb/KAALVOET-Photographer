import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import { HERO_IMAGES, GALLERY_ITEMS, GALLERY_SHOOTS } from '../../data/galleryData';

interface LightboxModalProps {
  imageSrc: string | null;
  onClose: () => void;
  onSelectImage: (src: string) => void;
  onOpenEnquire?: (context?: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  imageSrc,
  onClose,
  onSelectImage,
  onOpenEnquire,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Combine all plates with deduplicated sources
  const allPlates = React.useMemo(() => {
    const list: Array<{
      id: string;
      src: string;
      title: string;
      plateNumber?: string;
      category?: string;
      sessionTitle?: string;
    }> = [];

    // Add gallery items with session context
    GALLERY_SHOOTS.forEach((shoot) => {
      shoot.photos.forEach((photo) => {
        list.push({
          id: `${shoot.id}-${photo.number}`,
          src: photo.src,
          title: shoot.title,
          plateNumber: photo.number,
          category: shoot.category,
          sessionTitle: shoot.title,
        });
      });
    });

    // Add hero images if not already present
    HERO_IMAGES.forEach((hero) => {
      if (!list.some((p) => p.src === hero.src)) {
        list.push({
          id: `hero-${hero.id}`,
          src: hero.src,
          title: hero.title,
          plateNumber: `0${hero.id}`,
          category: 'EDITORIAL',
          sessionTitle: 'STUDIO ARCHIVE',
        });
      }
    });

    return list;
  }, []);

  const currentIndex = allPlates.findIndex((p) => p.src === imageSrc);
  const currentPlate = currentIndex >= 0 ? allPlates[currentIndex] : null;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      onSelectImage(allPlates[currentIndex - 1].src);
    } else {
      onSelectImage(allPlates[allPlates.length - 1].src);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < allPlates.length - 1) {
      onSelectImage(allPlates[currentIndex + 1].src);
    } else {
      onSelectImage(allPlates[0].src);
    }
  };

  // Keyboard navigation within lightbox
  useEffect(() => {
    if (!imageSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [imageSrc, currentIndex, allPlates]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      {imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-xl flex flex-col justify-between select-none overflow-hidden text-neutral-200"
          onClick={onClose}
        >
          {/* Top Bar: Clean minimal header */}
          <div
            className="w-full flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/[0.08] relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Minimal index counter */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#C5A059] uppercase font-medium">
                {currentIndex >= 0
                  ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(allPlates.length).padStart(2, '0')}`
                  : 'ARCHIVE'}
              </span>
              {currentPlate?.category && (
                <span className="hidden sm:inline-block border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  {currentPlate.category}
                </span>
              )}
            </div>

            {/* Right: Actions (Fullscreen toggle, Copy, Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setIsFullscreen((prev) => !prev)}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                title="Toggle Fullscreen (F)"
                className="p-2 sm:p-2.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                ) : (
                  <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>

              <button
                onClick={handleCopyLink}
                aria-label="Copy share link"
                title="Copy share link"
                className="p-2 sm:p-2.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer relative"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A059]" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>

              <button
                onClick={onClose}
                aria-label="Close modal"
                title="Close (ESC)"
                className="p-2 sm:p-2.5 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Image with Left & Right Arrow Navigation */}
          <div
            className="flex-1 relative flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous plate"
              className="absolute left-3 sm:left-6 lg:left-10 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 border border-white/15 hover:border-[#C5A059]/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer group shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next plate"
              className="absolute right-3 sm:right-6 lg:right-10 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/75 border border-white/15 hover:border-[#C5A059]/60 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer group shadow-lg"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Main Image Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={imageSrc}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-h-full max-w-full flex items-center justify-center"
              >
                <img
                  src={imageSrc}
                  alt={currentPlate?.title || 'Editorial Plate'}
                  loading="eager"
                  decoding="async"
                  className={`object-contain transition-all duration-300 shadow-2xl border border-white/[0.08] ${
                    isFullscreen
                      ? 'max-h-[92vh] max-w-[96vw]'
                      : 'max-h-[66vh] sm:max-h-[72vh] max-w-[88vw] sm:max-w-[82vw]'
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Bar: Ultra-minimal typography, thumbnail strip & subtle enquire action */}
          <div
            className="w-full border-t border-white/[0.08] bg-black/40 backdrop-blur-md px-4 sm:px-8 py-3 relative z-20 flex flex-col gap-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto py-1 scrollbar-none">
              {allPlates.map((plate, idx) => {
                const isActive = imageSrc === plate.src;
                return (
                  <button
                    key={plate.id}
                    onClick={() => onSelectImage(plate.src)}
                    className={`relative w-10 h-14 sm:w-12 sm:h-16 shrink-0 overflow-hidden border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-105 brightness-105'
                        : 'border-white/15 opacity-50 hover:opacity-100 hover:border-white/40'
                    }`}
                    aria-label={`View plate ${idx + 1}`}
                  >
                    <img
                      src={plate.src}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            {/* Micro Metadata Row with subtle Enquire prompt */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="text-[#C5A059] font-medium">
                {currentPlate?.sessionTitle
                  ? `${currentPlate.sessionTitle} · ${currentPlate.category || 'ARCHIVE'}`
                  : 'EDITORIAL COLLECTION'}
              </span>

              {/* Minimal Enquire Action */}
              <button
                onClick={() => {
                  onClose();
                  if (onOpenEnquire) {
                    onOpenEnquire(currentPlate?.sessionTitle || 'Editorial Archive');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.06] hover:bg-[#C5A059] hover:text-black border border-white/15 hover:border-[#C5A059] text-white/90 transition-all cursor-pointer text-[10px] sm:text-[11px] font-sans-modern font-semibold uppercase tracking-[0.2em]"
              >
                <span>ENQUIRE ABOUT THIS SHOOT</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
