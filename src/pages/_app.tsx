import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import themes from '@/shared/themes';

import { GlobalStyle } from '@/shared/styles/global';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themes.light}>
      <Component {...pageProps} />

      <GlobalStyle />
    </ThemeProvider>
  );
}
