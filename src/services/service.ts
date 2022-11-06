import axios from 'axios';
import faunadb from 'faunadb';
import * as translatte from 'translatte';
import { request, gql } from 'graphql-request';

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY as string,
  domain: process.env.FAUNADB_DOMAIN,
  scheme: process.env.FAUNADB_SCHEMA as 'https' | 'http',
});
const q = faunadb.query;

async function getQuote(): Promise<TQuote> {
  try {
    const { data: animechan } = await axios.get(
      `https://animechan.vercel.app/api/random`,
    );
    const query = gql`
      query ($search: String) {
        Page(page: 1, perPage: 1) {
          characters(search: $search) {
            image {
              large
              medium
            }
            media {
              edges {
                node {
                  coverImage {
                    extraLarge
                    medium
                    color
                  }
                }
              }
            }
          }
        }
      }
    `;

    const {
      Page: {
        characters: [character],
      },
    } = await request(`https://graphql.anilist.co`, query, {
      search: animechan.character,
    });

    if (
      !character ||
      !animechan ||
      !character.media ||
      character.media.edges.length === 0
    )
      throw new Error(`Incomplete`);

    const quoteTranslated = await translatte(
      animechan.quote.substring(0, 1000),
      {
        to: `pt`,
      },
    );

    if (character.media.edges[0].node.coverImage.color === null)
      throw new Error(`Not have color in banner of anime`);

    return {
      quote:
        animechan.quote.length > 1000
          ? `${quoteTranslated.text}…`
          : quoteTranslated.text,
      character: animechan.character,
      image_character: character.image.large,
      image_character_medium: character.image.medium,
      anime: animechan.anime,
      image_anime: character.media.edges[0].node.coverImage.extraLarge,
      image_anime_medium: character.media.edges[0].node.coverImage.medium,
      color_anime: character.media.edges[0].node.coverImage.color,
    };
  } catch (error) {
    // eslint-disable-next-line no-return-await
    return await getQuote();
  }
}

export default {
  getQuote,
  getPopular: async (limit = 10) => {
    const { data: listPopular }: any = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(`anime`)), { size: limit }),
        q.Lambda((x) => q.Get(x)),
      ),
    );

    return [
      {
        id: 1,
        category_name: `Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e - Classroom of the Elite`,
        category_image: `0503dc1669a735098babc0ea5b7cbf90.jpg`,
        anilist_id: 98659,
        title_romaji: `Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e`,
        title_english: `Classroom of the Elite`,
        title_native: `ようこそ実力至上主義の教室へ`,
        title_userPreferred: `Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e`,
        type: `ANIME`,
        format: `TV`,
        bannerImage: `https://s4.anilist.co/file/anilistcdn/media/anime/banner/98659-u46B5RCNl9il.jpg`,
        coverImage_extraLarge: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b98659-sH5z5RfMuyMr.png`,
        coverImage_large: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b98659-sH5z5RfMuyMr.png`,
        coverImage_medium: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/b98659-sH5z5RfMuyMr.png`,
        coverImage_color: `#43a135`,
        error: false,
        sinopse: `A Escola de Ensino Médio Koudo Ikusei é uma escola de prestígio onde 100% dos alunos vão para a universidade ou arranjam um emprego. Os estudantes têm a liberdade para usar qualquer penteado e levar qualquer tipo de adereço pessoal que quiserem. Koukdo Ikusei parece um paraíso, mas a verdade é que apenas os alunos superiores recebem tratamento especial. Kiyotaka Ayanokouji é um estudante de Classe D que é onde a escola despeja os alunos inferiores para ridicularizá-los. Por uma certa razão, Kiyotaka foi negligente no seu exame de admissão e foi colocado nessa classe. Depois de conhecer Suzune Horikita e Kikyou Kushida, dois outros estudantes da sua classe, a situação de Kiyotaka começa a mudar.`,
        genres: [`comédia`, `romance`, `escolar`],
        averageScore: 76,
      },
      ...listPopular
        .map(({ data }: any) => data)
        .filter((item: any) => item.coverImage_extraLarge !== undefined),
    ];
  },
  getByGenre: async (genre: string, limit = 10) => {
    const { data: animesByGenre }: any = await client.query(
      q.Map(
        q.Paginate(
          q.Intersection(q.Match(q.Index(`animes_by_genres`), genre)),
          { size: limit },
        ),
        q.Lambda((x) => q.Get(x)),
      ),
    );

    return animesByGenre
      .map(({ data }: any) => data)
      .filter((item: any) => item.coverImage_extraLarge !== undefined);
  },
};
