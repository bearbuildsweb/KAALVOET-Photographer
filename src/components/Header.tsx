import React from 'react';

interface HeaderProps {
  onOpenEnquire: () => void;
  onOpenAbout: () => void;
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEnquire,
  onOpenAbout,
  onOpenMenu,
}) => {
  return (
    <header className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-16 pt-8 sm:pt-10 flex items-center justify-between z-30">
      {/* Item 1: Brand Wordmark (Editorial Magazine Masthead Lockup) */}
      <div className="shrink-0">
        <a
          href="#"
          className="group relative flex flex-col items-start select-none whitespace-nowrap pb-1 focus:outline-none"
        >
          <span className="font-serif-editorial text-3xl sm:text-4xl lg:text-[2.65rem] font-medium tracking-[-0.03em] text-black leading-none">
            kaalvoet
          </span>
          <span className="text-[9px] sm:text-[10px] font-sans-modern font-semibold uppercase tracking-[0.42em] pl-[0.42em] text-black/80 leading-none mt-1.5">
            photographer
          </span>
          {/* Understated hairline underline */}
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-black scale-x-[0.10] group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left pointer-events-none"
          />
        </a>
      </div>

      {/* Item 2: About (Desktop) */}
      <button
        onClick={onOpenAbout}
        className="hidden md:inline-block text-xs sm:text-[13px] font-sans-modern font-semibold uppercase tracking-[0.25em] pl-[0.25em] text-[#000000] hover:text-[#C5A059] transition-colors cursor-pointer whitespace-nowrap shrink-0"
      >
        About
      </button>

      {/* Item 3: Enquire (Desktop) */}
      <button
        onClick={onOpenEnquire}
        className="hidden md:inline-block text-xs sm:text-[13px] font-sans-modern font-semibold uppercase tracking-[0.25em] pl-[0.25em] text-[#000000] hover:text-[#C5A059] transition-colors cursor-pointer whitespace-nowrap shrink-0"
      >
        Enquire
      </button>

      {/* Item 4: Hamburger Icon (=) */}
      <div className="flex items-center shrink-0">
        <button
          onClick={onOpenMenu}
          aria-label="Toggle Navigation"
          className="group p-2 flex flex-col items-end gap-[5px] focus:outline-none cursor-pointer"
        >
          <span className="w-6 h-[1.5px] bg-black transition-all group-hover:w-7 group-hover:bg-[#C5A059]" />
          <span className="w-6 h-[1.5px] bg-black transition-all group-hover:w-4 group-hover:bg-[#C5A059]" />
        </button>
      </div>
    </header>
  );
};
