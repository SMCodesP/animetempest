import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import Link from 'next/link';

import { FiSearch, FiBell, FiChevronRight } from 'react-icons/fi';
import {
  IoMailOutline,
  IoInvertModeSharp,
  IoInvertModeOutline,
} from 'react-icons/io5';

import { useTheme } from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/react';

import {
  Container,
  ContainerGroup,
  Page,
  ListPage,
  Logo,
  ListOption,
  Option,
  User,
  PopperContainer,
  UserMenu,
  UserOption,
  Line,
  ArrowOption,
  ContainerMenuAnimation,
  ContainerMenuNoHidden,
} from './styles';

const Menu: React.FC<{
  page: string;
  darkground?: boolean;
  disableLogin?: boolean;
}> = ({ page, darkground = false, disableLogin = false }) => {
  const [menuPoppperIsActived, setMenuPoppperIsActived] = useState(false);

  const theme = useTheme();
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const [arrowRef, setArrowRef] = useState(null);
  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: `arrow`,
          options: {
            element: arrowRef,
          },
        },
        {
          name: `offset`,
          options: {
            offset: [0, 10],
          },
        },
      ],
    },
  );
  const { data: session, status } = useSession();

  return (
    <Container>
      <ContainerGroup>
        <Link href="/">
          <a>
            <Logo src="/favicon.png" alt="Vercel Logo" width={92} height={92} />
          </a>
        </Link>
      </ContainerGroup>
      <ContainerGroup>
        <ListPage>
          <Link href="/">
            <a>
              <Page
                darkground={darkground.toString()}
                className={page === `home` ? `location` : ``}
              >
                Início
              </Page>
            </a>
          </Link>
          <Link href="/popular">
            <a>
              <Page
                darkground={darkground.toString()}
                className={page === `popular` ? `location` : ``}
              >
                Popular
              </Page>
            </a>
          </Link>
          <Link href="/news">
            <a>
              <Page
                darkground={darkground.toString()}
                className={page === `news` ? `location` : ``}
              >
                Notícias
              </Page>
            </a>
          </Link>
          <Link href="/discord">
            <a>
              <Page
                darkground={darkground.toString()}
                className={page === `discord` ? `location` : ``}
              >
                Discord
              </Page>
            </a>
          </Link>
        </ListPage>
      </ContainerGroup>
      <ContainerGroup>
        <ListOption>
          <Option>
            <FiSearch size={24} color={theme.text} />
          </Option>
          <Option>
            <FiBell size={24} color={theme.text} />
          </Option>
          <Option>
            <IoMailOutline size={24} color={theme.text} />
          </Option>
          <Option>
            {theme.name === `dark` ? (
              <IoInvertModeSharp size={24} color={theme.text} />
            ) : (
              <IoInvertModeOutline size={24} color={theme.text} />
            )}
          </Option>
          {!disableLogin &&
            (status === `authenticated` ? (
              <Option
                ref={buttonRef}
                onClick={() => setMenuPoppperIsActived((state) => !state)}
                menupoppperisactived={menuPoppperIsActived.toString()}
              >
                <div style={{ borderRadius: 32, overflow: `hidden` }}>
                  {session.user?.image ? (
                    <User
                      src={String(session.user?.image)}
                      alt="Imagem de perfil"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <User
                      src={`/user.jpg`}
                      alt="Imagem de perfil"
                      width={32}
                      height={32}
                    />
                  )}
                </div>
                <p>{session.user?.name}</p>
                <ArrowOption
                  menupoppperisactived={menuPoppperIsActived.toString()}
                  size={24}
                  color={theme.text}
                />
              </Option>
            ) : (
              <Option onClick={() => signIn()}>
                <p>Entrar</p>
                <FiChevronRight size={24} color={theme.text} />
              </Option>
            ))}
          <PopperContainer
            ref={popperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <ContainerMenuNoHidden
              menupoppperisactived={menuPoppperIsActived.toString()}
            >
              <div
                ref={setArrowRef as any}
                style={styles.arrow}
                className="arrow"
              />
              <ContainerMenuAnimation
                menupoppperisactived={menuPoppperIsActived.toString()}
              >
                <UserMenu>
                  <UserOption>Seu perfil</UserOption>
                  <Line />
                  <UserOption>Favoritos</UserOption>
                  <UserOption>Recomendados</UserOption>
                  <UserOption>Configurações</UserOption>
                  <Line />
                  <UserOption onClick={() => signOut()} color={theme.red}>
                    Sair
                  </UserOption>
                </UserMenu>
              </ContainerMenuAnimation>
            </ContainerMenuNoHidden>
          </PopperContainer>
        </ListOption>
      </ContainerGroup>
    </Container>
  );
};

export default Menu;
