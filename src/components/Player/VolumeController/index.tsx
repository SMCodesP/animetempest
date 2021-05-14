import React from 'react'
import {
  ImVolumeMute2,
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
} from 'react-icons/im'

import { usePlayer } from '../../../contexts/PlayerContext'

import { Container } from './styles'

interface VolumeControllerProps {
  primaryColor: string
  videoComponent: React.RefObject<HTMLVideoElement>
  className: string
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>
  isMuted: boolean
}

const VolumeController: React.FC<VolumeControllerProps> = ({
  primaryColor,
  videoComponent,
  setIsMuted,
  isMuted,
  ...props
}) => {
  const { volume } = usePlayer()

  const handleVolume: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    (videoComponent.current!.volume = Number(e.target.value) / 100)

  const IconVolume = isMuted
    ? ImVolumeMute2
    : volume >= 66
    ? ImVolumeHigh
    : volume >= 33
    ? ImVolumeMedium
    : volume > 0
    ? ImVolumeLow
    : ImVolumeMute

  return (
    <Container primaryColor={primaryColor} percentVolume={volume} {...props}>
      <div className="volumn-control">
        <div className="box-connector" />
        <div className="box">
          <input
            type="range"
            min={0}
            className="volumn-input"
            max={100}
            value={volume}
            onChange={handleVolume}
            title=""
          />
        </div>
      </div>

      <IconVolume
        size={28}
        onClick={() => setIsMuted((oldState) => !oldState)}
      />
    </Container>
  )
}

export default VolumeController
