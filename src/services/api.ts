import axios from 'axios';
import faunadb from 'faunadb';
import { request, gql } from 'graphql-request';
import * as translatte from 'translatte';

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
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          characters(search: $search) {
            image {
              large
            }
            media {
              edges {
                node {
                  coverImage {
                    extraLarge
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

    return {
      quote:
        animechan.quote.length > 1000
          ? `${quoteTranslated.text}...`
          : quoteTranslated.text,
      character: animechan.character,
      image_character: character.image.large,
      anime: animechan.anime,
      image_anime: character.media.edges[0].node.coverImage.extraLarge,
      color_anime: character.media.edges[0].node.coverImage.color,
    };
  } catch (error) {
    // eslint-disable-next-line no-return-await
    return await getQuote();
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getQuote,
  getPopular: async (limit = 10) => {
    const { data: listPopular }: any = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(`anime`)), { size: limit }),
        q.Lambda((x) => q.Get(x)),
      ),
    );

    return listPopular.map(({ data }: any) => data);
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

    return animesByGenre.map(({ data }: any) => data);
  },
};
