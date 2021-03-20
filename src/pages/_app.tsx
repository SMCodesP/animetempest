import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '../shared/styles/global'

import themes from '../shared/themes'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="viewport-fit=cover" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/images/icons/icon.jpg" />
      <meta name="googlebot" content="all" />
      <meta name="author" content="Samuel Pereira da Silva" />
      <meta
        name="keywords"
        content="Animes, mangas"
      />
      <meta name="copyright" content="© 2020 Samuel Pereira da Silva" />
      <link rel="canonical" href="https://anime.smcodes.tk" />
      <meta name="robots" content="index" />
      <meta name="og:site_name" content="OtakuCity" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/icons/icon.jpg" />
      <meta name="theme-color" content="#282a36" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="#282a36"
      />
      <meta name="msapplication-navbutton-color" content="#282a36" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="OtakuCity" />
      <meta name="apple-mobile-web-app-title" content="OtakuCity" />
      <meta name="msapplication-starturl" content="/" />
    </Head>

    <ThemeProvider theme={themes['dark']}>
      <Component {...pageProps} />

      <GlobalStyle />
    </ThemeProvider>
  </>
)

export default MyApp
