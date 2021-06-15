import Link from 'next/link'

import {
  ContainerAnime,
  Image,
  More,
} from './styles'
import Video from '../../entities/Video'

const AnimeResume: React.FC<{
  episode: Video
}> = ({ episode }) => {

  return (
    <Link href={`/watch/${episode.video_id}`}>
      <a>
        <ContainerAnime>
          <Image
            src={episode.anime?.coverImage_extraLarge || `https://cdn.appanimeplus.tk/img/${episode.category_image}`}
            quality={100}
          />
          <More
            style={{
              padding: '5px 15px',
            }}
          >
            {episode.title}
          </More>
        </ContainerAnime>
      </a>
    </Link>
  )
}

export default AnimeResume
