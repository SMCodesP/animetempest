import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  height: 160px;
  padding: 0 12.5%;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ListOptions = styled.ul`
  display: flex;
  gap: 15px;
`;

export const OptionItem = styled.li`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 0 5px ${({ theme }) => theme.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: filter 0.4s;

  & svg {
    transition: opacity 0.4s;
    opacity: 0.75;
  }

  &:hover {
    filter: brightness(80%);

    & svg {
      opacity: 1;
    }
  }
`;

export const ListPages = styled.ul`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const opacity = keyframes`
  from {
    opacity: 0;
    height: 2px;
    width: 2px;
  }
  to {
    opacity: 1;
    width: 5px;
    height: 5px;
  }
`;

export const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background: ${({ theme }) => theme.purple};
  animation: ${opacity} 0.4s linear;
`;

export const PageItem = styled.li<{
  actived: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  font-family: 'Noto Sans', sans-serif;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme, actived }) =>
    actived ? theme.text : lighten(0.25, theme.text)};
  transition: color 0.4s;

  & ${Dot} {
    ${({ actived }) => !actived && `display: none;`}
  }

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  &:hover ${Dot} {
    display: block !important;
  }
`;
