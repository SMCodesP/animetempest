import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { FaHome, FaBookmark, FaRegBookmark } from 'react-icons/fa'

import { useTheme } from 'styled-components'

import { useSession } from 'next-auth/client'

import InfiniteScroll from 'react-infinite-scroll-component'

import { useDebouncedCallback } from 'use-debounce'

import Footer from '../../components/Footer'

import Category from '../../entities/Category'
import Episode from '../../entities/Episode'

import api from '../../services/api'

import {
  Container,
  Back,
  AnimeImage,
  AnimeDescription,
  ContainerInfoAnime,
  AnimeTitle,
  AnimeInfo,
  ButtonWatch,
  ContainerListEpisodes,
  ContainerItemEpisode,
  EpisodeTitle,
  EpisodeImage,
  ContainerAnimeImage,
  SearchInput,
} from '../../shared/styles/anime'

import Loading from '../../components/Player/Loading'
import UserMenu from '../../components/UserMenu'
import { useProfile } from '../../contexts/ProfileContext'
import AnimeResumeList from '../../components/AnimeResumeList'
import { LoadingComponent } from '../../shared/styles/search'

const Anime: React.FC<{
  anime: Category
  episodes: Episode[]
  animesRecommended: Category[]
}> = ({ anime, episodes, animesRecommended }) => {
  const theme = useTheme()
  const [session] = useSession()
  const { toggleFavorite, isFavorite } = useProfile()

  const [hoverFavorite, setHoverFavorite] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [episodesDisplay, setEpisodesDisplay] = useState(episodes)

  useEffect(() => {
    setPage(1)
    setEpisodesDisplay(
      episodes.filter((episode) =>
        episode.title.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query])

  const handleQuery = useDebouncedCallback(
    (str: string) => {
      setQuery(str)
    },
    750,
    {
      maxWait: 750,
    }
  )

  const MarkFavorite = () =>
    isFavorite(anime.id) || hoverFavorite ? (
      <FaBookmark
        size={24}
        color={theme.text}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => toggleFavorite(anime.id)}
        onMouseLeave={() => setHoverFavorite(false)}
      />
    ) : (
      <FaRegBookmark
        size={24}
        color={theme.text}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => toggleFavorite(anime.id)}
        onMouseLeave={() => setHoverFavorite(false)}
        onMouseEnter={() => setHoverFavorite(true)}
      />
    )

  return (
    <>
      <Head>
        <title>{anime.category_name} - AnimeTempest</title>
        <meta
          property="og:title"
          content={`${anime.category_name} - AnimeTempest`}
          key="title"
        />
        <meta
          name="twitter:title"
          content={`${anime.category_name} - AnimeTempest`}
        />
        <meta
          name="description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.sinopse?.substring(0, 110)}...`}
        />
        <meta
          property="og:description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.sinopse?.substring(0, 110)}...`}
        />
        <meta
          name="description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.sinopse?.substring(0, 110)}...`}
        />
        <meta
          name="Description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.sinopse?.substring(0, 110)}...`}
        />
        <meta
          name="twitter:description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.sinopse?.substring(0, 110)}...`}
        />
      </Head>
      <Container
        style={{
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/">
            <a>
              <Back>
                <FaHome size={28} color={theme.tertiary} />
                Página Inicial
              </Back>
            </a>
          </Link>
          <UserMenu />
        </div>
        <ContainerInfoAnime>
          <ContainerAnimeImage>
            <AnimeImage
              src={
                anime.coverImage_extraLarge
                  ? anime.coverImage_extraLarge
                  : `https://cdn.appanimeplus.tk/img/${anime.category_image}`
              }
              width={270}
              height={380}
            />
          </ContainerAnimeImage>
          <AnimeInfo>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <AnimeTitle>{anime.category_name}</AnimeTitle>
              {session ? <MarkFavorite /> : <span />}
            </div>
            <AnimeDescription
              dangerouslySetInnerHTML={{
                __html: anime.sinopse || 'Nenhuma descrição disponível.',
              }}
            />
            <Link prefetch={false} href={`/watch/${episodes[0].video_id}`}>
              <a style={{ width: 'fit-content' }}>
                <ButtonWatch>Assistir online</ButtonWatch>
              </a>
            </Link>
          </AnimeInfo>
        </ContainerInfoAnime>
        <SearchInput
          value={search}
          placeholder="Pesquise por um episódio"
          onChange={(e) => {
            setSearch(e.target.value)
            handleQuery(e.target.value)
          }}
        />
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
          dataLength={episodesDisplay.slice(0, 15 * page).length}
          next={() => setPage((state) => state + 1)}
          hasMore={15 * page < episodesDisplay.length}
        >
          <ContainerListEpisodes>
            {episodesDisplay.slice(0, 15 * page).map((episode) => (
              <Link
                prefetch={false}
                href={`/watch/${episode.video_id}`}
                key={`episode-${episode.video_id}`}
              >
                <a>
                  <ContainerItemEpisode>
                    <EpisodeTitle>
                      {episode.title.replace(anime.category_name, '')}
                    </EpisodeTitle>
                    <EpisodeImage
                      src={
                        anime.coverImage_extraLarge
                          ? anime.coverImage_extraLarge
                          : `https://cdn.appanimeplus.tk/img/${anime.category_image}`
                      }
                      width={170}
                      height={335}
                    />
                  </ContainerItemEpisode>
                </a>
              </Link>
            ))}
          </ContainerListEpisodes>
        </InfiniteScroll>
        <h2
          style={{
            fontSize: 32,
            marginTop: 15,
            fontWeight: 'bold',
          }}
        >
          Recomendados
        </h2>
        <AnimeResumeList animes={animesRecommended} />
      </Container>
      <Footer />
    </>
  )
}

const AnimePage: NextPage<{
  anime: Category
  episodes: Episode[]
  animesRecommended: Category[]
}> = ({ anime, episodes, animesRecommended }) => {
  const theme = useTheme()
  const router = useRouter()

  return router.isFallback ? (
    <Loading color={theme.tertiary} />
  ) : (
    <Anime
      anime={anime}
      episodes={episodes}
      animesRecommended={animesRecommended}
    />
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const anime = await api.getAnime(String(params?.id))
    if (!anime || anime.category_name.toLowerCase().includes('animetv')) {
      console.log(anime)
      throw new Error('Anime not found')
    }
    const episodes = await api.getEpisodesFromAnime(anime.id)
    if (!episodes) {
      console.log(episodes)
      throw new Error('Episodes not found')
    }
    let animesRecommended: Category[] | null = null

    if (anime.genres) {
      animesRecommended = await api.getCategory(anime.genres[0])
    }

    return {
      props: {
        anime,
        episodes: episodes.reverse(),
        animesRecommended:
          animesRecommended || [],
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
      revalidate: 60,
    }
  }
}

export default AnimePage
