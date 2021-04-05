import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import Episode from '../../entities/Episode'
import api from '../../services/api'

import { Container } from '../../shared/styles/watch'
import Category from '../../entities/Category'
import { ThemeContext } from 'styled-components'
import Video from '../../entities/Video'
import Loading from '../../components/Player/Loading'

import Player from '../../components/Player'
import { useSession } from 'next-auth/client'
import Progress from '../../entities/Progress'
import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'

const MiniPlayer: React.FC<{
  episode: Episode
  episodes: Episode[]
  category: Category
  initialProgress: Progress | null
  nextEpisode: Episode | null
}> = ({ episode, category, episodes, initialProgress, nextEpisode }) => {
  const theme = useContext(ThemeContext)
  const [quality, setQuality] = useState<
    'locationhd' | 'locationsd' | 'location' | ''
  >('')
  const [virtualQuality, setVirtualQuality] = useState<string>('')
  const [isContinue, setIsContinue] = useState<boolean | null>(false)
  const [startVideoProgress, setStartVideoProgress] = useState(
    initialProgress !== null ? initialProgress?.progress : 0
  )
  const router = useRouter()

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
    <Container>
      <Player
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
                nome: 'FullHD',
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
        videoId={episode.video_id}
        backButton={() => router.back()}
        fullPlayer
        autoPlay
        startPosition={startVideoProgress}
        dataNext={{
          title: nextEpisode?.title || 'Não existe um próximo vídeo.',
        }}
        onNextClick={() => {
          nextEpisode && router.push(`/watch/${nextEpisode?.video_id}`)
        }}
        reprodutionList={episodes
          .map((ep: any) => ({
            nome: ep.title,
            id: ep.video_id,
            playing: ep.video_id === episode.video_id,
          }))
          .reverse()}
        overlayEnabled={true}
        autoControllCloseEnabled
        primaryColor={theme.tertiary}
        secundaryColor={theme.text}
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      />
    </Container>
  ) : (
    <div />
  )
}

const Watch: NextPage<{
  episode: Episode
  episodes: Episode[]
  category: Category
  nextEpisode: Episode | null
}> = ({ episode, episodes, category, nextEpisode }) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const [session, loading] = useSession()
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [initialProgress, setInitialProgress] = useState<Progress | null>(null)

  useEffect(() => {
    if (session) {
      ;(async () => {
        try {
          const { data } = await axios.get<Progress>(
            `/api/episode/${episode.video_id}`
          )
          setInitialProgress(data)
          setLoadingProgress(false)
        } catch (error) {
          setLoadingProgress(false)
        }
      })()
    } else {
      if (!loading) {
        setLoadingProgress(false)
      }
    }
  }, [session, loading, episode])

  if (router.isFallback || loadingProgress || loading) {
    return <Loading color={theme.tertiary} />
  }

  if (!episode) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{episode.title}</title>
        <meta property="og:title" content={episode.title} key="title" />
        <meta name="twitter:title" content={episode.title} />
        <meta
          name="description"
          content={`Melhor site para você assistir seus animes, assista agora ${episode.title} sem anúncios legendado e hd.`}
        />
        <meta
          property="og:description"
          content={`Melhor site para você assistir seus animes, assista agora ${episode.title} sem anúncios legendado e hd.`}
        />
        <meta
          name="description"
          content={`Melhor site para você assistir seus animes, assista agora ${episode.title} sem anúncios legendado e hd.`}
        />
        <meta
          name="Description"
          content={`Melhor site para você assistir seus animes, assista agora ${episode.title} sem anúncios legendado e hd.`}
        />
        <meta
          name="twitter:description"
          content={`Melhor site para você assistir seus animes, assista agora ${episode.title} sem anúncios legendado e hd.`}
        />
      </Head>
      <MiniPlayer
        episode={episode}
        nextEpisode={nextEpisode}
        episodes={episodes}
        initialProgress={initialProgress}
        category={category}
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const { data: releases } = await api.get<Video[]>(
    '/api-animesbr-10.php?latest'
  )

  return {
    paths: releases.map((release) => ({
      params: {
        videoId: release.video_id,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const episode = await api.getEpisode(String(params?.videoId))
    // const episode = {
    //   video_id: '428280',
    //   category_id: '8386',
    //   title: 'Kimetsu No Yaiba Episodio 01',
    //   location:
    //     'https://redirector.googlevideo.com/videoplayback?expire=1617644099&ei=w9lqYOKuApXWzLUPnp6NmAo&ip=149.56.143.221&id=ed8f94a6e0445858&itag=18&source=blogger&mh=2b&mm=31&mn=sn-4g5ednse&ms=au&mv=u&mvi=1&pl=27&susc=bl&mime=video/mp4&vprv=1&dur=1420.109&lmt=1554567259749649&mt=1617614511&sparams=expire,ei,ip,id,itag,source,susc,mime,vprv,dur,lmt&sig=AOq0QJ8wRQIhALYyEJhRlKfHs3M2cQbs7qyj7CUiLqrgcPbQaPL_dWsIAiB5MpZZ4EkOGFxA-Ojkvd7p_VDfZPmJhGzEOGcPwXAlpQ%3D%3D&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgCEIPJZobsENURGy3RnEomNi8ifX6SxLLTgdikRbJc7ECIQDg_41tnKa5nN7osJ5cJc98GF0FimNhHreT0tpGENXC5w%3D%3D',
    //   locationsd:
    //     'https://redirector.googlevideo.com/videoplayback?expire=1617644099&ei=w9lqYOKuApXWzLUPnp6NmAo&ip=149.56.143.221&id=ed8f94a6e0445858&itag=22&source=blogger&mh=2b&mm=31&mn=sn-4g5ednse&ms=au&mv=u&mvi=1&pl=27&susc=bl&mime=video/mp4&vprv=1&dur=1420.109&lmt=1554567277015459&mt=1617614511&sparams=expire,ei,ip,id,itag,source,susc,mime,vprv,dur,lmt&sig=AOq0QJ8wRQIhALZkpO_LTUgpPUkGG13CpxJ1yMAM3xGTV7D6t4qZtJbcAiAf9NShOkxXR02dE8rdDVli5JRl-4t_Wkz_BozA-7Hmyg%3D%3D&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhANf_Nbkb0jbxmh5Jh6eTGh0dxNbodB5pMA91FOrucFr0AiEAhQn1S37qRcov0A1VVYNdjb0fConENySe8PttWAQ10N4%3D',
    //   locationhd: '',
    // }

    if (!episode) throw `Episode ${String(params?.videoId)} null.`
    if (!episode.location)
      throw `Episode location video not found ${String(params?.videoId)}.`
    const episodes = await api.getEpisodesFromAnime(episode.category_id)
    const category = await api.getAnime(episode.category_id)
    const nextEpisode = await api.nextEpisode(
      episode.video_id,
      episode.category_id
    )

    if (!category || !episodes)
      throw `Category and episodes of ${params?.videoId} not found.`

    return {
      props: {
        episode,
        category,
        episodes,
        nextEpisode,
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
      revalidate: 1,
    }
  }
}

export default Watch
