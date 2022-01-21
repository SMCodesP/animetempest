import { GetStaticPaths, GetStaticProps } from 'next';

import Menu from '@/components/Menu';
import api from '@/services/api';

const Anime: React.FC = () => (
  <div>
    <Menu page="" />
  </div>
);

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);
  await api.getById(Number(params.id));
  return {
    props: {},
  };
};

export default Anime;
