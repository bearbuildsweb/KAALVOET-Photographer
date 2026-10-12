export type GalleryCategory = 'ALL' | 'ROMANTIC' | 'BECOMING' | 'EDITORIAL';

export interface GalleryPhoto {
  src: string;
  alt: string;
  number: string;
}

export interface GalleryShoot {
  id: string;
  title: string;
  category: 'ROMANTIC' | 'BECOMING' | 'EDITORIAL';
  tag: string;
  countText: string;
  brief: string;
  photos: GalleryPhoto[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  plate: string;
}

export interface HeroImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export interface HeroPair {
  left: HeroImage;
  right: HeroImage;
}

export interface LegalModalContent {
  title: string;
  content: string;
}
