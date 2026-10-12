import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { LegalModalContent } from '../../types';

interface LegalModalProps {
  content: LegalModalContent | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ content, onClose }) => {
  return (
    <AnimatePresence>
      {content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-white w-full max-w-lg p-8 sm:p-10 shadow-2xl relative border border-[#C5A059]/40 max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Close legal modal"
              className="absolute top-6 right-6 p-2 text-black/60 hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-modern text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold block mb-2">
              STUDIO LEGAL &amp; POLICIES
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-black mb-4">
              {content.title}
            </h2>
            <div className="text-xs sm:text-sm font-sans-modern text-black/75 leading-relaxed whitespace-pre-line mb-6">
              {content.content}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
