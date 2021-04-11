import Link from 'next/link'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react'

import { useDebouncedCallback } from 'use-debounce'
import { ThemeContext } from 'styled-components'

import {
  FaUndoAlt,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeOff,
  FaVolumeMute,
  FaArrowLeft,
  FaExpand,
  FaStepForward,
  FaCog,
  FaClone,
  FaCompress,
  FaRedoAlt,
  FaComment,
} from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'

import {
  Container,
  Controlls,
  VolumeControll,
  ItemPlaybackRate,
  IconPlayBackRate,
  ItemNext,
  ItemListReproduction,
  ItemListQuality,
  ContainerMain,
} from './styles'

import Loading from './Loading'
import InfoVideo from './InfoVideo'
import CloseVideo from './CloseVideo'
import Comments from './Comments'

import PlayerProps from '../../entities/PlayerProps'
import { usePlayer } from '../../contexts/PlayerContext'
import formatTime from '../../utils/formatTime'

const ReactNetflixPlayer: React.FC<PlayerProps> = ({
  title = null,
  subTitle = null,
  titleMedia = null,
  extraInfoMedia = null,
  fullPlayer = true,
  src = '',
  autoPlay = false,
  backButton = () => {},
  onCanPlay = () => {},
  onEnded = () => {},
  onErrorVideo = () => {},
  onNextClick = "",
  onClickItemListReproduction = () => {},
  onCrossClick = () => {},
  onChangeQuality = () => {},
  startPosition = 0,
  dataNext = {},
  reprodutionList = [],
  qualities = [],
  playbackRateEnable = true,
  overlayEnabled = true,
  autoControllCloseEnabled = true,
  fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  loading = false
}) => {
  const {
    volume,
    volumeChange,
    primaryColor,
    secundaryColor,
    videoId,
    onTimeUpdate,
    progress,
    playing,
    play,
    setProgress,
  } = usePlayer()

  const theme = useContext(ThemeContext)

  const videoComponent = useRef<HTMLVideoElement>(null)
  const playerElement = useRef(null)
  const listReproduction = useRef<HTMLDivElement>(null)

  const [videoReady, setVideoReady] = useState(false)
  const [duration, setDuration] = useState(0)
  const [end, setEnd] = useState(false)
  const [controlBackEnd, setControlBackEnd] = useState(false)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState('')
  const [showControls, setShowControls] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [playbackRate, setPlaybackRate] = useState<string | number>(1)

  const [showControlVolume, setShowControlVolume] = useState(false)
  const [showQuality, setShowQuality] = useState(false)
  const [showDataNext, setShowDataNext] = useState(false)
  const [showPlaybackRate, setShowPlaybackRate] = useState(false)
  const [showReproductionList, setShowReproductionList] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [, setTimeoutDebounce] = useState<any | null>(null)

  const progressChange = {
    set: useDebouncedCallback((newProgress: number) => {
      if (videoComponent.current) {
        play.set(false)
        const newTime = Math.min(Math.max(newProgress, 0), duration)
        setProgress(newTime)
        videoComponent.current.currentTime = newTime
        play.set(true)
      }
    }, 100, {
      maxWait: 100
    }),
    addOrRemove: useDebouncedCallback((newProgress: number) => {
      if (videoComponent.current) {
        play.set(false)
        const newTime = Math.min(Math.max(progress + newProgress, 0), duration)
        setProgress(newTime)
        videoComponent.current.currentTime = newTime
        play.set(true)
      }
    }, 100, {
      maxWait: 100
    }),
  }

  const playbackRateOptions = [
    '0.25',
    '0.5',
    '0.75',
    'Normal',
    '1.25',
    '1.5',
    '2',
  ]

  const onEndedFunction = () => {
    if (
      +startPosition === +videoComponent.current!.duration &&
      !controlBackEnd
    ) {
      setControlBackEnd(true)
      videoComponent.current!.currentTime =
        videoComponent.current!.duration - 30

      if (autoPlay) {
        videoComponent.current!.play()
      } else {
        // setPlaying(false)
      }
    } else {
      setEnd(true)

      if (onEnded) {
        onEnded()
      }
    }
  }

  const startVideo = async () => {
    setDuration(videoComponent.current!.duration)
    setVideoReady(true)

    play.set(true)
      // goToPosition(startPosition)

    if (onCanPlay) {
      onCanPlay()
    }
  }

  const erroVideo = () => {
    if (onErrorVideo) {
      onErrorVideo()
    }
    setError('Ocorreu um erro ao tentar reproduzir este vídeo')
  }

  const setMuttedAction = (value: boolean) => {
    setMuted(value)
    setShowControlVolume(false)
    videoComponent.current!.muted = value
  }
  
  const chooseFullScreen = useDebouncedCallback(
    () => {
      if (
        (document as any).webkitIsFullScreen ||
        (document as any).mozFullScreen ||
        (document as any).msFullscreenElement ||
        document.fullscreenElement
      ) {
        document.exitFullscreen()
        return
      }

      setShowInfo(true)

      if ((playerElement.current as any)!.requestFullscreen) {
        ;(playerElement.current as any)!.requestFullscreen()
      } else if ((playerElement.current as any)!.webkitRequestFullscreen) {
        ;(playerElement.current as any)!.webkitRequestFullscreen()
      } else if ((playerElement.current as any)!.mozRequestFullScreen) {
        ;(playerElement.current as any)!.mozRequestFullScreen()
      } else if ((playerElement.current as any)!.msRequestFullscreen) {
        ;(playerElement.current as any)!.msRequestFullscreen()
      }
    },
    500,
    {
      maxWait: 500,
    }
  )

  const controllScreenTimeOut = () => {
    if (!autoControllCloseEnabled) {
      setShowInfo(true)
      return
    }

    setShowControls(false)
    if (!playing) {
      setShowInfo(true)
    }
  }

  const hoverScreen = useCallback(() => {
    setShowControls(true)
    setShowInfo(false)

    setTimeoutDebounce((oldTimeout: any) => {
      if (oldTimeout !== null) {
        clearTimeout(oldTimeout)
      }
      return setTimeout(controllScreenTimeOut, 5000)
    })
  }, [])

  const controlKeyBoard: {
    [key: number]: () => void
  } = {
    76: () => progressChange.addOrRemove(10),
    39: () => progressChange.addOrRemove(5),
    74: () => progressChange.addOrRemove(-10),
    37: () => progressChange.addOrRemove(-5),
    75: () => play.toggle(),
    32: () => play.toggle(),
    70: () => chooseFullScreen(),
    38: () => volumeChange.addOrRemove(10),
    40: () => volumeChange.addOrRemove(-10),
  }

  const keyboardInteractionCallback = (e: any) => {
    if (controlKeyBoard[e.keyCode] && videoComponent.current) {
      hoverScreen()
      controlKeyBoard[e.keyCode]()
    }
  }

  const scrollToSelected = () => {
    const element = listReproduction.current
    const selected = element!.getElementsByClassName('selected')[0]
    const position = (selected as any).offsetTop
    const height = (selected as any).offsetHeight
    element!.scrollTop = position - height * 2
  }

  const onChangePlayBackRate = (speed: any) => {
    speed = speed === 'Normal' ? 1 : speed
    videoComponent.current!.playbackRate = speed
    setPlaybackRate(speed)
  }

  useEffect(() => {
    ;(async () => {
      try {
        playing ? await videoComponent.current?.play() : videoComponent.current?.pause()
      } catch (error) {
        play.toggle()
      }
    })()
  }, [playing])

  useEffect(() => {
    if (showReproductionList) {
      scrollToSelected()
    }
  }, [showReproductionList])

  useEffect(() => {
    if (src) {
      play.set(false)
      setVideoReady(false)
      setError('')
      setShowReproductionList(false)
      setShowDataNext(false)
    }
  }, [src])

  useEffect(() => {
    play.set(true)
    if (videoComponent && videoComponent.current) {
      videoComponent.current.currentTime = startPosition
    }
  }, [startPosition])

  useEffect(() => {
    setIsComment(false)
  }, [videoId])

  useEffect(() => {
    document.addEventListener(
      'fullscreenchange',
      () => {
        if (document.fullscreenElement) {
          setFullscreen(true)
        } else {
          setFullscreen(false)
        }
      },
      false
    )
  }, [])

  useEffect(() => {
    if (videoComponent.current) {
      videoComponent.current.volume = volume / 100
    }
  }, [volume, videoComponent])

  return (
    <>
      {isComment && (
        <Comments videoId={videoId} close={() => setIsComment(false)} />
      )}
      <Container
        onMouseMove={hoverScreen}
        ref={playerElement}
        fullPlayer={fullPlayer}
        hideVideo={!!error}
        fontFamily={fontFamily}
        onKeyDown={keyboardInteractionCallback}
        tabIndex={0}
      >
        {(!videoReady || loading) &&
          !error &&
          !end && <Loading color={primaryColor} />}

        {overlayEnabled && (
          <InfoVideo
            playing={playing}
            primaryColor={primaryColor}
            secundaryColor={secundaryColor}
            subTitle={subTitle}
            title={title}
            showInfo={showInfo}
            videoReady={videoReady}
          />
        )}

        <CloseVideo
          error={error}
          onChangeQuality={onChangeQuality}
          onCrossClick={onCrossClick}
          qualities={qualities}
          subTitle={subTitle}
          title={title}
          videoReady={videoReady}
        />

        <video
          ref={videoComponent}
          src={src}
          controls={false}
          onClick={play.toggle}
          onLoadedData={startVideo}
          onTimeUpdate={(e: any) => onTimeUpdate(e.target.currentTime)}
          onError={erroVideo}
          onEnded={onEndedFunction}
        />

        <Controlls
          show={showControls && videoReady && !error}
          primaryColor={primaryColor}
        >
          {backButton && (
            <div className="back">
              <div onClick={backButton} style={{ cursor: 'pointer' }}>
                <FaArrowLeft size={28} />
                <span>Voltar à navegação</span>
              </div>
            </div>
          )}

          {videoReady && !error && !showInfo && !loading && (
            <ContainerMain
              show={showControls}
              onDoubleClick={chooseFullScreen}
              playing={playing}
            >
              {playing ? (
                <div className="pause" onClick={play.toggle}>
                  <FaPause size={48} color={theme.text} />
                </div>
              ) : (
                <div className="play" onClick={play.toggle}>
                  <FaPlay size={48} color={theme.text} />
                </div>
              )}
            </ContainerMain>
          )}

          <div>
            <div className="line-reproduction">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                className="progress-bar"
                style={{
                  background: `linear-gradient(93deg, ${primaryColor} ${
                    (progress * 100 + 2 * (duration / 100)) / duration
                  }%, #fff ${
                    (progress * 100 + 2 * (duration / 100)) / duration
                  }%)`,
                }}
                value={progress}
                max={duration}
                onChange={(e) => progressChange.set(Number(e.target.value))}
                title=""
              />
              <span>{formatTime(duration)}</span>
            </div>

            {videoReady === true && (
              <div className="controlls">
                <div className="start">
                  <div className="item-control">
                    {!playing ? (
                      <FaPlay size={28} onClick={play.toggle} />
                    ) : (
                      <FaPause size={28} onClick={play.toggle} />
                    )}
                  </div>

                  <div className="item-control time-play">
                    <FaUndoAlt size={28} onClick={() => progressChange.addOrRemove(-5)} />
                  </div>

                  <div className="item-control time-play">
                    <FaRedoAlt size={28} onClick={() => progressChange.addOrRemove(5)} />
                  </div>

                  {muted === false && (
                    <VolumeControll
                      onMouseLeave={() => setShowControlVolume(false)}
                      className="item-control"
                      primaryColor={primaryColor}
                      percentVolume={volume}
                    >
                      {showControlVolume && (
                        <div className="volumn-controll">
                          <div className="box-connector" />
                          <div className="box">
                            <input
                              type="range"
                              min={0}
                              className="volumn-input"
                              max={100}
                              step={1}
                              value={volume}
                              onChange={(e) =>
                                volumeChange.set(Number(e.target.value))
                              }
                              title=""
                            />
                          </div>
                        </div>
                      )}

                      {volume >= 60 ? (
                        <FaVolumeUp
                          size={28}
                          onMouseEnter={() => setShowControlVolume(true)}
                          onClick={() => setMuttedAction(true)}
                        />
                      ) : volume >= 10 ? (
                        <FaVolumeDown
                          size={28}
                          onMouseEnter={() => setShowControlVolume(true)}
                          onClick={() => setMuttedAction(true)}
                        />
                      ) : volume < 10 && volume > 0 ? (
                        <FaVolumeOff
                          size={28}
                          onMouseEnter={() => setShowControlVolume(true)}
                          onClick={() => setMuttedAction(true)}
                        />
                      ) : (
                        volume <= 0 && (
                          <FaVolumeMute
                            size={28}
                            onMouseEnter={() => setShowControlVolume(true)}
                            onClick={() => volumeChange.set(0)}
                          />
                        )
                      )}
                    </VolumeControll>
                  )}

                  {muted && (
                    <div className="item-control">
                      <FaVolumeMute
                        size={28}
                        onClick={() => setMuttedAction(false)}
                      />
                    </div>
                  )}

                  <div className="item-control info-video">
                    <span className="info-first">{titleMedia}</span>
                    <span className="info-secund">
                      {extraInfoMedia
                        ?.replace(new RegExp(titleMedia || '', 'ig'), '')
                        .trim()}
                    </span>
                  </div>
                </div>

                <div className="end">
                  {!!playbackRateEnable && (
                    <div
                      className="item-control"
                      onMouseLeave={() => setShowPlaybackRate(false)}
                    >
                      {showPlaybackRate === true && (
                        <ItemPlaybackRate>
                          <div>
                            <div className="title">Velocidades</div>
                            {playbackRateOptions.map((item, index) => (
                              <div
                                key={`speed-${index}`}
                                className="item"
                                onClick={() => onChangePlayBackRate(item)}
                              >
                                {(+item === +playbackRate ||
                                  (item === 'Normal' &&
                                    +playbackRate === 1)) && (
                                  <FiCheck size={28} />
                                )}
                                <div className="bold">
                                  {item === 'Normal' ? item : `${item}x`}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="box-connector" />
                        </ItemPlaybackRate>
                      )}

                      <IconPlayBackRate
                        className="playbackRate"
                        onMouseEnter={() => setShowPlaybackRate(true)}
                      >
                        <span>
                          {playbackRate === 'Normal' ? '1' : `${playbackRate}`}
                          <small>x</small>
                        </span>
                      </IconPlayBackRate>
                    </div>
                  )}

                  {onNextClick && (
                    <div
                      className="item-control"
                      onMouseLeave={() => setShowDataNext(false)}
                    >
                      {showDataNext === true && dataNext.title && (
                        <ItemNext>
                          <div>
                            <div className="title">Próximo Episódio</div>
                            <Link href={onNextClick}>
                              <a>
                                <div className="item">
                                  <div className="bold">{dataNext.title}</div>
                                  {dataNext.description && (
                                    <div>{dataNext.description}</div>
                                  )}
                                </div>
                              </a>
                            </Link>
                          </div>
                          <div className="box-connector" />
                        </ItemNext>
                      )}

                      <Link href={onNextClick}>
                        <a>
                          <FaStepForward
                            size={28}
                            onMouseEnter={() => setShowDataNext(true)}
                          />
                        </a>
                      </Link>
                    </div>
                  )}

                  <div
                    className="item-control"
                    onMouseLeave={() => setShowReproductionList(false)}
                  >
                    {showReproductionList && (
                      <ItemListReproduction>
                        <div>
                          <div className="title">Lista de Reprodução</div>
                          <div
                            ref={listReproduction}
                            className="list-list-reproduction scroll-clean-player"
                          >
                            {reprodutionList.map((item, index) =>
                              !item.playing ? (
                                <Link
                                  href={`/watch/${item.id}`}
                                  key={`video-${item.id}`}
                                >
                                  <a>
                                    <div
                                      className={`item-list-reproduction ${
                                        item.playing && 'selected'
                                      }`}
                                      onClick={() =>
                                        onClickItemListReproduction &&
                                        onClickItemListReproduction(
                                          item.id,
                                          item.playing
                                        )
                                      }
                                    >
                                      <div className="bold">
                                        <span style={{ marginRight: 15 }}>
                                          {index + 1}
                                        </span>
                                        {item.nome}
                                      </div>

                                      {item.percent && (
                                        <div className="percent" />
                                      )}
                                    </div>
                                  </a>
                                </Link>
                              ) : (
                                <div
                                  key={`video-${item.id}-no-playing`}
                                  className={`item-list-reproduction ${
                                    item.playing && 'selected'
                                  }`}
                                  onClick={() =>
                                    onClickItemListReproduction &&
                                    onClickItemListReproduction(
                                      item.id,
                                      item.playing
                                    )
                                  }
                                >
                                  <div className="bold">
                                    <span style={{ marginRight: 15 }}>
                                      {index + 1}
                                    </span>
                                    {item.nome}
                                  </div>

                                  {item.percent && <div className="percent" />}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="box-connector" />
                      </ItemListReproduction>
                    )}
                    {reprodutionList && reprodutionList.length > 1 && (
                      <FaClone
                        size={28}
                        onMouseEnter={() => setShowReproductionList(true)}
                      />
                    )}
                  </div>

                  {qualities && qualities.length > 1 && (
                    <div
                      className="item-control"
                      onMouseLeave={() => setShowQuality(false)}
                    >
                      {showQuality === true && (
                        <ItemListQuality>
                          <div>
                            {qualities &&
                              qualities.map((item, index) => (
                                <div
                                  key={`quality-${index}`}
                                  onClick={() => {
                                    setShowQuality(false)
                                    onChangeQuality(item.id)
                                  }}
                                >
                                  {item.prefix && <span>HD</span>}

                                  <span>{item.nome}</span>
                                  {item.playing && <FiCheck />}
                                </div>
                              ))}
                          </div>
                          <div className="box-connector" />
                        </ItemListQuality>
                      )}

                      <FaCog
                        size={28}
                        onMouseEnter={() => setShowQuality(true)}
                      />
                    </div>
                  )}

                  <div className="item-control">
                    <FaComment
                      size={28}
                      onClick={() => setIsComment((state) => !state)}
                    />
                  </div>

                  <div className="item-control">
                    {fullscreen === false && (
                      <FaExpand size={28} onClick={chooseFullScreen} />
                    )}
                    {fullscreen === true && (
                      <FaCompress size={28} onClick={chooseFullScreen} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Controlls>
      </Container>
    </>
  )
}

export default ReactNetflixPlayer
