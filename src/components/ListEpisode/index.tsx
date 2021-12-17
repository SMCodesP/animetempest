import React, { memo } from 'react';
import { transparentize } from 'polished';

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

const ListAnime: React.FC<{
  episodes: TEpisode[];
  title: string;
}> = ({ episodes, title }) => {
  const theme = useTheme();

  return (
    <Container>
      <Title>{title}</Title>
      <Carousel
        options={{
          dragFree: true,
          containScroll: `trimSnaps`,
          speed: 20,
          slidesToScroll: 2,
        }}
        autoplay={false}
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
            className="embla__slide"
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
