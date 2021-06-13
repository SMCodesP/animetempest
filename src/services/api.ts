import axios from 'axios'
import Category from '../entities/Category'
import Episode from '../entities/Episode'
import Video from '../entities/Video'

const api = axios.create({
  baseURL: 'https://appanimeplus.tk',
  headers: {
    'Content-type': 'application/json',
  },
})

export default {
  ...api,
  getCategory: async (category: string) => {
    const { data: results } = await api.get<Category[]>(
      `https://hurkita-bot-v3.herokuapp.com/api/animes`,
      {
        params: {
          category,
          limit: 10
        }
      }
    )
    return results
  },
  getLatest: async () => {
    const { data: results } = await api.get<Video[]>('/api-animesbr-10.php?latest')
    const { data: animes } = await axios.get<Category[]>(
      `https://hurkita-bot-v3.herokuapp.com/api/anime/${results.map(anime => anime.category_id).join(',')}`
    )

    return results.map(episode => ({
      ...episode,
      anime: animes.find(anime => anime.id === Number(episode.category_id))
    }))
  },
  getPopular: async () => {
    const { data: results } = await api.get<Category[]>(
      `https://hurkita-bot-v3.herokuapp.com/api/popular`
    )
    return results
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
  getEpisodesFromAnime: async (anime_id: string | number) => {
    const { data } = await api.get<Episode[]>(
      `/api-animesbr-10.php?cat_id=${anime_id}`
    )
    return data
  },
  getAnime: async (anime_id: string) => {
    const { data: anime } = await axios.get<Category>(`https://hurkita-bot-v3.herokuapp.com/api/anime/${anime_id}`)
    return anime
  },
  nextEpisode: async (episode_id: string, anime_id: string) => {
    const { data } = await api.get<Episode[] | null>(
      `/api-animesbr-10.php?episodios=${episode_id}&catid=${anime_id}&next`
    )
    return data && data[0]
  },
  previousEpisode: async (episode_id: string, anime_id: string) => {
    const { data } = await api.get<Episode[] | null>(
      `/api-animesbr-10.php?episodios=${episode_id}&catid=${anime_id}&previous`
    )
    return data && data[0]
  },
  getAnimes: async (
    {
      category,
      page,
      limit,
      key
    }: {
      category?: string
      key?: string
      page?: number
      limit?: number
    }
  ) => {
    try {
      const { data: results } = await axios.get<Category[]>(
        `https://hurkita-bot-v3.herokuapp.com/api/animes`, {
          params: {
            page,
            limit,
            category,
            key
          }
        }
      )
      return results
    } catch (error) {
      console.log(error)
      return []
    }
  },
  searchAnime: async (
    query: string, {
      category,
      page,
      limit,
    }: {
      category?: string
      page?: number
      limit?: number
    }
  ) => {
    try {
      const { data: results } = await axios.get<Category[]>(
        `https://hurkita-bot-v3.herokuapp.com/api/animes?query=${query}`, {
          params: {
            page,
            limit,
            category,
          }
        }
      )
      return results
    }catch (error) {
      console.log(error)
      return []
    }
  },
}
