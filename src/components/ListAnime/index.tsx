import React from 'react';
import { transparentize } from 'polished';

import Carousel from 'react-multi-carousel';

import { FaStar } from 'react-icons/fa';

import { useTheme } from 'styled-components';

import Category from '@/entities/Category';

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

const capitalize = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join(``).toLowerCase();

const ListAnime: React.FC<{
  animes: Category[];
}> = ({ animes }) => {
  const theme = useTheme();
  const animesList = animes.sort((a, b) => b?.id - a?.id);

  return (
    <Container items={animesList.length}>
      <Title>Popular</Title>
      <Carousel
        swipeable
        responsive={{
          desktop: {
            breakpoint: { max: 1366, min: 1024 },
            items: 5,
            slidesToSlide: 1,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1,
          },
        }}
        deviceType="desktop"
        ssr
      >
        {animesList.map((anime) => (
          <ContainerImage
            key={String(anime.id)}
            style={{
              boxShadow: `0 0 10px ${transparentize(
                0.3,
                anime.coverImage_color || theme.text,
              )}`,
            }}
          >
            <AnimeImage
              src={
                String(anime.coverImage_extraLarge) ||
                `https://cdn.appanimeplus.tk/img/${anime.category_image}`
              }
              width={260}
              height={370}
              quality={100}
            />
            <ContainerAnimeTitle>
              <ContainerCurtain />
              <ContainerTitleStars>
                <AnimeTitle>
                  {anime.title_romaji ||
                    anime.title_english ||
                    anime.category_name}
                </AnimeTitle>
                <span>
                  <FaStar color="#ffcd3c" size={14} />
                  {Number((Math.random() * 10).toFixed(1))}
                </span>
              </ContainerTitleStars>
              <span>
                {anime.genres
                  .slice(0, 3)
                  .map((genre) => capitalize(genre))
                  .join(`, `)}
              </span>
            </ContainerAnimeTitle>
          </ContainerImage>
        ))}
      </Carousel>
    </Container>
  );
};

export default ListAnime;
