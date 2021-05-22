import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=604800')

  try {
    const { query, category } = req.query

    if (category) {
      const items = await api.getCategory(String(category))
      return res.json(
        items.filter(
          (item) =>
            item.category_name
              .toUpperCase()
              .indexOf(String(query).toUpperCase()) > -1 &&
            !item.category_name.toLowerCase().includes('animetv')
        )
      )
    }

    const animes = await api.directSearchAnime(query || '')

    if (!animes) return res.json([])

    return res.json(
      animes.filter(
        (anime) => !anime.category_name.toLowerCase().includes('animetv')
      )
    )
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      message: 'Houve um erro',
    })
  }
}
