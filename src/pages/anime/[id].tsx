import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

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
} from '../../shared/styles/anime'
import { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { IoIosArrowRoundBack } from 'react-icons/io'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loading from '../../components/Player/Loading'
import Video from '../../entities/Video'
import UserMenu from '../../components/UserMenu'
import { useProfile } from '../../contexts/ProfileContext'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

const Anime: NextPage<{
  anime: Category
  episodes: Episode[]
}> = ({ anime, episodes }) => {
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const { toggleFavorite, isFavorite } = useProfile()
  const [hoverFavorite, setHoverFavorite] = useState(false)

  const handleBack = () => {
    router.back()
  }

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  return (
    <>
      <Head>
        <title>{anime.category_name} - OtakuTube</title>
        <meta property="og:title" content={`${anime.category_name} - OtakuTube`} key="title" />
        <meta name="twitter:title" content={`${anime.category_name} - OtakuTube`} />
        <meta
          name="description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          property="og:description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          name="description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          name="Description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
        />
        <meta
          name="twitter:description"
          content={`Venha assistir agora ${
            anime.category_name
          }. ${anime.category_description?.substring(0, 110)}...`}
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
          <Back onClick={handleBack}>
            <IoIosArrowRoundBack size={46} color={theme.tertiary} />
            Voltar
          </Back>
          <UserMenu />
        </div>
        <ContainerInfoAnime>
          <div
            style={{
              height: 'fit-content',
              width: '100%',
            }}
          >
            <AnimeImage
              src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`}
              width={268}
              height={348}
            />
          </div>
          <AnimeInfo>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <AnimeTitle>{anime.category_name}</AnimeTitle>
              {isFavorite(anime.id) || hoverFavorite ? (
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
              )}
            </div>
            <AnimeDescription>{anime.category_description}</AnimeDescription>
            <Link href={`/watch/${episodes[0].video_id}`}>
              <a style={{ width: 'fit-content' }}>
                <ButtonWatch>Assistir online</ButtonWatch>
              </a>
            </Link>
          </AnimeInfo>
        </ContainerInfoAnime>
        <ContainerListEpisodes>
          {episodes.map((episode) => (
            <Link href={`/watch/${episode.video_id}`} key={`episode-${episode.video_id}`}>
              <a>
                <ContainerItemEpisode>
                  <EpisodeTitle>{episode.title.replace(anime.category_name, '')}</EpisodeTitle>
                  <EpisodeImage
                    src={`https://cdn.appanimeplus.tk/img/${anime.category_image}`}
                    width={170}
                    height={280}
                  />
                </ContainerItemEpisode>
              </a>
            </Link>
          ))}
        </ContainerListEpisodes>
      </Container>
      <Footer />
    </>
  )
}

export const getStaticPaths = async () => {
  const { data: videosLatest } = await api.get<Video[]>('/api-animesbr-10.php?latest')
  const { data: animesPopular } = await api.get<Category[]>('/api-animesbr-10.php?populares')

  const paths = [
    ...videosLatest.map((video) => ({
      params: {
        id: video.category_id,
      },
    })),
    ...animesPopular.map((anime) => ({
      params: {
        id: anime.id,
      },
    })),
  ]

  var pathsUnique: {
    params: {
      id: string
    }
  }[] = []
  paths.forEach((item) => {
    var i = pathsUnique.findIndex((x) => x.params.id == item.params.id)
    if (i <= -1) {
      pathsUnique.push({ params: { id: item.params.id } })
    }
  })

  return {
    paths: pathsUnique,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const anime = await api.getAnime(String(params?.id))
    if (!anime) {
      console.log(anime)
      throw new Error('Anime not found')
    }
    const episodes = await api.getEpisodesFromAnime(anime.id)
    if (!episodes) {
      console.log(episodes)
      throw new Error('Episodes not found')
    }

    return {
      props: {
        anime,
        episodes,
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
      revalidate: 300,
    }
  }
}

export default Anime
