import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { ThemeContext } from 'styled-components'
import { signOut, useSession } from 'next-auth/client'
import { FiLogOut } from 'react-icons/fi'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import Footer from '../../components/Footer'
import Category from '../../entities/Category'
import api from '../../services/api'

import {
  Container,
  Header,
  Profile as ProfileComponent,
  HeadProfile,
  Name,
  Description,
} from '../../shared/styles/profile'
import axios from 'axios'

const Profile: NextPage = () => {
  const theme = useContext(ThemeContext)
  const [session, loading] = useSession()

  useEffect(() => {
    ;(async () => {
      await axios.get('/api/favorites')
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Seu perfil - OtakuTube</title>
        <meta property="og:title" content="Seu perfil - OtakuTube" key="title" />
        <meta name="twitter:title" content="Seu perfil - OtakuTube" />
        <meta
          name="description"
          content={`Visualize seus animes favoritos e acompanhe de onde você parou de assistir.`}
        />
        <meta
          property="og:description"
          content={`Visualize seus animes favoritos e acompanhe de onde você parou de assistir.`}
        />
        <meta
          name="description"
          content={`Visualize seus animes favoritos e acompanhe de onde você parou de assistir.`}
        />
        <meta
          name="Description"
          content={`Visualize seus animes favoritos e acompanhe de onde você parou de assistir.`}
        />
        <meta
          name="twitter:description"
          content={`Visualize seus animes favoritos e acompanhe de onde você parou de assistir.`}
        />
      </Head>
      <SkeletonTheme color={theme.secundaryBackground} highlightColor={theme.background}>
        <Container>
          <Header>
            <Link href="/">
              <a>
                <FaHome color={theme.text} size={36} />
              </a>
            </Link>
          </Header>
          <ProfileComponent>
            <HeadProfile>
              {loading ? (
                <Skeleton width={92} height={92} circle={true} />
              ) : (
                <img src={String(session?.user.image || '')} alt="Seu avatar" />
              )}
              <div>
                <Name>{loading ? <Skeleton width={148} /> : session?.user.name}</Name>
                <Description>
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    <>
                      <b>Favoritos »</b> 5
                    </>
                  )}
                </Description>
                <Description>
                  {loading ? (
                    <Skeleton width={112} />
                  ) : (
                    <>
                      <b>Completos »</b> 10
                    </>
                  )}
                </Description>
              </div>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
                style={{
                  marginLeft: 'auto',
                  height: 'fit-content',
                }}
              >
                <FiLogOut size={30} color={theme.fifthText} />
              </a>
            </HeadProfile>
          </ProfileComponent>
        </Container>
      </SkeletonTheme>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const { data: animes } = await api.get<Category[]>('/api-animesbr-10.php')

  return {
    props: {
      animes,
    },
    revalidate: 300,
  }
}

export default Profile
