import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

export default function useSocket(url: string, session: any, dependencies: any[]) {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)

  useEffect(() => {
    if (session) {
      setSocket(io(url))
    }
    return () => {
      setSocket(oldState => {
        oldState?.disconnect()
        return null
      })
    }
  }, dependencies)

  return socket
}
