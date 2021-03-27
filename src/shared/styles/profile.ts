import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  min-height: 100vh;
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
