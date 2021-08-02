import { lighten } from 'polished';
import styled from 'styled-components';
import Image from 'next/image';

export const ImageThumbnail = styled(Image)`
  border-radius: 15px;
  filter: brightness(55%) blur(0.05em);
  transition: filter 0.4s;
`;

export const Container = styled.div`
  min-width: 345px;
  height: auto;
  border-radius: 15px;
  margin: 0 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: filter 0.4s;
  background: ${({ theme }) => theme.text};

  & a {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &:hover {
    background: ${({ theme }) => theme.blue};
    filter: brightness(85%);
  }

  &:hover ${ImageThumbnail} {
    filter: brightness(50%) blur(0.2em);
  }
`;

export const BgWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 5px ${({ theme }) => theme.text};

  & > div {
    border-radius: 15px;
  }
`;

export const Title = styled.p`
  font-size: 18px;
  font-family: 'Noto Sans', sans-serif;
  font-weight: bold;
  color: ${({ theme }) => lighten(0.065, theme.light)};
  padding: 15px;
  text-indent: 1em;
  z-index: 2;
`;

export const ArticleAbout = styled.div`
  display: flex;
  color: ${({ theme }) => theme.light};
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  margin-top: auto;
  margin-bottom: 25px;
  z-index: 2;
  font-weight: 500;
`;

export const Author = styled.p`
  color: ${({ theme }) => theme.purple};
`;

export const TimeRead = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
