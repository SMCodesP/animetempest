/* eslint-disable react/button-has-type */
import { useState, useEffect, useCallback } from 'react';

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useRecursiveTimeout } from '@/hooks/useRecursiveTimeout';
import { Container, ContainerButtons, ContainerCarouselHead } from './styles';

const AUTOPLAY_INTERVAL = 4000;

const PrevButton: React.FC<{
  enabled: boolean;
  color: string;
  onClick: any;
}> = ({ enabled, color, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <FaChevronLeft size={26} color={color} />
  </button>
);
const NextButton: React.FC<{
  enabled: boolean;
  color: string;
  onClick: any;
}> = ({ enabled, color, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <FaChevronRight size={26} color={color} />
  </button>
);

const Carousel: React.FC<{
  options?: Partial<EmblaOptionsType> | undefined;
  autoplay?: boolean;
  TitleHead?: any;
  children?: any;
}> = ({
  options,
  autoplay: autoplayEnabled = false,
  children,
  TitleHead = () => <div />,
}) => {
  const [viewportRef, embla] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);

  const { play, stop } = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    stop();
  }, [embla, stop]);

  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    stop();
  }, [embla, stop]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on(`select`, onSelect);
    embla.on(`pointerDown`, stop);
  }, [embla, onSelect, stop]);

  useEffect(() => {
    if (autoplayEnabled) {
      play();
    }
  }, [play, autoplayEnabled]);

  return (
    <Container>
      <ContainerCarouselHead>
        <TitleHead />
        <ContainerButtons>
          <PrevButton
            color="#888888"
            onClick={scrollPrev}
            enabled={prevBtnEnabled}
          />
          <hr />
          <NextButton
            color="#888888"
            onClick={scrollNext}
            enabled={nextBtnEnabled}
          />
        </ContainerButtons>
      </ContainerCarouselHead>
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
            <div className="border__slide embla__slide" />
            {children}
            <div className="border__slide embla__slide" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Carousel;
