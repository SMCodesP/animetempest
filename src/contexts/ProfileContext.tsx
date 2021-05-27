import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import axios from 'axios'
import type { IAnime } from '../entities/IModels'

type ProfileType = {
  favorites: IAnime[]
  toggleFavorite(animeId: string | number): void
  isFavorite(animeId: string | number): boolean
}

const ProfileContext = createContext<ProfileType>({} as ProfileType)

const ProfileProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<IAnime[]>([])
  const [session, loading] = useSession()

  useEffect(() => {
    if (session && !loading) {
      ;(async () => {
        try {
          const { data } = await axios.get('/api/favorites')
          setFavorites(data)
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [session, loading])

  const isFavorite: ProfileType['isFavorite'] = useCallback(
    (animeId: string | number) => {
      return favorites.find((favorite) => favorite.animeId === animeId) !== undefined
    },
    [favorites]
  )

  const toggleFavorite: ProfileType['toggleFavorite'] = useCallback(
    async (animeId: string | number) => {
      const favorite = favorites.find((favorite) => favorite.animeId === animeId) === undefined
      const { data } = await axios.post<IAnime>('/api/favorites', {
        animeId,
        favorite,
      })

      if (favorite) {
        setFavorites([...favorites, data])
      } else {
        setFavorites(favorites.filter((favorite) => favorite.animeId !== animeId))
      }
    },
    [favorites]
  )

  return (
    <ProfileContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

function useProfile(): ProfileType {
  const context = useContext(ProfileContext)

  return context
}

export { useProfile, ProfileProvider }

export default ProfileContext
