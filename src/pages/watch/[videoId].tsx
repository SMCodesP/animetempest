import { useContext, useState, useEffect } from 'react'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'

import Episode from '../../entities/Episode'
import api from '../../services/api'

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
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const [quality, setQuality] = useState(
    episode?.locationhd || episode?.locationsd || episode?.location
  )

  useEffect(() => {
    setQuality(episode?.locationhd || episode?.locationsd || episode?.location)
  }, [episode])

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
            onChangeQuality={(id: 'location' | 'locationsd' | 'locationhd') => episode && setQuality(episode[id])}
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
            backButton={() => router.push('/')}
            onCrossClick={() => router.push('/')}
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
      {/* <div style={{
        margin: 25
      }}>
      <TimeSeekSlider
        max={1152}
        currentTime={200}
        progress={400}
        onSeeking={(time)=>{
          console.log(time)
        }}
        offset={0}
        secondsPrefix="00:00:"
        minutesPrefix="00:"
      />
      </div> */}
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
    // const episodeInitial = {"video_id":"52248","category_id":"33377","title":"Kimetsu no Yaiba  Episodio 01","location":"https:\/\/redirector.googlevideo.com\/videoplayback?expire=1622853257&ei=CVa6YLWNOd2z8wSoja2IAg&ip=149.56.143.221&id=ebd739cb81442432&itag=18&source=blogger&mh=ew&mm=31&mn=sn-nx5e6ne6&ms=au&mv=u&mvi=5&pl=27&susc=bl&mime=video\/mp4&vprv=1&dur=1431.672&lmt=1612190124937839&mt=1622824123&txp=1310224&sparams=expire,ei,ip,id,itag,source,susc,mime,vprv,dur,lmt&sig=AOq0QJ8wRAIgX3mCwvuQVD2V85YcwAdWHUZrlS0uWq9X43lcdVoDwHMCIGvOWlxFXd-I9iOA9UlkkWhGo03n4WfC-qNKxntPt4no&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAL041l6vR2GgCqHYH-oJ9t0Qq66Q_4CK1ci4mm1f0n5oAiEAqmdgNgprmXz2z5hpMB8W_o9xGGFEKuwvCUqF6MFSjlE%3D","locationsd":"https:\/\/redirector.googlevideo.com\/videoplayback?expire=1622853257&ei=CVa6YLWNOd2z8wSoja2IAg&ip=149.56.143.221&id=ebd739cb81442432&itag=22&source=blogger&mh=ew&mm=31&mn=sn-nx5e6ne6&ms=au&mv=u&mvi=5&pl=27&susc=bl&mime=video\/mp4&vprv=1&dur=1431.672&lmt=1612190101563501&mt=1622824123&txp=1311224&sparams=expire,ei,ip,id,itag,source,susc,mime,vprv,dur,lmt&sig=AOq0QJ8wRgIhAN0oAdrQnwH7WiNAf__9-xYT4B5CES7aynkgASjmXPXxAiEA9bKTe0dmePkxuiWiYqsnJldJsHIP_Frm_pxGgKz4AfA%3D&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgI5qiStmYdXrdzhXdaft_WnVBNJDIdJq9Mm4pX4XkvjECIBwPkYj_whDs8PafjyTNIO2n2ZtgYCbQE2X0Ot-HIMqf","locationhd":""}
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

    const indexEpisode = episodesSorted.findIndex(
      (episodeSearch) =>
        episodeSearch.video_id === episodeInitial?.video_id
    )

    const nextEpisode = episodesSorted[indexEpisode + 1]
    const previousEpisode = episodesSorted[indexEpisode - 1]

    return {
      props: {
        episodeInitial,
        episodes: episodesSorted,
        nextEpisode: (nextEpisode) ? nextEpisode : null,
        previousEpisode: (previousEpisode) ? previousEpisode : null
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
