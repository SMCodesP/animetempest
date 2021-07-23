import { NextPage } from 'next';

import { CharacterQuote } from '@/components/CharacterQuote';
import { Menu } from '@/components/Menu';

import api from '@/services/api';
import TCharacterQuote from '@/types/TCharacterQuote';

const Home: NextPage<{
  characterQuote: TCharacterQuote;
}> = ({ characterQuote }) => (
  <div>
    <Menu actived="home" />

    <CharacterQuote characterQuote={characterQuote} />
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
