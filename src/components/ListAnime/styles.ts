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
  }

  ul {
    padding: 10px 0;
    gap: 15px;
    width: calc(260px * ${({ items }) => items});
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
