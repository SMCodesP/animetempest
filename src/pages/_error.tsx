import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import {createGlobalStyle, useTheme} from 'styled-components'
import ContainerParticles from '../components/ContainerParticles'

import {
	Container,
	TextError,
	BackToHome,
} from '../shared/styles/404'

const CustomStyles = createGlobalStyle`
	body, html {
		overflow: hidden;
		font-family: 'Roboto', sans-serif !important;
    background: ${({theme}) => theme.background};
	}
`

const ErrorPage: NextPage = ({ statusCode }: any) => {
	const theme = useTheme()

	return (
		<>
			<Head>
				<meta name="theme-color" content={theme.background} />
				<meta name="apple-mobile-web-app-status-bar-style" content={theme.background} />
				<meta name="msapplication-navbutton-color" content={theme.background} />
        <title>Erro {statusCode} - Houve um erro</title>
			</Head>

			<Container>
				<TextError data-text={`Error ${statusCode}`}>Error {statusCode}</TextError>
				<h1>Houve um erro</h1>
				<Link href="/">
          <a style={{
					  margin: '25px 0',
				  }}>
            <BackToHome>Go to home</BackToHome>
          </a>
        </Link>
			</Container>
      <ContainerParticles />

			<CustomStyles />
		</>
	)
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
