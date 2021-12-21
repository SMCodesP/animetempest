import styled from 'styled-components';
import Image from 'next/image';
import { transparentize } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 25px 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.p`
  padding-left: 50px;
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  left: 35px;
  top: 32px;
`;

export const ContainerImage = styled.div<{
  colorBoxShadow: string;
}>`
  position: relative;
  gap: 15px;
  min-width: 200px;
  max-width: 200px;
  height: 100%;
  margin: 15px 7px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 5px ${({ colorBoxShadow }) => colorBoxShadow};
  transition: box-shadow 0.4s, transform 0.4s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 10px ${({ colorBoxShadow }) => colorBoxShadow};
  }
`;

export const AnimeImage = styled(Image)`
  /* border-radius: 15px;

  & * {
    border-radius: 15px;
  } */
`;

export const ContainerAnimeTitle = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;

  & > span {
    position: relative;
    z-index: 999;
    font-size: 14px;
    color: ${({ theme }) => transparentize(0.3, theme.background)};
  }
`;

export const ContainerCurtain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => transparentize(0.5, theme.text)};
  backdrop-filter: blur(5px);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const ContainerTitleStars = styled.div`
  --color-green: 123, 213, 85;
  --color-orange: 247, 154, 99;
  -color-red: 232, 93, 117;

  position: relative;
  display: flex;
  gap: 15px;
  justify-content: space-between;
  color: ${({ theme }) => theme.background};

  & span {
    min-width: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    gap: 4px;
    font-size: 14px;
    font-weight: bold;
  }

  & svg {
    font-size: 18px;
    width: 1.25em;
    overflow: hidden;
  }
`;

export const AnimeTitle = styled.p`
  position: relative;
  font-size: 16px;
  width: 100%;
  height: 100%;
  z-index: 99999;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  word-break: break-all;
  font-weight: 500;
`;

export const ContainerButton = styled.div`
  position: absolute;
  right: 0;
  top: 8px;
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  z-index: 99999999;
  box-shadow: 0 0 8px ${({ theme }) => transparentize(0.925, theme.text)};
  border-radius: 8px;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.background};
    width: 40px;
    height: 40px;
    border: 0;
    transition: filter 0.2s;

    &.disable {
      filter: brightness(85%);
    }

    &:active {
      filter: brightness(85%);
    }

    &:first-child {
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
      border: 1px solid ${({ theme }) => transparentize(0.75, theme.text)};
    }

    &:last-child {
      border-bottom-right-radius: 8px;
      border-top-right-radius: 8px;
      border-top: 1px solid ${({ theme }) => transparentize(0.75, theme.text)};
      border-right: 1px solid ${({ theme }) => transparentize(0.75, theme.text)};
      border-bottom: 1px solid
        ${({ theme }) => transparentize(0.75, theme.text)};
    }
  }
`;
