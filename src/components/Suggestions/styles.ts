import { darken, getLuminance, transparentize } from 'polished';
import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  margin-top: 20px;
  margin-left: 50px;
  position: relative;
  width: 55%;
  background-size: 25% 100%;
  border-radius: 15px;
  box-shadow: 0 0 10px ${({ color }: any) => color};
  display: flex;

  & div:first-child {
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
  }
`;

export const ImageAnime = styled(Image)`
  min-width: fit-content !important;
  margin: 0 !important;
  margin-left: auto !important;
`;

export const ContainerContent = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9999999;
  padding: 25px 15px;
  position: relative;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: linear-gradient(
    to right,
    ${({ color, theme }) => color || theme.blue_light} 75%,
    ${({ color, theme }) => transparentize(0.5, color || theme.blue_light)}
  );
`;

export const Quote = styled.h3`
  background: ${({ color, theme }: any) =>
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

export const Name = styled.p`
  padding-left: 5%;
  font-weight: bold;
  background: ${({ color, theme }: any) =>
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

export const ContainerCharacterImage = styled.div`
  height: 138px;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & * {
    border-radius: 10px !important;
  }
`;

export const CharacterImage = styled(Image)`
  position: absolute;
  width: 92px !important;
  height: 138px !important;
  filter: brightness(60%) !important;
  box-shadow: 0 0 5px ${({ theme }) => theme.purple};
  margin: 0 !important;
  min-width: 0 !important;
  min-height: 0 !important;

  & {
    bottom: 15px;
    right: 15px;
  }
`;
