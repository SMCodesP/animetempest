import Link from 'next/link'
import { useContext, useState } from 'react'
import Anime from '../../entities/Anime'

import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { ThemeContext } from 'styled-components'

import { ContainerAnime, ContainerCurtain, Image, More } from './styles'

const AnimeResume: React.FC<{
  anime: Anime
}> = ({ anime }) => {
  const theme = useContext(ThemeContext)
  const [hoverStar, setHoverStar] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <>
      <Link href={`/anime/${anime.id}`}>
        <a
          style={{
            alignSelf: 'center',
          }}
        >
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
              <More
                style={{
                  padding: '5px 15px',
                }}
              >
                <Link href={`/anime/${anime.id}`}>
                  <a>{anime.category_name}</a>
                </Link>
              </More>
            </ContainerCurtain>
          </ContainerAnime>
        </a>
      </Link>
    </>
  )
}

export default AnimeResume
