import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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
            className="bg-white w-full max-w-lg p-8 sm:p-10 shadow-2xl relative border border-[#C5A059]/30"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-black/60 hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans-modern text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-2">
              STUDIO INQUIRIES
            </span>
            <h2 className="font-serif-editorial text-3xl font-normal text-black mb-4">
              Services &amp; Inquiries
            </h2>
            <p className="text-sm font-sans-modern text-black/70 mb-6 leading-relaxed">
              For fashion week commissions, campaign art direction, and editorial monograph bookings across Europe and North America.
            </p>

            <div className="space-y-4 text-sm font-sans-modern">
              <div className="p-4 bg-[#FAFAFA] border border-black/5 hover:border-[#C5A059]/30 transition-colors">
                <span className="text-xs uppercase tracking-wider text-black/50 block mb-1">Direct Representation</span>
                <span className="font-medium text-black">studio@kaalvoet.com</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/5 hover:border-[#C5A059]/30 transition-colors">
                <span className="text-xs uppercase tracking-wider text-black/50 block mb-1">Paris Office</span>
                <span className="font-medium text-black">+33 (0)1 42 68 00 12 · Rue de Turenne</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-[#1A1A1A] hover:border-[#C5A059] border border-transparent transition-colors cursor-pointer"
            >
              Close Inquiry
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
