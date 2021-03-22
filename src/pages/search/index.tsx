import Link from 'next/link'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState, useContext } from 'react'

import debounce from 'lodash.debounce'
import { ThemeContext } from 'styled-components'

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
  ContainerPage
} from '../../shared/styles/search'
import { FaHome } from 'react-icons/fa'
import Wave from 'react-wavify'
import Footer from '../../components/Footer'

const Search: NextPage = ({ query: queryInitial }: any) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const [animes, setAnimes] = useState<Category[]>([])
  const [query, setQuery] = useState(queryInitial)

  const handleSearch = async () => {
    if (query && query.length > 3) {
      const animesList = await api.searchAnime(String(query))
      setAnimes(animesList)
    } else {
      setAnimes([])
    }
  }

  const handleChangeCallback = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.query.query = e.target.value
    router.push(router)
    handleSearch()
  }, 500)

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
      <div style={{
        minHeight: '100vh'
      }}>
        <Container>
          <ContainerHeader>
            <HeaderWave>
              <Wave
                fill="url(#gradient)"
                paused={false}
                options={{
                  amplitude: 50
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
              <ContainerListAnime>
                {animes.map((anime) => (
                  <ItemAnime key={anime.id}>
                    <Thumbnail
                      src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`}
                      width={256}
                      height={345}
                    />
                    <ContainerName>
                      <Name>{anime.category_name}</Name>
                    </ContainerName>
                  </ItemAnime>
                ))}
              </ContainerListAnime>
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
