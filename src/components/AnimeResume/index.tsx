import Link from 'next/link'
import { useContext, useState } from 'react'

import { ThemeContext } from 'styled-components'

import { ContainerAnime, ContainerCurtain, Image, More } from './styles'

import { useProfile } from '../../contexts/ProfileContext'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useSession } from 'next-auth/client'

import Category from '../../entities/Category'

const AnimeResume: React.FC<{
  anime: Category
}> = ({ anime }) => {
  const theme = useContext(ThemeContext)
  const { toggleFavorite, isFavorite } = useProfile()
  const [session, loading] = useSession()
  const [hoverFavorite, setHoverFavorite] = useState(false)

  const MarkFavorite = () => (isFavorite(anime.id) || hoverFavorite) ? (
    <FaBookmark
      size={24}
      color={theme.text}
      style={{
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 8,
        position: 'relative',
        zIndex: 9999,
      }}
      onClick={() => toggleFavorite(anime.id)}
      onMouseLeave={() => setHoverFavorite(false)}
    />
  ) : (
    <FaRegBookmark
      size={24}
      color={theme.text}
      style={{
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 8,
        position: 'relative',
        zIndex: 9999,
      }}
      onClick={() => toggleFavorite(anime.id)}
      onMouseEnter={() => setHoverFavorite(true)}
    />
  )

  return (
    <ContainerAnime>
      <Image src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`} />
      <ContainerCurtain>
      {(session && !loading) ? <MarkFavorite /> : <span />}
        <Link prefetch={false} href={`/anime/${anime.id}`}>
          <a
            style={{
              width: '100%',
            }}
          >
            <More
              style={{
                padding: '5px 15px',
              }}
            >
              <Link prefetch={false} href={`/anime/${anime.id}`}>
                <a>{anime.category_name}</a>
              </Link>
            </More>
          </a>
        </Link>
      </ContainerCurtain>
    </ContainerAnime>
  )
}

export default AnimeResume
