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

import useSocket from '../../hooks/useSocket'
import { useSession } from 'next-auth/client'

import PlayerProps from '../../entities/PlayerProps'
import Progress from '../../entities/Progress'

const ReactNetflixPlayer: React.FC<PlayerProps> = ({
  title = null,
  subTitle = null,
  titleMedia = null,
  extraInfoMedia = null,
  fullPlayer = true,
  src = '',
  autoPlay = false,
  videoId = '',
  animeId = '',
  backButton = () => {},
  onCanPlay = () => {},
  onTimeUpdate = () => {},
  onEnded = () => {},
  onErrorVideo = () => {},
  onNextClick = () => {},
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
  primaryColor = '#03dffc',
  secundaryColor = '#ffffff',
  fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
}) => {
  const theme = useContext(ThemeContext)
  const socket = useSocket('https://hurkitabot-v2.herokuapp.com', [])
  const [session]: any = useSession()

  const videoComponent = useRef<HTMLVideoElement>(null)
  const playerElement = useRef(null)
  const listReproduction = useRef<HTMLDivElement>(null)
  const seekElement = useRef<HTMLInputElement>(null)
  const progressTime = useRef<HTMLSpanElement>(null)

  const [videoReady, setVideoReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [end, setEnd] = useState(false)
  const [controlBackEnd, setControlBackEnd] = useState(false)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState('')
  const [waitingBuffer] = useState(false)
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

  const playbackRateOptions = [
    '0.25',
    '0.5',
    '0.75',
    'Normal',
    '1.25',
    '1.5',
    '2',
  ]

  const secondsToHms = (d: any) => {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    let s = Math.floor((d % 3600) % 60)
      .toString()
      .padStart(2, '0')

    if (h) {
      return `${h}:${m}:${s}`
    }

    return `${m}:${s}`
  }

  const saveVideoProgress = (progress: number) => {
    const history = localStorage.getItem('history')
    if (history) {
      let historyParsed: {
        video_id: string
        progress: number
      }[] = JSON.parse(history)
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
    } else {
      localStorage.setItem(
        'history',
        JSON.stringify([
          {
            video_id: videoId,
            progress,
          },
        ])
      )
    }
  }

  const saveOnlineProgress = useDebouncedCallback(
    (value: number) => {
      console.log('Saving online progress...')
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

  const timeCallBack = (e: any) => {
    setShowInfo(false)
    setEnd(false)

    if (onTimeUpdate) {
      onTimeUpdate(e)
    }

    seekElement.current!.style.background = `linear-gradient(93deg, ${primaryColor} ${
      (e.target.currentTime * 100 + 2 * (duration / 100)) / duration
    }%, #fff ${
      (e.target.currentTime * 100 + 2 * (duration / 100)) / duration
    }%)`
    seekElement.current!.value = String(Math.trunc(e.target.currentTime))
    progressTime.current!.innerText = secondsToHms(
      Math.trunc(e.target.currentTime)
    )
    if (playing) {
      saveVideoProgress(Math.trunc(e.target.currentTime))
      if (session) {
        saveOnlineProgress(Math.trunc(e.target.currentTime))
      }
    }
  }

  const timeUpdate = (e: any) => {
    e.persist()
    timeCallBack(e)
  }

  const goToPosition = (position: number) => {
    seekElement.current!.style.background = `linear-gradient(93deg, ${primaryColor} ${
      (position * 100 + 2 * (duration / 100)) / duration
    }%, #fff ${(position * 100 + 2 * (duration / 100)) / duration}%)`
    videoComponent.current!.currentTime = position
  }

  const play = useDebouncedCallback(() => {
    videoComponent.current!.paused ? playVideo() : pauseVideo()
  }, 500, {
    maxWait: 500
  })

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
        setPlaying(false)
      }
    } else {
      setEnd(true)

      if (onEnded) {
        onEnded()
      }
    }
  }

  const nextSeconds = (seconds: number) => {
    goToPosition(videoComponent.current!.currentTime + seconds)
  }

  const previousSeconds = (seconds: number) => {
    const current = videoComponent.current!.currentTime

    if (current - seconds <= 0) {
      videoComponent.current!.currentTime = 0
      return
    }

    videoComponent.current!.currentTime -= seconds
  }

  const startVideo = async () => {
    setDuration(videoComponent.current!.duration)
    setVideoReady(true)
    goToPosition(startPosition)

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

  const setVolumeAction = (value: number) => {
    setVolume(() => {
      if (value >= 100) {
        videoComponent.current!.volume = 1
        return 100
      } else if (value <= 0) {
        videoComponent.current!.volume = 0
        return 0
      }
      videoComponent.current!.volume = value / 100
      return value
    })
  }

  const addVolumeAction = (quantity: number) => {
    setVolumeAction(volume + quantity)
  }

  const exitFullScreen = () => {
    if (
      (document as any).webkitIsFullScreen ||
      (document as any).mozFullScreen ||
      (document as any).msFullscreenElement ||
      document.fullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).msExitFullscreen) {
        ;(document as any).msExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        ;(document as any).mozCancelFullScreen()
      } else {
        ;(document as any).webkitExitFullscreen()
      }
    }
  }

  const enterFullScreen = () => {
    setShowInfo(true)
    if ((playerElement.current as any)!.requestFullscreen) {
      ;(playerElement.current as any)!.requestFullscreen()
    } else if ((playerElement.current as any)!.webkitRequestFullscreen) {
      ;(playerElement.current as any)!.webkitRequestFullscreen()
    }
  }

  const chooseFullScreen = useDebouncedCallback(() => {
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
  }, 500, {
    maxWait: 500
  })

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
    76: () => nextSeconds(10),
    39: () => nextSeconds(5),
    74: () => previousSeconds(10),
    37: () => previousSeconds(5),
    75: () => play(),
    32: () => play(),
    70: () => chooseFullScreen(),
    38: () => addVolumeAction(10),
    40: () => addVolumeAction(-10),
  }

  const keyboardInteractionCallback = (e: any) => {
    console.log(e)
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

  const pauseVideo = () => {
    setPlaying(false)
    videoComponent.current?.pause()
  }
  const playVideo = () => {
    setPlaying(true)
    videoComponent.current?.play()
  }

  useEffect(() => {
    if (showReproductionList) {
      scrollToSelected()
    }
  }, [showReproductionList])

  useEffect(() => {
    if (src) {
      setPlaying(false)
      setVideoReady(false)
      setError('')
      setShowReproductionList(false)
      setShowDataNext(false)
      if (videoComponent && videoComponent.current) {
        videoComponent.current.currentTime = startPosition
      }
    }
  }, [src])

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
        {(videoReady === false ||
          (waitingBuffer === true && playing === true)) &&
          !error &&
          !end && <Loading color={primaryColor} />}

        {overlayEnabled && (
          <InfoVideo
            playing={playing}
            primaryColor={primaryColor}
            secundaryColor={secundaryColor}
            showInfo={showInfo}
            subTitle={subTitle}
            title={title}
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
          onClick={play}
          onLoadedData={startVideo}
          onTimeUpdate={timeUpdate}
          onError={erroVideo}
          onEnded={onEndedFunction}
        />

        <Controlls
          show={showControls === true && videoReady === true && !error}
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

          {videoReady && !error && !showInfo && (
            <ContainerMain
              show={showControls}
              onDoubleClick={chooseFullScreen}
              playing={playing}
            >
              {playing ? (
                <div className="pause" onClick={pauseVideo}>
                  <FaPause size={48} color={theme.text} />
                </div>
              ) : (
                <div className="play" onClick={playVideo}>
                  <FaPlay size={48} color={theme.text} />
                </div>
              )}
            </ContainerMain>
          )}

          <div>
            <div className="line-reproduction">
              <span ref={progressTime}>{secondsToHms(0)}</span>
              <input
                type="range"
                ref={seekElement}
                className="progress-bar"
                max={duration}
                onChange={(e) => goToPosition(Number(e.target.value))}
                title=""
              />
              <span>{secondsToHms(duration)}</span>
            </div>

            {videoReady === true && (
              <div className="controlls">
                <div className="start">
                  <div className="item-control">
                    {!playing ? (
                      <FaPlay size={28} onClick={play} />
                    ) : (
                      <FaPause size={28} onClick={play} />
                    )}
                  </div>

                  <div className="item-control">
                    <FaUndoAlt size={28} onClick={() => previousSeconds(5)} />
                  </div>

                  <div className="item-control">
                    <FaRedoAlt size={28} onClick={() => nextSeconds(5)} />
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
                                setVolumeAction(Number(e.target.value))
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
                            onClick={() => setVolumeAction(0)}
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
                            <div className="item" onClick={onNextClick}>
                              <div className="bold">{dataNext.title}</div>
                              {dataNext.description && (
                                <div>{dataNext.description}</div>
                              )}
                            </div>
                          </div>
                          <div className="box-connector" />
                        </ItemNext>
                      )}

                      <FaStepForward
                        size={28}
                        onClick={onNextClick}
                        onMouseEnter={() => setShowDataNext(true)}
                      />
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
                      <FaExpand size={28} onClick={enterFullScreen} />
                    )}
                    {fullscreen === true && (
                      <FaCompress size={28} onClick={exitFullScreen} />
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
