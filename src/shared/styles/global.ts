import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  ::-moz-selection {
    background: ${({ theme }) => theme.secundaryText};
  }
  ::selection {
    background: ${({ theme }) => theme.secundaryText};
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.fifthText};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secundary};
    border-radius: 5px;
    transition: 0.2s background;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #455073;
  }
`
