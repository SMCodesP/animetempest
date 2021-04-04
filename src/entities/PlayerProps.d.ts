export default interface PlayerProps {
  src?: string
  title?: string | null
  subTitle?: string | null
  fontFamily?: string
  extraInfoMedia?: string | null
  playbackRateEnable?: boolean
  backButton?: (...args: any) => void
  onCanPlay?: (...args: any) => void
  onTimeUpdate?: (...args: any) => void
  onEnded?: (...args: any) => void
  onErrorVideo?: (...args: any) => void
  onNextClick?: (...args: any) => void
  onClickItemListReproduction?: (...args: any) => void
  onCrossClick?: (...args: any) => void
  onChangeQuality?: (...args: any) => void
  titleMedia: string | null
  fullPlayer: boolean
  autoPlay: boolean
  videoId: string
  animeId: string
  startPosition: number
  dataNext: any
  reprodutionList: Array<any>
  qualities: Array<any>
  overlayEnabled: boolean
  autoControllCloseEnabled: boolean
  primaryColor: string
  secundaryColor: string
}
