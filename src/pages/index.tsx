import { NextPage } from 'next'

import AnimeResumeList from '../components/AnimeResumeList'
import Video from '../entities/Video'

import api from '../services/api'

import { Container } from '../shared/styles/home'
import AnimeHeader from '../components/AnimeHeader'
import Category from '../entities/Category'
import Footer from '../components/Footer'
import EpisodeResumeList from '../components/EpisodeResumeList'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Progress from '../entities/Progress'
import axios from 'axios'

const Home: NextPage<{
  animesLatest: Video[]
  animesPopular: Category[]
  allAnimes: Category[]
  animePopular: Category
}> = ({ allAnimes, animesLatest, animesPopular, animePopular }) => {
  const [animesWatching, setAnimesWatching] = useState<Video[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get<Progress[]>('/api/progress')
        setAnimesWatching(
          Object.values(
            data
              .map((progress) => ({
                video_id: progress.videoId,
                category_id: progress.animeId,
                title: allAnimes.find((anime) => anime.id === progress.animeId)?.category_name,
                category_image: allAnimes.find((anime) => anime.id === progress.animeId)
                  ?.category_image,
                updatedAt: progress.updatedAt,
              }))
              .reduce((r: any, o) => {
                r[o.category_id] =
                  r[o.category_id] &&
                  r[o.category_id].updatedAt._seconds > (o.updatedAt as any)._seconds
                    ? r[o.category_id]
                    : o
                return r
              }, {})
          ).sort((a: any, b: any) => b.updatedAt._seconds - a.updatedAt._seconds) as Video[]
        )
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Início - OtakuTube</title>
        <meta property="og:title" content="Início - OtakuTube" key="title" />
        <meta name="twitter:title" content="Início - OtakuTube" />
        <meta
          name="description"
          content={`Venha aproveitar nosso serviço para assistir os melhores animes em HD e SD gratuitamente, legendados ou dublados.`}
        />
        <meta
          property="og:description"
          content={`Venha aproveitar nosso serviço para assistir os melhores animes em HD e SD gratuitamente, legendados ou dublados.`}
        />
        <meta
          name="description"
          content={`Venha aproveitar nosso serviço para assistir os melhores animes em HD e SD gratuitamente, legendados ou dublados.`}
        />
        <meta
          name="Description"
          content={`Venha aproveitar nosso serviço para assistir os melhores animes em HD e SD gratuitamente, legendados ou dublados.`}
        />
        <meta
          name="twitter:description"
          content={`Venha aproveitar nosso serviço para assistir os melhores animes em HD e SD gratuitamente, legendados ou dublados.`}
        />
      </Head>
      <div
        style={{
          minHeight: '100vh',
        }}
      >
        <AnimeHeader anime={animePopular} />
        <Container>
          {animesWatching.length > 0 && (
            <div>
              <h1
                style={{
                  margin: '10px 15px',
                }}
              >
                Continuar assistindo
              </h1>
              <EpisodeResumeList episodes={animesWatching} />
            </div>
          )}
          <div>
            <h1
              style={{
                margin: '10px 15px',
              }}
            >
              Lançamentos
            </h1>
            <EpisodeResumeList episodes={animesLatest} />
          </div>
          <div
            style={{
              padding: 20,
            }}
          >
            <h1
              style={{
                margin: '10px 15px',
              }}
            >
              Populares
            </h1>
            <AnimeResumeList animes={animesPopular} />
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  let { data: animesLatest } = await api.get<Video[]>('/api-animesbr-10.php?latest')
  let { data: animesPopular } = await api.get<Category[]>('/api-animesbr-10.php?populares')
  let { data: allAnimes } = await api.get<Category[]>('/api-animesbr-10.php')

  animesLatest = animesLatest.filter(anime => anime.category_id !== "2" && anime.category_id !== "33440")
  animesPopular = animesPopular.filter(anime => !anime.category_name.toLowerCase().includes('animetv'))
  allAnimes = allAnimes.filter(anime => !anime.category_name.toLowerCase().includes('animetv'))
  animesPopular = animesPopular.filter(anime => !anime.category_name.toLowerCase().includes('animetv'))

  return {
    props: {
      animesLatest,
      animesPopular,
      allAnimes,
      animePopular: animesPopular[Math.floor(Math.random() * animesPopular.length)]
    },
    revalidate: 300,
  }
}

export default Home
