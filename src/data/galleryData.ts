import { GalleryShoot, GalleryItem, HeroImage, HeroPair } from '../types';

// Images from assets/hero directory (clean universal baseline JPEGs)
import heroImg1 from '../assets/images/hero/1.jpg';
import heroImg2 from '../assets/images/hero/2.jpg';
import heroImg3 from '../assets/images/hero/3.jpg';
import heroImg4 from '../assets/images/hero/4.jpg';

// Portfolio Section Images & Shoots (Curated by Categories & Sessions)
import romanticSession01_1 from '../assets/images/portfolio/ROMANTIC/SESSION 01/1.jpg';
import romanticSession01_2 from '../assets/images/portfolio/ROMANTIC/SESSION 01/2.jpg';
import romanticSession02_1 from '../assets/images/portfolio/ROMANTIC/SESSION 02/1.jpg';
import romanticSession02_2 from '../assets/images/portfolio/ROMANTIC/SESSION 02/2.jpg';

import becomingSession01_1 from '../assets/images/portfolio/BECOMING/SESSION 01/1.jpg';
import becomingSession01_2 from '../assets/images/portfolio/BECOMING/SESSION 01/2.jpg';

import editorialSession01_1 from '../assets/images/portfolio/EDITORIAL/SESSION 01/1.webp';
import editorialSession01_2 from '../assets/images/portfolio/EDITORIAL/SESSION 01/2.webp';

export const HERO_FALLBACK_LEFT = heroImg1;
export const HERO_FALLBACK_RIGHT = heroImg2;

export const GALLERY_SHOOTS: GalleryShoot[] = [
  {
    id: 'shoot-romantic-01',
    title: 'SESSION 01',
    category: 'ROMANTIC',
    tag: 'ROMANTIC',
    countText: '2 SHOOT PHOTOGRAPHS',
    brief: 'Tender intimate romance captured through delicate natural light and honest unscripted connection.',
    photos: [
      { src: romanticSession01_1, alt: 'Romantic · Session 01 - Plate 01', number: '01' },
      { src: romanticSession01_2, alt: 'Romantic · Session 01 - Plate 02', number: '02' },
    ],
  },
  {
    id: 'shoot-becoming-01',
    title: 'SESSION 01',
    category: 'BECOMING',
    tag: 'BECOMING',
    countText: '2 SHOOT PHOTOGRAPHS',
    brief: 'An expressive visual narrative celebrating evolution, feminine grace, and raw authenticity.',
    photos: [
      { src: becomingSession01_1, alt: 'Becoming · Session 01 - Plate 01', number: '01' },
      { src: becomingSession01_2, alt: 'Becoming · Session 01 - Plate 02', number: '02' },
    ],
  },
  {
    id: 'shoot-romantic-02',
    title: 'SESSION 02',
    category: 'ROMANTIC',
    tag: 'ROMANTIC',
    countText: '2 SHOOT PHOTOGRAPHS',
    brief: 'Quiet devotion and timeless embrace bathed in warm editorial nuance and soft shadow.',
    photos: [
      { src: romanticSession02_1, alt: 'Romantic · Session 02 - Plate 01', number: '01' },
      { src: romanticSession02_2, alt: 'Romantic · Session 02 - Plate 02', number: '02' },
    ],
  },
  {
    id: 'shoot-editorial-01',
    title: 'SESSION 01',
    category: 'EDITORIAL',
    tag: 'EDITORIAL',
    countText: '2 SHOOT PHOTOGRAPHS',
    brief: 'Avant-garde couture monograph with bold sculptural silhouettes and modern texture.',
    photos: [
      { src: editorialSession01_1, alt: 'Editorial · Session 01 - Plate 01', number: '01' },
      { src: editorialSession01_2, alt: 'Editorial · Session 01 - Plate 02', number: '02' },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = GALLERY_SHOOTS.flatMap((shoot) =>
  shoot.photos.map((photo) => ({
    id: `${shoot.id}-${photo.number}`,
    src: photo.src,
    alt: photo.alt,
    title: `${shoot.title} · Plate ${photo.number}`,
    plate: `PL. ${photo.number} · ${shoot.title.toUpperCase()}`,
  }))
);

export const HERO_IMAGES: HeroImage[] = [
  { id: 1, src: heroImg1, alt: 'kaalvoet photographer editorial plate 01', title: 'Editorial Plate 01' },
  { id: 2, src: heroImg2, alt: 'kaalvoet photographer editorial plate 02', title: 'Editorial Plate 02' },
  { id: 3, src: heroImg3, alt: 'kaalvoet photographer editorial plate 03', title: 'Editorial Plate 03' },
  { id: 4, src: heroImg4, alt: 'kaalvoet photographer editorial plate 04', title: 'Editorial Plate 04' },
];

export const PAIRS: HeroPair[] = [
  { left: HERO_IMAGES[0], right: HERO_IMAGES[1] },
  { left: HERO_IMAGES[2], right: HERO_IMAGES[3] },
  { left: HERO_IMAGES[1], right: HERO_IMAGES[0] },
  { left: HERO_IMAGES[3], right: HERO_IMAGES[2] },
  { left: HERO_IMAGES[0], right: HERO_IMAGES[3] },
  { left: HERO_IMAGES[1], right: HERO_IMAGES[2] },
];
