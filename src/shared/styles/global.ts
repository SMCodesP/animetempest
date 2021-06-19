import { lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    background: ${({ theme }) => theme.cyan_light};
    color: ${({ theme }) => theme.text};
    font-family: 'Rubik', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  input, button {
    outline: 0;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
    padding: 0 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.text};
    border-radius: 5px;
    transition: 0.2s background;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #455073;
  }
`;
