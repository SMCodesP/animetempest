import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import Episode from '../../entities/Episode'
import api from '../../services/api'

import Category from '../../entities/Category'
import { ThemeContext } from 'styled-components'
import Loading from '../../components/Player/Loading'

import Progress from '../../entities/Progress'
import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import { PlayerProvider } from '../../contexts/PlayerContext'

import { Container } from '../../shared/styles/watch'
import Player from '../../components/Player'
import { useSession } from 'next-auth/client'

const MiniPlayer: React.FC<{
  episode: Episode | null
  episodes: Episode[]
  initialProgress: Progress | null
  nextEpisode: Episode | null
  previousEpisode: Episode | null
  loading: boolean
}> = ({
  episode,
  episodes,
  loading,
  initialProgress,
  nextEpisode,
  previousEpisode,
}) => {
  const theme = useContext(ThemeContext)

  const [quality, setQuality] = useState(
    episode?.locationhd || episode?.locationsd || episode?.location
  )

  return (
    <PlayerProvider
      primaryColor={theme.tertiary}
      secundaryColor={theme.text}
      videoId={episode?.video_id}
      animeId={episode?.category_id}
    >
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
        }}
      >
        <Container>
          <Player
            loading={loading}
            src={quality}
            title={episode?.title}
            subTitle={''}
            titleMedia={'Você está assistindo'}
            extraInfoMedia={episode?.title}
            onChangeQuality={() => {}}
            qualities={[
              episode?.locationhd
                ? {
                    id: 'locationhd',
                    nome: 'Full HD',
                    playing: episode['locationhd'] === quality,
                  }
                : null,
              episode?.locationsd
                ? {
                    id: 'locationsd',
                    nome: 'HD',
                    playing: episode['locationsd'] === quality,
                  }
                : null,
              episode?.location
                ? {
                    id: 'location',
                    nome: 'SD',
                    playing: episode['location'] === quality,
                  }
                : null,
            ].filter((el) => el !== null)}
            backButton={() => {}}
            onCrossClick={() => {}}
            startPosition={initialProgress?.progress || 0}
            dataNext={
              nextEpisode && {
                title: nextEpisode.title,
                uri: `/watch/${nextEpisode.video_id}`,
              }
            }
            dataPrevious={
              previousEpisode && {
                title: previousEpisode.title,
                uri: `/watch/${previousEpisode.video_id}`,
              }
            }
            reprodutionList={episodes
              .map((ep: any) => ({
                nome: ep.title,
                id: ep.video_id,
                playing: ep.video_id === episode?.video_id,
              }))
              .reverse()}
            overlayEnabled={true}
            fullPlayer
            autoPlay
            autoControllCloseEnabled
          />
        </Container>
      </div>
    </PlayerProvider>
  )
}

const Watch: NextPage<{
  episodeInitial: Episode
  nextEpisode: Episode | null
  previousEpisode: Episode | null
  episodes: Episode[]
}> = ({
  episodeInitial,
  episodes,
  nextEpisode = null,
  previousEpisode = null,
}) => {
  const [session] = useSession()
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [initialProgress, setInitialProgress] = useState<Progress | null>(null)

  useEffect(() => {
    if (session) {
      setInitialProgress(null)
      setLoadingProgress(true)
      ;(async () => {
        try {
          const { data } = await axios.get<Progress>(
            `/api/episode/${episodeInitial.video_id}`
          )
          setInitialProgress(data)
          setLoadingProgress(false)
        } catch (error) {
          console.error(error)
          setLoadingProgress(false)
        }
      })()
    } else {
      setLoadingProgress(false)
    }
  }, [episodeInitial])

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  if (!episodeInitial) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{episodeInitial.title}</title>
        <meta property="og:title" content={episodeInitial.title} key="title" />
        <meta name="twitter:title" content={episodeInitial.title} />
        <meta
          name="description"
          content={`Melhor site para você assistir seus animes, assista agora ${episodeInitial.title} sem anúncios legendado e hd.`}
        />
        <meta
          property="og:description"
          content={`Melhor site para você assistir seus animes, assista agora ${episodeInitial.title} sem anúncios legendado e hd.`}
        />
        <meta
          name="description"
          content={`Melhor site para você assistir seus animes, assista agora ${episodeInitial.title} sem anúncios legendado e hd.`}
        />
        <meta
          name="Description"
          content={`Melhor site para você assistir seus animes, assista agora ${episodeInitial.title} sem anúncios legendado e hd.`}
        />
        <meta
          name="twitter:description"
          content={`Melhor site para você assistir seus animes, assista agora ${episodeInitial.title} sem anúncios legendado e hd.`}
        />
      </Head>
      <MiniPlayer
        episode={episodeInitial}
        episodes={episodes}
        initialProgress={initialProgress}
        loading={loadingProgress}
        nextEpisode={nextEpisode}
        previousEpisode={previousEpisode}
      />
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
    const episodeInitial = await api.getEpisode(String(params?.videoId))
    if (!episodeInitial) throw `Episode ${String(params?.videoId)} null.`
    if (!episodeInitial.location)
      throw `Episode location video not found ${String(params?.videoId)}.`
    const episodes = await api.getEpisodesFromAnime(episodeInitial.category_id)

    const episodesSorted = episodes.sort(
      (episodeA, episodeB) =>
        Number(episodeA.video_id) - Number(episodeB.video_id)
    )

    if (!episodes)
      throw `Category and episodes of ${params?.videoId} not found.`

    return {
      props: {
        episodeInitial,
        episodes: episodesSorted,
        nextEpisode:
          episodesSorted[
            episodesSorted.findIndex(
              (episodeSearch) =>
                episodeSearch.video_id === episodeInitial?.video_id
            ) + 1
          ],
        previousEpisode:
          episodes[
            episodesSorted.findIndex(
              (episodeSearch) =>
                episodeSearch.video_id === episodeInitial?.video_id
            ) - 1
          ],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }
}

export default Watch
