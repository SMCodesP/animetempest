import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { NextPage, GetStaticProps } from 'next'

import Episode from '../../entities/Episode'
import api from '../../services/api'

import { Container } from '../../shared/styles/watch'
import Category from '../../entities/Category'
import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import Video from '../../entities/Video'
import Loading from '../../components/Player/Loading'

import Player from '../../components/Player'

const MiniPlayer: React.FC<{
  episode: Episode
  episodes: Episode[]
  category: Category
  nextEpisode: Episode | null
}> = ({ episode, category, episodes, nextEpisode }) => {
  const theme = useContext(ThemeContext)
  const [quality, setQuality] = useState<'locationhd' | 'locationsd' | 'location' | ''>('')
  const [virtualQuality, setVirtualQuality] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (quality) {
      localStorage.setItem('default_quality', quality)
    }
  }, [quality])

  useEffect(() => {
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
          ? default_quality
          : episode.locationhd
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
          episode['locationhd'] || episode['locationsd'] || episode['location'] || ''
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
        playerLanguage="pt"
        onChangeQuality={(qualityId: 'locationhd' | 'locationsd' | 'location') => {
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

  if (router.isFallback) {
    return <Loading color={theme.tertiary} />
  }

  if (!episode) {
    return <Error statusCode={404} />
  }

  return episode ? (
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
        category={category}
      />
    </>
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
    const episode = await api.getEpisode(String(params?.videoId))

    if (!episode) throw 'Error array.'
    if (!episode.location) throw 'Error array.'
    const episodes = await api.getEpisodesFromAnime(episode.category_id)
    const category = await api.getAnime(episode.category_id)
    let nextEpisode = await api.nextEpisode(episode.video_id, episode.category_id)

    if (!category || !episodes) throw 'Error array.'

    return {
      props: {
        episode,
        category,
        episodes,
        nextEpisode,
      },
      revalidate: 1,
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
