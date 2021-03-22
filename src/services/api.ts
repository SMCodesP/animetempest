import axios from 'axios'
import Category from '../entities/Category'
import Episode from '../entities/Episode'

const api = axios.create({
  baseURL: 'https://appanimeplus.tk',
  headers: {
    'Content-type': 'application/json',
  },
})

export default {
  ...api,
  getEpisode: async (episode: string) => {
    const { data } = await axios.get<Episode[]>(
      `https://appanimeplus.tk/api-animesbr-10.php?episodios=${episode}`,
      {
        headers: {
          'proxy-type': 'brazil',
        },
        proxy: { protocol: 'http', host: '185.86.150.41', port: 800 },
      }
    )

    return data[0]
  },
  getEpisodesFromAnime: async (anime_id: string) => {
    const { data } = await api.get<Episode[]>(`/api-animesbr-10.php?cat_id=${anime_id}`)
    return data
  },
  getAnime: async (anime_id: string) => {
    const { data } = await api.get<Category[]>(`/api-animesbr-10.php?info=${anime_id}`)
    return data[0]
  },
  nextEpisode: async (episode_id: string, anime_id: string) => {
    const { data } = await api.get<Episode[] | null>(
      `/api-animesbr-10.php?episodios=${episode_id}&catid=${anime_id}&next`
    )
    return data && data[0]
  },
  searchAnime: async (query: string) => {
    const { data } = await axios.get(`/api/search?query=${query}`)
    return data
  },
  directSearchAnime: async (query: string) => {
    const { data } = await api.get<Category[]>(
      `https://appanimeplus.tk/api-animesbr-10.php?search=${query}`
    )
    return data
  },
}
