import styled from "styled-components"
import { transparentize } from "polished";

export const ContainerUser = styled.a`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.background};
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const User = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  z-index: 99;
  cursor: pointer;
  transition: filter .4s;

  &:hover {
    filter: brightness(75%);
  }
`

export const Menu = styled.ul`
  z-index: 999;
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 6px 0;
  list-style: none;
  border: 2px solid ${({ theme }) => theme.secundaryText};

  & hr {
    border: 0;
    align-self: center;
    width: 80%;
    margin: 5px 0;
    height: 1px;
    background: ${({ theme }) => theme.secundaryText};
  }

  & span {
    padding: 0 7.5px;
    color: ${({ theme }) => theme.secundaryText};
  }
`

export const ItemMenu = styled.li`
  padding: 5px 25px;
  cursor: pointer;
  font-size: 17px;
  transition: background .2s;
  position: relative;
  color: ${({ theme, color }) => color || theme.tertiary};
  text-align: center;

  &:hover {
    background: ${({ theme, color }) => transparentize(0.75, color || theme.tertiary)};
  }
`
