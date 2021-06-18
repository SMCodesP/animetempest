import { NextPage } from 'next';

import Category from '@/entities/Category';

import api from '@/services/api';

import Menu from '@/components/Menu';
import ListAnime from '@/components/ListAnime';

import 'react-multi-carousel/lib/styles.css';

const Home: NextPage<{
  animesPopular: Category[];
}> = ({ animesPopular }) => (
  <div>
    <Menu />

    <ListAnime animes={animesPopular} />
  </div>
);

export async function getStaticProps() {
  const animesPopular = await api.getPopular();

  return {
    props: {
      animesPopular,
    },
    revalidate: 60,
  };
}

export default Home;
