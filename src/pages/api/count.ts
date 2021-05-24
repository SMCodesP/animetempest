import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/api'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=604800')

  const animes = await api.searchAnime('')

  if (!animes) return res.json([])

  return res.json({
    available: animes.length
  })
}
