import { request, gql } from 'graphql-request';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAnimeByNameAnilist: async (title: string) => {
    const query = gql`
      query ($search: String) {
        Page(page: 1, perPage: 1) {
          media(search: $search, type: ANIME) {
            id
            title {
              romaji
              english
              native
              userPreferred
            }
            bannerImage
            coverImage {
              extraLarge
              large
              medium
              color
            }
            seasonYear
            duration
            averageScore
            trailer {
              id
              site
              thumbnail
            }
            description
            staff {
              nodes {
                id
                name {
                  full
                }
                image {
                  large
                  medium
                }
              }
            }
            episodes
          }
        }
      }
    `;

    const {
      Page: {
        media: [anime],
      },
    } = await request(`https://graphql.anilist.co`, query, {
      search: title,
    });

    return {
      id: 1,
      idAni: anime.id,
      bannerImage: anime.bannerImage,
      title: anime.title,
      coverImage: anime.coverImage,
      seasonYear: anime.seasonYear,
      duration: anime.duration,
      score: Number(anime.averageScore) / 10,
      trailer: anime.trailer,
      description: anime.description,
      staff: anime.staff.nodes.map(({ id, image, name }: any) => ({
        id,
        image,
        name: name.full,
      })),
      episodes: [],
    };
  },
  getById: () => {
    return {
      id: 1,
      idAni: 98659,
      bannerImage: `https://s4.anilist.co/file/anilistcdn/media/anime/banner/98659-u46B5RCNl9il.jpg`,
      title: {
        romaji: `Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e`,
        english: `Classroom of the Elite`,
        native: `ようこそ実力至上主義の教室へ`,
      },
      coverImage: {
        extraLarge: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b98659-sH5z5RfMuyMr.png`,
        large: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b98659-sH5z5RfMuyMr.png`,
        medium: `https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/b98659-sH5z5RfMuyMr.png`,
        color: `#43a135`,
      },
      seasonYear: 2017,
      duration: 24,
      score: 77,
      trailer: {
        id: `iYsx6w5PNno`,
        site: `youtube`,
        thumbnail: `https://i.ytimg.com/vi/iYsx6w5PNno/hqdefault.jpg`,
      },
      description: `<p>Koudo Ikusei Senior High School é uma escola líder com instalações de última geração. Os alunos têm a liberdade de usar qualquer estilo e trazer qualquer objeto pessoal que desejarem. Koudo Ikusei é como uma utopia, mas a verdade é, apenas os alunos mais superiores recebem tratamento favorável.<br><br></p>\n<p>Kiyotaka Ayanokouji é um aluno da classe D, que é onde o escola despeja seus alunos &quot;inferiores&quot; para ridicularizá-los. Por uma certa razão, Kiyotaka foi descuidado em seu exame de admissão e foi colocado na classe D. Depois de conhecer Suzune Horikita e Kikyou Kushida, dois outros alunos de sua classe, a situação de Kiyotaka começa a mudar.<br><br><br />\n(Fonte: Anime News Network, editado)</p>`,
      staff: [
        {
          id: 113215,
          name: `Shougo Kinugasa`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n113215-ZFr2vSw6K5T9.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n113215-ZFr2vSw6K5T9.png`,
          },
        },
        {
          id: 107006,
          name: `Shunsaku Tomose`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n107006-to9nj6wzMt8t.jpg`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n107006-to9nj6wzMt8t.jpg`,
          },
        },
        {
          id: 101909,
          name: `Seiji Kishi`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n101909-aZwVsWQv0LXB.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n101909-aZwVsWQv0LXB.png`,
          },
        },
        {
          id: 118960,
          name: `Hiroyuki Hashimoto`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/118960-3nMQ4I3OI0oX.jpg`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/118960-3nMQ4I3OI0oX.jpg`,
          },
        },
        {
          id: 120751,
          name: `Aoi Akashiro`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n120751-34nuMiCFBqoA.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n120751-34nuMiCFBqoA.png`,
          },
        },
        {
          id: 102543,
          name: `Kazuaki Morita`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n102543-PZ9vdUuH1vSb.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n102543-PZ9vdUuH1vSb.png`,
          },
        },
        {
          id: 123012,
          name: `Ryou Takahashi`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n123012-eZXnRCpriIx6.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n123012-eZXnRCpriIx6.png`,
          },
        },
        {
          id: 95855,
          name: `Minami Kuribayashi`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/855.jpg`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/855.jpg`,
          },
        },
        {
          id: 113433,
          name: `ZAQ`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n113433-LhRNpuYfDYsK.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n113433-LhRNpuYfDYsK.png`,
          },
        },
        {
          id: 120751,
          name: `Aoi Akashiro`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n120751-34nuMiCFBqoA.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n120751-34nuMiCFBqoA.png`,
          },
        },
        {
          id: 158253,
          name: `Hayato Kazano`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/default.jpg`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/default.jpg`,
          },
        },
        {
          id: 158254,
          name: `Ohine Ezaki`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/n158254-lw31PfeZq7sB.png`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/n158254-lw31PfeZq7sB.png`,
          },
        },
        {
          id: 123983,
          name: `Tomoko Iwasa`,
          image: {
            large: `https://s4.anilist.co/file/anilistcdn/staff/large/default.jpg`,
            medium: `https://s4.anilist.co/file/anilistcdn/staff/medium/default.jpg`,
          },
        },
      ],
      episodes: [
        {
          id: 1,
          title_alternative: `Episódio 1`,
          title: `1. Lembre-se de manter a mente limpa em momentos difíceis.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire1-tmb/1534c9fb80791aec609a7a69a646ba9a1499855007_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire1-tmb/1534c9fb80791aec609a7a69a646ba9a1499855007_full.jpg`,
          },
          date_release: new Date(2017, 7, 12).getTime(),
          anime_id: 1,
        },
        {
          id: 2,
          title_alternative: `Episódio 2`,
          title: `2. Exige habilidade para ocultar que se tem grandes habilidades.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire1-tmb/baed8721c7eb199a3510f5480a85daf61500455126_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire1-tmb/baed8721c7eb199a3510f5480a85daf61500455126_full.jpg`,
          },
          date_release: new Date(2017, 7, 19).getTime(),
          anime_id: 1,
        },
        {
          id: 3,
          title_alternative: `Episódio 3`,
          title: `3. O homem é um animal de barganhas: nenhum outro animal faz isso, cachorro algum troca osso com outro.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire3-tmb/3567e8e02102088cce9729592c4913f31501036435_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire3-tmb/3567e8e02102088cce9729592c4913f31501036435_full.jpg`,
          },
          date_release: new Date(2017, 7, 26).getTime(),
          anime_id: 1,
        },
        {
          id: 4,
          title_alternative: `Episódio 4`,
          title: `4. Não devemos nos irritar com quem esconde a verdade da gente quando frequentemente escondemos a verdade de nós mesmos.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire3-tmb/c8ac32874631ac71df0dce8cac56ef751501537596_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire3-tmb/c8ac32874631ac71df0dce8cac56ef751501537596_full.jpg`,
          },
          date_release: new Date(2017, 8, 2).getTime(),
          anime_id: 1,
        },
        {
          id: 5,
          title_alternative: `Episódio 5`,
          title: `5. O Inferno são as outras pessoas`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire2-tmb/72c8a01b2a35d2009ec82e27ebc8971d1502233395_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire2-tmb/72c8a01b2a35d2009ec82e27ebc8971d1502233395_full.jpg`,
          },
          date_release: new Date(2017, 8, 9).getTime(),
          anime_id: 1,
        },
        {
          id: 6,
          title_alternative: `Episódio 6`,
          title: `6. Há dois tipos de mentiras; um é sobre fatos consumados, o outro é sobre deveres futuros.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire1-tmb/50787a27e4ad4bc1abb02ca06010fcc51502856899_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire1-tmb/50787a27e4ad4bc1abb02ca06010fcc51502856899_full.jpg`,
          },
          date_release: new Date(2017, 8, 16).getTime(),
          anime_id: 1,
        },
        {
          id: 7,
          title_alternative: `Episódio 7`,
          title: `7. Não há nada tão perigoso como o amigo ignorante; é preferível um inimigo sábio.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire3-tmb/7667c5006cce53d12ba118edbe8bb8901503443247_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire3-tmb/7667c5006cce53d12ba118edbe8bb8901503443247_full.jpg`,
          },
          date_release: new Date(2017, 8, 23).getTime(),
          anime_id: 1,
        },
        {
          id: 8,
          title_alternative: `Episódio 8`,
          title: `8. Abandone toda a esperança, vós que entrais aqui.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire1-tmb/49651088d9dc22d9344527273d61b97d1504092728_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire1-tmb/49651088d9dc22d9344527273d61b97d1504092728_full.jpg`,
          },
          date_release: new Date(2017, 8, 30).getTime(),
          anime_id: 1,
        },
        {
          id: 9,
          title_alternative: `Episódio 9`,
          title: `9. O homem está condenado a ser livre.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire4-tmb/a442c72cdc17055413d0175ff4f92fad1504694413_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire4-tmb/a442c72cdc17055413d0175ff4f92fad1504694413_full.jpg`,
          },
          date_release: new Date(2017, 9, 6).getTime(),
          anime_id: 1,
        },
        {
          id: 10,
          title_alternative: `Episódio 10`,
          title: `10. Todo homem tem em si o traidor mais perigoso.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire4-tmb/43dfdd4172641a4f26c4892d93a29e671505296430_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire4-tmb/43dfdd4172641a4f26c4892d93a29e671505296430_full.jpg`,
          },
          date_release: new Date(2017, 9, 13).getTime(),
          anime_id: 1,
        },
        {
          id: 11,
          title_alternative: `Episódio 11`,
          title: `11. Em geral, chamamos de destino às asneiras que cometemos.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire3-tmb/fc67a1e81cf3dd2cc9880910462d65b11505897910_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire3-tmb/fc67a1e81cf3dd2cc9880910462d65b11505897910_full.jpg`,
          },
          date_release: new Date(2017, 9, 20).getTime(),
          anime_id: 1,
        },
        {
          id: 12,
          title_alternative: `Episódio 12`,
          title: `12. Os gênios vivem apenas uma história de loucura.`,
          thumbnail: {
            large: `https://img1.ak.crunchyroll.com/i/spire2-tmb/af28d93273585bd08cce96fc3a714c941506506315_full.jpg`,
            tiny: `https://img1.ak.crunchyroll.com/i/spire2-tmb/af28d93273585bd08cce96fc3a714c941506506315_full.jpg`,
          },
          date_release: new Date(2017, 9, 27).getTime(),
          anime_id: 1,
        },
      ],
    } as TAnime;
  },
};
