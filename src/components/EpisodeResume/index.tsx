import Link from 'next/link'
import { useContext } from 'react'

import { ThemeContext } from 'styled-components'

import {
  ContainerAnime,
  IconPlay,
  ContainerCurtain,
  Image,
  More,
} from './styles'
import Video from '../../entities/Video'

const AnimeResume: React.FC<{
  episode: Video
}> = ({ episode }) => {
  const theme = useContext(ThemeContext)

  return (
    <Link prefetch={false} href={`/watch/${episode.video_id}`}>
      <a>
        <ContainerAnime>
          <Image
            src={`https://cdn.appanimeplus.tk/img/${episode.category_image}`}
          />
          <More
            style={{
              padding: '5px 15px',
            }}
          >
            {episode.title}
          </More>
        </ContainerAnime>
      </a>
    </Link>
  )
}

export default AnimeResume
