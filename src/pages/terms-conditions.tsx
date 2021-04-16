import Link from 'next/link'
import Head from 'next/head'

import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'

import { FaHome } from 'react-icons/fa'
import Wave from 'react-wavify'

import {
  Container,
  ContainerHeader,
  ContainerPage,
  HeaderWave,
  Menu,
} from '../shared/styles/search'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { ContainerText } from '../shared/styles/terms'
import Footer from '../components/Footer'

const TermsConditions: NextPage<{
  text: string
}> = ({ text }) => {
  const theme = useContext(ThemeContext)

  return (
    <>
      <Head>
        <title>Termos de Uso - AnimeTempest</title>
        <meta
          property="og:title"
          content="Termos de Uso - AnimeTempest"
          key="title"
        />
        <meta name="twitter:title" content="Termos de Uso - AnimeTempest" />
        <meta name="description" content={`Temos e condições da AnimeTempest.`} />
        <meta
          property="og:description"
          content={`Temos e condições da AnimeTempest.`}
        />
        <meta name="description" content={`Temos e condições da AnimeTempest.`} />
        <meta name="Description" content={`Temos e condições da AnimeTempest.`} />
        <meta
          name="twitter:description"
          content={`Temos e condições da AnimeTempest.`}
        />
      </Head>

      <div
        style={{
          minHeight: '100vh',
        }}
      >
        <Container>
          <ContainerHeader>
            <HeaderWave>
              <Wave
                fill="url(#gradient)"
                paused={false}
                options={{
                  amplitude: 50,
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor={theme.secundaryBackground} />
                    <stop offset="90%" stopColor={theme.secundary} />
                  </linearGradient>
                </defs>
              </Wave>
            </HeaderWave>
            <ContainerPage>
              <Menu>
                <Link href="/">
                  <a>
                    <FaHome color={theme.text} size={36} />
                  </a>
                </Link>
              </Menu>
              <ContainerText
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              />
            </ContainerPage>
          </ContainerHeader>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/terms.txt`)
    return {
      props: {
        text: data,
        revalidate: 3600
      },
    }
  } catch (error) {
    return {
      props: {
        text: '',
        revalidate: 3600
      }
    }
  }
}

export default TermsConditions
