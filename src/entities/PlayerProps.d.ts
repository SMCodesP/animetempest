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
  onClickItemListReproduction?: (...args: any) => void
  onCrossClick?: (...args: any) => void
  onChangeQuality?: (...args: any) => void
  titleMedia: string | null
  fullPlayer: boolean
  autoPlay: boolean
  animeId: string
  startPosition: number
  dataNext?: {
    title: string
    uri: string
    description?: string
  } | null
  dataPrevious?: {
    title: string
    uri: string
    description?: string
  } | null
  reprodutionList: Array<any>
  qualities: Array<any>
  overlayEnabled: boolean
  autoControllCloseEnabled: boolean
  loading?: boolean
}
