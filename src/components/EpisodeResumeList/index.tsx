import React from 'react'
import Video from '../../entities/Video'

import EpisodeResume from '../EpisodeResume'

import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'

const EpisodeResumeList: React.FC<{
  episodes: Video[]
}> = ({ episodes }) => {
  return (
    <Carousel
      swipeable
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
      ssr={true}
      infinite={false}
    >
      {episodes.map((episode) => (
        <EpisodeResume episode={episode} key={`image-${episode.video_id}`} />
      ))}
    </Carousel>
  )
}

export default EpisodeResumeList
