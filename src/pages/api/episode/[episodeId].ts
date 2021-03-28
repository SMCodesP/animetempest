import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import nc from 'next-connect'
import firebaseAdmin from '../../../utils/lib/firebaseAdmin'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const session: any = await getSession({ req })

  try {
    if (!session) throw new Error('Você não tem acesso a ver os seus favoritos.')
    const { episodeId } = req.query

    const { firestore } = firebaseAdmin()

    const animeWatch = await firestore
      .collection('watch')
      .where('userId', '==', session.userId)
      .where('videoId', '==', episodeId)
      .limit(1)
      .get()

    if (animeWatch.empty) throw new Error('Nenhum progresso do video com esse id foi salvo.')

    return res.json(animeWatch.docs[0].data())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default handler
