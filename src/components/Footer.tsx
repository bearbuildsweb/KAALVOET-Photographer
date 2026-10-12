import React from 'react';
import { MapPin, Facebook, Instagram, Copy, Check } from 'lucide-react';

interface FooterProps {
  emailCopied: boolean;
  onCopyEmail: (e?: React.MouseEvent) => void;
}

export const Footer: React.FC<FooterProps> = ({ emailCopied, onCopyEmail }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#121212] text-white/90 font-sans-modern select-none border-t border-white/[0.08] py-14 sm:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1360px] mx-auto px-2 sm:px-4 flex flex-col gap-8 sm:gap-9">
        {/* Top Row / Center Monogram: Refined Minimalist Editorial Studio Monogram / Back-to-Top */}
        <div className="text-center">
          <button
            onClick={scrollToTop}
            className="group inline-flex flex-col items-center gap-1.5 cursor-pointer transition-opacity duration-300 hover:opacity-80"
            title="kaalvoet · Back to top"
            aria-label="Back to top"
          >
            <span className="font-sans text-xl sm:text-2xl font-light tracking-[0.35em] uppercase text-white/50 group-hover:text-white/70 transition-colors">
              KAALVOET PHOTOGRAPHER
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#C5A059] font-sans">
              WEDDINGS • EDITORIAL • INDUSTRIAL
            </span>
          </button>
        </div>

        {/* Address vs Social Icons Row (spaced to align with portfolio card edges) */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-neutral-400 font-sans">
          <div className="inline-flex items-center gap-1.5 text-center sm:text-left">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span>Heritage Hill Estate , Centurion, South Africa</span>
          </div>
          <div className="inline-flex items-center gap-4 text-neutral-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-0.5"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-0.5"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-[1px] bg-white/[0.08]" />

        {/* Email vs Copyright Row (spaced to align with portfolio card edges) */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-sans">
          <div className="inline-flex items-center gap-1.5">
            <a
              href="mailto:thekaalvoetphotographer@gmail.com"
              className="text-neutral-400 hover:text-white transition-colors tracking-normal normal-case font-mono text-[11px] sm:text-xs"
            >
              thekaalvoetphotographer@gmail.com
            </a>
            <button
              onClick={onCopyEmail}
              className="p-1 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer inline-flex items-center gap-1"
              title="Copy email to clipboard"
              aria-label="Copy email address"
            >
              {emailCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-[9px] text-[#C5A059] tracking-normal normal-case font-sans">Copied</span>
                </>
              ) : (
                <Copy className="w-3.5 h-3.5 hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
          <span className="text-neutral-500/80 text-center sm:text-right">
            © 2026 KAALVOET PHOTOGRAPHER
          </span>
        </div>
      </div>
    </footer>
  );
};
