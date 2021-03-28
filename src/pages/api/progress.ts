import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import nc from 'next-connect'
import firebaseAdmin from '../../utils/lib/firebaseAdmin'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const session: any = await getSession({ req })

  try {
    if (!session) throw new Error('Você não tem acesso a ver os seus favoritos.')

    const { firestore } = firebaseAdmin()

    const animeWatch = await firestore
      .collection('watch')
      .where('userId', '==', session.userId)
      .get()

    return res.json(animeWatch.docs.map((doc) => doc.data()))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default handler
