import React from 'react'
import Anime from '../../entities/Anime'
import Video from '../../entities/Video'

import AnimeResume from '../AnimeResume'

import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css"

const AnimeResumeList: React.FC<{
  animes: Anime[] | Video[]
}> = ({ animes }) => {
  return (
    <Carousel
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1
        }
      }}
      ssr
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
    >
      {(animes as any).map((anime: any) => (
        <AnimeResume
          anime={anime}
          key={`image-${anime.id || anime.video_id}`}
        />
      ))}
    </Carousel>
  )
}

export default AnimeResumeList
