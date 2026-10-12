import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FolderOpen, ChevronDown, MapPin, Instagram, MessageCircle } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCollection: () => void;
  onOpenEnquire: () => void;
  onOpenAbout: () => void;
  onOpenReviews: () => void;
  onOpenGallery: () => void;
  isClientSubMenuOpen: boolean;
  setIsClientSubMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onReplayReveal?: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCollection,
  onOpenEnquire,
  onOpenAbout,
  onOpenReviews,
  onOpenGallery,
  isClientSubMenuOpen,
  setIsClientSubMenuOpen,
  onReplayReveal,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-white h-full p-10 flex flex-col justify-between border-l border-black/10"
          >
            <div className="flex items-center justify-between pb-8 border-b border-black/10">
              <div className="flex items-center text-black/80 hover:text-[#C5A059] transition-colors" title="Explore">
                <FolderOpen className="w-6 h-6 stroke-[1.4]" />
              </div>
              <button
                onClick={onClose}
                aria-label="Close navigation"
                className="p-2 hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6 py-6 font-serif-editorial text-2xl sm:text-3xl text-black">
              {/* 1. THE COLLECTION */}
              <button
                onClick={() => {
                  onClose();
                  onSelectCollection();
                }}
                className="text-left hover:text-[#C5A059] transition-colors flex items-center justify-between group uppercase cursor-pointer"
              >
                <span>The Collection</span>
                <span className="text-[11px] font-mono tracking-widest text-black/40 group-hover:text-[#C5A059]">01</span>
              </button>

              {/* 2. ABOUT (Hidden on desktop as it is in the horizontal header) */}
              <button
                onClick={() => {
                  onClose();
                  onOpenAbout();
                }}
                className="text-left hover:text-[#C5A059] transition-colors flex md:hidden items-center justify-between group uppercase cursor-pointer"
              >
                <span>About</span>
                <span className="text-[11px] font-mono tracking-widest text-black/40 group-hover:text-[#C5A059]">02</span>
              </button>

              {/* 3. CLIENT ACCESS & SUB-NAV (REVIEWS, GALLERY, ENQUIRE) */}
              <div className="flex flex-col pt-1">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsClientSubMenuOpen((prev) => !prev)}
                    className="text-left hover:text-[#C5A059] transition-colors flex items-center gap-2.5 uppercase cursor-pointer group"
                  >
                    <span>Client Access</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isClientSubMenuOpen ? 'rotate-180 text-[#C5A059]' : 'text-black/40'
                      }`}
                    />
                  </button>
                  <span className="text-[11px] font-mono tracking-widest text-black/40">
                    <span className="hidden md:inline">02</span>
                    <span className="inline md:hidden">03</span>
                  </span>
                </div>

                {/* Sub-nav Links: REVIEWS, GALLERY, ENQUIRE */}
                <AnimatePresence>
                  {isClientSubMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-5 pt-3 pb-1 flex flex-col gap-3 font-sans-modern border-l border-black/10 ml-2 mt-2"
                    >
                      {/* Sub-link 1: REVIEWS */}
                      <button
                        onClick={() => {
                          onClose();
                          onOpenReviews();
                        }}
                        className="text-left text-xs sm:text-sm uppercase tracking-[0.24em] font-semibold text-black/70 hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                        <span>Reviews</span>
                      </button>

                      {/* Sub-link 2: GALLERY */}
                      <button
                        onClick={() => {
                          onClose();
                          onOpenGallery();
                        }}
                        className="text-left text-xs sm:text-sm uppercase tracking-[0.24em] font-semibold text-black/70 hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                        <span>Gallery</span>
                      </button>

                      {/* Sub-link 3: ENQUIRE (Hidden on desktop as it is in the horizontal header) */}
                      <button
                        onClick={() => {
                          onClose();
                          onOpenEnquire();
                        }}
                        className="text-left text-xs sm:text-sm uppercase tracking-[0.24em] font-semibold text-black/70 hover:text-[#C5A059] transition-colors flex md:hidden items-center gap-2 cursor-pointer group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                        <span>Enquire</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Optional Replay Reveal trigger */}
            {onReplayReveal && (
              <div className="pt-4 pb-2">
                <button
                  onClick={() => {
                    onClose();
                    onReplayReveal();
                  }}
                  className="text-left text-[11px] font-sans-modern uppercase tracking-[0.22em] text-black/50 hover:text-[#C5A059] transition-colors flex items-center gap-2 cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/40 group-hover:bg-[#C5A059] transition-colors" />
                  <span>Replay Editorial Intro</span>
                </button>
              </div>
            )}

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-black/10 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-sans-modern tracking-[0.22em] uppercase text-black/75">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>PRETORIA · WORLDWIDE</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/27618668899?text=hi%20KAALVOET%2C%20keen%20on%20doing%20a%20shoot"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-1.5 text-black hover:text-[#C5A059] transition-colors cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </a>
                <a
                  href="https://www.instagram.com/thekaalvoetphotographer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-1.5 text-black hover:text-[#C5A059] transition-colors cursor-pointer shrink-0"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
