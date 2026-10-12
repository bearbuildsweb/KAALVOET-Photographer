import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreWorks: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onExploreWorks }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-white w-full max-w-xl p-8 sm:p-10 shadow-2xl relative border border-[#C5A059]/30 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-black/60 hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-modern text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-2">
              STUDIO MONOGRAPH
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-black mb-4">
              About kaalvoet
            </h2>

            <p className="text-sm font-sans-modern text-black/80 mb-4 leading-relaxed">
              Founded on the philosophy of raw perception, <strong className="text-black font-semibold">kaalvoet</strong> (Afrikaans for <em>&ldquo;barefoot&rdquo;</em>) is an avant-garde editorial and high-fashion photographic practice active between Paris and London.
            </p>
            <p className="text-sm font-sans-modern text-black/70 mb-6 leading-relaxed">
              Grounded in sculptural chiaroscuro, tactile monochrome tonalities, and monograph print architecture, each exhibition plate is crafted as an archival dialogue between garment, form, and environmental stillness.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-black/10 py-5 my-6 text-xs font-sans-modern">
              <div>
                <span className="text-black/40 uppercase tracking-wider block mb-1">Studios</span>
                <span className="font-medium text-black">Paris · 3e Arrondissement</span>
                <span className="block text-black/60">London · Mayfair</span>
              </div>
              <div>
                <span className="text-black/40 uppercase tracking-wider block mb-1">Publications</span>
                <span className="font-medium text-black">Vogue France · Document</span>
                <span className="block text-black/60">Numéro · Self Service</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  onClose();
                  onExploreWorks();
                }}
                className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline font-semibold cursor-pointer"
              >
                Explore Selected Works →
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
