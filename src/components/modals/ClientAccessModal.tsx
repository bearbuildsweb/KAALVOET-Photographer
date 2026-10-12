import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ClientAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterPasscode: () => void;
}

export const ClientAccessModal: React.FC<ClientAccessModalProps> = ({
  isOpen,
  onClose,
  onEnterPasscode,
}) => {
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
              PRIVATE CLIENT PORTAL
            </span>
            <h2 className="font-serif-editorial text-3xl font-normal text-black mb-3">
              Client Access
            </h2>
            <p className="text-sm font-sans-modern text-black/70 mb-6 leading-relaxed">
              Private archival proofing, raw capture downloads, and private exhibition plates for commissioned agency clients.
            </p>

            <div className="space-y-3 mb-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="w-full p-4 bg-[#FAFAFA] border border-black/10 hover:border-[#C5A059] transition-colors text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-black block">Client Reviews</span>
                  <span className="text-xs text-black/50">Read verified testimonials and monograph acclaim</span>
                </div>
                <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="w-full p-4 bg-[#FAFAFA] border border-black/10 hover:border-[#C5A059] transition-colors text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-black block">Archival Gallery</span>
                  <span className="text-xs text-black/50">Browse the complete seasonal editorial catalogue</span>
                </div>
                <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="p-4 bg-black/[0.02] border border-black/5 mb-6">
              <label className="text-[11px] uppercase tracking-wider text-black/50 block mb-2">
                Commission Access Passcode
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Enter Client PIN (e.g. KV-2026)"
                  className="flex-1 px-3 py-2 text-xs border border-black/20 focus:outline-none focus:border-[#C5A059] font-mono"
                />
                <button
                  onClick={onEnterPasscode}
                  className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-[#C5A059] transition-colors cursor-pointer"
                >
                  Enter
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 border border-black/20 text-black text-xs uppercase tracking-widest hover:bg-black/5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
