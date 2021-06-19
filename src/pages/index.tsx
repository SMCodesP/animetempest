import React from 'react';
import { NextPage } from 'next';

import Category from '@/entities/Category';
import Episode from '@/entities/Episode';

import api from '@/services/api';

import getRandom from '@/utils/getRandom';
import gerens from '@/shared/data/genres';

import Menu from '@/components/Menu';
import ListAnime from '@/components/ListAnime';
import ListEpisode from '@/components/ListEpisode';
import Suggestions from '@/components/Suggestions';

import 'react-multi-carousel/lib/styles.css';

const Home: NextPage<{
  animesPopular: Category[];
  animesGenre: {
    [key: string]: Category[];
  };
  episodesLatest: Episode[];
}> = ({ animesPopular, episodesLatest, animesGenre }) => (
  <div>
    <Menu />

    <Suggestions />

    <ListAnime title="Popular" animes={animesPopular} />

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
  const animesPopular = await api.getPopular();
  const episodesLatest = await api.getLatest();
  const genresRandom = getRandom(Object.keys(gerens), 5);
  const genresPopulate: {
    [key: string]: Category[];
  } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const genre of genresRandom) {
    // eslint-disable-next-line no-await-in-loop
    genresPopulate[genre] = await api.getByGenre(gerens[genre]);
  }

  console.log(episodesLatest);

  return {
    props: {
      animesPopular,
      animesGenre: genresPopulate,
      episodesLatest: episodesLatest.slice(0, 10),
    },
    revalidate: 300,
  };
}

export default Home;
