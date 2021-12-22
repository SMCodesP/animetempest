import React from 'react';
import { NextPage } from 'next';

import api from '@/services/api';

import getRandom from '@/utils/getRandom';
import genres from '@/shared/data/genres';

import Menu from '@/components/Menu';
import ListAnime from '@/components/ListAnime';
import ListEpisode from '@/components/ListEpisode';
import Suggestions from '@/components/Suggestions';

import 'react-multi-carousel/lib/styles.css';

const Home: NextPage<{
  animesPopular: TCategory[];
  animesGenre: {
    [key: string]: TCategory[];
  };
  episodesLatest: TEpisode[];
  quote: TQuote;
}> = ({ animesPopular, quote, episodesLatest, animesGenre }) => (
  <div>
    <Menu />

    <Suggestions quote={quote} />

    <ListAnime
      style={{ marginTop: 50 }}
      title="Popular"
      animes={animesPopular}
    />

    <ListEpisode title="Lançamentos" episodes={episodesLatest} />

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
  const quote = await api.getQuote();
  const animesPopular: any = await api.getPopular();
  const genresRandom = getRandom(Object.keys(genres), 3);
  const genresPopulate: {
    [key: string]: any;
  } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const genre of genresRandom) {
    // eslint-disable-next-line no-await-in-loop
    genresPopulate[genre] = await api.getByGenre(genres[genre]);
  }

  return {
    props: {
      animesPopular,
      animesGenre: genresPopulate,
      episodesLatest: [],
      quote,
    },
    revalidate: 60,
  };
}

export default Home;
