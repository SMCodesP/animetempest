import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import themes from '@/shared/themes';

import { GlobalStyle } from '@/shared/styles/global';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={themes[`light`]}>
        <Component {...pageProps} />

        <GlobalStyle />
      </ThemeProvider>
    </SessionProvider>
  );
}
