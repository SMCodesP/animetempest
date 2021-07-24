import { NextPage } from 'next';

import { CharacterQuote } from '@/components/CharacterQuote';
import { Menu } from '@/components/Menu';
import { Footer } from '@/components/Footer';
import { Carousel } from '@/components/Carousel';
import { CardArticle } from '@/components/CardArticle';

import api from '@/services/api';
import TCharacterQuote from '@/types/TCharacterQuote';

import {
  ContainerAbout,
  ContainerWelcome,
  Description,
  Title,
} from '@/shared/styles/home';

const Home: NextPage<{
  characterQuote: TCharacterQuote;
}> = ({ characterQuote }) => (
  <div>
    <Menu actived="home" />

    <ContainerWelcome>
      <CharacterQuote characterQuote={characterQuote} />
      <ContainerAbout>
        <Title>Seja bem-vindo ao nosso blog!</Title>
        <Description>Fique por dentro do universo dos animes</Description>
        <Carousel>
          {[`teste`, `teste123`, `12i3`, `iapsdi`, `iapsd`].map((index) => (
            <CardArticle key={index} className="embla__slide" />
          ))}
        </Carousel>
      </ContainerAbout>
    </ContainerWelcome>

    <Footer />
  </div>
);

export async function getStaticProps() {
  const characterQuote = await api.getRandomCharacterQuote();

  return {
    props: {
      characterQuote,
    },
    revalidate: 10,
  };
}

export default Home;
