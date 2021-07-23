import React from 'react';

import TCharacterQuote from '@/types/TCharacterQuote';

import { CharacterAuthor, CharacterImage, Container, TextTip } from './styles';

export const CharacterQuote: React.FC<{
  characterQuote: TCharacterQuote;
}> = ({ characterQuote }) => (
  <Container
    style={{
      backgroundImage: `linear-gradient(to left, #19162277, #191622), url('${characterQuote.anime}')`,
    }}
  >
    <TextTip>{characterQuote.quote}</TextTip>
    <CharacterAuthor>
      <span>-</span> {characterQuote.character.name}
    </CharacterAuthor>
    <CharacterImage
      src={characterQuote.character.avatar}
      alt="Character person"
    />
  </Container>
);
