import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 0 auto;
  display: flex;
  gap: 5px;
  flex-direction: column;

  .embla {
    position: relative;
    width: 100%;
  }

  .embla__viewport {
    overflow: hidden;
    width: 100%;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 5px;
  }

  .embla__viewport.is-draggable {
    cursor: move;
    cursor: grab;
  }

  .embla__viewport.is-dragging {
    cursor: grabbing;
  }

  .embla__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .embla__slide {
  }

  .border__slide {
    min-width: 5px;
    height: auto;
    background: transparent;
  }

  .embla__slide__inner {
    position: relative;
    overflow: hidden;
    height: 190px;
  }

  .embla__slide__img {
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

  .embla__button {
    outline: 0;
    border: 0;
    background: #fff;
    padding: 5px 0;
    width: 50px;
    border-radius: 0;
    transition: background 0.5s, opacity 0.5s, border-color 0.25s;
  }

  .embla__button:enabled:active {
    border-color: #999 !important;
  }

  .embla__button:enabled:focus {
    border-color: #eee;
  }

  .embla__button:enabled:hover {
    background: #eee;
  }

  .embla__button:first-child {
    border-top-left-radius: 7.5px;
    border-bottom-left-radius: 7.5px;
    border: 1px solid transparent;
    border-right: 0;
  }

  .embla__button:last-child {
    border-top-right-radius: 7.5px;
    border-bottom-right-radius: 7.5px;
    border: 1px solid transparent;
    border-left: 0;
  }

  .embla__button:disabled {
    cursor: default;
    opacity: 0.5;
  }

  .embla__button__svg {
    width: 100%;
    height: 100%;
  }

  .embla__button--prev {
    /* left: 27px; */
  }

  .embla__button--next {
    /* right: 27px; */
  }
`;

export const ContainerButtons = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  align-self: flex-end;
  border-radius: 7.5px;
  box-shadow: 0 0 5px #483c6755;
  height: 40px;

  & hr {
    width: 1px;
    height: 40px;
    background-color: #eee;
    margin: 0;
    border: 0;
  }
`;
