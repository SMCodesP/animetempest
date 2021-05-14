// @ts-nocheck

import styled, { css, keyframes } from 'styled-components'

const toUpOpacity = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-20px);
  }

  100% {
    opacity: 0;
    transform: translateY(0);
  }
`

export const Container = styled.div<{
  fullPlayer: boolean
  hideVideo: boolean
  fontFamily: string
}>`
  & > * {
    user-select: none;
    outline: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${(props) =>
      props.fontFamily
        ? props.fontFamily
        : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"};
  }

  width: 100%;
  max-height: 100vh;
  position: relative;
  background: #000;
  overflow: hidden;

  video {
    height: 100% !important;
    max-height: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    cursor: none;
    opacity: ${(props) => (props.hideVideo ? 0 : 1)};

    &::cue {
      color: ${({ theme }) => theme.text};
      z-index: 4;
      text-shadow: ${({ theme }) => theme.inverseText} 0 0 5px;
      background: none;
      font-family: ${(props) =>
        props.fontFamily
          ? props.fontFamily
          : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"};
    }
  }

  ${(props) =>
    props.fullPlayer &&
    css`
      top: 0;
      left: 0;
      z-index: 10000;
    `}
`

export const ContainerMain = styled.div<{
  show: boolean
  playing: boolean
}>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1 !important;

  & * {
    transition: opacity 0.4s;
  }

  ${(props) =>
    !props.playing
      ? `
    & .play {
      opacity: 1 !important;
    }
    & .play * {
      opacity: 1 !important;
    }
    & .pause {
      opacity: 0 !important;
    }
    & .pause * {
      opacity: 0 !important;
    }
  `
      : props.show &&
        `
    & .pause {
      opacity: 1;
    }
    & .pause * {
      opacity: 1;
    }
    & .play {
      opacity: 0 !important;
    }
    & .play * {
      opacity: 0 !important;
    }
  `}

  & div {
    cursor: pointer;
    position: absolute;
    filter: brightness(70%);
  }

  @media(max-width: 1000px) {
    width: fit-content;
    height: fit-content;
    align-self: center;
    flex: none;
    position: relative;

    & div {
      position: relative;
      width: fit-content;
      height: fit-content;
    }
  }
`

// transform: ${(props) => (props.show ? 'scale(1)' : 'scale(1.2)')};
export const Controlls = styled.div<{
  show: boolean
  primaryColor: string
}>`
  ${(props) => !props.show && 'cursor: none;'}
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all .5s;
  opacity: ${(props) => (props.show ? 1 : 0)};

  padding: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 1.5em;
  background: ${({ theme }) => theme.background};
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.7) 5%,
    rgba(0, 0, 0, 0) 15%,
    rgba(0, 0, 0, 0) 85%,
    rgba(0, 0, 0, 0.7) 95%,
    rgba(0, 0, 0, 1) 100%
  );

  & * {
    transition: opacity .5s;
    opacity: ${(props) => (props.show ? 1 : 0)};
  }

  .back {
    margin-top: 30px;
    margin-left: 50px;
    display: flex;

    div {
      display: flex;
      font-size: 20px;
      align-items: center;
      opacity: 0.3;
      transition: all 0.2s ease-out;
      overflow: hidden;

      span {
        margin-left: -100%;
        opacity: 0;
        transition: all ease-out 0.2s;
      }

      &:hover {
        opacity: 1;
        transform: translateX(-10px);

        span {
          margin-left: 0;
          opacity: 1;
        }
      }

      svg {
        font-size: 35px;
        margin-right: 5px;
      }
    }
  }

  .line-reproduction {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    gap: 15px;

    input {
      margin: auto;
    }

    span {
      font-size: 14px;
    }
  }

  .controlls {
    margin: 20px 0;
    display: flex;
    justify-items: center;

    .end {
      margin-left: auto;
    }

    div {
      display: flex;
      justify-items: center;
    }

    .item-control {
      position: relative;
      margin: auto 15px;
    }

    .info-video {
      font-size: 16px;
      margin-top: -1px;
      display: flex;
      flex-direction: column;

      .info-first {
        font-weight: bold;
        opacity: 1;
        margin-right: 5px;
      }

      .info-secund {
        font-weight: lighter;
        opacity: 0.5;
      }
    }

    svg {
      cursor: pointer;
      opacity: 0.65;
      font-size: 25px;
      transition: all 0.2s ease-out;

      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }

  .progress-bar {
    width: 100%;
    margin-bottom: 15px;
    appearance: none;
    height: 3px;
    transition: height 0.2s linear;
    border-radius: 5px;
    cursor: pointer;

    &:focus {
      outline: none !important;
    }

    &::-moz-focus-outer {
      border: 0;
    }

    &::-ms-track {
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${(props) => props.primaryColor};
      cursor: pointer;

      outline: none !important;
      border-color: transparent;
      border: 0 !important;
      box-shadow: none !important;
      box-sizing: none;
    }

    &:hover {
      height: 6px;
    }
  }

  @media(max-width: 1000px) {
    & svg {
      width: 20px;
      height: 20px;
    }

    .controlls {
      margin: 10px 0;

      .item-control {
        margin: auto 10px;
      }

      .info-video {
        font-size: 15px;
      }
    }
  }

  @media(max-width: 660px) {
    .controlls {
      .info-video {
        display: none;
      }
    }
  }

  @media(max-width: 490px) {
    .controlls {
      margin: 5px 0;

      .item-control {
        margin: auto 10px;
      }

      .info-video {
        display: none;
      }
    }
  }

  @media(max-width: 440px) {
    & svg {
      width: 17px;
      height: 17px;
    }

    .controlls {
      .item-control {
        margin: auto 5px;
      }
    }
  }

  @media(max-width: 315px) {
    .controlls {
      .time-play {
        display: none;
      }
    }
  }
`

export const Loading = styled.div`
  position: absolute;
  height: 100% !important;
  width: 100% !important;
  display: flex;

  div {
    display: flex;
    margin: auto;

    div {
      &:nth-child(2) {
        animation-delay: 0.1s;
      }

      &:nth-child(3) {
        animation-delay: 0.2s;
      }

      animation: 1s linear ${toUpOpacity} infinite;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${(props) => props.color};
      margin: auto 5px;
    }
  }
`

const ItemControllBar = styled.div`
  bottom: 20px;
  right: -20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;

  .box-connector {
    height: 20px;
    width: 100%;
  }
`

export const IconPlayBackRate = styled.div`
  cursor: pointer;
  font-weight: bold;

  small {
    font-weight: lighter;
    font-weight: 10px;
  }

  span {
    opacity: 0.65;
    font-size: 25px;
    transition: all 0.2s ease-out;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }


  @media(max-width: 1000px) {
    & span {
      font-size: 23px;
    }
  }

  @media(max-width: 490px) {
    display: none !important;
  }
`

export const ItemPlaybackRate = styled(ItemControllBar)`
  cursor: pointer;
  font-weight: bold;
  max-width: 150px;

  & > div:first-child {
    background: ${({ theme }) => theme.secundaryBackground};
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
      margin: 0;
    }

    .item {
      background: ${({ theme }) => theme.secundaryBackground};
      display: flex;
      font-size: 14px;
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s ease-out;
      flex-direction: row;
      align-items: center;

      &:hover {
        background: ${({ theme }) => theme.background};
      }
    }

    svg {
      font-size: 14px !important;
      margin-right: 5px;
    }

    .bold {
      font-weight: bold;
    }
  }
`

export const ItemNextOrPrevious = styled(ItemControllBar)`
  & > div:first-child {
    background: ${({ theme }) => theme.secundaryBackground};
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    .item {
      border-radius: 10px;
      background: ${({ theme }) => theme.background};
      display: flex;
      flex-direction: column;
      font-size: 14px;
      padding: 10px;
      cursor: pointer;
      transition: border-radius .2s, background .2s;

      &:hover {
        border-radius: 5px;
        background: ${({ theme }) => theme.secundaryBackground};
      }
    }
    .bold {
      font-weight: bold;
    }
  }
`

export const ItemListReproduction = styled(ItemControllBar)`
  max-width: 400px;
  overflow: hidden;

  & > div:first-child {
    background: ${({ theme }) => theme.secundaryBackground};
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    overflow: hidden;

    .bold {
      font-weight: bold;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
      margin: 0;
    }

    .list-list-reproduction {
      display: flex;
      flex-direction: column;
      max-height: 400px;
      overflow: auto;

      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.background};
      }

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.secundaryBackground};
      }

      a {
        color: ${({ theme }) => theme.text};
        text-decoration: none;
      }

      .item-list-reproduction {
        background: ${({ theme }) => theme.background};
        display: flex;
        flex-direction: row;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s ease-out;
        align-items: center;

        &:hover {
          background: ${({ theme }) => theme.secundaryBackground};
        }

        .percent {
          height: 3px;
          width: 100px;
          margin-left: auto;
        }
      }

      .selected {
        background: ${({ theme }) => theme.secundaryBackground};
      }
    }
  }
`

export const ItemListQuality = styled(ItemControllBar)`
  max-width: 120px;
  min-width: 120px;

  & > div:first-child {
    font-size: 14px;
    background: ${({ theme }) => theme.background};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    div {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;

      &:hover {
        background: ${({ theme }) => theme.secundaryBackground};
      }
    }

    span {
      margin-right: 5px;

      &:nth-child(1) {
        font-weight: bold;
      }
    }

    svg {
      color: #f78b28;
      font-size: 2em;
      margin-left: auto;
    }
  }
`
