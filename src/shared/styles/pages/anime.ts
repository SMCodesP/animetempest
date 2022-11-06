import Image from 'next/image';
import styled from 'styled-components';

export const ContainerInfomations = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 35px;
  margin: 15px 0;
  gap: 50px;
`;

export const CoverPoster = styled.div`
  width: 12% !important;
  height: auto;
  position: relative;
  border-radius: 10px;

  & img {
    border-radius: 10px;
  }
`;

export const CardListInfos = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InformationText = styled.p`
  display: inline-block;
  position: relative;
  width: auto;
  font-size: 13px;
  line-height: 30px;
  letter-spacing: 4px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 0 2px #fff;
`;

export const Title = styled.h1`
  font-size: 3em;
`;

export const ListSummary = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 25px;
`;

export const Summary = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  height: 30px;

  & svg {
    margin: 0 10px;
    size: 22px;
    user-select: none;
  }

  & small {
    font-size: 12px;
    font-weight: 400;
    color: #888;
  }
`;

export const Sinopse = styled.div`
  width: 75%;
  margin-top: 25px;
`;

export const ContainerMainAnime = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 70px;
`;

export const CategoryListTitle = styled.h2`
  display: flex;
  gap: 15px;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 1.25em;

  & button {
    cursor: pointer;
    background: none;
    border: 0;
  }
`;

export const ContainerTitleCategory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 15px;
`;

export const ContainerFilter = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.text};
  width: 175%;
  top: 35px;
  right: 0;
  z-index: 999 !important;
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: flex-start;
  overflow: hidden;
  padding: 15px 20px;
  gap: 10px;
  cursor: initial;
`;

export const Filter = styled.li`
  font-weight: 600;
  text-transform: none;
  font-family: 'Rubik';
  font-size: 16px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }
`;

export const LineFilterSeparator = styled.hr`
  width: 80%;
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.cyan_light};
  align-self: center;
`;

interface BF {
  filterexpanded: string;
}

export const ButtonFilter = styled.button<BF>`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 20px;
  height: 35px;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0 15px;
  user-select: none;
  position: relative;
  transition: color, background-color 0.4s;

  & span {
    align-items: center;
    display: flex;
    gap: 15px;
  }

  & svg {
    transition: color 0.4s;
  }

  &${({ filterexpanded }) => filterexpanded === `false` && `:hover`} {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};

    & svg {
      color: ${({ theme }) => theme.background} !important;
    }
  }

  & ${ContainerFilter} {
    transition: opacity 0.4s;
    opacity: ${({ filterexpanded }) => (filterexpanded === `true` ? 1 : 0)};
    height: ${({ filterexpanded }) => (filterexpanded === `true` ? `auto` : 0)};
    padding: ${({ filterexpanded }) =>
      filterexpanded === `true` ? `15px 20px` : 0};
  }
`;

export const StaffList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;
  gap: 15px;
  padding: 15px 10px;
`;

export const StaffItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NameStaff = styled.p`
  display: inline-block;
  position: relative;
  width: auto;
  font-size: 13px;
  line-height: 30px;
  letter-spacing: 4px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
`;

export const ContainerListEpisodes = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  list-style: none;
  padding: 0 15px;
`;

export const ContainerThumbnail = styled.div`
  position: relative;
  height: 152px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 8px ${({ theme }) => theme.text}55;
  transition: filter 0.4s;

  & svg {
    position: absolute;
    filter: drop-shadow(0 0 2px #00000055) brightness(75%);
  }
`;

export const EpisodeThumbnail = styled(Image)`
  border-radius: 10px;
  transition: transform 0.4s, filter 0.4s;
  filter: brightness(37.5%);

  & * {
    border-radius: 10px;
  }
`;

export const EpisodeTitle = styled.p`
  font-size: 16px;
  padding: 8px 10px;
  font-weight: 500;
  letter-spacing: 0;
`;

export const CardEpisode = styled.li`
  width: 100%;
  cursor: pointer;
  user-select: none;

  &:hover ${EpisodeThumbnail} {
    filter: brightness(90%);
  }

  &:hover ${ContainerThumbnail} svg {
    filter: drop-shadow(0 0 2px #00000055) brightness(90%);
  }

  &:hover ${EpisodeThumbnail} {
    transform: scale(1.35);
  }
`;

interface AS {
  url: string;
}

export const AvatarStaff = styled.div<AS>`
  border-radius: 12px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  grid-area: image;
  background-image: url(${({ url }) => url});
  width: 52px;
  height: 66px;
  box-shadow: 0 0 5px ${({ theme }) => theme.text}55;
  transition: filter 0.4s linear;

  &:hover {
    filter: brightness(85%);
  }
`;

interface TContainer {
  backgroundimage?: string;
}

export const Container = styled.div<TContainer>`
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: 0;

  &::before {
    width: calc(125% + 10px);
    height: 30vw;
    content: '';
    position: absolute;
    top: -10px;
    left: -12.25%;
    z-index: -1 !important;
    background: linear-gradient(
        to top,
        ${({ theme }) => theme.cyan_light} 5%,
        ${({ theme }) => theme.cyan_light}55
      ),
      url(${({ backgroundimage }) => backgroundimage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
  }
`;
