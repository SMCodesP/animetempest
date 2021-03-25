import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'next-auth/client'

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
      <meta name="og:site_name" content="OtakuTube" />
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
      <meta name="application-name" content="OtakuTube" />
      <meta name="apple-mobile-web-app-title" content="OtakuTube" />
      <meta name="msapplication-starturl" content="/" />
    </Head>

    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0
      }}
      session={pageProps.session}
    >
      <ThemeProvider theme={themes['dark']}>
        <Component {...pageProps} />

        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  </>
)

export default MyApp
