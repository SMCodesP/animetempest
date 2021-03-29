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
  getCategory: async (category: string) => {
    const { data } = await api.get<Category[]>(`/api-animesbr-10.php?categoria=${category}`)
    return data
  },
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
    return data.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
  },
  getAnime: async (anime_id: string) => {
    const { data } = await api.get<Category[]>(`/api-animesbr-10.php?info=${anime_id}`)
    return data[0]
  },
  nextEpisode: async (episode_id: string, episodes: Episode[]) => {
    const index = episodes.findIndex((episode) => episode.video_id === episode_id)
    return episodes[index + 1] ? episodes[index + 1] : null
  },
  searchAnime: async (query: string, category?: string) => {
    const { data } = await axios.get<Category[]>(
      `/api/search?query=${query}${category ? `&category=${category}` : ''}`
    )
    return data
  },
  directSearchAnime: async (query: string) => {
    const { data } = await api.get<Category[]>(
      `https://appanimeplus.tk/api-animesbr-10.php?search=${query}`
    )
    return data
  },
}
