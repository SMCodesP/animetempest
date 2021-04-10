import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.div`
  padding: 45px 25px 0 25px;
`

export const Back = styled.div`
  color: ${({ theme }) => theme.tertiary};
  width: fit-content;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: 0.3s filter;

  &:hover {
    text-decoration: underline;
    filter: brightness(50%);
  }

  & svg {
    stroke-width: 20px;
  }
`

export const ContainerInfoAnime = styled.div`
  display: flex;
  margin-top: 15px;

  & > div:first-child {
    flex: 0 0 268px;
    border-radius: 15px;
    box-shadow: 2px 2px 8px ${({ theme }) => theme.secundaryText};
    transition: box-shadow 0.3s, filter 0.3s, transform 0.3s;
  }

  & > div:first-child:hover {
    box-shadow: 2px 2px 15px ${({ theme }) => theme.secundaryText};
    transform: scale(1.075);
  }

  @media(max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`

export const ContainerAnimeImage = styled.div`
  height: fit-content;
  width: fit-content;
`

export const AnimeImage = styled(Image)`
  border-radius: 15px;
  width: 268px;
`

export const AnimeInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  padding: 5px 25px;

  @media(max-width: 750px) {
    align-items: center;
  }
`

export const AnimeTitle = styled.h1``

export const AnimeDescription = styled.p`
  text-indent: 1em;
  font-size: 17px;
  padding: 5px 15px;
  margin-bottom: 20px;
`

export const ButtonWatch = styled.button`
  width: fit-content;
  padding: 10px 20px;
  background: ${({ theme }) => theme.background};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 18px;
  outline: 0;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => theme.secundaryText};
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.inverseText};
  }
`

export const ContainerListEpisodes = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  padding: 35px 20px;

  @media(max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media(max-width: 850px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media(max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 440px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const EpisodeTitle = styled.span`
  word-break: break-word;
  background: ${({ theme }) => theme.secundaryBackground};
  color: ${({ theme }) => theme.tertiaryText};
  text-shadow: 0 0 1px ${({ theme }) => theme.tertiaryText};
  width: 100%;
  padding: 7px 10px;
  font-size: 17px;
  font-weight: 900;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  top: 0;
  position: absolute;
  z-index: 999;
  opacity: 0.9;
  transition: filter 0.3s, opacity 0.3s;
`

export const EpisodeImage = styled(AnimeImage)`
  border-radius: 10px !important;
  transition: filter 0.3s;
`

export const ContainerItemEpisode = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.3s, filter 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.secundaryText};
    transform: scale(1.05);
  }

  &:hover ${EpisodeTitle} {
    opacity: 1;
    filter: brightness(85%);
  }

  &:hover ${EpisodeImage} {
    filter: brightness(50%) blur(3px);
  }
`
