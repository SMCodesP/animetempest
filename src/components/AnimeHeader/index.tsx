import Category from '../../entities/Category'

import { Container } from './styles';

const AnimeHeader: React.FC<{
  anime: Category
}> = ({ anime }) => {
  return (
    <Container style={{
      backgroundImage: `url('https://cdn.appanimeplus.tk/img/${anime.category_image}')`
    }}>

    </Container>
  )
}

export default AnimeHeader
