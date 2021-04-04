import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import nc from 'next-connect'
import firebaseAdmin from '../../../../utils/lib/firebaseAdmin'

import Comment from '../../../../entities/Comment'

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { videoId } = req.query
  const { content } = req.body

  try {
    if (!videoId) throw new Error('Video inválido.')

    const session = await getSession({ req })
    if (!session)
      throw new Error('Você não tem acesso a ver os seus favoritos.')

    const { database } = firebaseAdmin()

    await database.ref(`chats/${videoId}`).push({
      author: {
        name: session.user.name,
        avatar: session.user.image,
      },
      content,
      timestamp: Date.now(),
    } as Comment)

    return res.status(201).end()
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default handler
