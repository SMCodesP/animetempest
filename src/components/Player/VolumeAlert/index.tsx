import { memo } from 'react'

import { usePlayer } from '../../../contexts/PlayerContext'

import {
  VolumeAlert as VolumeAlertComponent,
} from '../styles'

const VolumeAlert: React.FC<{
	isVolumeChanged: boolean
	primaryColor: string
}> = ({ isVolumeChanged, primaryColor }) => {
	const { volume } = usePlayer()

	return (
    <VolumeAlertComponent
      primaryColor={primaryColor}
      style={{
        opacity: isVolumeChanged ? 0.85 : 0,
        transform: isVolumeChanged ? 'scale(1)' : 'scale(0.35)'
      }}
    >
      <span>{volume}%</span>
    </VolumeAlertComponent>
	)
}

export default memo(VolumeAlert)