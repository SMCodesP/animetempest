import Link from 'next/link'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState, useContext } from 'react'

import { useDebouncedCallback } from 'use-debounce'
import { ThemeContext } from 'styled-components'

import { FaHome } from 'react-icons/fa'
import Wave from 'react-wavify'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'

import Category from '../../entities/Category'
import api from '../../services/api'
import {
  Container,
  ContainerHeader,
  ContainerListAnime,
  ContainerName,
  HeaderWave,
  Input,
  ItemAnime,
  Menu,
  Name,
  Thumbnail,
  ContainerPage,
  LoadingComponent,
  ContainerInputCategory,
} from '../../shared/styles/search'
import Footer from '../../components/Footer'
import { lighten } from 'polished'
import UserMenu from '../../components/UserMenu'

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'aventura', label: 'Aventura' },
  { value: 'acao', label: 'Ação' },
  { value: 'comedia', label: 'Comédia' },
  { value: 'drama', label: 'Drama' },
  { value: 'dublado', label: 'Dublado' },
  { value: 'ecchi', label: 'Ecchi' },
  { value: 'escolar', label: 'Escolar' },
  { value: 'esporte', label: 'Esporte' },
  { value: 'fantasia', label: 'Fantasia' },
  { value: 'filme', label: 'Filme' },
  { value: 'harem', label: 'Harém' },
  { value: 'historico', label: 'Histórico' },
  { value: 'jogo', label: 'Jogo' },
  { value: 'josei', label: 'Josei' },
  { value: 'magia', label: 'Mágia' },
  { value: 'mecha', label: 'Mecha' },
  { value: 'militar', label: 'Militar' },
  { value: 'misterio', label: 'Mistério' },
  { value: 'ova', label: 'OVA' },
  { value: 'poderes', label: 'Podres' },
  { value: 'psicologico', label: 'Psicológico' },
  { value: 'romance', label: 'Romance' },
  { value: 'samurai', label: 'Samurai' },
  { value: 'sci-fi', label: 'SCI-FI' },
  { value: 'seinen', label: 'Seinen' },
  { value: 'shoujo', label: 'Shoujo' },
  { value: 'shounen', label: 'Shounen' },
  { value: 'slice_of_life', label: 'Slice of Life' },
  { value: 'sobrenatural', label: 'Sobrenatural' },
  { value: 'suspense', label: 'Suspense' },
  { value: 'terror', label: 'Terror' },
  { value: 'yaoi', label: 'Yaoi' },
  { value: 'yuri', label: 'Yuri' },
]

const Search: NextPage = ({ query: queryInitial }: any) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const [animes, setAnimes] = useState<Category[]>([])
  const [query, setQuery] = useState(queryInitial || '')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [categorySelected, setCategorySelected] = useState(categories[0])
  const [hasMore, setHasMore] = useState(false)

  const nextPage = async () => {
    setPage(state => state + 1)
    let animesList: any[]
    if (categorySelected.value === 'all') {
      animesList = await api.searchAnime(String(query), {
        page: page + 1
      })
    } else {
      animesList = await api.searchAnime(String(query), {
        category: categorySelected.value,
        page: page + 1
      })
    }
    console.log(animesList)
    if (animesList.length === 0)
      return setHasMore(false)
    setAnimes(state => [...state, ...animesList])
  }

  const handleSearch = async () => {
    setLoading(true)
    setHasMore(false)
    setAnimes([])
    setPage(1)
    let animesList
    if (categorySelected.value === 'all') {
      animesList = await api.searchAnime(String(query), {})
    } else {
      animesList = await api.searchAnime(String(query), {
        category: categorySelected.value
      })
    }
    setAnimes(animesList)
    setLoading(false)
    setHasMore(true)
    nextPage()
  }

  const handleChangeCallback = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.query.query = e.target.value
      router.push(router)
      handleSearch()
    },
    750,
    {
      maxWait: 750,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    handleChangeCallback(e)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [categorySelected])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://hurkita-bot-v3.herokuapp.com" />
        <title>Pesquise por um anime - AnimeTempest</title>
        <meta
          property="og:title"
          content={`Pesquise por um anime - AnimeTempest`}
          key="title"
        />
        <meta
          name="twitter:title"
          content={`Pesquise por um anime - AnimeTempest`}
        />
        <meta
          name="description"
          content={`Ache os melhores animes categorizados e classificados.`}
        />
        <meta
          property="og:description"
          content={`Ache os melhores animes categorizados e classificados.`}
        />
        <meta
          name="description"
          content={`Ache os melhores animes categorizados e classificados.`}
        />
        <meta
          name="Description"
          content={`Ache os melhores animes categorizados e classificados.`}
        />
        <meta
          name="twitter:description"
          content={`Ache os melhores animes categorizados e classificados.`}
        />
      </Head>
      <div
        style={{
          minHeight: '100vh',
        }}
      >
        <Container>
          <ContainerHeader>
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
            <ContainerPage>
              <Menu>
                <Link href="/">
                  <a>
                    <FaHome color={theme.text} size={36} />
                  </a>
                </Link>
                <Input
                  type="text"
                  name="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Procure por um anime"
                />
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                  }}
                >
                  <ContainerInputCategory>
                    <div style={{ width: 256, right: 0, margin: 'auto' }}>
                      <Select
                        placeholder="Selecione uma categoria"
                        options={categories}
                        value={categorySelected}
                        onChange={(e) =>
                          setCategorySelected((state) => e || state)
                        }
                        theme={{
                          borderRadius: 5,
                          spacing: {
                            baseUnit: 5,
                            controlHeight: 5,
                            menuGutter: 5,
                          },
                          colors: {
                            danger: '#DE350B',
                            dangerLight: '#FFBDAD',
                            neutral0: theme.background,
                            neutral5: lighten(0.05, theme.background),
                            neutral10: lighten(0.1, theme.background),
                            neutral20: lighten(0.2, theme.background),
                            neutral30: lighten(0.3, theme.background),
                            neutral40: lighten(0.4, theme.background),
                            neutral50: lighten(0.5, theme.background),
                            neutral60: lighten(0.6, theme.background),
                            neutral70: lighten(0.7, theme.background),
                            neutral80: lighten(0.8, theme.background),
                            neutral90: lighten(0.9, theme.background),
                            primary: lighten(0.1, theme.secundaryText),
                            primary75: lighten(0.075, theme.secundaryText),
                            primary50: lighten(0.05, theme.secundaryText),
                            primary25: lighten(0.025, theme.secundaryText),
                          },
                        }}
                      />
                    </div>
                  </ContainerInputCategory>
                  <UserMenu />
                </div>
              </Menu>
              {loading && animes.length === 0 ? (
                <>
                  <h1>Carregando...</h1>
                  <LoadingComponent color={theme.tertiary}>
                    <div>
                      <div />
                      <div />
                      <div />
                    </div>
                  </LoadingComponent>
                </>
              ) : (
                animes.length === 0 && <h1>Nenhum anime encontrado</h1>
              )}
              <InfiniteScroll
                loader={
                  <LoadingComponent color={theme.tertiary}>
                    <div>
                      <div />
                      <div />
                      <div />
                    </div>
                  </LoadingComponent>
                }
                dataLength={animes.length}
                next={nextPage}
                hasMore={hasMore}
              >
                <ContainerListAnime>
                  {animes.map((anime) => (
                    <Link
                      href={`/anime/${anime.id}`}
                      key={anime.id}
                    >
                      <a>
                        <ItemAnime>
                          <Thumbnail
                            src={
                              anime.coverImage_extraLarge
                                ? anime.coverImage_extraLarge
                                : `https://cdn.appanimeplus.tk/img/${anime.category_image}`
                            }
                          />
                          <ContainerName>
                            <Name>{anime.category_name}</Name>
                          </ContainerName>
                        </ItemAnime>
                      </a>
                    </Link>
                  ))}
                </ContainerListAnime>
              </InfiniteScroll>
            </ContainerPage>
          </ContainerHeader>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query: query.query || null,
    },
  }
}

export default Search
