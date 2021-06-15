import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import api from '../../../services/api'

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
	try {
		const { episodeId, quality }: {
			episodeId: string | string[]
			quality: 'locationsd' | 'locationhd' | 'location'
		} = req.query as any

		const episode = await api.getEpisode(String(episodeId))

		if (quality) {
			if (episode[quality]) {
				return res.redirect(String(episode[quality]));
			}
		}

		return res.json(episode)
	} catch (error) {
		return res.status(400).send(error.message)
	}
})

export default handler
