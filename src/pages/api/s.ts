import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import Category from '../../entities/Category'
import api from '../../services/api'

let animes: Category[] | null = null
let requesting: boolean = false

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=604800')

  try {
    const { query, category } = req.query
    console.log(animes)

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

    if (!animes) {
      const searched = await api.directSearchAnime(query)
      res.json(searched)
    } else {
      const searched = animes.filter(
        (anime) =>
          !anime.category_name.toLowerCase().includes('animetv') &&
          anime.category_name.toLowerCase().includes(String(query).toLowerCase())
      )
      return res.json(searched)
    }

    if (!requesting && !animes) {
      requesting = true
      animes = await Promise.all(
        (
          await api.directSearchAnime('')
        ).map(async (category) => {
          try {
            console.log(category.category_name)
            await timeout(500)
            const { data: anime } = await axios.get(
              `https://api.jikan.moe/v3/search/anime?limit=1&q=${category.category_name}`
            )
            return {
              ...category,
              image_alt: anime.results[0]!.image_url,
            }
          } catch {
            return category
          }
        })
      )
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      message: 'Houve um erro',
    })
  }
}
