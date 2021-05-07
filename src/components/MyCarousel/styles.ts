import styled from 'styled-components'

export const Button = styled.button`
  position: absolute;
  outline: 0;
  -webkit-transition: all .5s;
  transition: all .5s;
  border-radius: 35px;
  z-index: 1000;
  border: 0;
  background: ${({ theme }) => theme.secundaryBackground};
  width: 46px;
  height: 46px;
  opacity: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.75;
  transition: opacity .5s, filter .5s;

  &:hover {
    opacity: 1;
    filter: brightness(175%);
  }
`

export const ButtonLeft = styled(Button)`
  left: calc(4% + 1px);
`

export const ButtonRight = styled(Button)`
  right: calc(4% + 1px);
`

export const Container = styled.div`
  & li {
    width: 250px !important;
    transition: width .2s;
  }

  & li:hover {
    width: 275px !important;
  }
`
