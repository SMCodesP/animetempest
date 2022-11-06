import styled from 'styled-components';
import Image from 'next/image';
import { darken, lighten, transparentize } from 'polished';
import { FiChevronDown } from 'react-icons/fi';

type MenuPopper = {
  menupoppperisactived?: string;
};

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 50px;
  align-items: center;
`;

export const ContainerGroup = styled.div``;

export const Logo = styled(Image)``;

export const User = styled(Image)`
  border-radius: 32px;
`;

export const ListPage = styled.ul`
  list-style: none;
  display: flex;
  gap: 25px;
`;

interface Page {
  darkground?: string;
}

export const Page = styled.li<Page>`
  opacity: 0.5;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  transition: opacity 0.4s;
  color: ${({ theme, darkground }) =>
    darkground === `true` ? lighten(1, theme.background) : theme.text};

  &:hover {
    opacity: 1;
  }

  &.location {
    font-weight: bold;
    opacity: 1;
  }

  &.location::after {
    content: ' ';
    position: absolute;
    width: 40%;
    background: ${({ theme }) => theme.blue};
    height: 3px;
    border-radius: 5px;
    top: 110%;
    align-self: center;
    left: calc(100% - 75%);
  }
`;

export const ListOption = styled(ListPage)`
  gap: 20px;
`;

export const Option = styled.li<MenuPopper>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  background: ${({ theme }) => theme.background};
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px ${({ theme }) => transparentize(0.925, theme.text)};
  cursor: pointer;
  transition: box-shadow, filter 0.4s;
  color: ${({ theme, menupoppperisactived = `false` }) =>
    menupoppperisactived === `true`
      ? transparentize(0.1, theme.text)
      : transparentize(0.75, theme.text)};
  filter: brightness(
    ${({ menupoppperisactived = `false` }) =>
      menupoppperisactived === `true` ? `85%` : `100%`}
  );

  & * {
    color: ${({ theme, menupoppperisactived = `false` }) =>
      menupoppperisactived === `true`
        ? transparentize(0.1, theme.text)
        : transparentize(0.75, theme.text)};
  }

  &:hover {
    & * {
      color: ${({ theme }) => transparentize(0.1, theme.text)};
    }

    color: ${({ theme }) => transparentize(0.1, theme.text)};
    filter: brightness(85%);
    box-shadow: 0 0 15px ${({ theme }) => transparentize(0.85, theme.text)};
  }
`;

export const ArrowOption = styled(FiChevronDown)<MenuPopper>`
  transition: transform 0.25s;
  transform: rotate(
    ${({ menupoppperisactived }) =>
      menupoppperisactived === `true` ? `-180deg` : `0`}
  );
`;

export const PopperContainer = styled.div`
  text-align: center;
  margin-top: 5px;

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -5px;
    z-index: 9999999999;

    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -2px -2px 2px ${({ theme }) => transparentize(0.925, theme.text)};
    }
  }

  &[data-popper-placement^='top'] > .arrow {
    bottom: -30px;
    :after {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const ContainerMenuNoHidden = styled.div<MenuPopper>`
  position: relative;
  transition: transform 0.25s, opacity 0.25s;
  transform: scale(
    ${({ menupoppperisactived }) => (menupoppperisactived === `true` ? 1 : 0.8)}
  );
  opacity: ${({ menupoppperisactived }) =>
    menupoppperisactived === `true` ? 1 : 0};
`;

export const ContainerMenuAnimation = styled.div<MenuPopper>`
  box-shadow: 0 0 10px ${({ theme }) => transparentize(0.925, theme.text)};
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  overflow: hidden;
  transition: max-height 0.5s;
  max-height: ${({ menupoppperisactived }) =>
    menupoppperisactived === `true` ? 500 : 0}px;
`;

export const UserMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0;

  & a {
    width: 100%;
  }
`;

export const UserOption = styled.li`
  padding: 8px 50px 8px 15px;
  width: 100%;
  text-align: start;
  color: ${({ theme, color }) => color || transparentize(0.75, theme.text)};
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
  background: ${({ theme }) => theme.background};

  &:hover {
    background: ${({ theme }) => transparentize(0.925, theme.text)};
    color: ${({ theme, color }) =>
      color ? darken(0.2, color) : transparentize(0.1, theme.text)};
  }
`;

export const Line = styled.hr`
  background: ${({ theme }) => transparentize(0.925, theme.text)};
  width: 100%;
  height: 1px;
  border: 0;
  margin: 8px 0;
`;
