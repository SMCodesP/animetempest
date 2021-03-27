import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  padding: 20px 15px;
`

export const Profile = styled.div`
  padding: 10px 25px;
`

export const HeadProfile = styled.div`
  display: flex;
  gap: 15px;

  & svg {
    cursor: pointer;
    transition: filter 0.4s;

    &:hover {
      filter: brightness(50%);
    }
  }

  & img {
    width: 92px;
    height: 92px;
    cursor: pointer;
    border-radius: 50%;
    transition: filter 0.4s;

    &:hover {
      filter: blur(1px) brightness(45%);
    }
  }
`

export const Name = styled.p`
  font-size: 32px;
  font-family: 'Passion One', 'Roboto', sans-serif;
  color: ${({ theme }) => theme.tertiary};
  margin-bottom: 10px;
`

export const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => lighten(0.1, theme.secundaryText)};
`

export const BodyProfile = styled.div`
  width: 100%;
  padding: 25px 0;

  & h1 {
    text-align: center;
  }

  & h2 {
    font-size: 30px;
    font-weight: 900;
  }
`

export const ListFavorites = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  list-style: none;
  padding: 10px;
  gap: 7px;
`

export const ItemFavorite = styled.li`
  & img {
    width: 100%;
    height: 100%;
    transition: transform 0.4s, filter 0.4s;
    border-radius: 5px;
    cursor: pointer;
  }

  & img:hover {
    filter: brightness(35%) blur(1px);
    transform: scale(1.07);
  }
`
