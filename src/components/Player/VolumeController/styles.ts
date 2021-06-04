import styled, { keyframes } from 'styled-components'

const opacityVolume = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Container = styled.div<{
  primaryColor: string
  percentVolume: number
}>`
  position: relative;

  &:hover .volumn-control {
    animation: ${opacityVolume} .4s;
    display: flex !important;
    opacity: 1;
  }

  .volumn-control {
    display: none !important;
    z-index: 99999;
    opacity: 0;
    bottom: 78px;
    left: -57px;
    position: absolute;
    transform: rotate(-90deg);

    .box {
      background: ${({ theme }) => theme.background};
      padding: 15px 18px;
      border-radius: 5px;
    }

    .box-connector {
      width: 20px;
    }

    input {
      border: none;
      appearance: none;
      height: 5px;
      border-radius: 5px;
      background: #999;
      background: linear-gradient(
        93deg,
        ${(props) => props.primaryColor} ${(props) => props.percentVolume}%,
        #fff ${(props) => props.percentVolume}%
      );
      width: 85px;
      cursor: pointer;

      &:focus {
        outline: none !important;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${(props) => props.primaryColor};
        cursor: pointer;
      }

      &::-moz-range-thumb {
        outline: none !important;
        -webkit-appearance: none;
        border: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${(props) => props.primaryColor};
        cursor: pointer;
      }
    }
  }
`
