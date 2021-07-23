import TCharacterQuote from '@/types/TCharacterQuote';
import axios from 'axios';
import * as translatte from 'translatte';

const methods = {
  getRandomCharacterQuote: async (): Promise<TCharacterQuote> => {
    const { data: dataQuote } = await axios.get(
      `https://animechan.vercel.app/api/random`,
    );

    const query = `
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
          media {
            nodes {
              coverImage {
                extraLarge
                color
              }
            }
          }
          image {
            large
          }
        }
      }
    }
    `;

    const variables = {
      search: dataQuote.character,
    };
    const {
      data: {
        data: {
          Page: {
            characters: [character],
          },
        },
      },
    } = await axios.post(`https://graphql.anilist.co`, {
      query,
      variables,
    });

    if (!character) throw new Error(`Character not found`);

    const quote = await translatte(dataQuote.quote.substring(0, 1000), {
      to: `pt`,
    });

    return {
      quote: quote.text,
      character: {
        avatar: character.image.large,
        name: dataQuote.character,
      },
      anime: character.media.nodes[0].coverImage.extraLarge,
      color: character.media.nodes[0].coverImage.color,
    };
  },
};

export default methods;
