import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Firebase from '../../../utils/adapters/firebase'
import firebaseAdmin from '../../../utils/lib/firebaseAdmin'

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
    adapter: Firebase.Adapter({
      firestoreAdmin: firebaseAdmin().firestore,
      usersCollection: 'users',
      accountsCollection: 'accounts',
      sessionsCollection: 'sessions',
      verificationRequestsCollection: 'verificationRequests',
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
  } as any)
