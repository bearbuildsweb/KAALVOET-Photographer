import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera } from 'lucide-react';

interface CameraButtonProps {
  isFlashing: boolean;
  isFlipping: boolean;
  onCapture: (e?: React.MouseEvent) => void;
}

export const CameraButton: React.FC<CameraButtonProps> = ({
  isFlashing,
  isFlipping,
  onCapture,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Expanding Strobe Flash Ring */}
      <AnimatePresence>
        {isFlashing && (
          <motion.span
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-[#C5A059] bg-white/40 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* Ambient Flash Glow */}
      <AnimatePresence>
        {isFlashing && (
          <motion.span
            initial={{ scale: 1, opacity: 0.95 }}
            animate={{ scale: 4.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-white via-[#FFF9EC] to-transparent pointer-events-none blur-md z-0"
          />
        )}
      </AnimatePresence>

      <button
        onClick={onCapture}
        disabled={isFlipping}
        aria-label="Automated Camera Flash · Click to capture immediately"
        title="Automated Camera Flash · Click to flash & flip immediately"
        className="relative p-3 sm:p-4 bg-white/95 hover:bg-white backdrop-blur-md border border-black/10 hover:border-[#C5A059] shadow-lg hover:shadow-2xl rounded-full text-black hover:text-[#C5A059] active:scale-90 transition-all duration-300 cursor-pointer group focus:outline-none flex items-center justify-center z-20 disabled:cursor-wait"
      >
        {/* Micro viewfinder bezel */}
        <span className="absolute inset-1 rounded-full border border-black/[0.06] group-hover:border-[#C5A059]/40 pointer-events-none transition-colors" />

        {/* Shutter Recoil Motion */}
        <motion.div
          animate={isFlashing ? { scale: [1, 0.85, 1.15, 1], rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <Camera className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 stroke-[1.4] group-hover:scale-105 transition-transform" />

          {/* Optical status indicator dot */}
          <span
            className={`absolute top-0 right-0 w-2 h-2 rounded-full transition-colors duration-300 ${
              isFlashing ? 'bg-[#FF4D00] shadow-[0_0_8px_#FF4D00]' : 'bg-[#C5A059]/80 group-hover:bg-[#C5A059] animate-pulse'
            }`}
          />
        </motion.div>
      </button>
    </div>
  );
};
