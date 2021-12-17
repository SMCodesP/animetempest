import { darken, getLuminance, transparentize } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  margin-left: 50px;
  position: relative;
  height: 325px;
  width: 60%;
`;

export const ContainerBackground = styled.div<{
  color?: string;
}>`
  display: flex;
  width: 100%;
  height: 325px;
  border-radius: 10px;
  position: absolute;
  box-shadow: 0 0 10px ${({ theme }) => theme.background};

  & img {
    position: absolute;
    width: 45%;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    top: 0;
    right: 0;
    height: 100%;
    user-select: none;
  }

  &::after {
    content: ' ';
    width: 37%;
    position: absolute;
    height: 100%;
    z-index: 99999;
    background: linear-gradient(
      to right,
      ${({ color, theme }) => color || theme.blue_light} 5%,
      ${({ color, theme }) => transparentize(0.5, color || theme.blue_light)}
    );
    left: calc(63% + 2px);
    backdrop-filter: blur(3px);
    filter: blur(2px);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const ShadowCurtain = styled.div`
  width: 65%;
  background: ${({ color, theme }) => color || theme.blue_light};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 50vw 0 90px ${({ color, theme }) => color || theme.blue_light}
    inset;
  position: relative;
  z-index: 99999;
`;

export const ContainerContent = styled.div`
  z-index: 9999999;
  position: relative;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Quote = styled.h3<{
  color: string;
}>`
  background: ${({ color, theme }) =>
    getLuminance(color) >= getLuminance(`#0000ff`)
      ? `-webkit-linear-gradient(${theme.text}, ${transparentize(
          0.5,
          theme.text,
        )});`
      : `-webkit-linear-gradient(${theme.background}, ${darken(
          0.5,
          `#ffffff`,
        )});`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-indent: 1em;
  padding: 4% 20% 4% 4%;
`;

export const Name = styled.p<{
  color: string;
}>`
  padding-left: 5%;
  font-weight: bold;
  background: ${({ color, theme }) =>
    getLuminance(color) >= getLuminance(`#0000ff`)
      ? `-webkit-linear-gradient(${theme.text}, ${transparentize(
          0.5,
          theme.text,
        )});`
      : `-webkit-linear-gradient(${theme.background}, ${darken(
          0.5,
          `#ffffff`,
        )});`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const CharacterImage = styled.img`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 92px;
  border-radius: 10px;
  filter: brightness(60%);
  box-shadow: 0 0 5px ${({ theme }) => theme.purple};
`;
