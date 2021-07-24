import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 235px;
  display: flex;

  & .embla {
    position: relative;
    width: 100%;
  }

  & .embla__viewport {
    overflow: hidden;
    width: 100%;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 5px;
  }

  & .embla__viewport.is-draggable {
    cursor: move;
    cursor: grab;
  }

  & .embla__viewport.is-dragging {
    cursor: grabbing;
  }

  & .embla__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  & .embla__slide {
  }

  & .embla__slide__inner {
    position: relative;
    overflow: hidden;
    height: 190px;
  }

  & .embla__slide__img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    width: auto;
    min-height: 100%;
    min-width: 100%;
    max-width: none;
    transform: translate(-50%, -50%);
  }

  & .embla__button {
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    fill: #1bcacd;
    padding: 0;
  }

  & .embla__button:disabled {
    cursor: default;
    opacity: 0.3;
  }

  & .embla__button__svg {
    width: 100%;
    height: 100%;
  }

  & .embla__button--prev {
    left: 27px;
  }

  & .embla__button--next {
    right: 27px;
  }
`;

export const Button = styled.button`
  transition: filter 0.4s;

  &:hover {
    filter: brightness(85%);
  }

  &:disabled {
    cursor: not-allowed !important;
    opacity: 0.5 !important;
  }
`;
