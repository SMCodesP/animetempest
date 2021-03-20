import React from 'react'
import Anime from '../../entities/Anime'
import Video from '../../entities/Video'

import AnimeResume from '../AnimeResume'

import { Container } from './styles'

const AnimeResumeList: React.FC<{
  animes: Anime[] | Video[]
}> = ({ animes }) => {
  return (
    <Container>
      {animes.map((anime: Anime | Video) => (
        <AnimeResume
          anime={anime}
          key={`image-${(anime as Anime).id || (anime as Video).video_id}`}
        />
      ))}
    </Container>
  )
}

export default AnimeResumeList
