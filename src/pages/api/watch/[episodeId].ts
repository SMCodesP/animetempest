import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import api from '../../../services/api'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
	try {
		const { episodeId } = req.query

		const episode = await api.getEpisode(String(episodeId))

		setTimeout(() => {
			res.json(episode)
		}, 25000)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

export default handler
