import Link from 'next/link'
import { useContext, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/client'
import { ThemeContext } from 'styled-components'
import { User, ContainerUser, Menu, ItemMenu } from './styles'
import { FaUserAlt } from 'react-icons/fa'

import { useLayer, Arrow } from 'react-laag'
import { AnimatePresence } from 'framer-motion'

const UserMenu: React.FC = () => {
  const [session] = useSession()
  const theme = useContext(ThemeContext)

  const [isOpen, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: 'bottom-center', // we prefer to place the menu "top-end"
    triggerOffset: 16, // keep some distance to the trigger
    containerOffset: 20, // give the menu some room to breath relative to the container
    arrowOffset: 0, // let the arrow have some room to breath also
  })

  return session && session.user.image ? (
    <>
      <User src={session.user.image} {...triggerProps} onClick={() => setOpen((state) => !state)} />
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <Menu {...layerProps}>
              <span>{session.user.name}</span>
              <Link href="/profile">
                <a>
                  <ItemMenu>Meu perfil</ItemMenu>
                </a>
              </Link>
              <ItemMenu>Configurações</ItemMenu>
              <hr />
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                <ItemMenu color={theme.fifthText}>Sair</ItemMenu>
              </a>
              <Arrow
                {...arrowProps}
                backgroundColor={theme.background}
                borderColor={theme.secundaryBackground}
                borderWidth={2}
              />
            </Menu>
          )}
        </AnimatePresence>
      )}
    </>
  ) : (
    <ContainerUser
      href="/api/auth/signin"
      onClick={(e) => {
        e.preventDefault()
        signIn()
      }}
    >
      <FaUserAlt size={18} color={theme.text} />
    </ContainerUser>
  )
}

export default UserMenu
