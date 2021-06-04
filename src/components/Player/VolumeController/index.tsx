import React, { memo } from 'react'
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
  const { volume, setVolume } = usePlayer()

  const handleVolume: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newVolume = Number((Number(e.target.value) / 100).toFixed(2))
    setVolume(Math.floor(newVolume * 100))
    videoComponent.current!.volume = newVolume
  }

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
            step={1}
            value={volume}
            onChange={handleVolume}
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

export default memo(VolumeController)
