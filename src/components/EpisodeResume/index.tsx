import Link from 'next/link'
import { useContext } from 'react'

import { ThemeContext } from 'styled-components'

import { ContainerAnime, IconPlay, ContainerCurtain, Image, More } from './styles'
import Video from '../../entities/Video'

const AnimeResume: React.FC<{
  episode: Video
}> = ({ episode }) => {
  const theme = useContext(ThemeContext)

  return (
    <>
      <ContainerAnime>
        <Image src={`https://cdn.appanimeplus.tk/img/${episode.category_image}`} />
        <ContainerCurtain>
          <span />
          <Link prefetch={false} href={`/watch/${episode.video_id}`}>
            <a
              style={{
                alignSelf: 'center',
              }}
            >
              <IconPlay size={42} color={theme.text} />
            </a>
          </Link>
          <More
            style={{
              padding: '5px 15px',
            }}
          >
            <Link prefetch={false} href={`/anime/${episode.category_id}`}>
              <a>{episode.title}</a>
            </Link>
          </More>
        </ContainerCurtain>
      </ContainerAnime>
    </>
  )
}

export default AnimeResume
