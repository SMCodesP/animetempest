import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { FaSearch, FaPlay } from 'react-icons/fa'

import Category from '../../entities/Category'
import Episode from '../../entities/Episode'

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

const AnimeHeader: React.FC<{
  anime: Category
  episodesMostPopular: Episode[]
}> = ({ anime, episodesMostPopular }) => {
  const router = useRouter()

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
      <HeaderWave src="/images/wave.svg" />
      <Menu>
        <Icon src="/images/icons/icon.jpg" />
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
            <FaSearch size={20} />
          </SearchIcon>
        </ContainerInput>
      </Menu>
      <ContainerAnime>
        <ContainerInfo>
          <Title>{anime.category_name}</Title>
          <div style={{ width: 225 }}>
            <Link href={`/watch/${episodesMostPopular[episodesMostPopular.length - 1].video_id}`}>
              <a>
                <ButtonWatch>
                  <FaPlay size={20} />
                  Assista agora
                </ButtonWatch>
              </a>
            </Link>
          </div>
        </ContainerInfo>
        <Thumbnail src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`} />
      </ContainerAnime>
    </Container>
  )
}

export default AnimeHeader
