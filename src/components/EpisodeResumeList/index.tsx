import React from 'react'
import Video from '../../entities/Video'

import EpisodeResume from '../EpisodeResume'
import MyCarousel from '../MyCarousel'

const EpisodeResumeList: React.FC<{
  episodes: Video[]
}> = ({ episodes }) => {
  return (
    <MyCarousel>
      {episodes.map((episode) => (
        <EpisodeResume episode={episode} key={`image-${episode.video_id}`} />
      ))}
    </MyCarousel>
  )
}

export default EpisodeResumeList
