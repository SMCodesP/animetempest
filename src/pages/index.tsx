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

const Home: NextPage<{
  animesLatest: Video[]
  animesPopular: Category[]
}> = ({ animesLatest, animesPopular }) => {
  const [animePopular, setAnimePopular] = useState<Category | null>(null)

  useEffect(() => {
    setAnimePopular(animesPopular[Math.floor(Math.random() * animesPopular.length)])
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
  const { data: animesLatest } = await api.get<Video[]>('/api-animesbr-10.php?latest')
  const { data: animesPopular } = await api.get<Category[]>('/api-animesbr-10.php?populares')

  return {
    props: {
      animesLatest,
      animesPopular,
    },
    revalidate: 300,
  }
}

export default Home
