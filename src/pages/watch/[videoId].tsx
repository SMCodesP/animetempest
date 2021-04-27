import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

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
const Player = dynamic(() => import('../../components/Player'))

const MiniPlayer: React.FC<{
  episode: Episode
  episodes: Episode[]
  category: Category
  initialProgress: Progress | null
  nextEpisode: Episode | null
  previousEpisode: Episode | null
  loadingProgress: boolean
}> = ({ episode, category, episodes, loadingProgress, initialProgress, nextEpisode, previousEpisode }) => {
  const theme = useContext(ThemeContext)
  const [quality, setQuality] = useState<
    'locationhd' | 'locationsd' | 'location' | ''
  >('')
  const [virtualQuality, setVirtualQuality] = useState<string>('')
  const [isContinue, setIsContinue] = useState<boolean | null>(false)
  const [startVideoProgress, setStartVideoProgress] = useState(
    initialProgress ? initialProgress?.progress : 0
  )
  const router = useRouter()

  useEffect(() => {
    if (initialProgress) {
      setStartVideoProgress(initialProgress.progress || 0)
    } else {
      setStartVideoProgress(0)
    }
  }, [initialProgress, loadingProgress])

  useEffect(() => {
    if (quality) {
      localStorage.setItem('default_quality', quality)
    }
    if (isContinue === null) {
      const history = localStorage.getItem('history')
      if (history) {
        const historyParsed: {
          video_id: string
          progress: number
        }[] = JSON.parse(history)
        const videoProgress = historyParsed.find(
          (el) => el.video_id === episode.video_id
        )
        if (videoProgress) {
          setStartVideoProgress(videoProgress.progress)
        }
      }
    }
  }, [quality])

  useEffect(() => {
    setIsContinue(false)
    setStartVideoProgress(initialProgress?.progress || 0)
    const default_quality = localStorage.getItem('default_quality')
    setQuality(() => {
      let quality_storage: 'locationhd' | 'locationsd' | 'location' | '' = ''
      if (
        default_quality &&
        (default_quality === 'locationhd' ||
          default_quality === 'locationsd' ||
          default_quality === 'location')
      ) {
        quality_storage = default_quality
      } else {
        quality_storage = episode.locationhd
          ? 'locationhd'
          : episode.locationsd
          ? 'locationsd'
          : episode.location
          ? 'location'
          : ''
      }
      if ((episode as any)[quality_storage]) {
        setVirtualQuality((episode as any)[quality_storage])
      } else {
        setVirtualQuality(
          episode['locationhd'] ||
            episode['locationsd'] ||
            episode['location'] ||
            ''
        )
      }
      return quality_storage
    })
  }, [episode])

  return quality ? (
    <PlayerProvider
      primaryColor={theme.tertiary}
      secundaryColor={theme.text}
      videoId={episode.video_id}
      animeId={episode.category_id}
    >
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex'
      }}>
        <Container>
          <Player
            loading={loadingProgress}
            src={virtualQuality}
            title={category.category_name}
            subTitle={episode.title}
            titleMedia={category.category_name}
            extraInfoMedia={episode.title}
            animeId={episode.category_id}
            onChangeQuality={(
              qualityId: 'locationhd' | 'locationsd' | 'location'
            ) => {
              setIsContinue(null)
              setQuality(qualityId)
              setVirtualQuality((state) => episode[qualityId] || state)
            }}
            qualities={[
              episode.locationhd
                ? {
                    id: 'locationhd',
                    nome: 'FULL HD',
                    playing: episode['locationhd'] === virtualQuality,
                  }
                : null,
              episode.locationsd
                ? {
                    id: 'locationsd',
                    nome: 'HD',
                    playing: episode['locationsd'] === virtualQuality,
                  }
                : null,
              episode.location
                ? {
                    id: 'location',
                    nome: 'SD',
                    playing: episode['location'] === virtualQuality,
                  }
                : null,
            ].filter((el) => el !== null)}
            backButton={() => router.push('/')}
            fullPlayer
            autoPlay
            startPosition={startVideoProgress}
            dataNext={nextEpisode && {
              title: nextEpisode.title,
              uri: `/watch/${nextEpisode.video_id}`
            }}
            dataPrevious={previousEpisode && {
              title: previousEpisode.title,
              uri: `/watch/${previousEpisode.video_id}`
            }}
            onCrossClick={() => router.push('/')}
            reprodutionList={episodes
              .map((ep: any) => ({
                nome: ep.title,
                id: ep.video_id,
                playing: ep.video_id === episode.video_id,
              }))
              .reverse()}
            overlayEnabled={true}
            autoControllCloseEnabled
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          />
        </Container>
      </div>
    </PlayerProvider>
  ) : (
    <div />
  )
}

const Watch: NextPage<{
  episodeInitial: Episode
  episodes: Episode[]
  category: Category
  nextEpisode: Episode | null
  previousEpisode: Episode | null
}> = ({ episodeInitial, episodes, category, nextEpisode, previousEpisode }) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [initialProgress, setInitialProgress] = useState<Progress | null>(null)
  const [episode, setEpisode] = useState<Episode | null>(null)

  useEffect(() => {
    setInitialProgress(null)
    setLoadingProgress(true)
    ;(async () => {
      try {
        const { data } = await axios.get<Progress>(
          `/api/episode/${episodeInitial.video_id}`
        )
        setInitialProgress(data)
      } catch (error) {
        console.error(error)
      }
      try {
        const { data: episodeData } = await axios.get<Episode>(
          `/api/watch/${episodeInitial.video_id}`
        )
        setEpisode(episodeData)
        setLoadingProgress(false)
      } catch (error) {
        setLoadingProgress(false)
      }
    })()
  }, [episodeInitial])

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  if (!episodeInitial && (!episode && !loadingProgress)) {
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
        episode={episode || episodeInitial}
        episodes={episodes}
        initialProgress={initialProgress}
        category={category}
        loadingProgress={loadingProgress}
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
    const category = await api.getAnime(episodeInitial.category_id)
    if (category.category_name.toLowerCase().includes("animetv"))
      throw 'Invalid'

    const nextEpisode = await api.nextEpisode(
      episodeInitial.video_id,
      episodeInitial.category_id
    )
    const previousEpisode = await api.previousEpisode(
      episodeInitial.video_id,
      episodeInitial.category_id
    )

    if (!category || !episodes)
      throw `Category and episodes of ${params?.videoId} not found.`

    return {
      props: {
        episodeInitial,
        category,
        episodes,
        nextEpisode,
        previousEpisode
      },
      revalidate: 300,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 300,
    }
  }
}

export default Watch
