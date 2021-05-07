import styled from 'styled-components'
import { BiPlayCircle } from 'react-icons/bi'
import ImageNext from 'next/image'

export const ContainerCurtain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 1;

  & svg:hover {
    cursor: pointer;
  }
`

export const IconPlay = styled(BiPlayCircle)`
  transition: filter 0.2s;
  filter: brightness(80%);

  &:hover {
    filter: brightness(150%);
  }
`

export const ContainerAnime = styled.div`
  position: relative;
  margin: 0;

  & * {
    user-select: none;
  }

  &:hover img {
    filter: brightness(25%);
  }
`

export const Image = styled(ImageNext).attrs({
  width: 325,
  height: 450
})`
  width: 100%;
  margin: 0;
  user-select: none;
  transition: filter 0.2s;
  filter: brightness(50%);
`

export const More = styled.div`
  width: 100%;
  padding: 15px 5px;
  opacity: 0.90;
  font-weight: 600;
  position: absolute;
  bottom: 8px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
  & a {
    cursor: pointer;
  }
  & a:hover {
    text-decoration: underline;
  }
`
