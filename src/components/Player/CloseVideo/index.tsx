import React from 'react'
import { FiX } from 'react-icons/fi'

import { VideoPreLoading } from './styles'

const CloseVideo: React.FC<{
  videoReady: boolean
  error: string
  title: string | null
  subTitle: string | null
  qualities: any[]
  onCrossClick: () => void
  onChangeQuality: (...args: any) => void
}> = ({
  videoReady,
  error,
  qualities,
  onCrossClick,
  title,
  subTitle,
  onChangeQuality,
}) => {
  return (
    <VideoPreLoading
      backgroundColorHoverButtonError="#f78b28"
      colorHoverButtonError="#ddd"
      colorButtonError="#ddd"
      backgroundColorButtonError="#333"
      colorTitle="#fff"
      colorSubTitle="#fff"
      colorIcon="#fff"
      show={videoReady === false || (videoReady === true && error.length > 0)}
      showError={error.length > 0}
    >
      {(title || subTitle) && (
        <header>
          <div>
            <h1>{title}</h1>
            <h2>
              {subTitle?.replace(new RegExp(title || '', 'ig'), '').trim()}
            </h2>
          </div>
          <FiX onClick={onCrossClick} />
        </header>
      )}

      <section>
        {error && (
          <div>
            <h1>{error}</h1>
            {qualities.length > 1 && (
              <div>
                <p>Tente acessar por outra qualidade</p>
                <div className="links-error">
                  {qualities.map((item, index) => (
                    <div
                      key={`quality-error-${index}`}
                      onClick={() => onChangeQuality(item.id)}
                    >
                      {item.prefix && <span>HD</span>}
                      <span>{item.nome}</span>
                      {item.playing && <FiX />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </VideoPreLoading>
  )
}

export default CloseVideo
