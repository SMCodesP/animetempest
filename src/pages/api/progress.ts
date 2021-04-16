import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import nc from 'next-connect'

import Category from '../../entities/Category';
import firebaseAdmin from '../../utils/lib/firebaseAdmin'
import api from '../../services/api'

let animes: Category[] = [];

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const session: any = await getSession({ req })

  try {
    if (animes.length === 0) {
      const {data} = await api.get<Category[]>('/api-animesbr-10.php')
      animes = data;
    }

    if (!session) throw new Error('Você não tem acesso a ver os seus favoritos.')

    const { firestore } = firebaseAdmin()

    const animeWatch = await firestore
      .collection('watch')
      .where('userId', '==', session.userId)
      .get()

    return res.json(Object.values(
      animeWatch.docs.map((doc) => doc.data())
        .map((progress) => ({
          video_id: progress.videoId,
          category_id: progress.animeId,
          title: animes.find((anime) => anime.id === progress.animeId)?.category_name,
          category_image: animes.find((anime) => anime.id === progress.animeId)
            ?.category_image,
          updatedAt: progress.updatedAt,
        }))
        .reduce((r: any, o) => {
          r[o.category_id] =
            r[o.category_id] &&
            r[o.category_id].updatedAt._seconds > (o.updatedAt as any)._seconds
              ? r[o.category_id]
              : o
          return r
        }, {})
    ).sort((a: any, b: any) => b.updatedAt._seconds - a.updatedAt._seconds))
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

export default handler
