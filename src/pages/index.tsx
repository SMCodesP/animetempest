import { NextPage } from 'next'

import AnimeResumeList from '../components/AnimeResumeList'
import Video from '../entities/Video'

import api from '../services/api'

import { Container } from '../shared/styles/home'
import AnimeHeader from '../components/AnimeHeader'
import Category from '../entities/Category'
import Episode from '../entities/Episode'

const Home: NextPage<{
  animesLatest: Video[]
  animesPopular: Category[]
  episodesMostPopular: Episode[]
}> = ({ animesLatest, animesPopular, episodesMostPopular }) => {
  return (
    <>
      <AnimeHeader anime={animesPopular[0]} episodesMostPopular={episodesMostPopular} />
      <Container>
        <h1
          style={{
            margin: '10px 15px',
          }}
        >
          Lançamentos
        </h1>
        <AnimeResumeList animes={animesLatest} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { data: animesLatest } = await api.get<Video[]>('/api-animesbr-10.php?latest')
  const { data: animesPopular } = await api.get<Category[]>('/api-animesbr-10.php?populares')
  const episodesMostPopular = await api.getEpisodesFromAnime(animesPopular[0].id)

  return {
    props: {
      animesLatest,
      animesPopular,
      episodesMostPopular,
    },
    revalidate: 900000,
  }
}

export default Home
