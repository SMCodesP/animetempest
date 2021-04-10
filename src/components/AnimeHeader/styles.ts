import styled from 'styled-components'
import NextImage from 'next/image'

export const Container = styled.div`
  width: 100%;
  height: 70vh;
  background: ${({ theme }) => theme.background};
  position: relative;
`

export const HeaderWave = styled.div`
  position: absolute;
  align-self: flex-end;
  width: 100%;
  height: 75%;
  top: -1px;
  transform: rotateZ(180deg);
`

export const Menu = styled.nav`
  width: 100%;
  padding: 10px 3.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SearchIcon = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.background};
  border-radius: 50%;
  height: 38px;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  z-index: 100;
  transition: 0.5s filter;

  &.actived:hover {
    cursor: pointer;
    filter: brightness(200%);
  }

  &.no-actived:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
`

export const ContainerInput = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
`

export const Icon = styled(NextImage).attrs({
  width: 48,
  height: 48
})`
  width: 48px;
  border-radius: 24px;
  position: relative;
`

export const Input = styled.input`
  outline: 0;
  height: 38px;
  font-size: 17px;
  font-weight: bold;
  color: ${({ theme }) => theme.fifthText};
  border-radius: 18px;
  border: 0;
  padding-left: 15px;
  padding-right: 25px;
  transition: filter 0.5s, width 1s ease;
  background: ${({ theme }) => theme.background};

  &:focus {
    filter: brightness(150%);
  }

  &.actived {
    width: 100%;
  }

  &.no-actived {
    width: 0;
  }
`

export const ContainerAnime = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 2;
  padding: 5px 17.5% 75px 10%;
  width: 100%;
  height: 60vh;

  @media(max-width: 900px) {
    justify-content: center;
    padding: 0;
    flex-direction: column-reverse;
    align-items: center;
    gap: 15px;
  }
`

export const ContainerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media(max-width: 900px) {
    justify-content: center;
    align-items: center;
  }
`

export const Title = styled.h1`
  font-size: 38px;
  padding-right: 25%;

  @media(max-width: 900px) {
    padding: 0 25%;
    text-align: center;
  }
`

export const ButtonWatch = styled.button`
  margin: 25px 30px;
  padding: 10px 0;
  width: 100%;
  background: ${({ theme }) => theme.tertiary};
  border: 0;
  border-radius: 7.5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 18px;
  outline: none;
  filter: brightness(85%);
  transition: filter 0.2s;

  &:hover {
    filter: brightness(60%);
  }

  @media(max-width: 900px) {
    margin: 10px 0;
  }
`

export const Thumbnail = styled.img`
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 4px ${({ theme }) => theme.secundaryText};
  cursor: pointer;
  transition: border-radius 0.4s, filter 0.4s, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    border-radius: 20px;
    filter: brightness(35%);
    box-shadow: 0 0 10px ${({ theme }) => theme.secundaryText};
    transform: scale(1.05);
  }
`
