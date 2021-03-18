import Head from 'next/head'
import { NextPage, GetStaticProps } from 'next'
import Episode from '../../entities/Episode'
import Video from '../../entities/Video'
import api from '../../services/api'

import { Container, VideoComponent } from '../../shared/styles/watch'

const Watch: NextPage<{
  episode: Episode
}> = ({ episode }) => {
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
    paths: [
      ...releases.map((release) => ({
        params: {
          videoId: release.video_id,
        },
      })),
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: episodes } = await api.get<Episode[]>(
    `/api-animesbr-10.php?episodios=${params?.videoId}`
  )

  return {
    props: {
      episode: episodes[0],
    },
  }
}

export default Watch
