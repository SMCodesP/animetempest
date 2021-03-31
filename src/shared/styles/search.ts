import styled, { keyframes } from 'styled-components'

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

export const Container = styled.div``

export const ContainerHeader = styled.header`
  width: 100%;
  min-height: 70vh;
  background: ${({ theme }) => theme.background};
  position: relative;
`

export const HeaderWave = styled.div`
  position: absolute;
  align-self: flex-end;
  width: 100%;
  height: 50vh;
  top: -1px;
  transform: rotateZ(180deg);
`

export const ContainerPage = styled.div`
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;

  & h1 {
    align-self: center;
    margin: 30px 0;
  }
`

export const Menu = styled.div`
  width: 100%;
  padding: 25px;
  display: flex !important;
  align-items: center;
  justify-content: space-between;

  & svg {
    cursor: pointer;
    transition: filter 0.4s;

    &:hover {
      filter: brightness(50%);
    }
  }
`

export const Input = styled.input`
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

export const ContainerInputCategory = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 9999;
`

export const ContainerListAnime = styled.ul`
  z-index: 999;
  position: relative;
  width: 100%;
  padding: 10px 30px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  list-style: none;
  gap: 20px 10px;

  & a {
    height: fit-content;
  }
`

export const Thumbnail = styled.img`
  min-height: 255px;
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

export const LoadingComponent = styled.div`
  height: 100% !important;
  width: 100% !important;
  display: flex;
  margin-top: 45px;

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
