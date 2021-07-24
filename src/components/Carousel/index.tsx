import React, { useState, useEffect, useCallback } from 'react';

import { useTheme } from 'styled-components';
import { useEmblaCarousel } from 'embla-carousel/react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Container, Button } from './styles';

const PrevButton: React.FC<{
  enabled: boolean;
  color: string;
  onClick: any;
}> = ({ enabled, color, onClick }) => (
  <Button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <FaChevronLeft size={26} color={color} />
  </Button>
);
const NextButton: React.FC<{
  enabled: boolean;
  color: string;
  onClick: any;
}> = ({ enabled, color, onClick }) => (
  <Button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <FaChevronRight size={26} color={color} />
  </Button>
);

export const Carousel: React.FC = ({ children }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: `trimSnaps`,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const theme = useTheme();

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on(`select`, onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <Container>
      <div
        style={{
          height: `100%`,
        }}
        className="embla"
      >
        <div
          style={{
            height: `100%`,
          }}
          className="embla__viewport"
          ref={viewportRef}
        >
          <div
            style={{
              height: `100%`,
            }}
            className="embla__container"
          >
            {children}
          </div>
        </div>
        <PrevButton
          color={theme.blue}
          onClick={scrollPrev}
          enabled={prevBtnEnabled}
        />
        <NextButton
          color={theme.blue}
          onClick={scrollNext}
          enabled={nextBtnEnabled}
        />
      </div>
    </Container>
  );
};
