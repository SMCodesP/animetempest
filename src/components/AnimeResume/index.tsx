import Link from 'next/link'
import { useContext, useState } from 'react'

import { ThemeContext } from 'styled-components'

import { ContainerAnime, Image, More } from './styles'

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

  const MarkFavorite = () =>
    isFavorite(anime.id) || hoverFavorite ? (
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
      <Link href={`/anime/${anime.id}`}>
        <a>
          <Image
            src={
              anime.anilist
                ? anime.anilist?.coverImage.extraLarge
                : `https://cdn.appanimeplus.tk/img/${anime.category_image}`
            }
          />
        </a>
      </Link>
      {session && !loading && <MarkFavorite />}
      <More
        style={{
          padding: '5px 15px',
        }}
      >
        {anime.category_name}
      </More>
    </ContainerAnime>
  )
}

export default AnimeResume
