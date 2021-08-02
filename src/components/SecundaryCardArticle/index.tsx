import React from 'react';
import { useTheme } from 'styled-components';

import { Container, ArticleContent, Title, Author } from './styles';

export const SecundaryCardArticle: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <ArticleContent
        style={{
          backgroundImage: `linear-gradient(to left, ${theme.text}77, ${theme.text}), url('/kanojo.jpg')`,
        }}
      >
        <Title>Namorada de aluguel voltando com uma data prevista</Title>
        <Author>
          Postado por <b>SMCodes</b> há 2 horas
        </Author>
      </ArticleContent>
    </Container>
  );
};
