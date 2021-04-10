import styled from 'styled-components'
import { darken } from 'polished'
import { FaDiscord } from 'react-icons/fa'

export const BorderCustom = styled.div`
  background-color: ${({ theme }) => darken(0.2, theme.secundaryBackground)};
  background-image: linear-gradient(
    to top,
    ${({ theme }) => darken(0.03, theme.secundaryBackground)},
    ${({ theme }) => darken(0.2, theme.secundaryBackground)}
  );
  height: 5px;
  width: 100%;
  margin-top: 50px;
`

export const Container = styled.footer`
  width: 100%;
  height: 75px;
  background: ${({ theme }) => theme.secundaryBackground};
  position: relative;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;

  @media(max-width: 1000px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 15px;
    height: fit-content;
    padding: 5px 0;
  }
`

export const Author = styled.p`
  margin: 5px 10px;

  & a,
  & span {
    font-weight: bold;
    color: ${({ theme }) => theme.fifthText};
  }
`

export const FooterContainer = styled.div`
  display: flex;
  height: 75px;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  font-size: 14pt;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 15px;
    color: ${({ theme }) => theme.tertiary};
  }

  @media(max-width: 1000px) {
    width: fit-content;
    height: fit-content;
    text-align: center;
  }
`

export const SocialNetworking = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media(max-width: 1000px) {
    width: fit-content;
    padding: 0;
  }
`

export const ProjectThis = styled(SocialNetworking)`
  justify-content: flex-start;
  left: 0;
  padding: 0;
  bottom: 0;

  @media(max-width: 1000px) {
    padding-top: 5px;
    width: 80%;
    display: flex;
    justify-content: center;
    box-shadow: 0px -5px 8px -8px #000000;
  }
`

export const Discord = styled(FaDiscord).attrs(() => ({
  color: '#7289DA',
  size: 32,
}))`
  cursor: pointer;
  transition: filter 0.2s;
  margin: 0 5px;
  &:hover {
    filter: brightness(60%);
  }
`
