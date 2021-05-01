import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Video from '../entities/Video'

import api from '../services/api'

import { Container } from '../shared/styles/home'
import AnimeHeader from '../components/AnimeHeader'
import Category from '../entities/Category'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

const AnimeResumeList = dynamic(() => import('../components/AnimeResumeList'))
const EpisodeResumeList = dynamic(() => import('../components/EpisodeResumeList'))

const Home: NextPage<{
  animesLatest: Video[]
  animesPopular: Category[]
  animePopular: Category
}> = ({ animesLatest, animesPopular, animePopular }) => {
  const [animesWatching, setAnimesWatching] = useState<Video[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get<Video[]>('/api/progress')
        setAnimesWatching(data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Início - AnimeTempest</title>
        <meta property="og:title" content="Início - AnimeTempest" key="title" />
        <meta name="twitter:title" content="Início - AnimeTempest" />
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
            {animesLatest.length > 0 ? (
              <EpisodeResumeList episodes={animesLatest} />
            ) : (
              <h2
                style={{
                  margin: '-5px 25px',
                }}
              >Nenhum anime em lançamento encontrado</h2>
            )}
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
            {animesPopular.length > 0 ? (
              <AnimeResumeList animes={animesPopular} />
            ) : (
              <h2
                style={{
                  margin: '-5px 25px',
                }}
              >Nenhum anime popular encontrado</h2>
            )}
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

  animesLatest = animesLatest.filter(anime => anime.category_id !== "2" && anime.category_id !== "33440")
  animesPopular = animesPopular.filter(anime => !anime.category_name.toLowerCase().includes('animetv'))
  animesPopular = animesPopular.filter(anime => !anime.category_name.toLowerCase().includes('animetv'))

  return {
    props: {
      animesLatest,
      animesPopular,
      animePopular: animesPopular[Math.floor(Math.random() * animesPopular.length)]
    },
    revalidate: 60,
  }
}

export default Home
