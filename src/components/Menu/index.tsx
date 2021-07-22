import React from 'react';
import Image from 'next/image';

import { useTheme } from 'styled-components';

import { BiSearchAlt2 } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';

import {
  Container,
  Dot,
  ListOptions,
  ListPages,
  OptionItem,
  PageItem,
  TopContainer,
} from './styles';

export const Menu: React.FC<{
  actived?: string;
}> = ({ actived = `` }) => {
  const theme = useTheme();

  return (
    <Container>
      <TopContainer>
        <Image
          src="https://via.placeholder.com/230x36/191622/fffffc"
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mOUFFP6z0AEYBxVSF+FAGw4DStkDsxfAAAAAElFTkSuQmCC"
          alt="Logo 522x68"
          width={230}
          height={36}
        />
        <ListOptions>
          <OptionItem>
            <CgDarkMode size={24} color={theme.text} />
          </OptionItem>
          <OptionItem>
            <BiSearchAlt2 size={24} color={theme.text} />
          </OptionItem>
        </ListOptions>
      </TopContainer>
      <div>
        <ListPages>
          <PageItem actived={actived === `home`}>
            Início
            <Dot />
          </PageItem>
          <PageItem actived={actived === `reviews`}>
            Reviews
            <Dot />
          </PageItem>
          <PageItem actived={actived === `suggest`}>
            Sugestões
            <Dot />
          </PageItem>
          <PageItem actived={actived === `videos`}>
            Vídeos
            <Dot />
          </PageItem>
          <PageItem actived={actived === `tops`}>
            Tops
            <Dot />
          </PageItem>
        </ListPages>
      </div>
    </Container>
  );
};
