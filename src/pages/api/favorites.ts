import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import nc from 'next-connect'
import api from '../../services/api'
import firebaseAdmin from '../../utils/lib/firebaseAdmin'

const handler = nc<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    const { animeId, favorite = false } = req.body
    const session: any = await getSession({ req })
    try {
      if (!animeId && !session)
        throw new Error('Você não pode adicionar ou remover esse anime como favorito.')

      const { firestore } = firebaseAdmin()

      const userAnimes = await firestore
        .collection('animes')
        .where('animeId', '==', String(animeId))
        .where('userId', '==', session.userId)
        .limit(1)
        .get()

      if (userAnimes.empty) {
        const animeRef = await firestore.collection('animes').add({
          animeId: String(animeId),
          userId: session.userId,
          imageId: (await api.getAnime(animeId)).category_image,
          favorite,
        })
        const animeSnapshot = await animeRef.get()

        return res.json(animeSnapshot.data())
      } else {
        await firestore
          .collection('animes')
          .doc(userAnimes.docs[0].id)
          .update({
            ...userAnimes.docs[0].data(),
            favorite: favorite,
          })
        return res.json({
          ...userAnimes.docs[0].data(),
          favorite: favorite,
        })
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  })
  .get(async (req, res) => {
    res.setHeader('Cache-Control', 's-maxage=3600')
    const session: any = await getSession({ req })

    try {
      if (!session) throw new Error('Você não tem acesso a ver os seus favoritos.')

      const { firestore } = firebaseAdmin()

      const userAnimes = await firestore
        .collection('animes')
        .where('favorite', '==', true)
        .where('userId', '==', session.userId)
        .get()

      return res.json(userAnimes.docs.map((doc) => doc.data()))
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

export default handler
