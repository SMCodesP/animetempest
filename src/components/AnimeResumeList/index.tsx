import React from 'react'

import AnimeResume from '../AnimeResume'

import Carousel from 'react-multi-carousel'

import Category from '../../entities/Category'

const AnimeResumeList: React.FC<{
  animes: Category[]
}> = ({ animes }) => {
  return (
    <Carousel
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
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
      infinite={false}
      ssr={true}
    >
      {animes.map((anime) => (
        <AnimeResume anime={anime} key={`image-${anime.id}`} />
      ))}
    </Carousel>
  )
}

export default AnimeResumeList
