import { NextPage } from 'next'
import AnimeResumeList from '../components/AnimeResumeList'
import Video from '../entities/Video'

import api from '../services/api'

import { Container } from '../shared/styles/home'
import AnimeHeader from '../components/AnimeHeader'
import Category from '../entities/Category'

const Home: NextPage<{
  animesLatest: Video[]
  animesPopular: Category[]
}> = ({ animesLatest, animesPopular }) => {
  return (
    <>
      <AnimeHeader anime={animesPopular[0]} />
      <Container>
        <h1>Lançamentos</h1>
        <AnimeResumeList animes={animesLatest} />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const { data: animesLatest } = await api.get<Video[]>('/api-animesbr-10.php?latest')
  const { data: animesPopular } = await api.get<Category[]>('/api-animesbr-10.php?populares')

  return {
    props: {
      animesLatest,
      animesPopular
    },
    revalidate: 900000,
  }
}

export default Home
