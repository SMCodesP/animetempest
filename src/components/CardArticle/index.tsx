import React from 'react';
import Link from 'next/link';

import { useTheme } from 'styled-components';

import { BiTimer } from 'react-icons/bi';

import {
  Container,
  BgWrap,
  ImageThumbnail,
  Title,
  ArticleAbout,
  Author,
  TimeRead,
} from './styles';

export const CardArticle: React.FC<{
  className?: string;
}> = ({ className }) => {
  const theme = useTheme();

  return (
    <Container className={className}>
      <BgWrap>
        <ImageThumbnail
          alt="Mountains"
          src="/kanojo.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </BgWrap>
      <Title>Namorada de aluguel voltando com uma data prevista</Title>
      <ArticleAbout>
        <Author>SMCodes</Author>
        <TimeRead>
          <BiTimer size={20} color={theme.light} />5 min. de leitura
        </TimeRead>
      </ArticleAbout>
    </Container>
  );
};
