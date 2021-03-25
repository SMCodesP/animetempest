import Link from 'next/link'
import { useContext, useState } from 'react'

import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { ThemeContext } from 'styled-components'

import { ContainerAnime, IconPlay, ContainerCurtain, Image, More } from './styles'
import Video from '../../entities/Video'

const AnimeResume: React.FC<{
  episode: Video
}> = ({ episode }) => {
  const theme = useContext(ThemeContext)
  const [hoverStar, setHoverStar] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <>
      <ContainerAnime>
        <Image src={`https://cdn.appanimeplus.tk/img/${episode.category_image}`} />
        <ContainerCurtain>
          {isFavorite || hoverStar ? (
            <AiTwotoneStar
              size={24}
              color={theme.text}
              style={{
                alignSelf: 'flex-end',
                marginTop: 8,
                marginRight: 8,
              }}
              onClick={() => setIsFavorite((state) => !state)}
              onMouseLeave={() => setHoverStar(false)}
            />
          ) : (
              <AiOutlineStar
                size={24}
                color={theme.text}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 8,
                  marginRight: 8,
                }}
                onMouseEnter={() => setHoverStar(true)}
              />
            )}
          <Link href={`/watch/${episode.video_id}`}>
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
            <Link href={`/anime/${episode.category_id}`}>
              <a>{episode.title}</a>
            </Link>
          </More>
        </ContainerCurtain>
      </ContainerAnime>
    </>
  )
}

export default AnimeResume
