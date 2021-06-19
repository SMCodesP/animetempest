import React, { memo } from 'react';
import { transparentize } from 'polished';

import Carousel from 'react-multi-carousel';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useTheme } from 'styled-components';

import Episode from '@/entities/Episode';

import {
  Container,
  AnimeImage,
  ContainerImage,
  Title,
  ContainerAnimeTitle,
  AnimeTitle,
  ContainerTitleStars,
  ContainerCurtain,
  ContainerButton,
} from './styles';

const capitalize = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join(``).toLowerCase();

const ListAnime: React.FC<{
  episodes: Episode[];
  title: string;
}> = ({ episodes, title }) => {
  const theme = useTheme();

  const ButtonGroup = ({ next, previous, ...rest }: any) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <ContainerButton>
        <button
          className={currentSlide === 0 ? `disable` : ``}
          onClick={() => previous()}
          type="button"
        >
          <FiChevronLeft size={25} color={transparentize(0.75, theme.text)} />
        </button>
        <button onClick={() => next()} type="button">
          <FiChevronRight size={25} color={transparentize(0.75, theme.text)} />
        </button>
      </ContainerButton>
    );
  };

  return (
    <Container items={episodes.length}>
      <Title>{title}</Title>
      <Carousel
        swipeable
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        responsive={{
          desktop: {
            breakpoint: { max: 1366, min: 1024 },
            items: 5,
            slidesToSlide: 3,
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
        {episodes.map((episode) => (
          <ContainerImage
            key={`${title.toLowerCase().replace(` `, `_`)}-${episode.video_id}`}
            style={{
              boxShadow: `0 0 10px ${transparentize(
                0.3,
                episode.anime?.coverImage_color || theme.text,
              )}`,
            }}
          >
            <AnimeImage
              src={String(
                episode.thumbnail ||
                  episode.anime?.coverImage_extraLarge ||
                  `https://cdn.appanimeplus.tk/img/${episode.category_image}`,
              )}
              width={520}
              height={300}
              quality={100}
            />
            <ContainerAnimeTitle>
              <ContainerCurtain />
              <ContainerTitleStars>
                <AnimeTitle>{episode.titleAnilist || episode.title}</AnimeTitle>
              </ContainerTitleStars>
            </ContainerAnimeTitle>
          </ContainerImage>
        ))}
      </Carousel>
    </Container>
  );
};

export default memo(ListAnime);
