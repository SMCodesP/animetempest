import Head from 'next/head'
import { NextPage, GetStaticProps } from 'next'
import axios from 'axios'

import Episode from '../../entities/Episode'
import Video from '../../entities/Video'
import api from '../../services/api'

import { Container, VideoComponent } from '../../shared/styles/watch'

const Watch: NextPage<{
  episode: Episode
}> = ({ episode }) => {
  console.log(episode)

  return (
    <>
      <Head>
        <title>{episode?.title}</title>
      </Head>
      <Container>
        <VideoComponent
          src={episode?.locationhd || episode?.locationsd || episode?.location}
          controls
        />
      </Container>
    </>
  )
}

export const getStaticPaths = async () => {
  const { data: releases } = await api.get<Video[]>('/api-animesbr-10.php?latest')

  console.log([
    ...releases.map((release) => ({
      params: {
        videoId: release.video_id,
      },
    })),
  ])

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
    const { data } = await axios.get(
      `https://appanimeplus.tk/api-animesbr-10.php?episodios=${params?.videoId}`
    )
    console.log(data)

    return {
      props: {
        episode: data[0],
      },
      revalidate: 900000,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 120,
    }
  }
}

export default Watch
