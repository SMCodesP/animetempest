import axios from 'axios';
import Category from '../entities/Category';

const api = axios.create({
  baseURL: `https://hurkita-bot-v3.herokuapp.com/api`,
  headers: {
    'Content-type': `application/json`,
  },
});

export default {
  ...api,
  getPopular: async () => {
    const { data: results } = await api.get<Category[]>(`/popular`);

    return results;
  },
};
