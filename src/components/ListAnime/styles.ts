import styled from 'styled-components';
import Image from 'next/image';
import { transparentize } from 'polished';

export const Container = styled.div<{
  items: number;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 35px;

  & > div {
    padding-left: 50px;
    padding-top: 70px;
    padding-bottom: 10px;
    margin-top: -58px;
  }

  ul {
    padding: 10px 0;
    gap: 15px;
    width: calc(255px * ${({ items }) => items});
  }

  & * {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;

export const Title = styled.p`
  padding-left: 50px;
  font-size: 32px;
  font-weight: 500;
`;

export const ContainerImage = styled.div`
  position: relative;
  height: 99%;
  border-radius: 15px;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.075);
    box-shadow: 0 !important;
  }
`;

export const AnimeImage = styled(Image)`
  border-radius: 15px;
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
  position: relative;
  display: flex;
  gap: 14px;
  justify-content: space-between;
  color: ${({ theme }) => theme.background};

  & span {
    min-width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    gap: 4px;
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
