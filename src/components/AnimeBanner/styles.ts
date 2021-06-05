import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  & svg {
    position: absolute;
    bottom: 0;
    transform: rotate(180deg);
    height: fit-content;
  }
`

export const ContainerBanner = styled.div`
  z-index: 1;

  & * {
    z-index: 1;
  }

  & > div {
    position: relative !important;
  }
`

export const BannerImage = styled(Image)<any>`
  filter: brightness(35%);
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`
