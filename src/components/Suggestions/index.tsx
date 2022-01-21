/* eslint-disable @next/next/no-img-element */

import {
  Container,
  Quote,
  ContainerContent,
  Name,
  CharacterImage,
  ContainerCharacterImage,
  ImageAnime,
  ContainerImage,
} from './styles';

const Suggestions: React.FC<{
  quote: TQuote;
}> = ({ quote }) => (
  <Container color={quote.color_anime}>
    <ContainerImage>
      <ImageAnime
        src={quote.image_anime}
        placeholder="blur"
        blurDataURL={quote.image_anime_medium}
        alt="Character user"
        layout="fill"
        objectFit="cover"
      />
    </ContainerImage>
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

export default Suggestions;
