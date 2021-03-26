import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import FaunaAdapter from '../../../utils/adapters/fauna-adapter'

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
    adapter: FaunaAdapter.Adapter(),
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
  } as any)
