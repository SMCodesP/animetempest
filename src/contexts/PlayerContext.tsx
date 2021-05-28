import { useSession } from 'next-auth/client'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import Progress from '../entities/Progress'
import useSocket from '../hooks/useSocket'

type PlayerType = {
  volume: number
  fullscreen: boolean
  playing: boolean
  primaryColor: string
  secundaryColor: string
  progress: number
  volumeIndicator: number
  videoId?: string
  onTimeUpdate: (time: number) => void
  volumeChange: {
    set: (newVolume: number) => void
    addOrRemove: (newVolume: number) => void
  }
  setProgress: Dispatch<SetStateAction<number>>
  setVolume: Dispatch<SetStateAction<number>>
  play: {
    toggle: () => void
    set: (state: boolean) => void
  }
}

const PlayerContext = createContext<PlayerType>({} as PlayerType)

const PlayerProvider: React.FC<{
  primaryColor: string
  secundaryColor: string
  videoId?: string
  animeId?: string
}> = ({
  children,
  primaryColor = '#03dffc',
  secundaryColor = '#ffffff',
  videoId,
  animeId,
}) => {
  const [session]: any = useSession()
  const socket = useSocket('http://localhost:3333', session, [
    session,
    videoId,
  ])

  const [volume, setVolume] = useState(100)
  const [fullscreen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration] = useState(0)

  const [volumeIndicator] = useDebounce(volume, 5000)

  const volumeChange: PlayerType['volumeChange'] = {
    set: (newVolume) => setVolume(newVolume),
    addOrRemove: (newVolume) => {
      setVolume((oldState) => {
        return Math.min(Math.max(oldState + newVolume, 0), 100)
      })
    },
  }

  const saveVideoProgress = (progress: number) => {
    const history = localStorage.getItem('history')
    let historyParsed: {
      video_id: string
      progress: number
    }[] = JSON.parse(history || '[]')
    localStorage.setItem(
      'history',
      JSON.stringify([
        ...historyParsed.filter((el) => el.video_id !== videoId),
        {
          video_id: videoId,
          progress,
        },
      ])
    )
  }

  const saveOnlineProgress = useDebouncedCallback(
    (value: number) => {
      socket?.emit('progress', {
        userId: session?.userId,
        videoId,
        animeId,
        progress: value,
        completed: duration - value < 180,
      } as Progress)
    },
    5000,
    { maxWait: 5000 }
  )

  const onTimeUpdate: PlayerType['onTimeUpdate'] = useDebouncedCallback(
    (time) => {
      setProgress(Math.trunc(time))
      if (playing) {
        saveVideoProgress(Math.trunc(time))
        if (session) {
          saveOnlineProgress(Math.trunc(time))
        }
      }
    },
    1000,
    { maxWait: 1000 }
  )

  const play = {
    toggle: () => {
      setPlaying((state) => !state)
    },
    set: (state: boolean) => {
      setPlaying(state)
    },
  }

  return (
    <PlayerContext.Provider
      value={{
        setVolume,
        volumeIndicator,
        videoId,
        progress,
        onTimeUpdate,
        playing,
        volume,
        volumeChange,
        fullscreen,
        primaryColor,
        secundaryColor,
        play,
        setProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

function usePlayer(): PlayerType {
  const context = useContext(PlayerContext)

  return context
}

export { usePlayer, PlayerProvider }

export default PlayerContext
