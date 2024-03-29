import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect, useRef, useCallback, FormEvent, useContext } from 'react'

import { FaSearch, FaPlay } from 'react-icons/fa'
import Wave from 'react-wavify'

import Category from '../../entities/Category'

import {
  Container,
  HeaderWave,
  Thumbnail,
  Title,
  ButtonWatch,
  ContainerInfo,
  ContainerAnime,
  Menu,
  Icon,
  ContainerInput,
  Input,
  SearchIcon,
} from './styles'
import { ThemeContext } from 'styled-components'
import UserMenu from '../UserMenu'

const AnimeHeader: React.FC<{
  anime: Category | null
}> = ({ anime }) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const [inputSearchActive, setInputSearchActive] = useState(false)

  const inputSearch = useRef<HTMLInputElement>(null)
  const iconSearch = useRef<HTMLDivElement>(null)

  const cancelInput = (e: MouseEvent) => {
    if (
      e.target !== inputSearch.current &&
      e.target !== iconSearch.current &&
      !iconSearch.current?.contains(e.target as any)
    ) {
      setInputSearchActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', cancelInput)
    return () => {
      window.removeEventListener('click', cancelInput)
    }
  }, [])

  const submitSearch = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    router.push(`/search?query=${inputSearch.current?.value}`)
  }

  const handleClickSearch = useCallback(() => {
    if (!inputSearchActive) {
      setInputSearchActive(true)
      return
    }
    submitSearch()
  }, [inputSearchActive])

  return (
    <Container>
      <HeaderWave>
        <Wave
          fill="url(#gradient)"
          paused={false}
          options={{
            amplitude: 50,
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="10%" stopColor={theme.secundaryBackground} />
              <stop offset="90%" stopColor={theme.secundary} />
            </linearGradient>
          </defs>
        </Wave>
      </HeaderWave>
      <Menu>
        <Icon src="/images/icons/icon.png" />
        <div style={{
          display: 'flex',
          gap: 15
        }}>
          <ContainerInput onSubmit={submitSearch}>
            <Input
              ref={inputSearch}
              type="text"
              name="search"
              placeholder="Pesquise por um anime"
              className={inputSearchActive ? 'actived' : 'no-actived'}
            />
            <SearchIcon
              ref={iconSearch}
              className={inputSearchActive ? 'actived' : 'no-actived'}
              onClick={handleClickSearch}
            >
              <FaSearch size={18} color={theme.text} />
            </SearchIcon>
          </ContainerInput>
          <UserMenu />
        </div>
      </Menu>
      {anime && (
        <ContainerAnime>
          <ContainerInfo>
            <Title>{anime.category_name.length > 25 ? anime.category_name.substring(0, 25) + '...' : anime.category_name}</Title>
            <div style={{ width: 225 }}>
              <Link href={`/anime/${anime.id}`}>
                <a>
                  <ButtonWatch>
                    <FaPlay size={20} />
                    Assista agora
                  </ButtonWatch>
                </a>
              </Link>
            </div>
          </ContainerInfo>
          <Link href={`/anime/${anime.id}`}>
            <a>
              <Thumbnail src={anime.coverImage_extraLarge || `https://cdn.appanimeplus.tk/img/${anime.category_image}`} />
            </a>
          </Link>
        </ContainerAnime>
      )}
    </Container>
  )
}

export default AnimeHeader
