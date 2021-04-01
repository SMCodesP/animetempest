import React from 'react'

import { StandyByInfo } from './styles'

const InfoVideo: React.FC<{
  primaryColor: string
  secundaryColor: string
  playing: boolean
  videoReady: boolean
  showInfo: boolean
  title: string | null
  subTitle: string | null
}> = ({
  primaryColor,
  secundaryColor,
  videoReady,
  showInfo,
  title,
  subTitle,
}) => {
  return (
    <StandyByInfo
      primaryColor={primaryColor}
      secundaryColor={secundaryColor}
      show={showInfo && videoReady}
    >
      {(title || subTitle) && (
        <section className="center">
          <h3 className="text">Você está assistindo</h3>
          <h1 className="title">{title}</h1>
          <h2 className="sub-title">
            {subTitle?.replace(new RegExp(title || '', 'ig'), '').trim()}
          </h2>
        </section>
      )}
      <footer>Pausado</footer>
    </StandyByInfo>
  )
}

export default InfoVideo
