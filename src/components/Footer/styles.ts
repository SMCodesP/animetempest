import styled, { keyframes } from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  margin-top: 50px;
  padding: 50px 50px 15px 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 175px;
`;

export const ListOptions = styled.ul`
  display: flex;
  gap: 15px;
`;

export const OptionItem = styled.li`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 0 5px ${({ theme }) => theme.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: filter 0.4s;

  & svg {
    transition: opacity 0.4s;
    opacity: 0.75;
  }

  &:hover {
    filter: brightness(80%);

    & svg {
      opacity: 1;
    }
  }
`;

export const AuthorCopyright = styled.p`
  display: flex;
  width: fit-content;
  align-self: center;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans', sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(.75);
  }
  100% {
    transform: scale(1);
  }
`;

export const Heart = styled.div`
  position: relative;
  width: 20px;
  height: 10px;
  animation: ${heartbeat} 1s infinite;
  margin: 0 5px;

  &:before,
  &:after {
    position: absolute;
    content: '';
    left: 10px;
    top: 0;
    width: 10px;
    height: 16px;
    background: ${({ theme }) => theme.red};
    -moz-border-radius: 10px 10px 0 0;
    border-radius: 10px 10px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }

  &:after {
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
`;
