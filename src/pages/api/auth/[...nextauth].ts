import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import Auth0Provider from 'next-auth/providers/auth0';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';

const client = new FaunaClient({
  secret: String(process.env.FAUNADB_SECRET_KEY),
  scheme: process.env.FAUNADB_SCHEMA as 'https' | 'http',
  domain: String(process.env.FAUNADB_DOMAIN),
  port: 443,
});

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    }),
    Auth0Provider({
      clientId: String(process.env.AUTH0_CLIENT_ID),
      clientSecret: String(process.env.AUTH0_CLIENT_SECRET),
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  adapter: FaunaAdapter(client),
  pages: {
    signIn: `/auth/signin`,
  },
});
