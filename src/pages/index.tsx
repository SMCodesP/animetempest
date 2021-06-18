import { NextPage } from 'next';

import Category from '@/entities/Category';

import api from '@/services/api';

import getRandom from '@/utils/getRandom';
import gerens from '@/shared/data/genres';

import Menu from '@/components/Menu';
import ListAnime from '@/components/ListAnime';

import 'react-multi-carousel/lib/styles.css';

const Home: NextPage<{
  animesPopular: Category[];
  animesGenre: {
    [key: string]: Category[];
  };
}> = ({ animesPopular, animesGenre }) => (
  <div>
    <Menu />

    <ListAnime title="Popular" animes={animesPopular} />

    {Object.keys(animesGenre).map((genre) => (
      <ListAnime
        key={`list_anime-${genre.toLowerCase().replace(` `, `_`)}`}
        title={genre}
        animes={animesGenre[genre]}
      />
    ))}
  </div>
);

export async function getStaticProps() {
  const animesPopular = await api.getPopular();
  const genresRandom = getRandom(Object.keys(gerens), 5);
  const genresPopulate: {
    [key: string]: Category[];
  } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const genre of genresRandom) {
    // eslint-disable-next-line no-await-in-loop
    genresPopulate[genre] = await api.getByGenre(gerens[genre]);
  }

  return {
    props: {
      animesPopular,
      animesGenre: genresPopulate,
    },
    revalidate: 300,
  };
}

export default Home;
