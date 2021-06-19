import Episode from '@/entities/Episode';
import axios from 'axios';
import Category from '../entities/Category';
import Video from '../entities/Video';

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
  getLatest: async (): Promise<Episode[]> => {
    const { data: results } = await axios.get<Video[]>(
      `https://appanimeplus.tk/meuanimetv-40.php?latest`,
    );
    const { data: animes } = await api.get<Category[]>(
      `/anime/${results.map((anime) => anime.category_id).join(`,`)}`,
    );

    const query = `
    query HeroComparison { ${animes
      .filter((anime) => anime.anilist_id !== null)
      .map(
        (anime) =>
          `_${anime.anilist_id}: Media(id: ${anime.anilist_id}) { id, streamingEpisodes { title, thumbnail } }`,
      )
      .join(``)} }
    `;

    const {
      data: { data: episodesAnime },
    } = await axios.post<{
      data: {
        [key: string]: {
          streamingEpisodes: {
            thumbnail: string;
            title: string;
          }[];
        };
      };
    }>(
      `https://graphql.anilist.co`,
      JSON.stringify({
        query,
      }),
      {
        headers: {
          'Content-Type': `application/json`,
          Accept: `application/json`,
        },
      },
    );

    return results.map((episode) => {
      const animeInAnilist = animes.find(
        (anime) => anime.id === Number(episode.category_id),
      );
      const episodeNumber = episode.title.match(/\d+/gi)?.map(Number);
      const episodeAnilist = animeInAnilist
        ? episodesAnime[
            `_${animeInAnilist.anilist_id}`
          ]?.streamingEpisodes.find((episodeAni: any) =>
            episodeAni.title.includes(
              `Episode ${
                episodeNumber ? episodeNumber[episodeNumber?.length - 1] : 0
              }`,
            ),
          )
        : null;

      return {
        ...episode,
        titleAnilist: episodeAnilist ? episodeAnilist.title : null,
        thumbnail: episodeAnilist ? episodeAnilist.thumbnail : null,
        anime: animeInAnilist || null,
      };
    });
  },
};
