import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import api from '../../../services/api'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
	try {
		const { episodeId } = req.query

		const episode = await api.getEpisode(String(episodeId))

		return res.json(episode)
	} catch (error) {
		return res.status(400).send(error.message)
	}
})

export default handler
