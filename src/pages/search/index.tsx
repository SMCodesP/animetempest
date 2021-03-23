import Link from 'next/link'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState, useContext } from 'react'

import debounce from 'lodash.debounce'
import { ThemeContext } from 'styled-components'

import { FaHome } from 'react-icons/fa'
import Wave from 'react-wavify'
import InfiniteScroll from 'react-infinite-scroll-component'

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
} from '../../shared/styles/search'
import Footer from '../../components/Footer'

const Search: NextPage = ({ query: queryInitial }: any) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const [animes, setAnimes] = useState<Category[]>([])
  const [query, setQuery] = useState(queryInitial)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const handleSearch = async () => {
    if (query && query.length > 3) {
      setLoading(true)
      const animesList = await api.searchAnime(String(query))
      setPage(1)
      setAnimes(animesList)
      setLoading(false)
    } else {
      setPage(1)
      setLoading(false)
      setAnimes([])
    }
  }

  const handleChangeCallback = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.query.query = e.target.value
    router.push(router)
    handleSearch()
  }, 100)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    handleChangeCallback(e)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <>
      <Head>
        <title>Resultados para {query}</title>
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
              </Menu>
              {loading && animes.length === 0 ? (
                <>
                  <h1>Carregando...</h1>
                  <LoadingComponent color={theme.fifthText}>
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
                dataLength={animes.slice(0, 10 * page).length}
                next={() => setPage((state) => state + 1)}
                hasMore={10 * page < animes.length}
              >
                <ContainerListAnime>
                  {animes.slice(0, 10 * page).map((anime) => (
                    <Link href={`/anime/${anime.id}`} key={anime.id}>
                      <a>
                        <ItemAnime>
                          <Thumbnail
                            src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`}
                            width={256}
                            height={345}
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

Search.getInitialProps = ({ query }) => {
  return query
}

export default Search
