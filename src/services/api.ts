import axios from 'axios';
import Category from '../entities/Category';

const api = axios.create({
  baseURL: `https://hurkita-bot-v3.herokuapp.com/api`,
  headers: {
    'Content-type': `application/json`,
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...api,
  getPopular: async (limit = 10) => {
    const { data: results } = await api.get<Category[]>(`/popular`, {
      params: {
        limit,
      },
    });

    return results;
  },
  getByGenre: async (genre: string, limit = 10) => {
    const { data: results } = await api.get<Category[]>(`/genres/${genre}`, {
      params: {
        limit,
      },
    });

    return results;
  },
};
