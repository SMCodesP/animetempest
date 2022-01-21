/* eslint-disable no-nested-ternary */
import { memo } from 'react';
import { transparentize } from 'polished';
import Link from 'next/link';

import { useTheme } from 'styled-components';

import {
  Container,
  AnimeImage,
  ContainerImage,
  Title,
  ContainerAnimeTitle,
  AnimeTitle,
  ContainerTitleStars,
  ContainerCurtain,
} from './styles';
import Carousel from '../Carousel';

const icons = {
  most: (
    <svg
      data-v-758c163c=""
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="smile"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      color="rgb(var(--color-green))"
      className="icon svg-inline--fa fa-smile fa-w-16"
    >
      <path
        data-v-758c163c=""
        fill="currentColor"
        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
        className=""
      />
    </svg>
  ),
  medium: (
    <svg
      data-v-70df6e62=""
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="meh"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      color="rgb(var(--color-orange))"
      className="icon svg-inline--fa fa-meh fa-w-16 fa-fw"
    >
      <path
        data-v-70df6e62=""
        fill="currentColor"
        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z"
        className=""
      />
    </svg>
  ),
  rage: (
    <svg
      data-v-70df6e62=""
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="frown"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      color="rgb(var(--color-red))"
      className="icon svg-inline--fa fa-frown fa-w-16 fa-fw"
    >
      <path
        data-v-70df6e62=""
        fill="currentColor"
        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
        className=""
      />
    </svg>
  ),
};

const ListAnime: React.FC<{
  animes: TCategory[];
  title: string;
  style?: any;
}> = ({ animes, title, style = {} }) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <Carousel
        options={{
          dragFree: true,
          containScroll: `trimSnaps`,
          speed: 20,
          slidesToScroll: 2,
        }}
        autoplay={false}
        TitleHead={() => <Title>{title}</Title>}
      >
        {animes.map((anime) => (
          <Link
            key={`${title.toLowerCase().replace(` `, `_`)}-${anime.id}`}
            href={`/anime/${anime.anilist_id}`}
            passHref
          >
            <ContainerImage
              colorBoxShadow={transparentize(
                0.3,
                anime.coverImage_color || theme.text,
              )}
              className="embla__slide"
            >
              <AnimeImage
                src={String(
                  anime.coverImage_extraLarge ||
                    `https://cdn.appanimeplus.tk/img/${anime.category_image}`,
                )}
                width={260}
                height={370}
                quality={75}
                placeholder="blur"
                blurDataURL={anime.coverImage_medium}
              />
              <ContainerAnimeTitle>
                <ContainerCurtain />
                <ContainerTitleStars>
                  <AnimeTitle>
                    {anime.category_name.slice(0, 12)}
                    {anime.category_name.length > 12 ? `…` : ``}
                  </AnimeTitle>
                  <span>
                    {anime.averageScore !== undefined &&
                      (anime.averageScore >= 75
                        ? icons.most
                        : anime.averageScore >= 60
                        ? icons.medium
                        : icons.rage)}
                    {anime.averageScore}%
                  </span>
                </ContainerTitleStars>
                <span>{anime.genres.join(`, `)}</span>
              </ContainerAnimeTitle>
            </ContainerImage>
          </Link>
        ))}
      </Carousel>
    </Container>
  );
};

export default memo(ListAnime);
