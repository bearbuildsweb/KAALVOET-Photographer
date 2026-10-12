import React from 'react';
import { motion } from 'motion/react';
import { Layers, ArrowUpRight } from 'lucide-react';
import { GalleryCategory } from '../types';
import { GALLERY_SHOOTS } from '../data/galleryData';

interface CollectionProps {
  galleryFilter: GalleryCategory;
  onFilterChange: (category: GalleryCategory) => void;
  onOpenLightbox: (src: string) => void;
}

const CATEGORIES: GalleryCategory[] = ['ALL', 'ROMANTIC', 'BECOMING', 'EDITORIAL'];

export const Collection: React.FC<CollectionProps> = ({
  galleryFilter,
  onFilterChange,
  onOpenLightbox,
}) => {
  const filteredShoots =
    galleryFilter === 'ALL'
      ? GALLERY_SHOOTS
      : GALLERY_SHOOTS.filter((s) => s.category === galleryFilter);

  return (
    <section
      id="gallery"
      className="w-full bg-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 relative overflow-hidden select-none border-t border-black/[0.06]"
    >
      {/* Gallery Section Header */}
      <div className="max-w-[1520px] mx-auto mb-8 sm:mb-[45px] text-center flex flex-col items-center">
        {/* Subtle pagination dash & dots lockup */}
        <div className="flex items-center justify-center gap-1.5 mb-3 text-black/60">
          <span className="w-6 h-[1.5px] bg-black/40 rounded-full" />
          <span className="w-1.5 h-1.5 rounded-full border border-black/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
          <span className="w-1.5 h-1.5 rounded-full border border-black/40" />
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-black tracking-[0.04em] sm:tracking-[0.06em] uppercase">
          THE COLLECTION
        </h2>
        <span className="text-[10px] sm:text-[11px] font-sans-modern font-semibold uppercase tracking-[0.38em] pl-[0.38em] text-[#C5A059] mt-3 block">
          beautifully unscripted moments
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12 relative z-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs font-sans-modern font-semibold uppercase tracking-[0.24em] transition-all duration-300 cursor-pointer ${
              galleryFilter === cat
                ? 'bg-[#281816] text-white border border-[#281816] shadow-md'
                : 'bg-white text-black/75 border border-[#E2DDD5] hover:border-black/40 hover:text-black shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Curated Editorial Shoot Cards Container */}
      <div className="max-w-[1360px] mx-auto relative z-10 px-2 sm:px-4">
        {/* Botanical Foliage Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg
            className="absolute -top-12 sm:-top-8 left-[1%] sm:left-[4%] lg:left-[6%] w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 text-black/15 stroke-current fill-none stroke-[1.2]"
            viewBox="0 0 100 100"
          >
            <path d="M50 95 C 45 65, 30 45, 10 25" />
            <path d="M42 70 C 35 68, 25 72, 22 80 C 28 82, 38 78, 42 70" />
            <path d="M35 52 C 28 50, 18 55, 16 63 C 22 65, 31 60, 35 52" />
            <path d="M26 38 C 18 35, 10 40, 8 48 C 15 50, 23 45, 26 38" />
            <path d="M48 60 C 56 58, 65 62, 68 70 C 62 72, 53 68, 48 60" />
            <path d="M40 42 C 48 40, 56 45, 58 53 C 52 55, 44 50, 40 42" />
          </svg>
          <svg
            className="absolute -bottom-12 sm:-bottom-8 right-[1%] sm:right-[4%] lg:right-[6%] w-52 h-52 sm:w-64 sm:h-64 lg:w-76 lg:h-76 text-black/15 stroke-current fill-none stroke-[1.2]"
            viewBox="0 0 100 100"
          >
            <path d="M5 5 C 25 35, 45 55, 85 85" />
            <path d="M25 30 C 32 32, 42 28, 45 20 C 38 18, 30 22, 25 30" />
            <path d="M40 48 C 47 50, 57 45, 60 37 C 53 35, 45 40, 40 48" />
            <path d="M55 62 C 62 65, 72 60, 75 52 C 68 50, 60 55, 55 62" />
            <path d="M28 42 C 22 45, 18 55, 20 62 C 27 60, 30 50, 28 42" />
            <path d="M45 58 C 38 60, 35 70, 37 77 C 44 75, 48 65, 45 58" />
          </svg>
        </div>

        {/* Responsive Editorial Shoot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 lg:gap-10 relative z-10">
          {filteredShoots.map((shoot) => (
            <motion.div
              key={shoot.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#E6E1D8] shadow-[0_12px_36px_rgba(30,20,10,0.06)] hover:shadow-[0_20px_48px_rgba(30,20,10,0.11)] transition-all duration-500 p-4 sm:p-5 flex flex-col justify-between group"
            >
              {/* Top Photo Mat Frame (Warm Neutral Mat with 2 Side-by-Side Plates) */}
              <div className="bg-[#EFECE6] p-2.5 sm:p-3.5 border border-[#DFD9CE] mb-4 sm:mb-5">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  {shoot.photos.map((photo, pIdx) => (
                    <div
                      key={photo.number}
                      onClick={() => onOpenLightbox(photo.src)}
                      className="relative aspect-[4/5] overflow-hidden bg-[#DDD6CA] cursor-pointer group/photo"
                    >
                      {/* Number Badge */}
                      <div
                        className={`absolute top-2.5 ${
                          pIdx === 0 ? 'left-2.5' : 'right-2.5'
                        } bg-white/95 text-black font-mono text-[9px] sm:text-[10px] px-2 py-0.5 tracking-wider shadow-sm z-10 select-none`}
                      >
                        {photo.number}
                      </div>

                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/photo:scale-104"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shoot Info Block */}
              <div className="px-1 sm:px-1.5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Tag + Shoot Count Header Row */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="border border-[#D4C3A3]/80 bg-[#F4EFEA] text-[#786350] text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.22em] px-2.5 py-0.5 font-semibold">
                      {shoot.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#A89886] uppercase">
                      <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{shoot.countText}</span>
                    </div>
                  </div>

                  {/* Shoot Title */}
                  <h3 className="font-serif-editorial text-2xl sm:text-[28px] text-black font-normal mt-3 mb-1.5 tracking-[-0.01em]">
                    {shoot.title}
                  </h3>

                  {/* Brief Caption */}
                  <p className="font-sans-modern text-xs sm:text-[13px] text-black/60 font-light leading-relaxed">
                    {shoot.brief}
                  </p>
                </div>

                <div>
                  {/* Hairline Divider */}
                  <div className="border-t border-black/[0.08] my-4" />

                  {/* Expand Shoot Action Link */}
                  <button
                    onClick={() => onOpenLightbox(shoot.photos[0].src)}
                    className="w-full flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-[#C5A059] group-hover:text-[#A6833D] transition-colors font-semibold cursor-pointer pt-0.5"
                  >
                    <span>EXPAND SHOOT • 02 PHOTOS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
