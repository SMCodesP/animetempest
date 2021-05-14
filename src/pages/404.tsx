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

export default function Error404() {
	const theme = useTheme()

	return (
		<>
			<Head>
				<meta name="theme-color" content={theme.background} />
				<meta name="apple-mobile-web-app-status-bar-style" content={theme.background} />
				<meta name="msapplication-navbutton-color" content={theme.background} />
        <title>Erro 404 - Página não encontrada</title>
			</Head>

			<Container>
				<TextError data-text="Error 404">Error 404</TextError>
				<h1>Página não encontrada</h1>
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