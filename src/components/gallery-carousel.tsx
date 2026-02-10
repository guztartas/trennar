'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';

const AUTO_PLAY_INTERVAL_MS = 4200;
const TRACK_ANIMATION_DURATION_S = 0.62;

const getSlidesPerPage = (screenWidth: number) => {
  if (screenWidth >= 1120) {
    return 3;
  }

  if (screenWidth >= 760) {
    return 2;
  }

  return 1;
};

type GalleryCarouselProps = {
  images: string[];
  title: string;
};

export function GalleryCarousel({ images, title }: GalleryCarouselProps) {
  const [slidesPerPage, setSlidesPerPage] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  useEffect(() => {
    const updateSlidesPerPage = () => {
      setSlidesPerPage(getSlidesPerPage(window.innerWidth));
    };

    updateSlidesPerPage();
    window.addEventListener('resize', updateSlidesPerPage);

    return () => {
      window.removeEventListener('resize', updateSlidesPerPage);
    };
  }, []);

  const imageCount = images.length;
  const visibleSlides = Math.min(slidesPerPage, imageCount || 1);
  const isLooping = imageCount > visibleSlides;

  const renderedImages = useMemo(() => {
    if (!isLooping) {
      return images;
    }

    return [...images, ...images.slice(0, visibleSlides)];
  }, [images, isLooping, visibleSlides]);

  useEffect(() => {
    if (!isLooping) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((previousIndex) => previousIndex + 1);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [isLooping]);

  useEffect(() => {
    if (!isLooping || activeIndex < imageCount) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setActiveIndex(0);
    }, TRACK_ANIMATION_DURATION_S * 1000 + 30);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeIndex, imageCount, isLooping]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isTransitionEnabled]);

  const normalizedIndex = imageCount === 0 ? 0 : activeIndex % imageCount;
  const displayIndex = isLooping ? activeIndex : 0;

  const carouselStyle = {
    '--carousel-columns': String(visibleSlides),
    '--carousel-gap': '1rem',
  } as CSSProperties;

  if (imageCount === 0) {
    return null;
  }

  const goToPrevious = () => {
    if (!isLooping) {
      return;
    }

    setIsTransitionEnabled(true);
    setActiveIndex((previousIndex) => {
      const safeIndex = previousIndex >= imageCount ? 0 : previousIndex;
      return safeIndex === 0 ? imageCount - 1 : safeIndex - 1;
    });
  };

  const goToNext = () => {
    if (!isLooping) {
      return;
    }

    setIsTransitionEnabled(true);
    setActiveIndex((previousIndex) => {
      const safeIndex = previousIndex >= imageCount ? 0 : previousIndex;
      return safeIndex + 1;
    });
  };

  return (
    <div className='gallery-carousel-frame' style={carouselStyle}>
      <div className='carousel-viewport'>
        <motion.div
          className='carousel-track'
          animate={{
            x: `calc((100% + var(--carousel-gap)) / var(--carousel-columns) * -${displayIndex})`,
          }}
          transition={
            isTransitionEnabled
              ? {
                  duration: TRACK_ANIMATION_DURATION_S,
                  ease: [0.22, 1, 0.36, 1],
                }
              : { duration: 0 }
          }
        >
          {renderedImages.map((image, imageIndex) => (
            <figure key={`${image}-${imageIndex}`} className='gallery-item'>
              <Image
                src={image}
                alt={`Imagem da seção ${title}`}
                width={1800}
                height={1200}
                className='gallery-photo'
                sizes='(min-width: 1120px) 33vw, (min-width: 760px) 50vw, 100vw'
              />
            </figure>
          ))}
        </motion.div>
      </div>

      {isLooping && (
        <div className='carousel-controls'>
          <button
            type='button'
            className='carousel-arrow'
            aria-label={`Voltar uma imagem de ${title}`}
            onClick={goToPrevious}
          >
            {'<'}
          </button>

          <div className='carousel-dots'>
            {images.map((_, dotIndex) => (
              <button
                key={`${title}-dot-${dotIndex}`}
                className={`carousel-dot ${normalizedIndex === dotIndex ? 'is-active' : ''}`}
                onClick={() => {
                  setIsTransitionEnabled(true);
                  setActiveIndex(dotIndex);
                }}
                type='button'
                aria-label={`Ir para imagem ${dotIndex + 1} de ${title}`}
              />
            ))}
          </div>

          <button
            type='button'
            className='carousel-arrow'
            aria-label={`Avançar uma imagem de ${title}`}
            onClick={goToNext}
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
}
