import Wave from 'react-wavify'
import { useTheme } from 'styled-components'
import { Container, BannerImage, ContainerBanner } from "./styles"

const AnimeBanner: React.FC<{
  bannerImage: string
}> = ({ bannerImage }) => {
  const theme = useTheme()

  return (
    <Container>
      <ContainerBanner>
        <BannerImage layout="fill" src={bannerImage} />
      </ContainerBanner>
      <Wave
        fill={theme.background}
        paused={false}
        options={{
          height: 25,
          amplitude: 25,
          speed: 0.15,
          points: 3
        }}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          zIndex: 2
        }}
      />
    </Container>
  )
}

export default AnimeBanner
