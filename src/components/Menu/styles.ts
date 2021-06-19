import styled from 'styled-components';
import Image from 'next/image';
import { transparentize } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  margin-top: 25px;
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

export const Page = styled.li`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  transition: opacity 0.4s;

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

export const Option = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  background: ${({ theme }) => theme.background};
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px ${({ theme }) => transparentize(0.925, theme.text)};
  cursor: pointer;
  transition: box-shadow 0.4s, filter 0.4s;

  &:hover {
    filter: brightness(85%);
    box-shadow: 0 0 15px ${({ theme }) => transparentize(0.85, theme.text)};
  }
`;
