import Head from 'next/head'
import Error from 'next/error'
import dynamic from 'next/dynamic'
import { NextPage, GetStaticProps } from 'next'
import useSWR from 'swr'
import fetch from 'unfetch'

import Episode from '../../entities/Episode'
// import Video from '../../entities/Video'
import api from '../../services/api'

import { Container } from '../../shared/styles/watch'
import Category from '../../entities/Category'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Video from '../../entities/Video'

const Player = dynamic(() => import('../../components/Player'), {
  ssr: false
})

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Watch: NextPage<{
  episode: Episode[]
  episodes: Episode[]
  category: Category
}> = ({ episode: episodeInitial, episodes, category }) => {
  console.log(episodeInitial)
  console.log(category)

  if (!episodeInitial) {
    return <Error statusCode={404} />
  }

  const { data: episode } = useSWR<Episode[]>(`https://appanimeplus.tk/api-animesbr-10.php?episodios=${episodeInitial[0].video_id}`, fetcher)
  const theme = useContext(ThemeContext);

  return episode ? (
    <>
      <Head>
        <title>{episode[0]?.title}</title>
      </Head>
      <Container>
        <Player
          src={episode[0]?.locationhd || episode[0]?.locationsd || episode[0]?.location}
          title={category.category_name}
          subTitle={episode[0].title}
          titleMedia={category.category_name}
          extraInfoMedia={episode[0].title}
          playerLanguage="pt"
          backButton={() => { }}
          fullPlayer
          autoPlay
          startPosition={0}
          dataNext={{ title: 'Não existe um próximo vídeo.' }}
          onNextClick={() => { }}
          reprodutionList={episodes.map(ep => ({
            nome: ep.title,
            id: ep.video_id,
            playing: (ep.video_id === episode[0].video_id),
          })).reverse()}
          overlayEnabled
          autoControllCloseEnabled
          primaryColor={theme.fifthText}
          secundaryColor={theme.text}
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        />
      </Container>
    </>
  ) : <div />
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
    const { data } = await api.get(`/api-animesbr-10.php?episodios=${params?.videoId}`)
    if (!data)
      throw "Error array."
    const { data: episodes } = await api.get(`/api-animesbr-10.php?cat_id=${data[0].category_id}`)
    const { data: category } = await api.get(`/api-animesbr-10.php?info=${data[0].category_id}`)
    if (!category || !episodes)
      throw "Error array."

    return {
      props: {
        episode: data,
        category: category[0],
        episodes,
      },
      revalidate: 900000,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 900000,
    }
  }
}

export default Watch
