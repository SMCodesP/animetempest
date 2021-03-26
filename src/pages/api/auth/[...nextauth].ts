import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import faunadb from 'faunadb'
import FaunaAdapter from '../../../utils/adapters/fauna-adapter'

const faunaClient = new faunadb.Client({
  secret: String(process.env.FAUNADB_SERVER_KEY),
})

export default (req: any, res: any) =>
  NextAuth(req, res, {
    providers: [
      Providers.Discord({
        clientId: String(process.env.DISCORD_CLIENT_ID),
        clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      }),
      Providers.Facebook({
        clientId: String(process.env.FACEBOOK_CLIENT_ID),
        clientSecret: String(process.env.FACEBOOK_CLIENT_SECRET),
      }),
    ],
    adapter: FaunaAdapter.Adapter({
      faunaClient,
    }),
    secret: process.env.SECRET,
    session: {
      jwt: true,
    },
    jwt: {},
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {},
    events: {},
    debug: false,
  })
