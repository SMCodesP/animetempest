import React from 'react'

import AnimeResume from '../AnimeResume'

import Category from '../../entities/Category'
import MyCarousel from '../MyCarousel'

const AnimeResumeList: React.FC<{
  animes: Category[]
}> = ({ animes }) => {
  return (
    <MyCarousel>
      {animes.map((anime) => (
        <AnimeResume anime={anime} key={`image-${anime.id}`} />
      ))}
    </MyCarousel>
  )
}

export default AnimeResumeList
