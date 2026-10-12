import React, { useState, useEffect, useRef } from 'react';
import { GalleryCategory, LegalModalContent } from './types';
import { HERO_IMAGES, GALLERY_ITEMS, PAIRS } from './data/galleryData';
import { playShutterSound } from './utils/audio';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { Footer } from './components/Footer';
import { NavigationDrawer } from './components/NavigationDrawer';
import { Preloader } from './components/Preloader';

import { LightboxModal } from './components/modals/LightboxModal';
import { ContactModal } from './components/modals/ContactModal';
import { AboutModal } from './components/modals/AboutModal';
import { ReviewsModal } from './components/modals/ReviewsModal';
import { ClientAccessModal } from './components/modals/ClientAccessModal';
import { LegalModal } from './components/modals/LegalModal';
import { TemporaryFeatureModal } from './components/modals/TemporaryFeatureModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pairIndex, setPairIndex] = useState(0);
  const [, setSwapCount] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Modals & Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isClientAccessOpen, setIsClientAccessOpen] = useState(false);
  const [isClientSubMenuOpen, setIsClientSubMenuOpen] = useState(true);
  const [featureModalName, setFeatureModalName] = useState<string | null>(null);
  const [legalModalContent, setLegalModalContent] = useState<LegalModalContent | null>(null);

  // Gallery filter & email copy state
  const [galleryFilter, setGalleryFilter] = useState<GalleryCategory>('ALL');
  const [emailCopied, setEmailCopied] = useState(false);

  const autoPlayTimerRef = useRef<number | null>(null);

  const activePair = PAIRS[pairIndex];
  const leftImage = activePair.left.src;
  const leftAlt = activePair.left.alt;
  const rightImage = activePair.right.src;
  const rightAlt = activePair.right.alt;

  // Studio capture & page flip sequence
  const triggerCaptureAndFlip = (isManual = true) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsFlashing(true);

    if (isManual) {
      setHasUserInteracted(true);
      playShutterSound();
    } else if (hasUserInteracted) {
      playShutterSound();
    }

    setPairIndex((prev) => (prev + 1) % PAIRS.length);
    setSwapCount((prev) => prev + 1);

    // Studio flash decay (180ms)
    setTimeout(() => {
      setIsFlashing(false);
    }, 180);

    // Release animation lock after page turn settles (680ms)
    setTimeout(() => {
      setIsFlipping(false);
    }, 680);
  };

  // Manual trigger resets automated timer
  const handleManualCapture = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isFlipping) return;
    triggerCaptureAndFlip(true);

    if (autoPlayTimerRef.current) {
      window.clearInterval(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = window.setInterval(() => {
      if (!document.hidden) {
        triggerCaptureAndFlip(false);
      }
    }, 5500);
  };

  // Preload all hero & gallery photographic plates into browser cache
  useEffect(() => {
    [...HERO_IMAGES, ...GALLERY_ITEMS].forEach((plate) => {
      const img = new Image();
      img.src = plate.src;
    });
  }, []);

  // Automated presentation loop
  useEffect(() => {
    if (
      isLoading ||
      isLightboxOpen ||
      isContactOpen ||
      isMenuOpen ||
      isAboutOpen ||
      isReviewsOpen ||
      isClientAccessOpen ||
      featureModalName ||
      legalModalContent
    ) {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
      }
      return;
    }

    autoPlayTimerRef.current = window.setInterval(() => {
      if (!document.hidden) {
        triggerCaptureAndFlip(false);
      }
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [
    isLoading,
    isLightboxOpen,
    isContactOpen,
    isMenuOpen,
    isAboutOpen,
    isReviewsOpen,
    isClientAccessOpen,
    featureModalName,
    legalModalContent,
    hasUserInteracted,
    isFlipping,
  ]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;
      if (
        (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === ' ') &&
        !isLightboxOpen &&
        !isContactOpen &&
        !isMenuOpen &&
        !isAboutOpen &&
        !isReviewsOpen &&
        !isClientAccessOpen &&
        !featureModalName &&
        !legalModalContent
      ) {
        if (e.key === ' ') e.preventDefault();
        handleManualCapture();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(null);
        setIsContactOpen(false);
        setIsMenuOpen(false);
        setIsAboutOpen(false);
        setIsReviewsOpen(false);
        setIsClientAccessOpen(false);
        setFeatureModalName(null);
        setLegalModalContent(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isLoading,
    isLightboxOpen,
    isContactOpen,
    isMenuOpen,
    isAboutOpen,
    isReviewsOpen,
    isClientAccessOpen,
    featureModalName,
    legalModalContent,
    isFlipping,
  ]);

  const copyEmailToClipboard = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard?.writeText('thekaalvoetphotographer@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsLightboxOpen(leftImage);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-[#C5A059] relative overflow-x-hidden">
      {/* Full-screen Cinematic Pre-loader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Minimalist Header */}
      <Header
        onOpenEnquire={() => setFeatureModalName('Enquire')}
        onOpenAbout={() => setFeatureModalName('About')}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        leftImage={leftImage}
        leftAlt={leftAlt}
        rightImage={rightImage}
        rightAlt={rightAlt}
        isFlashing={isFlashing}
        isFlipping={isFlipping}
        onManualCapture={handleManualCapture}
        onOpenLightbox={(src) => setIsLightboxOpen(src)}
        onScrollToGallery={scrollToGallery}
      />

      {/* The Collection Section */}
      <Collection
        galleryFilter={galleryFilter}
        onFilterChange={setGalleryFilter}
        onOpenLightbox={(src) => setIsLightboxOpen(src)}
      />

      {/* Studio Footer */}
      <Footer
        emailCopied={emailCopied}
        onCopyEmail={copyEmailToClipboard}
      />

      {/* Minimalist Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCollection={scrollToGallery}
        onOpenEnquire={() => setFeatureModalName('Enquire')}
        onOpenAbout={() => setFeatureModalName('About')}
        onOpenReviews={() => setFeatureModalName('Reviews')}
        onOpenGallery={() => setFeatureModalName('Gallery')}
        isClientSubMenuOpen={isClientSubMenuOpen}
        setIsClientSubMenuOpen={setIsClientSubMenuOpen}
        onReplayReveal={() => setIsLoading(true)}
      />

      {/* Modals */}
      <TemporaryFeatureModal
        isOpen={Boolean(featureModalName)}
        featureName={featureModalName}
        onClose={() => setFeatureModalName(null)}
      />

      <LightboxModal
        imageSrc={isLightboxOpen}
        onClose={() => setIsLightboxOpen(null)}
        onSelectImage={(src) => setIsLightboxOpen(src)}
        onOpenEnquire={(context) => setFeatureModalName(context ? `Enquire · ${context}` : 'Enquire')}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onExploreWorks={() => setIsLightboxOpen(leftImage)}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        onViewGallery={() => setIsLightboxOpen(leftImage)}
      />

      <ClientAccessModal
        isOpen={isClientAccessOpen}
        onClose={() => setIsClientAccessOpen(false)}
        onEnterPasscode={() => setIsLightboxOpen(leftImage)}
      />

      <LegalModal
        content={legalModalContent}
        onClose={() => setLegalModalContent(null)}
      />
    </div>
  );
}
