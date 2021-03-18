import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Anime from '../../entities/Anime'

import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { ThemeContext } from 'styled-components'

import { ContainerAnime, IconPlay, ContainerCurtain, Image, More } from './styles'
import Video from '../../entities/Video'

const AnimeResume: React.FC<{
  anime: Anime | Video
}> = ({ anime }) => {
  const theme = useContext(ThemeContext)
  const [hoverStar, setHoverStar] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <>
      <Head>
        <title>Início - OtakuCity</title>
      </Head>
      <ContainerAnime>
        <Image src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`} />
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
          <Link href={`/watch/${(anime as Video).video_id}`}>
            <a>
              <IconPlay
                size={42}
                color={theme.text}
                style={{
                  alignSelf: 'center',
                }}
              />
            </a>
          </Link>
          <More
            style={{
              padding: '5px 15px',
            }}
          >
            {(anime as Video).title || (anime as Anime).category_name}
          </More>
        </ContainerCurtain>
      </ContainerAnime>
    </>
  )
}

export default AnimeResume
