import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import {
  IoMailOutline,
  IoInvertModeSharp,
  IoInvertModeOutline,
} from 'react-icons/io5';

import { useTheme } from 'styled-components';

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

const Menu: React.FC = () => {
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

  return (
    <Container>
      <ContainerGroup>
        <Logo src="/vercel.svg" alt="Vercel Logo" width={112} height={46} />
      </ContainerGroup>
      <ContainerGroup>
        <ListPage>
          <Page className="location">Início</Page>
          <Page>Popular</Page>
          <Page>Notícias</Page>
          <Page>Discord</Page>
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
          <Option
            ref={buttonRef}
            onClick={() => setMenuPoppperIsActived((state) => !state)}
            menuPoppperIsActived={menuPoppperIsActived}
          >
            <div style={{ borderRadius: 32, overflow: `hidden` }}>
              <User
                src="https://smcodes.tk/favicon.jpg"
                alt="Imagem de perfil"
                placeholder="blur"
                blurDataURL="https://smcodes.tk/favicon_min.jpg"
                width={32}
                height={32}
              />
            </div>
            <p>SMCodes</p>
            <ArrowOption
              menuPoppperIsActived={menuPoppperIsActived}
              size={24}
              color={theme.text}
            />
          </Option>
          <PopperContainer
            ref={popperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <ContainerMenuNoHidden menuPoppperIsActived={menuPoppperIsActived}>
              <div
                ref={setArrowRef as any}
                style={styles.arrow}
                className="arrow"
              />
              <ContainerMenuAnimation
                menuPoppperIsActived={menuPoppperIsActived}
              >
                <UserMenu>
                  <UserOption>Seu perfil</UserOption>
                  <Line />
                  <UserOption>Favoritos</UserOption>
                  <UserOption>Recomendados</UserOption>
                  <UserOption>Configurações</UserOption>
                  <Line />
                  <UserOption color={theme.red}>Sair</UserOption>
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
