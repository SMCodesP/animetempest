import Head from 'next/head'
import Link from 'next/link'
import { providers as getProviders, signIn } from 'next-auth/client'
import { NextPage, GetServerSideProps } from 'next'
import { AppProvider } from 'next-auth/providers'
import {
  Container,
  ContainerHeader,
  HeaderWave,
  ContainerPage,
  Menu,
} from '../../shared/styles/search'
import Wave from 'react-wavify'
import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { ThemeContext } from 'styled-components'

import Footer from '../../components/Footer'
import { ContainerProvider } from '../../shared/styles/signin'

const SignIn: NextPage<{
  providers: Record<string, AppProvider> | null
  callbackUrl: string | null
}> = ({ providers, callbackUrl }) => {
  const theme = useContext(ThemeContext)

  return (
    <>
      <Head>
        <title>Acessar - OtakuTube</title>
        <meta property="og:title" content="Acessar - OtakuTube" key="title" />
        <meta name="twitter:title" content="Acessar - OtakuTube" />
        <meta
          name="description"
          content={`Acesse nossa plataforma usando sua conta liberando novos recursos.`}
        />
        <meta
          property="og:description"
          content={`Acesse nossa plataforma usando sua conta liberando novos recursos.`}
        />
        <meta
          name="description"
          content={`Acesse nossa plataforma usando sua conta liberando novos recursos.`}
        />
        <meta
          name="Description"
          content={`Acesse nossa plataforma usando sua conta liberando novos recursos.`}
        />
        <meta
          name="twitter:description"
          content={`Acesse nossa plataforma usando sua conta liberando novos recursos.`}
        />
      </Head>
      <div
        style={{
          position: 'relative',
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
              <h1>Inicie sua sessão</h1>
              <ContainerProvider>
                {Object.values(providers as any).map((provider: any) => (
                  <div key={provider.name}>
                    <button
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: callbackUrl || undefined,
                        })
                      }
                    >
                      Entrar com {provider.name}
                    </button>
                  </div>
                ))}
              </ContainerProvider>
            </ContainerPage>
          </ContainerHeader>
        </Container>
        <div
          style={{
            bottom: 0,
            position: 'absolute',
            width: '100%',
          }}
        >
          <Footer />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      callbackUrl: ctx.query.callbackUrl,
      providers: await (getProviders as any)(ctx),
    },
  }
}

export default SignIn
