import Head from 'next/head'
import Error from 'next/error'
// import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NextPage, GetStaticProps } from 'next'
// import useSWR from 'swr'
// import fetch from 'unfetch'

import Episode from '../../entities/Episode'
// import Video from '../../entities/Video'
import api from '../../services/api'

import { Container } from '../../shared/styles/watch'
import Category from '../../entities/Category'
import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import Video from '../../entities/Video'
import Loading from '../../components/Player/Loading'

import Player from '../../components/Player'
import axios from 'axios'

// const fetcher = (url: string) => fetch(url).then((r) => r.json())

const MiniPlayer: React.FC<{
  episode: Episode
  episodes: Episode[]
  category: Category
  nextEpisode: Episode | null
}> = ({ episode, category, episodes, nextEpisode }) => {
  const theme = useContext(ThemeContext)
  const [quality, setQuality] = useState<'locationhd' | 'locationsd' | 'location' | ''>('')
  const router = useRouter()

  useEffect(() => {
    if (quality) {
      localStorage.setItem('default_quality', quality)
    }
  }, [quality])

  useEffect(() => {
    const default_quality: any = localStorage.getItem('default_quality')
    setQuality(
      default_quality !== null
        ? default_quality
        : episode.locationhd
          ? 'locationhd'
          : episode.locationsd
            ? 'locationsd'
            : episode.location
              ? 'location'
              : ''
    )
  }, [])

  return quality ? (
    <>
      <Head>
        <title>{episode.title}</title>
      </Head>
      <Container>
        <Player
          src={episode[quality || 'location']}
          title={category.category_name}
          subTitle={episode.title}
          titleMedia={category.category_name}
          extraInfoMedia={episode.title}
          playerLanguage="pt"
          onChangeQuality={(qualityId: 'locationhd' | 'locationsd' | 'location') => {
            setQuality(qualityId)
          }}
          qualities={[
            episode.locationhd
              ? {
                id: 'locationhd',
                // prefix: 'FullHD',
                nome: 'FullHD',
                playing: 'locationhd' === quality,
              }
              : null,
            episode.locationsd && {
              id: 'locationsd',
              // prefix: 'HD',
              nome: 'HD',
              playing: 'locationsd' === quality,
            },
            episode.location && {
              id: 'location',
              // prefix: 'SD',
              nome: 'SD',
              playing: 'location' === quality,
            },
          ].filter((el) => el !== null)}
          backButton={() => router.back()}
          fullPlayer
          autoPlay
          startPosition={0}
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
    </>
  ) : (
      <div />
    )
}

const Watch: NextPage<{
  episode: Episode[]
  episodes: Episode[]
  category: Category
  nextEpisode: Episode | null
}> = ({ episode, episodes, category, nextEpisode }) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  if (!episode) {
    return <Error statusCode={404} />
  }

  // const { data: episode } = useSWR<Episode[]>(
  //   `https://appanimeplus.tk/api-animesbr-10.php?episodios=${episodeInitial[0].video_id}`,
  //   fetcher,
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnMount: true,
  //     revalidateOnReconnect: false,
  //   }
  // )

  return episode ? (
    <MiniPlayer
      episode={episode[0]}
      nextEpisode={nextEpisode}
      episodes={episodes}
      category={category}
    />
  ) : (
      <div />
    )
}

export const getStaticPaths = async () => {
  const { data: releases } = await api.get<Video[]>('/api-animesbr-10.php?latest')

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
    const { data } = await axios.get<Episode[]>(
      `/api-animesbr-10.php?episodios=${params?.videoId}`,
      {
        headers: {
          "proxy-type": "brazil"
        },
        proxy: { protocol: "http", host: "185.86.150.41", port: 800 },
      }
    )
    if (!data) throw 'Error array.'
    const { data: episodes } = await api.get<Episode[]>(
      `/api-animesbr-10.php?cat_id=${data[0].category_id}`
    )
    const { data: category } = await api.get<Category[]>(
      `/api-animesbr-10.php?info=${data[0].category_id}`
    )
    let { data: nextEpisode } = await api.get<Episode[] | null>(
      `/api-animesbr-10.php?episodios=${params?.videoId}&catid=${data[0].category_id}&next`
    )
    if (!category || !episodes) throw 'Error array.'

    return {
      props: {
        episode: data,
        category: category[0],
        episodes,
        nextEpisode: nextEpisode ? nextEpisode[0] : null,
      },
      revalidate: 900000,
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
      revalidate: 900000,
    }
  }
}

export default Watch
