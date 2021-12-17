/* eslint-disable @next/next/no-img-element */
import React from 'react';

import {
  Container,
  ShadowCurtain,
  Quote,
  ContainerBackground,
  ContainerContent,
  Name,
  CharacterImage,
} from './styles';

const Suggestions: React.FC<{
  quote: TQuote;
}> = ({ quote }) => (
  <Container>
    <ContainerBackground color={quote.color_anime}>
      <ShadowCurtain color={quote.color_anime} />
      <img src={quote.image_anime} alt="Anime cover extra large" />
    </ContainerBackground>
    <ContainerContent>
      <Quote color={quote.color_anime}>&quot;{quote.quote}&quot;</Quote>
      <Name color={quote.color_anime}>- {quote.character}</Name>
      <CharacterImage src={quote.image_character} alt="Character user" />
    </ContainerContent>
  </Container>
);

export default Suggestions;
