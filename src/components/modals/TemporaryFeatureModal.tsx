import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Hourglass, Cog } from 'lucide-react';

interface TemporaryFeatureModalProps {
  isOpen: boolean;
  featureName?: string | null;
  onClose: () => void;
}

export const TemporaryFeatureModal: React.FC<TemporaryFeatureModalProps> = ({
  isOpen,
  featureName,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.94, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md p-8 sm:p-10 shadow-2xl relative border border-[#C5A059]/40 text-center select-none overflow-hidden"
          >
            {/* Top decorative hairline accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-black/50 hover:text-[#C5A059] transition-colors cursor-pointer rounded-full focus:outline-none"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Visual Centerpiece: Animated Horological Gears & Elegant Hourglass */}
            <div className="relative flex items-center justify-center my-4 py-3">
              {/* Animated gear cluster */}
              <div className="relative w-28 h-24 flex items-center justify-center">
                {/* Primary large gear - rotates clockwise */}
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                  className="absolute -top-1 -left-1 text-[#C5A059] opacity-90 drop-shadow-sm"
                >
                  <Cog className="w-12 h-12 stroke-[1.3]" />
                </motion.div>

                {/* Secondary interlocking gear - rotates counter-clockwise */}
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="absolute bottom-0 right-0 text-neutral-800 opacity-80"
                >
                  <Cog className="w-10 h-10 stroke-[1.4]" />
                </motion.div>

                {/* Small tertiary precision gear - rotates clockwise faster */}
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                  className="absolute -bottom-1 left-4 text-[#C5A059]/60"
                >
                  <Cog className="w-6 h-6 stroke-[1.5]" />
                </motion.div>

                {/* Central Elegant Hourglass Icon with delicate pulse / soft flip */}
                <motion.div
                  animate={{
                    rotate: [0, 0, 180, 180, 360],
                    scale: [1, 1.05, 1.05, 1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 w-14 h-14 rounded-full bg-white/95 border border-[#C5A059]/40 shadow-lg flex items-center justify-center text-[#C5A059]"
                >
                  <Hourglass className="w-6 h-6 stroke-[1.6]" />
                </motion.div>
              </div>
            </div>

            {/* Editorial Kicker & Feature Tag */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[10px] font-sans-modern uppercase tracking-[0.32em] text-[#C5A059] font-semibold">
                {featureName ? `${featureName} · Coming Soon` : 'Coming Soon'}
              </span>
            </div>

            {/* Main Required Headline */}
            <h3 className="font-serif-editorial text-2xl sm:text-[1.75rem] font-medium text-black leading-tight mb-3">
              feature still in the making
            </h3>

            {/* Context & Reassurance */}
            <p className="text-xs sm:text-[13px] font-sans-modern text-neutral-600 leading-relaxed mb-8 max-w-xs mx-auto">
              This section is currently being crafted with intention and precision.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 items-center">
              <button
                onClick={onClose}
                className="w-full py-3 bg-black text-white hover:bg-[#C5A059] transition-colors text-xs font-sans-modern uppercase tracking-[0.25em] font-medium cursor-pointer"
              >
                Return to Portfolio
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
