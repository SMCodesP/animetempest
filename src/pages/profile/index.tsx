import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
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
  BodyProfile,
  ListFavorites,
  ItemFavorite,
} from '../../shared/styles/profile'
import { useProfile } from '../../contexts/ProfileContext'

const Profile: NextPage = () => {
  const theme = useContext(ThemeContext)
  const [session, loading] = useSession()
  const { favorites } = useProfile()

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
                      <b>Favoritos »</b> {favorites.length}
                    </>
                  )}
                </Description>
                <Description>
                  {loading ? (
                    <Skeleton width={112} />
                  ) : (
                    <>
                      <b>Completos »</b> 0
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
            <BodyProfile>
              {favorites.length === 0 ? (
                <h1>Você não tem nenhum anime favorito em sua lista</h1>
              ) : (
                <h2>Favoritos</h2>
              )}
              <ListFavorites>
                {favorites.map((favorite) => (
                  <Link href={`/anime/${favorite.animeId}`} key={`favorite-${favorite.id}`}>
                    <a>
                      <ItemFavorite>
                        <img src={`https://cdn.appanimeplus.tk/img/${favorite.imageId}`} />
                      </ItemFavorite>
                    </a>
                  </Link>
                ))}
              </ListFavorites>
            </BodyProfile>
          </ProfileComponent>
          <div
            style={{
              marginTop: 'auto',
            }}
          >
            <Footer />
          </div>
        </Container>
      </SkeletonTheme>
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
