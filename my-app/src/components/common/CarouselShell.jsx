import { useState, useCallback, useRef, useEffect } from 'react';
import { useT } from '../../i18n/useTranslation';

const CAROUSEL_GAP = 24;

export default function CarouselShell({ children, className, cardWidth = 400 }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const { t } = useT();

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scrollByArrow = useCallback((direction) => {
    setPulsing(false);
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild;
    const cardW = firstCard
      ? firstCard.getBoundingClientRect().width
      : cardWidth;
    el.scrollBy({ left: direction * (cardW + CAROUSEL_GAP), behavior: 'smooth' });
  }, [cardWidth]);

  /* Pulse arrows while section is visible, stop on click or leaving */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setPulsing(entry.isIntersecting);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  return (
    <div className={`${className}__carousel-wrapper`} ref={wrapperRef}>
      <button
        type="button"
        className={`${className}__arrow ${className}__arrow--left${atStart ? ` ${className}__arrow--hidden` : ''}${pulsing && !atStart ? ` ${className}__arrow--pulse` : ''}`}
        onClick={() => scrollByArrow(-1)}
        aria-label={t('projects.prevSlide')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className={`${className}__carousel`} ref={carouselRef}>
        {children}
      </div>

      <button
        type="button"
        className={`${className}__arrow ${className}__arrow--right${atEnd ? ` ${className}__arrow--hidden` : ''}${pulsing && !atEnd ? ` ${className}__arrow--pulse` : ''}`}
        onClick={() => scrollByArrow(1)}
        aria-label={t('projects.nextSlide')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
