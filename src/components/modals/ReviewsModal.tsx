import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewGallery: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  onViewGallery,
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
            className="bg-white w-full max-w-2xl p-8 sm:p-10 shadow-2xl relative border border-[#C5A059]/30 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-black/60 hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-sans-modern text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                CLIENT ACCESS · CRITICAL ACCLAIM
              </span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 tracking-wider font-mono">
                ARCHIVE REVIEWS
              </span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-black mb-2">
              Editorial Reviews &amp; Praise
            </h2>
            <p className="text-sm font-sans-modern text-black/60 mb-6">
              Appraisals from editorial directors, couture houses, and archival curators worldwide.
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-[#FAFAFA] border border-black/5 hover:border-[#C5A059]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif-editorial font-medium text-black">Vogue France</span>
                  <span className="text-[#C5A059] text-xs">★★★★★</span>
                </div>
                <p className="font-serif-editorial italic text-base text-black/90 mb-2 leading-relaxed">
                  &ldquo;A masterclass in restraint and cinematic chiaroscuro. kaalvoet redefines high-fashion monograph portraiture with effortless gravitas.&rdquo;
                </p>
                <span className="text-[11px] font-sans-modern text-black/50 block">Hélène Rostand · Fashion Director, Paris</span>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-black/5 hover:border-[#C5A059]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif-editorial font-medium text-black">Document Journal</span>
                  <span className="text-[#C5A059] text-xs">★★★★★</span>
                </div>
                <p className="font-serif-editorial italic text-base text-black/90 mb-2 leading-relaxed">
                  &ldquo;Unflinching tactile intimacy. The photographs feel like discovered museum artifacts rather than commercial plates.&rdquo;
                </p>
                <span className="text-[11px] font-sans-modern text-black/50 block">Julian Vance · Senior Visual Editor, London &amp; New York</span>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-black/5 hover:border-[#C5A059]/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif-editorial font-medium text-black">Maison Margiela Archive</span>
                  <span className="text-[#C5A059] text-xs">★★★★★</span>
                </div>
                <p className="font-serif-editorial italic text-base text-black/90 mb-2 leading-relaxed">
                  &ldquo;The campaign delivery exceeded all expectations. The balance of architectural shadow and couture texture is peerless.&rdquo;
                </p>
                <span className="text-[11px] font-sans-modern text-black/50 block">Studio Coordination Team · Paris Haute Couture</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
              <button
                onClick={() => {
                  onClose();
                  onViewGallery();
                }}
                className="text-xs uppercase tracking-widest text-[#C5A059] hover:underline font-semibold cursor-pointer"
              >
                View Client Gallery →
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                Close Reviews
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
