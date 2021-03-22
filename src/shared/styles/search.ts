import Image from 'next/image'
import styled from 'styled-components'

export const Container = styled.div``

export const ContainerHeader = styled.header`
  width: 100%;
  height: 70vh;
  background: ${({ theme }) => theme.secundary};
  background-image: linear-gradient(
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secundaryBackground} 75%
  );
  position: relative;
`

export const HeaderWave = styled.img`
  position: absolute;
  align-self: flex-end;
  width: 100%;
  bottom: -1px;
`

export const Menu = styled.div`
  width: 100%;
  padding: 25px;
  display: flex !important;
  align-items: center;

  & svg {
    cursor: pointer;
    transition: filter 0.4s;

    &:hover {
      filter: brightness(50%);
    }
  }
`

export const Input = styled.input`
  margin: auto;
  background: ${({ theme }) => theme.background};
  height: 42px;
  border: 0;
  outline: 0;
  border-radius: 22px 5px 22px 5px;
  padding: 0 15px;
  font-size: 17px;
  color: ${({ theme }) => theme.fifthText};
  font-weight: bold;
`

export const ContainerListAnime = styled.ul`
  z-index: 999;
  position: absolute;
  width: 100%;
  padding: 10px 30px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  gap: 20px 10px;
`

export const Thumbnail = styled(Image)`
  width: 100%;
  background: ${({ theme }) => theme.secundary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: filter 0.4s, border-radius 0.2s;
`

export const ItemAnime = styled.li`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s;
  height: min-content;

  &:hover {
    transform: scale(1.1);
  }

  &:hover ${Thumbnail} {
    filter: brightness(50%) blur(2px);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
`

export const ContainerName = styled.div`
  background: ${({ theme }) => theme.secundaryBackground};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px;
`

export const Name = styled.p`
  font-size: 16px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`
