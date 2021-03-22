import { NextApiRequest, NextApiResponse } from 'next'
import api from '../../services/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=604800')

  const { query } = req.query

  const animes = await api.directSearchAnime(String(query))

  if (!animes) return res.json([])

  return res.json(animes)
}
