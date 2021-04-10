import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'next-auth/client'

import { GlobalStyle } from '../shared/styles/global'

import themes from '../shared/themes'
import { ProfileProvider } from '../contexts/ProfileContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="viewport-fit=cover" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
      />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css?family=Passion%20One&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Passion%20One&display=swap"
        rel="stylesheet"
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/images/icons/icon.png" />
      <meta name="googlebot" content="all" />
      <meta name="author" content="Samuel Pereira da Silva" />
      <meta name="keywords" content="Animes, mangas" />
      <meta name="copyright" content="© 2020 Samuel Pereira da Silva" />
      <meta name="robots" content="index" />
      <meta name="og:site_name" content="OtakuTube" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/images/icons/icon.png" />
      <meta name="theme-color" content="#282a36" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#282a36" />
      <meta name="msapplication-navbutton-color" content="#282a36" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="OtakuTube" />
      <meta name="apple-mobile-web-app-title" content="OtakuTube" />
      <meta name="msapplication-starturl" content="/" />
      <link rel="canonical" href="https://otakutube.tk" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://otakutube.tk" />
      <meta name="twitter:image" content="/images/icons/icon.png" />
      <meta property="og:url" content="https://otakutube.tk" />
      <meta property="og:image" content="/images/icons/icon.png" />
      <script async src="https://arc.io/widget.min.js#APQSzg74"></script>
    </Head>

    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ThemeProvider theme={themes['dark']}>
        <ProfileProvider>
          <Component {...pageProps} />
        </ProfileProvider>

        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  </>
)

export default MyApp
