import React from 'react';
import Image from 'next/image';

import { useTheme } from 'styled-components';

import { FaDiscord, FaFacebook, FaChevronUp } from 'react-icons/fa';

import {
  AuthorCopyright,
  Container,
  Heart,
  ListOptions,
  OptionItem,
  TopContainer,
} from './styles';

export const Footer: React.FC = () => {
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
            <FaFacebook size={24} color={theme.text} />
          </OptionItem>
          <OptionItem>
            <FaDiscord size={24} color={theme.text} />
          </OptionItem>
          <OptionItem>
            <FaChevronUp size={24} color={theme.text} />
          </OptionItem>
        </ListOptions>
      </TopContainer>
      <AuthorCopyright>
        Feito com <Heart /> por SMCodes
      </AuthorCopyright>
    </Container>
  );
};
