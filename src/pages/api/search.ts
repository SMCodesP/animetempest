import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=604800')

  const { query, category } = req.query

  if (category) {
    const items = await api.getCategory(String(category))
    return res.json(
      items.filter(
        (item) => item.category_name.toUpperCase().indexOf(String(query).toUpperCase()) > -1
      )
    )
  }

  const animes = await api.directSearchAnime(query || '')

  if (!animes) return res.json([])

  return res.json(animes)
}
