import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 10px;
  height: 97.5vh;
  min-width: 350px;
  width: 35vw;
  margin: auto 0;
  left: 5px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.secundaryBackground};
  position: absolute;
  z-index: 9999999;

  & header {
    background: ${({ theme }) => theme.background};
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0 3px 3px ${({ theme }) => theme.secundaryText};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    & p {
      font-size: 22px;
      font-weight: bold;
      padding: 5px 0;
    }

    & svg {
      transition: transform 0.75s, filter 0.75s;
      stroke-width: 3px;
      cursor: pointer;
    }

    & svg:hover {
      transform: rotate(180deg);
      filter: brightness(75%);
    }
  }
`

export const CommentsEmpty = styled.p`
  font-size: 26px;
  font-weight: bold;
  padding: 15px;
  text-align: center;
  align-self: center;
`

export const ContainerCommentBody = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  position: relative;
`

export const ContainerListComments = styled.ul`
  list-style: none;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ContainerComment = styled.li`
  display: flex;
  padding: 10px;
`

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: filter 0.5s;

  &:hover {
    filter: brightness(50%);
  }
`

export const Name = styled.p`
  cursor: pointer;
  width: fit-content;
  font-weight: bold;
  color: ${({ theme }) => darken(0.2, theme.text)};
  margin-bottom: 4px;
  text-decoration: none;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    height: 2px;
    width: 0;
    bottom: 0;
    margin: 0;
    left: 0;
    right: 0;
    background: ${({ theme }) => darken(0.2, theme.text)};
    transition: width 0.5s;
  }

  &:hover::after {
    width: 100%;
  }
`

export const Content = styled.p``

export const DateComponent = styled.p`
  font-size: 13px;
  opacity: 0.25;
`

export const ContainerInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -2px 2px ${({ theme }) => theme.secundaryText};
  border-radius: 5px;

  & small {
    align-self: flex-end;
    padding: 5px;
    font-weight: bold;
    transition: 0.5s color;
  }
`

export const InputComment = styled.textarea`
  background: ${({ theme }) => theme.background};
  border: 0;
  width: 100%;
  padding: 15px 10px;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  outline: 0;
  resize: none;
  position: relative;
`
