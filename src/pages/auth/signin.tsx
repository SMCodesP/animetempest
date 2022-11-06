import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import { NextSeo } from 'next-seo';

import Menu from '@/components/Menu';
import {
  ContainerLogin,
  ContainerPageLogin,
  ListOptionsLogin,
  Logo,
  OptionLogin,
  SubTitleLogin,
  TitleLogin,
} from '@/shared/styles/pages/signin';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { SiAuth0 } from 'react-icons/si';
import { BuiltInProviderType } from 'next-auth/providers';
import { useTheme } from 'styled-components';

export default function SignIn({
  providers,
  callbackUrl,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  callbackUrl: string;
}) {
  const theme = useTheme();

  const colors: {
    [name: string]: string;
  } = {
    discord: `#5865F2`,
    auth0: `#000000`,
    github: `#333333`,
  };

  return (
    <>
      <NextSeo
        title="Entrar - AnimeTempest"
        description="O melhor site para você descobrir um univeso de animes."
      />

      <ContainerPageLogin>
        <Menu page="home" disableLogin={true} />
        <ContainerLogin>
          <Logo src="/favicon.png" width={92} height={92} />
          <TitleLogin>Entre com</TitleLogin>
          <SubTitleLogin>
            Faça login para ter acesso a funcionalidades exclusivas.
          </SubTitleLogin>
          <ListOptionsLogin>
            {Object.values(providers).map((provider) => (
              <OptionLogin
                key={provider.name}
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: callbackUrl,
                  })
                }
                color={colors[provider.id] || theme.text}
              >
                {provider.id === `discord` ? (
                  <BsDiscord size={22} color={theme.background} />
                ) : provider.id === `auth0` ? (
                  <SiAuth0 size={22} color={theme.background} />
                ) : (
                  provider.id === `github` && (
                    <BsGithub size={22} color={theme.background} />
                  )
                )}
                {provider.name}
              </OptionLogin>
            ))}
          </ListOptionsLogin>
        </ContainerLogin>
      </ContainerPageLogin>
    </>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  const providers = await getProviders();
  return {
    props: {
      providers,
      callbackUrl: query.callbackUrl || String(process.env.NEXTAUTH_URL),
    },
  };
}
