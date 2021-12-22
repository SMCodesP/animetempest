/* eslint-disable @next/next/no-img-element */
import React from 'react';

import {
  Container,
  Quote,
  ContainerContent,
  Name,
  CharacterImage,
  ContainerCharacterImage,
  ImageAnime,
} from './styles';

const Suggestions: React.FC<{
  quote: TQuote;
}> = ({ quote }) => {
  console.log(quote.image_character_medium);
  return (
    <Container color={quote.color_anime}>
      <ImageAnime
        src={quote.image_anime}
        placeholder="blur"
        blurDataURL={quote.image_anime_medium}
        alt="Character user"
        layout="fill"
        objectFit="contain"
      />
      <ContainerContent color={quote.color_anime}>
        <Quote color={quote.color_anime}>&quot;{quote.quote}&quot;</Quote>
        <Name color={quote.color_anime}>- {quote.character}</Name>
        <ContainerCharacterImage>
          <CharacterImage
            src={quote.image_character_medium}
            alt="Character user"
            width={92}
            height={138}
          />
        </ContainerCharacterImage>
      </ContainerContent>
    </Container>
  );
};

export default Suggestions;
