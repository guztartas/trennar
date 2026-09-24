'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

const DESKTOP_BREAKPOINT_PX = 1120;
const TABLET_BREAKPOINT_PX = 760;
const DESKTOP_SLIDES_PER_PAGE = 3;
const TABLET_SLIDES_PER_PAGE = 2;
const MOBILE_SLIDES_PER_PAGE = 1;

export type TreatmentPrice = {
  label: string;
  value: string;
  detail?: string;
};

export type Treatment = {
  id: string;
  category: string;
  title: string;
  eyebrow: string;
  description: string;
  features: string[];
  prices: TreatmentPrice[];
  duration?: string;
  note?: string;
  whatsappLabel: string;
};

type TreatmentCarouselProps = {
  treatments: Treatment[];
  getContactLink: (serviceName: string) => string;
};

const getSlidesPerPage = (screenWidth: number) => {
  if (screenWidth >= DESKTOP_BREAKPOINT_PX) {
    return DESKTOP_SLIDES_PER_PAGE;
  }

  if (screenWidth >= TABLET_BREAKPOINT_PX) {
    return TABLET_SLIDES_PER_PAGE;
  }

  return MOBILE_SLIDES_PER_PAGE;
};

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left' ? 'M14.5 5 7.5 12l7 7' : 'm9.5 5 7 7-7 7';

  return (
    <svg aria-hidden='true' viewBox='0 0 24 24'>
      <path d={path} />
    </svg>
  );
}

function MovementIcon() {
  return (
    <svg aria-hidden='true' viewBox='0 0 48 48'>
      <circle cx='24' cy='10' r='4' />
      <path d='M24 16v13m0-9-9 6m9-6 9 6m-9 3-7 11m7-11 8 10' />
    </svg>
  );
}

export function TreatmentCarousel({
  treatments,
  getContactLink,
}: TreatmentCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slidesPerPage, setSlidesPerPage] = useState(DESKTOP_SLIDES_PER_PAGE);
  const [activeIndex, setActiveIndex] = useState(0);

  const lastIndex = Math.max(0, treatments.length - slidesPerPage);
  const paginationIndexes = useMemo(
    () => Array.from({ length: lastIndex + 1 }, (_, index) => index),
    [lastIndex],
  );

  const scrollToIndex = (requestedIndex: number) => {
    const viewport = viewportRef.current;
    const safeIndex = Math.min(Math.max(requestedIndex, 0), lastIndex);
    const targetCard = viewport?.querySelector<HTMLElement>(
      `[data-treatment-index='${safeIndex}']`,
    );

    if (!viewport || !targetCard) {
      return;
    }

    viewport.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });
    setActiveIndex(safeIndex);
  };

  useEffect(() => {
    const viewport = viewportRef.current;

    const updateSlidesPerPage = () => {
      const nextSlidesPerPage = getSlidesPerPage(window.innerWidth);
      setSlidesPerPage(nextSlidesPerPage);
      setActiveIndex((currentIndex) =>
        Math.min(
          currentIndex,
          Math.max(0, treatments.length - nextSlidesPerPage),
        ),
      );
    };

    const updateActiveIndex = () => {
      if (!viewport) {
        return;
      }

      const cards = Array.from(
        viewport.querySelectorAll<HTMLElement>('[data-treatment-index]'),
      );
      const closestCard = cards.reduce(
        (closest, card) =>
          Math.abs(card.offsetLeft - viewport.scrollLeft) <
          Math.abs(closest.offsetLeft - viewport.scrollLeft)
            ? card
            : closest,
        cards[0],
      );

      if (closestCard) {
        const nextIndex = Number(closestCard.dataset.treatmentIndex);
        setActiveIndex(Math.min(nextIndex, lastIndex));
      }
    };

    updateSlidesPerPage();
    window.addEventListener('resize', updateSlidesPerPage);
    viewport?.addEventListener('scrollend', updateActiveIndex);

    return () => {
      window.removeEventListener('resize', updateSlidesPerPage);
      viewport?.removeEventListener('scrollend', updateActiveIndex);
    };
  }, [lastIndex, treatments.length]);

  const carouselStyle = {
    '--treatment-columns': String(Math.min(slidesPerPage, treatments.length)),
  } as CSSProperties;

  return (
    <div className='treatment-carousel' style={carouselStyle}>
      <div
        className='treatment-viewport'
        ref={viewportRef}
        aria-label='Carrossel de atendimentos da Trennar'
        role='region'
      >
        <div className='treatment-track'>
          {treatments.map((treatment, index) => (
            <a
              className='treatment-card'
              data-treatment-index={index}
              href={getContactLink(treatment.whatsappLabel)}
              target='_blank'
              rel='noreferrer'
              aria-label={`Agendar ${treatment.whatsappLabel} pelo WhatsApp`}
              key={treatment.id}
            >
              <div className='treatment-card-top'>
                <div>
                  <span className='treatment-index'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{treatment.category}</p>
                </div>
                <span className='treatment-icon'>
                  <MovementIcon />
                </span>
              </div>

              <div className='treatment-title-group'>
                <span>{treatment.eyebrow}</span>
                <h3>{treatment.title}</h3>
                <p>{treatment.description}</p>
              </div>

              <ul className='treatment-features'>
                {treatment.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className='treatment-prices'>
                {treatment.prices.map((price) => (
                  <div
                    className='treatment-price-row'
                    key={`${price.label}-${price.value}`}
                  >
                    <span>{price.label}</span>
                    <strong>{price.value}</strong>
                    {price.detail && <small>{price.detail}</small>}
                  </div>
                ))}
              </div>

              {(treatment.duration || treatment.note) && (
                <div className='treatment-meta'>
                  {treatment.duration && <span>{treatment.duration}</span>}
                  {treatment.note && <span>{treatment.note}</span>}
                </div>
              )}

              <div className='treatment-cta'>
                <span>Quero agendar</span>
                <ArrowIcon direction='right' />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className='treatment-controls'>
        <div className='treatment-status' aria-live='polite'>
          <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
          <span aria-hidden='true'>/</span>
          <span>{String(lastIndex + 1).padStart(2, '0')}</span>
        </div>

        <div className='treatment-dots' aria-label='Navegação do carrossel'>
          {paginationIndexes.map((index) => (
            <button
              aria-label={`Exibir grupo ${index + 1} de atendimentos`}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={activeIndex === index ? 'is-active' : undefined}
              key={index}
              onClick={() => scrollToIndex(index)}
              type='button'
            />
          ))}
        </div>

        <div className='treatment-arrows'>
          <button
            aria-label='Ver atendimento anterior'
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
            type='button'
          >
            <ArrowIcon direction='left' />
          </button>
          <button
            aria-label='Ver próximo atendimento'
            disabled={activeIndex === lastIndex}
            onClick={() => scrollToIndex(activeIndex + 1)}
            type='button'
          >
            <ArrowIcon direction='right' />
          </button>
        </div>
      </div>
    </div>
  );
}
