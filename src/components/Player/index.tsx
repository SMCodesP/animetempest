// @ts-nocheck

import React, { useEffect, memo, useState, useRef, useCallback, useContext } from 'react'

import debounce from 'lodash.debounce'

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
} from 'react-icons/fa'

import { FiCheck, FiX } from 'react-icons/fi'
import {
  StandyByInfo,
  VideoPreLoading,
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
import Link from 'next/link'
import Loading from './Loading'
import { ThemeContext } from 'styled-components'

function ReactNetflixPlayer({
  title = false,
  subTitle = false,
  titleMedia = false,
  extraInfoMedia = false,
  playerLanguage = 'pt',

  fullPlayer = true,
  backButton = false,

  src = '',
  autoPlay = false,
  videoId = '',

  onCanPlay = false,
  onTimeUpdate = false,
  onEnded = false,
  onErrorVideo = false,
  onNextClick = false,
  onClickItemListReproduction = false,
  onCrossClick = () => { },
  startPosition = 0,

  dataNext = {},
  reprodutionList = [],
  qualities = [],
  onChangeQuality = [],
  playbackRateEnable = true,
  overlayEnabled = true,
  autoControllCloseEnabled = true,

  // Styles
  primaryColor = '#03dffc',
  secundaryColor = '#ffffff',
  fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
}: // subtitleMedia,
  any) {
  const theme = useContext(ThemeContext)
  // Referências
  const videoComponent = useRef<HTMLVideoElement>(null)

  const [timerBuffer, setTimerBuffer] = useState(null)
  const playerElement = useRef(null)
  const listReproduction = useRef(null)
  const controls = useRef<HTMLDivElement>(null)
  const seekElement = useRef<HTMLInputElement>(null)
  const progressTime = useRef<HTMLSpanElement>(null)

  // Estados
  const [videoReady, setVideoReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [end, setEnd] = useState(false)
  const [controlBackEnd, setControlBackEnd] = useState(false)
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState(false)
  const [waitingBuffer, setWaitingBuffer] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const [showControlVolume, setShowControlVolume] = useState(false)
  const [showQuality, setShowQuality] = useState(false)
  const [showDataNext, setShowDataNext] = useState(false)
  const [showPlaybackRate, setShowPlaybackRate] = useState(false)
  const [showReproductionList, setShowReproductionList] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [timeout, setTimeout] = useState(null)

  const playbackRateOptions = ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '2']

  const secondsToHms = (d) => {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    let s = Math.floor((d % 3600) % 60)

    if (s < 10) {
      s = `0${s}`
    }

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

  const timeCallBack = (e) => {
    setShowInfo(false)
    setEnd(false)

    if (onTimeUpdate) {
      onTimeUpdate(e)
    }

    seekElement.current.style.background = `linear-gradient(93deg, ${primaryColor} ${
      (e.target.currentTime * 100 + 2 * (duration / 100)) / duration
      }%, #fff ${(e.target.currentTime * 100 + 2 * (duration / 100)) / duration}%)`
    seekElement.current.value = Math.trunc(e.target.currentTime)
    progressTime.current.innerText = secondsToHms(Math.trunc(e.target.currentTime))
    if (playing) {
      saveVideoProgress(Math.trunc(e.target.currentTime))
    }
  }

  const timeUpdate = (e) => {
    e.persist()
    timeCallBack(e)
  }

  const goToPosition = (position) => {
    seekElement.current.style.background = `linear-gradient(93deg, ${primaryColor} ${
      (position * 100 + 2 * (duration / 100)) / duration
      }%, #fff ${(position * 100 + 2 * (duration / 100)) / duration}%)`
    videoComponent.current.currentTime = position
  }

  const play = debounce(() => {
    videoComponent.current.paused ? videoComponent.current.play() : videoComponent.current.pause()
  }, 500)

  const onEndedFunction = () => {
    if (+startPosition === +videoComponent.current.duration && !controlBackEnd) {
      setControlBackEnd(true)
      videoComponent.current.currentTime = videoComponent.current.duration - 30

      if (autoPlay) {
        videoComponent.current.play()
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

  const nextSeconds = (seconds) => {
    goToPosition(videoComponent.current.currentTime + seconds)
  }

  const previousSeconds = (seconds) => {
    const current = videoComponent.current.currentTime

    if (current - seconds <= 0) {
      videoComponent.current.currentTime = 0
      return
    }

    videoComponent.current.currentTime -= seconds
  }

  const startVideo = async () => {
    setDuration(videoComponent.current.duration)
    setVideoReady(true)

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

  const setMuttedAction = (value) => {
    setMuted(value)
    setShowControlVolume(false)
    videoComponent.current.muted = value
  }

  const setVolumeAction = (value) => {
    setVolume(value)
    videoComponent.current.volume = value / 100
  }

  const addVolumeAction = (quantity) => {
    setVolume((state) => {
      if (state + quantity >= 100) {
        videoComponent.current.volume = 1
        return 100
      }
      if (state + quantity <= 0) {
        videoComponent.current.volume = 0
        return 0
      }
      videoComponent.current.volume = Math.round((state + quantity) / 100)
      return state + quantity
    })
  }

  const exitFullScreen = () => {
    if (
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else {
        document.webkitExitFullscreen()
      }
    }
  }

  const enterFullScreen = () => {
    setShowInfo(true)
    if (playerElement.current.requestFullscreen) {
      playerElement.current.requestFullscreen()
    } else if (playerElement.current.webkitRequestFullscreen) {
      playerElement.current.webkitRequestFullscreen()
    }
  }

  const chooseFullScreen = debounce(() => {
    if (
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    ) {
      document.exitFullscreen()
      return
    }

    setShowInfo(true)

    if (playerElement.current.requestFullscreen) {
      playerElement.current.requestFullscreen()
    } else if (playerElement.current.webkitRequestFullscreen) {
      playerElement.current.webkitRequestFullscreen()
    } else if (playerElement.current.mozRequestFullScreen) {
      playerElement.current.mozRequestFullScreen()
    } else if (playerElement.current.msRequestFullscreen) {
      playerElement.current.msRequestFullscreen()
    }
  }, 500)

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

  const hoverScreen = useCallback(
    debounce(() => {
      setShowControls(true)
      setShowInfo(false)

      setTimeout((oldTimeout) => {
        if (oldTimeout !== null) {
          window.clearTimeout(oldTimeout)
        }
        return window.setTimeout(controllScreenTimeOut, 3000)
      })
    }, 200),
    []
  )

  const controlKeyBoard = {
    76: () => nextSeconds(10),
    39: () => nextSeconds(5),
    74: () => previousSeconds(10),
    37: () => previousSeconds(5),
    75: () => play(),
    32: () => play(),
    70: () => {
      fullscreen === true ? exitFullScreen() : enterFullScreen()
    },
    38: () => addVolumeAction(10),
    40: () => addVolumeAction(-10),
  }

  const keyboardInteractionCallback = (e) => {
    if (controlKeyBoard[e.keyCode] && videoComponent.current) {
      setShowControls(true)
      setShowInfo(false)
      controlKeyBoard[e.keyCode]()
    }
  }

  const scrollToSelected = () => {
    const element = listReproduction.current
    const selected = element.getElementsByClassName('selected')[0]
    const position = selected.offsetTop
    const height = selected.offsetHeight
    element.scrollTop = position - height * 2
  }

  const onChangePlayBackRate = (speed) => {
    speed = speed === 'Normal' ? 1 : speed
    videoComponent.current.playbackRate = speed
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
      // setDuration(0);
      setPlaying(false)
      setVideoReady(false)
      setError(false)
      setShowReproductionList(false)
      setShowDataNext(false)
      if (videoComponent && videoComponent.current) {
        videoComponent.current.currentTime = startPosition
        videoComponent.current?.addEventListener('pause', pauseVideo)
        videoComponent.current?.addEventListener('play', playVideo)
      }
    }

    return () => {
      videoComponent.current?.removeEventListener('loadedmetadata', startVideo, true)
      videoComponent.current?.removeEventListener('play', playVideo)
      videoComponent.current?.removeEventListener('pause', pauseVideo)
    }
  }, [src, startPosition])

  useEffect(() => {
    document.addEventListener('keydown', keyboardInteractionCallback)
    return () => {
      document.removeEventListener('keydown', keyboardInteractionCallback)
    }
  }, [])

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

  function InfoVideo() {
    return (
      <StandyByInfo
        primaryColor={primaryColor}
        secundaryColor={secundaryColor}
        show={showInfo === true && videoReady === true && playing === false}
      >
        {(title || subTitle) && (
          <section className="center">
            <h3 className="text">Você está assistindo</h3>
            <h1 className="title">{title}</h1>
            <h2 className="sub-title">{subTitle.replace(new RegExp(title, 'ig'), '').trim()}</h2>
          </section>
        )}
        <footer>Pausado</footer>
      </StandyByInfo>
    )
  }

  function CloseVideo() {
    return (
      <VideoPreLoading
        backgroundColorHoverButtonError="#f78b28"
        colorHoverButtonError="#ddd"
        colorButtonError="#ddd"
        backgroundColorButtonError="#333"
        colorTitle="#fff"
        colorSubTitle="#fff"
        colorIcon="#fff"
        show={videoReady === false || (videoReady === true && error)}
        showError={!!error}
      >
        {(title || subTitle) && (
          <header>
            <div>
              <h1>{title}</h1>
              <h2>{subTitle.replace(new RegExp(title, 'ig'), '').trim()}</h2>
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
                      <div key={`quality-error-${index}`} onClick={() => onChangeQuality(item.id)}>
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

  return (
    <Container
      onMouseMove={hoverScreen}
      ref={playerElement}
      fullPlayer={fullPlayer}
      hideVideo={!!error}
      fontFamily={fontFamily}
    >
      {(videoReady === false || (waitingBuffer === true && playing === true)) && !error && !end && (
        <Loading color={primaryColor} />
      )}

      {overlayEnabled && <InfoVideo />}

      <CloseVideo />

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
        ref={controls}
        show={showControls === true && videoReady === true && error === false}
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

        {videoReady === true && error === false && !showInfo && (
          <ContainerMain
            show={showControls === true && videoReady === true && error === false}
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
              onChange={(e) => goToPosition(e.target.value)}
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
                    {showControlVolume === true && (
                      <div className="volumn-controll">
                        <div className="box-connector" />
                        <div className="box">
                          <input
                            type="range"
                            min={0}
                            className="volumn-input"
                            max={100}
                            value={volume}
                            onChange={(e) => setVolumeAction(e.target.value)}
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

                {muted === true && (
                  <div className="item-control">
                    <FaVolumeMute size={28} onClick={() => setMuttedAction(false)} />
                  </div>
                )}

                <div className="item-control info-video">
                  <span className="info-first">{titleMedia}</span>
                  <span className="info-secund">
                    {extraInfoMedia.replace(new RegExp(titleMedia, 'ig'), '').trim()}
                  </span>
                </div>
              </div>

              <div className="end">
                {!!playbackRateEnable && (
                  <div className="item-control" onMouseLeave={() => setShowPlaybackRate(false)}>
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
                                (item === 'Normal' && +playbackRate === 1)) &&
                                FiCheck()}
                              <div className="bold">{item === 'Normal' ? item : `${item}x`}</div>
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
                  <div className="item-control" onMouseLeave={() => setShowDataNext(false)}>
                    {showDataNext === true && dataNext.title && (
                      <ItemNext>
                        <div>
                          <div className="title">Próximo Episódio</div>
                          <div className="item" onClick={onNextClick}>
                            <div className="bold">{dataNext.title}</div>
                            {dataNext.description && <div>{dataNext.description}</div>}
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

                <div className="item-control" onMouseLeave={() => setShowReproductionList(false)}>
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
                              <Link href={`/watch/${item.id}`} key={`video-${item.id}`}>
                                <a>
                                  <div
                                    className={`item-list-reproduction ${
                                      item.playing && 'selected'
                                      }`}
                                    onClick={() =>
                                      onClickItemListReproduction &&
                                      onClickItemListReproduction(item.id, item.playing)
                                    }
                                  >
                                    <div className="bold">
                                      <span style={{ marginRight: 15 }}>{index + 1}</span>
                                      {item.nome}
                                    </div>

                                    {item.percent && <div className="percent" />}
                                  </div>
                                </a>
                              </Link>
                            ) : (
                                <div
                                  key={`video-${item.id}-no-playing`}
                                  className={`item-list-reproduction ${item.playing && 'selected'}`}
                                  onClick={() =>
                                    onClickItemListReproduction &&
                                    onClickItemListReproduction(item.id, item.playing)
                                  }
                                >
                                  <div className="bold">
                                    <span style={{ marginRight: 15 }}>{index + 1}</span>
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
                    <FaClone size={28} onMouseEnter={() => setShowReproductionList(true)} />
                  )}
                </div>

                {qualities && qualities.length > 1 && (
                  <div className="item-control" onMouseLeave={() => setShowQuality(false)}>
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

                    <FaCog size={28} onMouseEnter={() => setShowQuality(true)} />
                  </div>
                )}

                <div className="item-control">
                  {fullscreen === false && <FaExpand size={28} onClick={enterFullScreen} />}
                  {fullscreen === true && <FaCompress size={28} onClick={exitFullScreen} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </Controlls>
    </Container>
  )
}

export default ReactNetflixPlayer
