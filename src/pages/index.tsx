import { NextPage } from 'next'
import AnimeResumeList from '../components/AnimeResumeList'
import Video from '../entities/Video'

import api from '../services/api'

import { Container } from '../shared/styles/home'

const Home: NextPage<{
  animesLatest: Video[]
}> = ({ animesLatest }) => {
  return (
    <Container>
      <h1>Lançamentos</h1>
      <AnimeResumeList animes={animesLatest} />
    </Container>
  )
}

export async function getStaticProps() {
  const { data: animesLatest } = await api.get<Video[]>('/api-animesbr-10.php?latest')

  return {
    props: {
      animesLatest,
    },
    revalidate: 900000,
  }
}

export default Home
