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
import UserMenu from '../../components/UserMenu'
import { useProfile } from '../../contexts/ProfileContext'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useSession } from 'next-auth/client'

const Anime: NextPage<{
  anime: Category
  episodes: Episode[]
}> = ({ anime, episodes }) => {
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const [session] = useSession()
  const { toggleFavorite, isFavorite } = useProfile()
  const [hoverFavorite, setHoverFavorite] = useState(false)

  const handleBack = () => {
    router.back()
  }

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  const MarkFavorite = () => isFavorite(anime.id) || hoverFavorite ? (
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
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <AnimeTitle>{anime.category_name}</AnimeTitle>
              {(session) ? <MarkFavorite /> : <span />}
            </div>
            <AnimeDescription>{anime.category_description}</AnimeDescription>
            <Link href={`/watch/${episodes[episodes.length - 1].video_id}`}>
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
  return {
    paths: [],
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
